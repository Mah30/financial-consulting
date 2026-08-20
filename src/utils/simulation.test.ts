import { describe, expect, it } from 'vitest'

import type { SimulationFormData } from '../data/simulation'
import {
  calcMonthlySavings,
  calcMonthlySavingsNeeded,
  calculateFeasibility,
} from './simulation'

const baseSimulation: SimulationFormData = {
  income: '5.000,00',
  expenses: '2.000,00',
  debts: '500,00',
  goalName: 'Reserva de emergência',
  goalAmount: '12.000,00',
  goalDeadline: '12',
}

describe('simulation calculations', () => {
  it('calculates available and required monthly savings', () => {
    expect(calcMonthlySavings(baseSimulation)).toBe(2_500)
    expect(calcMonthlySavingsNeeded(baseSimulation)).toBe(1_000)
  })

  it.each([
    [{}, 'viable'],
    [{ goalAmount: '36.000,00' }, 'needs_adjustment'],
    [{ expenses: '4.500,00', debts: '500,00' }, 'unfeasible'],
  ] as const)('classifies the financial scenario', (changes, expected) => {
    expect(calculateFeasibility({ ...baseSimulation, ...changes })).toBe(
      expected,
    )
  })
})
