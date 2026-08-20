export interface ConversationTurn {
  id: string
  question: string
  answer: string
  createdAt: string
}

export function isConversationTurn(value: unknown): value is ConversationTurn {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const turn = value as Partial<ConversationTurn>

  return (
    typeof turn.id === 'string' &&
    typeof turn.question === 'string' &&
    typeof turn.answer === 'string' &&
    typeof turn.createdAt === 'string'
  )
}

export function parseConversation(value: unknown): ConversationTurn[] {
  return Array.isArray(value) ? value.filter(isConversationTurn) : []
}
