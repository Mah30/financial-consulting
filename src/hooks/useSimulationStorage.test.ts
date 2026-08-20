import { beforeEach, describe, expect, it, vi } from 'vitest'

import type { SimulationFormData } from '../data/simulation'
import { simulationStorage } from './useSimulationStorage'

const formData: SimulationFormData = {
  income: '5.000,00',
  expenses: '2.000,00',
  debts: '500,00',
  goalName: 'Viagem',
  goalAmount: '12.000,00',
  goalDeadline: '12',
}

function createLocalStorageMock(): Storage {
  const values = new Map<string, string>()

  return {
    get length() {
      return values.size
    },
    clear: () => values.clear(),
    getItem: (key) => values.get(key) ?? null,
    key: (index) => [...values.keys()][index] ?? null,
    removeItem: (key) => values.delete(key),
    setItem: (key, value) => values.set(key, String(value)),
  }
}

describe('simulation storage', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', createLocalStorageMock())
  })

  it('saves, reads and removes a simulation', () => {
    const id = simulationStorage.saveFormData(formData)
    const saved = simulationStorage.getFormData(id)

    expect(saved).toMatchObject({ ...formData, id })
    expect(saved?.createdAt).toBeTruthy()

    simulationStorage.deleteSimulation(id)
    expect(simulationStorage.getFormData(id)).toBeNull()
  })

  it('recovers safely from malformed local storage data', () => {
    localStorage.setItem('simulation-data', 'invalid-json')

    expect(simulationStorage.getAllSimulations()).toEqual([])
  })
})
