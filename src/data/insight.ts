import type { FeasibilityStatus } from '../utils/simulation'

export interface InsightData {
  feasibility: {
    status: FeasibilityStatus
    content: string
  }
  diagnosis: { content: string }
  suggestions: { items: string[] }
  extraIncome: { items: string[] }
  investment: { items: string[] }
  actionPlan: { items: string[] }
  motivation: { content: string }
}

function createItemsSchema() {
  return {
    type: 'object',
    properties: {
      items: {
        type: 'array',
        items: { type: 'string' },
        minItems: 1,
        maxItems: 4,
      },
    },
    required: ['items'],
  }
}

export const INSIGHT_JSON_SCHEMA = {
  type: 'object',
  properties: {
    feasibility: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          enum: ['viable', 'needs_adjustment', 'unfeasible'],
        },
        content: { type: 'string' },
      },
      required: ['status', 'content'],
    },
    diagnosis: {
      type: 'object',
      properties: { content: { type: 'string' } },
      required: ['content'],
    },
    suggestions: createItemsSchema(),
    extraIncome: createItemsSchema(),
    investment: createItemsSchema(),
    actionPlan: createItemsSchema(),
    motivation: {
      type: 'object',
      properties: { content: { type: 'string' } },
      required: ['content'],
    },
  },
  required: [
    'feasibility',
    'diagnosis',
    'suggestions',
    'extraIncome',
    'investment',
    'actionPlan',
    'motivation',
  ],
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function hasContent(value: unknown): value is { content: string } {
  return isRecord(value) && typeof value.content === 'string'
}

function hasItems(value: unknown): value is { items: string[] } {
  return (
    isRecord(value) &&
    Array.isArray(value.items) &&
    value.items.length > 0 &&
    value.items.length <= 4 &&
    value.items.every((item) => typeof item === 'string')
  )
}

export function isInsightData(value: unknown): value is InsightData {
  if (!isRecord(value) || !isRecord(value.feasibility)) {
    return false
  }

  const status = value.feasibility.status

  return (
    (status === 'viable' ||
      status === 'needs_adjustment' ||
      status === 'unfeasible') &&
    typeof value.feasibility.content === 'string' &&
    hasContent(value.diagnosis) &&
    hasItems(value.suggestions) &&
    hasItems(value.extraIncome) &&
    hasItems(value.investment) &&
    hasItems(value.actionPlan) &&
    hasContent(value.motivation)
  )
}
