---
id: provider-prompt-cache-vs-application-cache
title: Provider Prompt Cache 与应用缓存有什么区别
category: AI / 上下文工程
tags: [LLM, Prompt-Cache, Redis, Observability]
type: qa
---

## 问题

模型供应商的 Prompt Cache 与 Redis 中的会话缓存有什么区别？为什么必须分别观测？

## 答案

Redis 会话缓存减少应用从数据库重建上下文的开销；Provider Prompt Cache 则复用模型侧已经处理过的稳定输入前缀，影响推理延迟和 Token 成本。Redis 命中并不意味着 Provider 缓存命中，反之亦然。

Provider 缓存依赖前缀内容、顺序、序列化和供应商协议。每轮滑动历史、改变 system message 中的动态区块，或在不稳定位置插入记忆，都可能降低命中率。

观测时应分别记录应用缓存 hit/miss，以及供应商实际返回的 cached/read/creation token 字段。供应商没有提供可靠证据时不能推测命中，更不能自动按假定折扣计费；指标和日志也不得包含完整 Prompt 或用户正文。
