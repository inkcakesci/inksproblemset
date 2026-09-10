---
id: context-compaction-vs-sliding-window
title: Context Compaction 与滑动窗口有什么区别
category: AI / 上下文工程
tags: [LLM, Compaction, Context-Window, Prompt-Cache]
createdAt: "2026-09-10T18:42:30+08:00"
type: qa
---

## 问题

长对话中，Context Compaction 为什么比每轮滑动删除最旧消息更稳定？

## 答案

滑动窗口在达到上限后每轮都会改变 Prompt 前缀，既持续丢失早期信息，也会破坏 Provider Prompt Cache 的稳定前缀。Compaction 则在软阈值触发一次压缩，把较老内容替换为带覆盖范围和版本的 checkpoint，之后继续追加新轮次，直到下一个阈值。

Checkpoint 应记录 conversation、generation、covered-through message/revision、摘要版本和保留尾部。编辑、删除、重新生成或切换候选分支时，错误 checkpoint 必须失效并从 canonical messages 重建。

Compaction 是会话上下文管理，不是永久记忆抽取。生成失败时应退回安全的最近完整轮次，让聊天继续运行；不能把未经来源约束的摘要永久写入用户画像。
