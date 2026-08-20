import { afterEach, describe, expect, it, vi } from 'vitest'

import insightHandler from '../../netlify/functions/insight.mts'

const simulation = {
  income: '5.000,00',
  expenses: '2.000,00',
  debts: '500,00',
  goalName: 'Reserva de emergência',
  goalAmount: '12.000,00',
  goalDeadline: '12',
}

const generatedInsight = {
  feasibility: { status: 'unfeasible', content: 'Análise da meta.' },
  diagnosis: { content: 'Diagnóstico financeiro.' },
  suggestions: { items: ['Revisar despesas.'] },
  extraIncome: { items: ['Realizar trabalhos pontuais.'] },
  investment: { items: ['Avaliar uma opção de baixo risco.'] },
  actionPlan: { items: ['Separar o valor no início do mês.'] },
  motivation: { content: 'Continue acompanhando sua meta.' },
}

describe('Netlify insight function', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
    vi.unstubAllGlobals()
  })

  it('validates input, calls Gemini on the server and enforces local feasibility', async () => {
    vi.stubEnv('GEMINI_API_KEY', 'server-only-test-key')
    const fetchMock = vi.fn().mockResolvedValue(
      Response.json({
        steps: [
          {
            type: 'model_output',
            content: [{ type: 'text', text: JSON.stringify(generatedInsight) }],
          },
        ],
      }),
    )
    vi.stubGlobal('fetch', fetchMock)

    const response = await insightHandler(
      new Request('http://localhost/api/insight', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ simulation }),
      }),
    )
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(body.feasibility.status).toBe('viable')
    expect(fetchMock).toHaveBeenCalledOnce()

    const [, requestInit] = fetchMock.mock.calls[0]
    expect(requestInit.headers['X-goog-api-key']).toBe('server-only-test-key')
  })

  it('rejects invalid simulations before calling Gemini', async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)

    const response = await insightHandler(
      new Request('http://localhost/api/insight', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ simulation: { goalName: '' } }),
      }),
    )

    expect(response.status).toBe(400)
    expect(fetchMock).not.toHaveBeenCalled()
  })
})
