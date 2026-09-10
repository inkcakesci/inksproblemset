import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'
import type { KnowledgeCard } from '../src/types'

const root = process.cwd()
const contentRoot = path.join(root, 'content')
const outputPath = path.join(root, 'src/generated/cards.json')
const checkOnly = process.argv.includes('--check')

async function walk(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true })
  return (await Promise.all(entries.map((entry) => {
    const target = path.join(directory, entry.name)
    return entry.isDirectory() ? walk(target) : target.endsWith('.md') ? [target] : []
  }))).flat()
}

function stringField(data: Record<string, unknown>, key: string, file: string) {
  const value = data[key]
  if (typeof value !== 'string' || !value.trim()) throw new Error(`${file}: front matter 缺少 ${key}`)
  return value.trim()
}

function splitSections(content: string, file: string) {
  const match = /^##\s+(答案|思路)$/m.exec(content)
  if (!match || match.index === undefined) throw new Error(`${file}: 必须包含“## 答案”或“## 思路”`)
  const question = content.slice(0, match.index).replace(/^##\s+问题\s*/m, '').trim()
  const answer = content.slice(match.index).trim()
  if (!question || !answer) throw new Error(`${file}: 问题和答案都不能为空`)
  return { question, answer }
}

async function build() {
  const files = (await walk(contentRoot)).sort()
  const ids = new Map<string, string>()
  const cards: KnowledgeCard[] = []

  for (const absolutePath of files) {
    const relativePath = path.relative(root, absolutePath)
    const parsed = matter(await readFile(absolutePath, 'utf8'))
    const data = parsed.data as Record<string, unknown>
    const id = stringField(data, 'id', relativePath)
    if (ids.has(id)) throw new Error(`重复 id “${id}”: ${ids.get(id)} 与 ${relativePath}`)
    ids.set(id, relativePath)
    const type = stringField(data, 'type', relativePath)
    if (type !== 'qa' && type !== 'algorithm') throw new Error(`${relativePath}: type 只能是 qa 或 algorithm`)
    if (!Array.isArray(data.tags) || data.tags.some((tag) => typeof tag !== 'string')) {
      throw new Error(`${relativePath}: tags 必须是字符串数组`)
    }
    const createdAt = stringField(data, 'createdAt', relativePath)
    if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(createdAt) ||
        Number.isNaN(Date.parse(createdAt))) {
      throw new Error(`${relativePath}: createdAt 必须是有效的 ISO 8601 时间`)
    }
    cards.push({
      id,
      title: stringField(data, 'title', relativePath),
      category: stringField(data, 'category', relativePath),
      tags: data.tags as string[],
      createdAt,
      type,
      difficulty: ['easy', 'medium', 'hard'].includes(String(data.difficulty))
        ? data.difficulty as KnowledgeCard['difficulty'] : undefined,
      ...splitSections(parsed.content, relativePath),
      sourcePath: relativePath,
    })
  }
  if (!checkOnly) {
    await mkdir(path.dirname(outputPath), { recursive: true })
    await writeFile(outputPath, `${JSON.stringify(cards, null, 2)}\n`)
  }
  console.log(`✓ ${cards.length} 道题目校验通过${checkOnly ? '' : '并生成索引'}`)
}

build().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})
