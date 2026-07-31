import { PiggyBank } from 'lucide-react'

import { FormStep } from './FormStep'
import { StepProgress } from './Progress'

export const SimulationForm = () => {
  const handleBack = () => {
    console.log('Back to previous step')
  }

  const handleNext = (value: string) => {
    console.log('Gross monthly income:', value)
  }

  return (
    <>
      <StepProgress currentStep={6} totalSteps={10} />

      <FormStep
        inputProps={{
          prefix: 'R$',
          placeholder: '0.00',
          inputMode: 'numeric',
        }}
        icon={PiggyBank}
        title="Gross monthly income"
        question="How much is deposited into your account every month (from all sources combined)"
        onBack={handleBack}
        onNext={handleNext}
      />
    </>
  )
}
