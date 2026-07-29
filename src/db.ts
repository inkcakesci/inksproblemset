import Dexie, { type EntityTable } from 'dexie'
import type { ReviewProgress } from './types'

class ProblemSetDatabase extends Dexie {
  progress!: EntityTable<ReviewProgress, 'cardId'>

  constructor() {
    super('inks-problem-set')
    this.version(1).stores({ progress: 'cardId, due, lastReview' })
  }
}

export const db = new ProblemSetDatabase()

export async function exportProgress() {
  return {
    format: 'inks-problem-set-progress',
    version: 1,
    exportedAt: new Date().toISOString(),
    progress: await db.progress.toArray(),
  }
}

export async function importProgress(value: unknown) {
  if (!value || typeof value !== 'object' || !('format' in value) ||
      value.format !== 'inks-problem-set-progress' || !('progress' in value) ||
      !Array.isArray(value.progress)) {
    throw new Error('这不是有效的 Inks 进度备份')
  }
  await db.progress.bulkPut(value.progress as ReviewProgress[])
}
