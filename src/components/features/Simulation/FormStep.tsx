import { ArrowLeft, ArrowRight, type LucideIcon } from 'lucide-react'
import { type SyntheticEvent, useState } from 'react'

import type { SimulationFormData } from '../../../data/simulation'
import { formatCurrencyMask } from '../../../utils/currency'
import { validateSimulationField } from '../../../utils/validation'
import { Button } from '../../shared/Button'
import { Input, type InputProps } from '../../shared/Input'

export interface FormStepProps {
  id: string
  icon: LucideIcon
  title: string
  question: string
  inputProps: InputProps
  submitButtonProps?: {
    label: string
    emojiIcon?: string
  }
}

interface ActionsButtonsProps {
  onBack: () => void
  onNext: (value: string) => void
  initialValue?: string
  hideBackButton?: boolean
}

export function FormStep({
  id,
  icon: Icon,
  title,
  question,
  inputProps,
  submitButtonProps,
  hideBackButton,
  initialValue = '',
  onBack,
  onNext,
}: FormStepProps & ActionsButtonsProps) {
  const [inputValue, setInputValue] = useState(initialValue)
  const [error, setError] = useState<string | null>(null)
  const errorId = `${id}-error`

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    const validationError = validateSimulationField(
      id as keyof SimulationFormData,
      inputValue,
    )

    if (validationError) {
      setError(validationError)
      return
    }

    onNext(inputValue)
  }

  return (
    <div className="bg-card rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] sm:p-8">
      <div className="bg-primary mb-4 flex h-15 w-15 items-center justify-center rounded-xl">
        <Icon size={32} className="text-primary-foreground" />
      </div>
      <h2 className="text-primary mb-1 text-xs font-semibold tracking-widest uppercase">
        {title}
      </h2>
      <h3
        id={`${id}-question`}
        className="text-foreground mb-6 text-xl leading-snug font-semibold sm:text-2xl"
      >
        {question}
      </h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          {...inputProps}
          id={id}
          name={id}
          required
          aria-labelledby={`${id}-question`}
          aria-describedby={error ? errorId : undefined}
          aria-invalid={Boolean(error)}
          value={inputValue}
          onChange={(e) => {
            setError(null)
            setInputValue(
              inputProps.prefix === 'R$'
                ? formatCurrencyMask(e.target.value)
                : e.target.value,
            )
          }}
        />
        {error && (
          <p id={errorId} role="alert" className="text-sm text-red-500">
            {error}
          </p>
        )}
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
          {!hideBackButton && (
            <Button
              type="button"
              onClick={onBack}
              variant="ghost"
              icon={ArrowLeft}
              className="order-2 flex-1 justify-center rounded-xl py-3 sm:order-1"
            >
              Voltar
            </Button>
          )}
          <Button
            type="submit"
            variant="primary"
            icon={!submitButtonProps ? ArrowRight : undefined}
            disabled={!inputValue}
            className="order-1 flex-1 sm:order-2"
          >
            {submitButtonProps?.label ?? 'Próximo'}
            {submitButtonProps?.emojiIcon}
          </Button>
        </div>
      </form>
    </div>
  )
}
