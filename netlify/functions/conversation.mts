import type { Config } from '@netlify/functions'

import {
  isConversationTurn,
  type ConversationTurn,
} from '../../src/data/conversation'
import { buildConversationPrompt } from '../../src/data/conversationPrompt'
import { isInsightData, type InsightData } from '../../src/data/insight'
import type { SimulationFormData } from '../../src/data/simulationTypes'
import { validateSimulationField } from '../../src/utils/validation'

interface GeminiResponse {
  steps?: {
    type?: string
    content?: {
      type?: string
      text?: string
    }[]
  }[]
}

interface ConversationRequest {
  simulation: SimulationFormData
  insight?: InsightData
  conversation: ConversationTurn[]
  question: string
}

class FunctionError extends Error {
  public readonly status: number

  constructor(message: string, status = 500) {
    super(message)
    this.name = 'FunctionError'
    this.status = status
  }
}

const DEFAULT_MODEL_NAME = 'gemini-3.5-flash-lite'
const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/interactions'
const REQUEST_TIMEOUT_MS = 30_000
const MAX_REQUEST_SIZE = 500_000
const MAX_QUESTION_LENGTH = 2_000
const simulationFields = [
  'income',
  'expenses',
  'debts',
  'goalName',
  'goalAmount',
  'goalDeadline',
] as const satisfies readonly (keyof SimulationFormData)[]

function getApiKey() {
  const apiKey = process.env.GEMINI_API_KEY ?? process.env.VITE_GEMINI_API_KEY

  if (!apiKey?.trim()) {
    throw new FunctionError(
      'A variável GEMINI_API_KEY não foi configurada na Netlify.',
      500,
    )
  }

  return apiKey.trim()
}

function getModelName() {
  return process.env.GEMINI_MODEL?.trim() || DEFAULT_MODEL_NAME
}

function parseSimulation(value: unknown): SimulationFormData {
  if (typeof value !== 'object' || value === null) {
    throw new FunctionError('Dados da simulação inválidos.', 400)
  }

  const input = value as Record<string, unknown>
  const simulation = {} as SimulationFormData

  for (const field of simulationFields) {
    const fieldValue = input[field]

    if (typeof fieldValue !== 'string') {
      throw new FunctionError(`O campo ${field} é inválido.`, 400)
    }

    const validationError = validateSimulationField(field, fieldValue)

    if (validationError) {
      throw new FunctionError(validationError, 400)
    }

    simulation[field] = fieldValue
  }

  return simulation
}

function parseRequestBody(value: unknown): ConversationRequest {
  if (typeof value !== 'object' || value === null) {
    throw new FunctionError('Dados da conversa inválidos.', 400)
  }

  const body = value as Record<string, unknown>
  const question = typeof body.question === 'string' ? body.question.trim() : ''

  if (!question) {
    throw new FunctionError('Digite uma pergunta antes de enviar.', 400)
  }

  if (question.length > MAX_QUESTION_LENGTH) {
    throw new FunctionError(
      `A pergunta deve ter no máximo ${MAX_QUESTION_LENGTH} caracteres.`,
      400,
    )
  }

  if (!Array.isArray(body.conversation)) {
    throw new FunctionError('O histórico da conversa é inválido.', 400)
  }

  if (!body.conversation.every(isConversationTurn)) {
    throw new FunctionError('O histórico da conversa está incompleto.', 400)
  }

  if (body.insight !== undefined && !isInsightData(body.insight)) {
    throw new FunctionError('O diagnóstico informado é inválido.', 400)
  }

  return {
    simulation: parseSimulation(body.simulation),
    insight: body.insight,
    conversation: body.conversation,
    question,
  }
}

async function callGemini(data: ConversationRequest) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': getApiKey(),
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: getModelName(),
        input: buildConversationPrompt(data),
      }),
    })

    if (!response.ok) {
      const errorBody = (await response.json().catch(() => null)) as {
        error?: { message?: string }
      } | null
      console.error('Gemini conversation request failed', {
        status: response.status,
        message: errorBody?.error?.message ?? 'No error message returned',
      })
      const status =
        response.status === 429 ? 429 : response.status === 503 ? 503 : 502
      throw new FunctionError(
        response.status === 429
          ? 'O limite do Gemini foi atingido. Tente novamente em instantes.'
          : response.status === 503
            ? 'O Gemini está com alta demanda. Tente novamente em instantes.'
            : 'Não foi possível obter uma resposta do Gemini.',
        status,
      )
    }

    return (await response.json()) as GeminiResponse
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new FunctionError('O Gemini demorou demais para responder.', 504)
    }

    throw error
  } finally {
    clearTimeout(timeout)
  }
}

export default async (request: Request) => {
  try {
    if (request.method !== 'POST') {
      return Response.json(
        { error: 'Método não permitido.' },
        { status: 405, headers: { Allow: 'POST' } },
      )
    }

    const contentLength = Number(request.headers.get('content-length') ?? 0)

    if (contentLength > MAX_REQUEST_SIZE) {
      throw new FunctionError(
        'A conversa é muito grande para ser enviada.',
        413,
      )
    }

    const rawBody = await request.text()

    if (new TextEncoder().encode(rawBody).byteLength > MAX_REQUEST_SIZE) {
      throw new FunctionError(
        'A conversa é muito grande para ser enviada.',
        413,
      )
    }

    let parsedBody: unknown

    try {
      parsedBody = JSON.parse(rawBody)
    } catch {
      throw new FunctionError(
        'O corpo da requisição não é um JSON válido.',
        400,
      )
    }

    const data = parseRequestBody(parsedBody)
    const geminiResponse = await callGemini(data)
    const answer = geminiResponse.steps
      ?.findLast((step) => step.type === 'model_output')
      ?.content?.find((content) => content.type === 'text')
      ?.text?.trim()

    if (!answer) {
      throw new FunctionError('O Gemini retornou uma resposta vazia.', 502)
    }

    return Response.json({ answer })
  } catch (error) {
    if (error instanceof FunctionError) {
      return Response.json({ error: error.message }, { status: error.status })
    }

    return Response.json(
      { error: 'Erro interno ao responder à pergunta.' },
      { status: 500 },
    )
  }
}

export const config: Config = {
  path: '/api/conversation',
  rateLimit: {
    windowLimit: 10,
    windowSize: 60,
    aggregateBy: ['ip', 'domain'],
  },
}
