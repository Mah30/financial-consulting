import type { SimulationFormData } from '../data/simulationTypes'
import { parseCurrency } from './currency'

export type FeasibilityStatus = 'viable' | 'needs_adjustment' | 'unfeasible'

export function calcMonthlySavings(data: SimulationFormData) {
  return (
    parseCurrency(data.income) -
    parseCurrency(data.expenses) -
    parseCurrency(data.debts)
  )
}

export function calcMonthlySavingsNeeded(data: SimulationFormData) {
  const deadline = Number.parseInt(data.goalDeadline, 10)

  if (!Number.isInteger(deadline) || deadline <= 0) {
    return 0
  }

  return parseCurrency(data.goalAmount) / deadline
}

export function calculateFeasibility(
  data: SimulationFormData,
): FeasibilityStatus {
  const available = calcMonthlySavings(data)
  const needed = calcMonthlySavingsNeeded(data)

  if (available >= needed) {
    return 'viable'
  }

  if (available > 0) {
    return 'needs_adjustment'
  }

  return 'unfeasible'
}
