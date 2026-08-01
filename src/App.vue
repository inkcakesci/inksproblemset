<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import cardsJson from './generated/cards.json'
import { db, exportProgress, importProgress } from './db'
import { renderMarkdown } from './markdown'
import { nextReview, shuffleReviewQueue, type Rating } from './scheduler'
import type { KnowledgeCard, ReviewProgress } from './types'

type View = 'home' | 'browse' | 'review'
const cards = cardsJson as KnowledgeCard[]
const view = ref<View>('home')
const query = ref('')
const category = ref('全部')
const progress = ref<ReviewProgress[]>([])
const queue = ref<KnowledgeCard[]>([])
const index = ref(0)
const revealed = ref(false)
const fileInput = ref<HTMLInputElement>()

const categories = computed(() => ['全部', ...new Set(cards.map((card) => card.category))])
const dueCards = computed(() => {
  const state = new Map(progress.value.map((item) => [item.cardId, item]))
  return cards.filter((card) => !state.get(card.id) || new Date(state.get(card.id)!.due) <= new Date())
})
const filteredCards = computed(() => cards.filter((card) => {
  const text = [card.title, card.question, card.category, ...card.tags].join(' ').toLowerCase()
  return (category.value === '全部' || card.category === category.value) &&
    (!query.value.trim() || text.includes(query.value.trim().toLowerCase()))
}))
const currentCard = computed(() => queue.value[index.value])
const learned = computed(() => progress.value.filter((item) => item.repetitions > 0).length)

onMounted(refresh)
async function refresh() { progress.value = await db.progress.toArray() }
function startReview() {
  queue.value = shuffleReviewQueue(dueCards.value)
  index.value = 0
  revealed.value = false
  view.value = 'review'
}
async function rate(rating: Rating) {
  if (!currentCard.value) return
  const previous = progress.value.find((item) => item.cardId === currentCard.value.id)
  await db.progress.put(nextReview(currentCard.value.id, rating, previous))
  await refresh()
  index.value++
  revealed.value = false
}
async function download() {
  const blob = new Blob([JSON.stringify(await exportProgress(), null, 2)], { type: 'application/json' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `inks-progress-${new Date().toISOString().slice(0, 10)}.json`
  link.click()
  URL.revokeObjectURL(link.href)
}
async function upload(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  try {
    await importProgress(JSON.parse(await file.text()))
    await refresh()
    alert('学习进度已导入')
  } catch (error) {
    alert(error instanceof Error ? error.message : '导入失败')
  }
  input.value = ''
}
</script>

<template>
  <div class="shell">
    <header>
      <button class="brand" @click="view = 'home'"><b>墨</b><span>Inks Problem Set</span></button>
      <nav>
        <button :class="{ active: view === 'home' }" @click="view = 'home'">今天</button>
        <button :class="{ active: view === 'browse' }" @click="view = 'browse'">题库</button>
      </nav>
      <div class="data-actions">
        <button class="text-button" @click="download">导出</button>
        <button class="text-button" @click="fileInput?.click()">导入</button>
        <input ref="fileInput" hidden type="file" accept=".json" @change="upload" />
      </div>
    </header>

    <main v-if="view === 'home'" class="home">
      <section class="hero">
        <p class="eyebrow">PERSONAL KNOWLEDGE DECK</p>
        <h1>今天，记住一点。</h1>
        <p>把散落的面试知识，变成每天都能完成的短复习。</p>
        <button class="primary" :disabled="dueCards.length === 0" @click="startReview">
          {{ dueCards.length ? `随机复习 · ${dueCards.length} 题` : '今天已经复习完成' }}
        </button>
      </section>
      <section class="stats">
        <article><span>今日待复习</span><strong>{{ dueCards.length }}</strong></article>
        <article><span>题库总量</span><strong>{{ cards.length }}</strong></article>
        <article><span>已学习</span><strong>{{ learned }}</strong></article>
      </section>
      <section class="collections">
        <div class="section-title"><div><p class="eyebrow">COLLECTIONS</p><h2>知识分类</h2></div></div>
        <button v-for="item in categories.slice(1)" :key="item" class="collection"
          @click="category = item; view = 'browse'">
          <span>{{ item }}</span><small>{{ cards.filter((card) => card.category === item).length }} 题</small>
        </button>
      </section>
    </main>

    <main v-else-if="view === 'browse'" class="browse">
      <div class="page-title"><p class="eyebrow">LIBRARY</p><h1>题库</h1><p>所有内容都来自仓库中的 Markdown 文件。</p></div>
      <div class="toolbar">
        <input v-model="query" type="search" placeholder="搜索题目、标签或分类…" />
        <select v-model="category"><option v-for="item in categories" :key="item">{{ item }}</option></select>
      </div>
      <div class="cards">
        <details v-for="card in filteredCards" :key="card.id">
          <summary>
            <div><small class="category">{{ card.category }}</small><h2>{{ card.title }}</h2>
              <div class="tags"><span v-for="tag in card.tags" :key="tag">#{{ tag }}</span></div>
            </div>
            <span class="open">查看答案</span>
          </summary>
          <div class="card-body">
            <div class="markdown" v-html="renderMarkdown(card.question)" />
            <div class="divider"><span>答案</span></div>
            <div class="markdown" v-html="renderMarkdown(card.answer)" />
          </div>
        </details>
        <p v-if="!filteredCards.length" class="empty">没有找到匹配的题目。</p>
      </div>
    </main>

    <main v-else class="review">
      <template v-if="currentCard">
        <div class="review-top"><button class="text-button" @click="view = 'home'">← 退出</button><span>{{ index + 1 }} / {{ queue.length }}</span></div>
        <article class="review-card">
          <small class="category">{{ currentCard.category }}</small>
          <h1>{{ currentCard.title }}</h1>
          <div class="markdown question" v-html="renderMarkdown(currentCard.question)" />
          <template v-if="revealed">
            <div class="divider"><span>参考答案</span></div>
            <div class="markdown" v-html="renderMarkdown(currentCard.answer)" />
          </template>
        </article>
        <button v-if="!revealed" class="primary reveal" @click="revealed = true">显示答案</button>
        <div v-else class="ratings">
          <button @click="rate('again')">忘记<small>10 分钟</small></button>
          <button @click="rate('hard')">困难<small>较短间隔</small></button>
          <button @click="rate('good')">记得<small>正常间隔</small></button>
          <button @click="rate('easy')">简单<small>较长间隔</small></button>
        </div>
      </template>
      <section v-else class="complete"><i>✓</i><h1>今天完成了。</h1><p>复习进度已经保存在这台设备上。</p><button class="primary" @click="view = 'home'">返回首页</button></section>
    </main>
  </div>
</template>
