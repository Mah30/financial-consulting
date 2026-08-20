import { useState } from 'react'

import { parseConversation, type ConversationTurn } from '../data/conversation'
import { AIServiceError, getConversationAnswer } from '../services/aiService'
import { useSimulationStorage } from './useSimulationStorage'

function getConversationErrorMessage(error: unknown) {
  if (error instanceof AIServiceError) {
    if (error.status === 429) {
      return 'Muitas perguntas foram enviadas em pouco tempo. Aguarde um instante e tente novamente.'
    }

    if (error.status === 401 || error.status === 403) {
      return 'A chave do Gemini é inválida ou não possui permissão.'
    }

    if (error.status && error.status >= 500) {
      return 'A IA está temporariamente indisponível. Tente novamente.'
    }

    return error.message
  }

  if (error instanceof TypeError) {
    return 'Não foi possível conectar à IA. Verifique sua internet.'
  }

  return 'Não foi possível responder à pergunta. Tente novamente.'
}

export function useConversation(simulationId: string) {
  const { getFormData, updateSimulation } = useSimulationStorage()
  const [conversation, setConversation] = useState<ConversationTurn[]>(() =>
    parseConversation(getFormData(simulationId)?.conversation),
  )
  const [pendingQuestion, setPendingQuestion] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const askQuestion = async (rawQuestion: string) => {
    const question = rawQuestion.trim()

    if (!question || pendingQuestion) {
      return false
    }

    const simulation = getFormData(simulationId)

    if (!simulation) {
      setError('Simulação não encontrada.')
      return false
    }

    setPendingQuestion(question)
    setError(null)

    try {
      const answer = await getConversationAnswer({
        simulation,
        insight: simulation.insight,
        conversation,
        question,
      })
      const turn: ConversationTurn = {
        id: crypto.randomUUID(),
        question,
        answer,
        createdAt: new Date().toISOString(),
      }
      const updatedConversation = [...conversation, turn]
      const latestSimulation = getFormData(simulationId)

      if (!latestSimulation) {
        setError('Simulação não encontrada.')
        return false
      }

      updateSimulation(simulationId, {
        ...latestSimulation,
        conversation: updatedConversation,
      })
      setConversation(updatedConversation)
      return true
    } catch (requestError) {
      setError(getConversationErrorMessage(requestError))
      return false
    } finally {
      setPendingQuestion(null)
    }
  }

  return {
    conversation,
    pendingQuestion,
    isLoading: pendingQuestion !== null,
    error,
    askQuestion,
  }
}
