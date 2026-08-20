import type { ConversationTurn } from './conversation'
import type { InsightData } from './insight'

export interface SimulationFormData {
  income: string
  expenses: string
  debts: string
  goalName: string
  goalAmount: string
  goalDeadline: string
}

export interface SimulationRecord extends SimulationFormData {
  id: string
  createdAt?: string
  insight?: InsightData
  conversation?: ConversationTurn[]
}
