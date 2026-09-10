---
id: llm-memory-type-boundaries
title: LLM 系统中的上下文、事实与经历记忆如何划分
category: AI / 长期记忆
tags: [LLM, Memory, Context, Architecture]
type: qa
---

## 问题

LLM 应用中的 Working Context、Compaction Checkpoint、Explicit Memory、Fact 和 Episode 有什么区别？

## 答案

它们解决的问题和生命周期不同，不能统一塞进一张“memory”表：

- Working Context：本次请求实际发送给模型的最近内容，每轮按 Token 预算装配。
- Compaction Checkpoint：长会话的可重建压缩状态，记录覆盖范围和 generation，属于会话上下文。
- Explicit Memory：用户明确要求保存的信息，用户拥有最高控制权。
- Fact：可覆盖的当前事实，如稳定偏好或资料，适合按 slot 保存当前值。
- Episode：发生过的事件、关系变化、线索或承诺，通常追加、合并并随时间降权。

检索索引也不是第六种权威记忆，它只是从上述数据生成的可重建投影。分清这些对象后，系统才能分别定义写入、冲突、撤回、召回和隐私删除规则。
