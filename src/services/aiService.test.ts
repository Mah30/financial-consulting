import { describe, expect, it } from 'vitest'

import { isInsightData } from '../data/insight'

const validInsight = {
  feasibility: { status: 'viable', content: 'A meta é viável.' },
  diagnosis: { content: 'Seu orçamento possui saldo.' },
  suggestions: { items: ['Revisar despesas.'] },
  extraIncome: { items: ['Realizar trabalhos pontuais.'] },
  investment: { items: ['Avaliar uma opção de baixo risco.'] },
  actionPlan: { items: ['Separar o valor no início do mês.'] },
  motivation: { content: 'Continue acompanhando sua meta.' },
}

describe('Gemini response validation', () => {
  it('accepts a complete insight', () => {
    expect(isInsightData(validInsight)).toBe(true)
  })

  it('rejects invalid or outdated responses', () => {
    expect(isInsightData({ ...validInsight, actionPlan: undefined })).toBe(
      false,
    )
    expect(
      isInsightData({
        ...validInsight,
        feasibility: { status: 'unknown', content: 'Inválido' },
      }),
    ).toBe(false)
  })
})
