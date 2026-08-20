import { describe, expect, it } from 'vitest'

import { validateSimulationField } from './validation'

describe('simulation field validation', () => {
  it('rejects blank and zero required values', () => {
    expect(validateSimulationField('goalName', '   ')).toBeTruthy()
    expect(validateSimulationField('income', '0,00')).toBeTruthy()
    expect(validateSimulationField('goalAmount', '0,00')).toBeTruthy()
  })

  it('accepts zero expenses and debts', () => {
    expect(validateSimulationField('expenses', '0,00')).toBeNull()
    expect(validateSimulationField('debts', '0,00')).toBeNull()
  })

  it('requires an integer deadline between 1 and 120', () => {
    expect(validateSimulationField('goalDeadline', '0')).toBeTruthy()
    expect(validateSimulationField('goalDeadline', '12.5')).toBeTruthy()
    expect(validateSimulationField('goalDeadline', '121')).toBeTruthy()
    expect(validateSimulationField('goalDeadline', '12')).toBeNull()
  })
})
