import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  type SimulationFormData,
  simulationFormSteps,
} from '../../../data/simulation'
import { useSimulationStorage } from '../../../hooks/useSimulationStorage'

import { FormStep } from './FormStep'
import { StepProgress } from './Progress'

export const SimulationForm = () => {
  const { saveFormData } = useSimulationStorage()
  const navigate = useNavigate()

  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [formData, setFormData] = useState<SimulationFormData>(
    {} as SimulationFormData,
  )
  const totalSteps = simulationFormSteps.length
  const currentStep = simulationFormSteps[currentStepIndex]
  const currentField = currentStep.id as keyof SimulationFormData

  const handleNextStep = (value: string) => {
    const normalizedValue = currentField === 'goalName' ? value.trim() : value
    const updatedFormData = {
      ...formData,
      [currentField]: normalizedValue,
    }
    setFormData(updatedFormData)

    if (currentStepIndex + 1 > totalSteps - 1) {
      const id = saveFormData(updatedFormData)
      void navigate(`/resultado/${id}`)
      return
    }

    setCurrentStepIndex((prev) => prev + 1)
  }

  const handlePreviousStep = () => {
    if (currentStepIndex === 0) {
      return
    }

    setCurrentStepIndex((prev) => prev - 1)
  }

  return (
    <>
      <StepProgress
        currentStep={currentStepIndex + 1}
        totalSteps={totalSteps}
      />
      <FormStep
        key={currentStep.id}
        {...currentStep}
        initialValue={formData[currentField] ?? ''}
        onBack={handlePreviousStep}
        onNext={handleNextStep}
        hideBackButton={currentStepIndex === 0}
      />
    </>
  )
}
