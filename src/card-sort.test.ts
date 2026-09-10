import { describe, expect, it } from 'vitest'
import { sortCardsByCreatedAt } from './card-sort'
import type { KnowledgeCard } from './types'

function card(id: string, createdAt: string): KnowledgeCard {
  return {
    id,
    title: id,
    category: '测试 / 排序',
    tags: [],
    createdAt,
    type: 'qa',
    question: '问题',
    answer: '## 答案\n\n答案',
    sourcePath: `content/${id}.md`,
  }
}

describe('sortCardsByCreatedAt', () => {
  const cards = [
    card('older', '2026-08-01T10:00:00+08:00'),
    card('same-b', '2026-09-10T18:00:00+08:00'),
    card('same-a', '2026-09-10T18:00:00+08:00'),
  ]

  it('sorts newest cards first without mutating the source', () => {
    expect(sortCardsByCreatedAt(cards, 'newest').map(({ id }) => id))
      .toEqual(['same-a', 'same-b', 'older'])
    expect(cards.map(({ id }) => id)).toEqual(['older', 'same-b', 'same-a'])
  })

  it('sorts oldest cards first', () => {
    expect(sortCardsByCreatedAt(cards, 'oldest').map(({ id }) => id))
      .toEqual(['older', 'same-a', 'same-b'])
  })
})
