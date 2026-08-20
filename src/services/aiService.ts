import { isInsightData, type InsightData } from '../data/insight'
import type { SimulationFormData } from '../data/simulation'

export type { InsightData } from '../data/insight'

export class AIServiceError extends Error {
  public readonly status?: number

  constructor(message: string, status?: number) {
    super(message)
    this.name = 'AIServiceError'
    this.status = status
  }
}

const INSIGHT_API_URL = '/api/insight'
const REQUEST_TIMEOUT_MS = 35_000

function isErrorResponse(value: unknown): value is { error: string } {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as { error?: unknown }).error === 'string'
  )
}

export const getInsight = async (
  simulation: SimulationFormData,
): Promise<InsightData> => {
  const controller = new AbortController()
  const timeout = window.setTimeout(
    () => controller.abort(),
    REQUEST_TIMEOUT_MS,
  )

  try {
    const response = await fetch(INSIGHT_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({ simulation }),
    })
    const body: unknown = await response.json()

    if (!response.ok) {
      throw new AIServiceError(
        isErrorResponse(body)
          ? body.error
          : `A função de diagnóstico respondeu com status ${response.status}.`,
        response.status,
      )
    }

    if (!isInsightData(body)) {
      throw new AIServiceError('A função retornou um diagnóstico incompleto.')
    }

    return body
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new AIServiceError(
        'A geração demorou mais de 35 segundos. Tente novamente.',
      )
    }

    throw error
  } finally {
    window.clearTimeout(timeout)
  }
}
