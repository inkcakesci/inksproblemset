import { describe, expect, it } from 'vitest'
import { nextReview } from './scheduler'

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
})
