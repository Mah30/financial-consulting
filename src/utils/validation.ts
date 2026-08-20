import type { SimulationFormData } from '../data/simulationTypes'
import { parseCurrency } from './currency'

type SimulationField = keyof SimulationFormData

export function validateSimulationField(
  field: SimulationField,
  value: string,
): string | null {
  const trimmedValue = value.trim()

  if (!trimmedValue) {
    return 'Preencha este campo para continuar.'
  }

  if (field === 'goalName') {
    return trimmedValue.length < 2
      ? 'Informe um nome com pelo menos 2 caracteres.'
      : null
  }

  if (field === 'goalDeadline') {
    const deadline = Number(trimmedValue)

    if (!Number.isInteger(deadline) || deadline < 1 || deadline > 120) {
      return 'Informe um prazo inteiro entre 1 e 120 meses.'
    }

    return null
  }

  const amount = parseCurrency(trimmedValue)

  if (!Number.isFinite(amount) || amount < 0) {
    return 'Informe um valor monetário válido.'
  }

  if ((field === 'income' || field === 'goalAmount') && amount <= 0) {
    return 'O valor deve ser maior que zero.'
  }

  return null
}
