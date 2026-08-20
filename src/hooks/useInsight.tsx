import { useCallback, useEffect, useRef, useState } from 'react'

import { isInsightData } from '../data/insight'
import type { SimulationRecord } from '../data/simulation'
import {
  AIServiceError,
  getInsight,
  type InsightData,
} from '../services/aiService'
import { calculateFeasibility } from '../utils/simulation'
import { useSimulationStorage } from './useSimulationStorage'

function getErrorMessage(error: unknown) {
  if (error instanceof AIServiceError) {
    if (error.status === 429) {
      return 'O limite de uso do Gemini foi atingido. Aguarde um pouco e tente novamente.'
    }

    if (error.status === 401 || error.status === 403) {
      return 'A chave do Gemini é inválida ou não possui permissão.'
    }

    if (error.status && error.status >= 500) {
      return 'O Gemini está temporariamente indisponível. Tente novamente.'
    }

    return error.message
  }

  if (error instanceof TypeError) {
    return 'Não foi possível conectar ao Gemini. Verifique sua internet.'
  }

  return 'Erro ao gerar o diagnóstico. Tente novamente.'
}
export const useInsight = (id: string) => {
  const isRequestPending = useRef(false)
  const { getFormData, updateSimulation } = useSimulationStorage()

  const [insight, setInsight] = useState<InsightData | null>(() => {
    const simulation = getFormData(id)
    const cachedInsight = simulation?.insight

    if (isInsightData(cachedInsight)) {
      return cachedInsight
    }

    return null
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Necessário o uso do useCallback pois temos que colocar essa função
  // Como array de dependências do useEffect
  const fetchInsight = useCallback(
    async (simulationId: string) => {
      const simulation = getFormData(simulationId)

      if (!simulation) {
        setError('Simulação não encontrada.')
        return
      }

      isRequestPending.current = true
      setIsLoading(true)
      setError(null)

      try {
        const generatedInsight = await getInsight(simulation)
        const data: InsightData = {
          ...generatedInsight,
          feasibility: {
            ...generatedInsight.feasibility,
            status: calculateFeasibility(simulation),
          },
        }
        setInsight(data)

        updateSimulation(simulationId, {
          ...simulation,
          insight: data,
        } as SimulationRecord)
      } catch (requestError) {
        setError(getErrorMessage(requestError))
      } finally {
        isRequestPending.current = false
        setIsLoading(false)
      }
    },
    [getFormData, updateSimulation],
  )

  useEffect(() => {
    // Evita loop infinito de requisições para a API do Gemini
    if (insight || isLoading || error || isRequestPending.current) {
      return
    }

    fetchInsight(id)
  }, [id, insight, isLoading, error, fetchInsight])

  return { insight, isLoading, error, fetchInsight }
}
