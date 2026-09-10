import type { KnowledgeCard } from './types'

export type CardSortOrder = 'newest' | 'oldest'

export function sortCardsByCreatedAt(
  cards: readonly KnowledgeCard[],
  order: CardSortOrder,
): KnowledgeCard[] {
  const direction = order === 'newest' ? -1 : 1

  return [...cards].sort((left, right) => {
    const dateComparison = Date.parse(left.createdAt) - Date.parse(right.createdAt)
    return dateComparison === 0 ? left.id.localeCompare(right.id) : dateComparison * direction
  })
}
