import {
  CalendarClock,
  CreditCard,
  Goal,
  Landmark,
  PiggyBank,
  Wallet,
} from 'lucide-react'



import type { FormStepProps } from '../components/features/Simulations/FormStep'
import { InsightData } from '../services/aiService'


export const simulationFormSteps = [
  {
    id: 'income',
    icon: PiggyBank,
    title: 'Gross monthly income',
    question:
      'How much is deposited into your account every month (from all sources combined)',
    inputProps: {
      placeholder: 'e.g. 5,000.00',
      prefix: 'R$',
      maxLength: 12,
    },
  },
  {
    id: 'expenses',
    icon: CreditCard,
    title: 'Fixed living costs',
    question:
      'How much do you spend each month on fixed costs (rent, bills, etc.)?',
    inputProps: {
      placeholder: 'e.g. 2,000.00',
      prefix: 'R$',
      maxLength: 12,
    },
  },
  {
    id: 'debts',
    icon: Landmark,
    title: 'Debts / installments',
    question:
      'Do you have any amount committed to installments or loans each month?',
    inputProps: {
      placeholder: 'e.g. 500.00',
      prefix: 'R$',
      maxLength: 12,
    },
  },
  {
    id: 'goalName',
    icon: Goal,
    title: 'Goal name',
    question: 'What goal do you want to achieve?',
    inputProps: {
      placeholder: 'e.g. Trip to Japan',
      maxLength: 50,
    },
  },
  {
    id: 'goalAmount',
    icon: Wallet,
    title: 'Goal cost',
    question: 'How much does it cost to make this dream happen?',
    inputProps: {
      placeholder: 'e.g. 15,000.00',
      prefix: 'R$',
      maxLength: 12,
    },
  },
  {
    id: 'goalDeadline',
    icon: CalendarClock,
    title: 'Desired deadline',
    question: 'In how many months do you plan to reach this goal?',
    inputProps: {
      type: 'number',
      placeholder: 'e.g. 12',
      suffix: 'months',
      min: 1,
      max: 120,
    },
    submitButtonProps: {
      label: 'Generate simulation',
      emojiIcon: '✨',
    },
  },
] satisfies FormStepProps[]

export type SimulationFormData = Record<
  (typeof simulationFormSteps)[number]['id'],
  string
>

export type SimulationRecord = SimulationFormData & {
  id: string
  insight?: InsightData
}
