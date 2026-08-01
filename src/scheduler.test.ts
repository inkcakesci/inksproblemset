import { describe, expect, it } from 'vitest'
import { nextReview, shuffleReviewQueue } from './scheduler'

describe('nextReview', () => {
  const now = new Date('2026-07-28T08:00:00.000Z')

  it('schedules a forgotten card for relearning in ten minutes', () => {
    const result = nextReview('card-1', 'again', undefined, now)
    expect(result.due).toBe('2026-07-28T08:10:00.000Z')
    expect(result.lapses).toBe(1)
  })

  it('gives an easy new card a longer first interval', () => {
    const good = nextReview('card-1', 'good', undefined, now)
    const easy = nextReview('card-1', 'easy', undefined, now)
    expect(easy.intervalDays).toBeGreaterThan(good.intervalDays)
  })

  it('shuffles a review queue without changing the source or losing cards', () => {
    const source = ['a', 'b', 'c', 'd']
    const shuffled = shuffleReviewQueue(source, () => 0)

    expect(shuffled).toEqual(['b', 'c', 'd', 'a'])
    expect(source).toEqual(['a', 'b', 'c', 'd'])
    expect(new Set(shuffled)).toEqual(new Set(source))
  })
})
