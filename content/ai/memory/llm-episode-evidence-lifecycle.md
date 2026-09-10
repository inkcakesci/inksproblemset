---
id: llm-episode-evidence-lifecycle
title: Episode Memory 如何管理证据和生命周期
category: AI / 长期记忆
tags: [LLM, Episodic-Memory, Provenance, Lifecycle]
type: qa
---

## 问题

剧情事件、关系变化和未完成线索等 Episode Memory 应如何保存证据并管理生命周期？

## 答案

Episode 应是有来源、可失效的派生经历，而不是脱离对话证据的永久摘要。记录至少包含作用域、类型、状态、发生时间、来源消息 ID/revision 和稳定 fingerprint；通常只适用于角色或会话范围，不应无条件扩散为全局用户事实。

读取时先验证全部必要证据仍属于当前用户、角色、会话 generation 和可见分支，再参与相关性排序。来源被编辑、删除或替换后，应立即停止注入，并异步完成撤回或重算。

Episode 可以按 thread、当前 snapshot 和历史事件分类，以有界配额避免近期闲聊挤掉长期线索。自动把 ongoing 变成 resolved、合并事件或时间衰减都需要评测支持，不能仅凭模型一次输出直接修改生命周期。
