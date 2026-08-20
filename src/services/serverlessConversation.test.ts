import { afterEach, describe, expect, it, vi } from 'vitest'

import conversationHandler from '../../netlify/functions/conversation.mts'

const simulation = {
  income: '5.000,00',
  expenses: '2.000,00',
  debts: '500,00',
  goalName: 'Reserva de emergência',
  goalAmount: '12.000,00',
  goalDeadline: '12',
}

const conversation = [
  {
    id: 'turn-1',
    question: 'Quanto preciso guardar por mês?',
    answer: 'Você precisa guardar R$ 1.000,00 por mês.',
    createdAt: '2026-08-20T10:00:00.000Z',
  },
]

describe('Netlify conversation function', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
    vi.unstubAllGlobals()
  })

  it('sends the simulation and complete conversation context to Gemini', async () => {
    vi.stubEnv('GEMINI_API_KEY', 'server-only-test-key')
    const fetchMock = vi.fn().mockResolvedValue(
      Response.json({
        steps: [
          {
            type: 'model_output',
            content: [
              {
                type: 'text',
                text: 'Você pode revisar os custos fixos para antecipar a meta.',
              },
            ],
          },
        ],
      }),
    )
    vi.stubGlobal('fetch', fetchMock)

    const response = await conversationHandler(
      new Request('http://localhost/api/conversation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          simulation,
          conversation,
          question: 'Como posso alcançar a meta antes?',
        }),
      }),
    )
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(body.answer).toContain('revisar os custos fixos')

    const [, requestInit] = fetchMock.mock.calls[0]
    const geminiBody = JSON.parse(requestInit.body)
    expect(geminiBody.input).toContain(simulation.goalName)
    expect(geminiBody.input).toContain(conversation[0].question)
    expect(geminiBody.input).toContain(conversation[0].answer)
    expect(geminiBody.input).toContain('Como posso alcançar a meta antes?')
  })

  it('rejects an empty question before calling Gemini', async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)

    const response = await conversationHandler(
      new Request('http://localhost/api/conversation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ simulation, conversation: [], question: '  ' }),
      }),
    )

    expect(response.status).toBe(400)
    expect(fetchMock).not.toHaveBeenCalled()
  })
})
