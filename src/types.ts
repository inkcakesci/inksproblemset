export interface KnowledgeCard {
  id: string
  title: string
  category: string
  tags: string[]
  createdAt: string
  type: 'qa' | 'algorithm'
  difficulty?: 'easy' | 'medium' | 'hard'
  question: string
  answer: string
  sourcePath: string
}

export interface ReviewProgress {
  cardId: string
  due: string
  intervalDays: number
  ease: number
  repetitions: number
  lapses: number
  lastReview?: string
}
