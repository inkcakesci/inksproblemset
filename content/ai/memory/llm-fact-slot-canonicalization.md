---
id: llm-fact-slot-canonicalization
title: LLM 事实记忆为什么需要稳定 Slot
category: AI / 长期记忆
tags: [LLM, Memory, Canonicalization, CAS]
createdAt: "2026-09-10T18:42:30+08:00"
type: qa
---

## 问题

为什么结构化事实记忆需要稳定的 slot key，而不能直接用模型生成的自然语言作为唯一键？

## 答案

自然语言会产生同义改写，无法稳定判断“这是新事实”还是“同一事实的新值”。Slot 应由作用域、事实类型、主体和谓词等受控字段规范化后生成，使一个逻辑属性只有一个当前投影。

例如 `character:42 + preference + user + favorite_food` 表示一个稳定槽位，值可以从“披萨”更新为“寿司”。写入时：

- slot 不存在则插入；
- slot 相同且 value hash 相同则 NOOP；
- slot 相同但值不同则按 `current_version` 做 CAS 更新；
- 非法标识、未知类型或证据不足直接拒绝，不能猜测性归一。

跨语言实现还必须固定 Unicode 规范化、空白折叠、字段顺序、分隔符和哈希版本，并用相同 fixture 验证。
