import {
  type SimulationFormData,
  type SimulationRecord,
} from '../data/simulation'
import { parseConversation } from '../data/conversation'

const LOCAL_STORAGE_KEY = 'simulation-data'

function isStoredSimulation(value: unknown): value is SimulationRecord {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const record = value as Partial<SimulationRecord>

  return (
    typeof record.id === 'string' &&
    typeof record.income === 'string' &&
    typeof record.expenses === 'string' &&
    typeof record.debts === 'string' &&
    typeof record.goalName === 'string' &&
    typeof record.goalAmount === 'string' &&
    typeof record.goalDeadline === 'string'
  )
}

function readSimulations(): SimulationRecord[] {
  try {
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY)
    const parsed: unknown = storage ? JSON.parse(storage) : []

    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed.filter(isStoredSimulation).map((record) => ({
      ...record,
      createdAt: typeof record.createdAt === 'string' ? record.createdAt : '',
      conversation: parseConversation(record.conversation),
    }))
  } catch {
    return []
  }
}

function writeSimulations(simulations: SimulationRecord[]) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(simulations))
}

const saveFormData = (formData: SimulationFormData) => {
  const id = crypto.randomUUID()
  const record: SimulationRecord = {
    ...formData,
    id,
    createdAt: new Date().toISOString(),
  }

  writeSimulations([...readSimulations(), record])

  return id
}

const getFormData = (id: string) =>
  readSimulations().find((record) => record.id === id) ?? null

const getAllSimulations = () =>
  readSimulations().sort((a, b) =>
    (b.createdAt ?? '').localeCompare(a.createdAt ?? ''),
  )

const updateSimulation = (id: string, data: SimulationRecord) => {
  const updated = readSimulations().map((record) =>
    record.id === id ? data : record,
  )

  writeSimulations(updated)
}

const deleteSimulation = (id: string) => {
  writeSimulations(readSimulations().filter((record) => record.id !== id))
}

const clearSimulations = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY)
}

export const simulationStorage = {
  saveFormData,
  getFormData,
  getAllSimulations,
  updateSimulation,
  deleteSimulation,
  clearSimulations,
}

export const useSimulationStorage = () => {
  return simulationStorage
}
