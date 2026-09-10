---
id: llm-memory-bundle-budget-priority
title: 如何在 Token 预算内组装多类型长期记忆
category: AI / 长期记忆
tags: [LLM, Memory, Token-Budget, Retrieval]
type: qa
---

## 问题

当手工记忆、结构化事实和 Episode 同时存在时，如何在有限 Token 预算内组装 Memory Bundle？

## 答案

应先按正确性和用户控制权设定类型优先级，再在每种类型内部做作用域、来源有效性和相关性筛选，最后执行统一字符或 Token 硬预算。不能只按更新时间排序，也不能让大量自动记忆挤掉用户明确保存的信息。

一种常见顺序是：Explicit Memory → 安全边界 → 稳定 Fact → 相关 Episode。候选读取和最终注入要分别有上限：前者防止数据库或索引无界扫描，后者防止 Prompt 膨胀。分类配额可以弹性归还，某类候选不足时由其他有效候选补位。

Bundle 应同时输出脱敏诊断，如各类候选数、过滤数、注入数、字符预算和 ID 集合哈希，便于解释“为什么没有召回”，但不能记录记忆正文。
