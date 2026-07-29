import type { ReviewProgress } from './types'

export type Rating = 'again' | 'hard' | 'good' | 'easy'

const factors: Record<Rating, number> = { again: 0, hard: 1.2, good: 2.5, easy: 4 }

export function nextReview(cardId: string, rating: Rating, previous?: ReviewProgress, now = new Date()): ReviewProgress {
  const currentInterval = previous?.intervalDays ?? 0
  const baseEase = previous?.ease ?? 2.5
  const lapses = (previous?.lapses ?? 0) + (rating === 'again' ? 1 : 0)
  let intervalDays = 0
  let ease = baseEase

  if (rating === 'again') {
    ease = Math.max(1.3, baseEase - 0.2)
  } else if (currentInterval === 0) {
    intervalDays = rating === 'hard' ? 1 : rating === 'good' ? 2 : 4
  } else {
    intervalDays = Math.max(1, Math.round(currentInterval * factors[rating] * (baseEase / 2.5)))
    ease = Math.max(1.3, baseEase + (rating === 'easy' ? 0.1 : rating === 'hard' ? -0.1 : 0))
  }

  const due = new Date(now)
  rating === 'again' ? due.setMinutes(due.getMinutes() + 10) : due.setDate(due.getDate() + intervalDays)
  return {
    cardId, due: due.toISOString(), intervalDays, ease,
    repetitions: (previous?.repetitions ?? 0) + 1,
    lapses, lastReview: now.toISOString(),
  }
}
