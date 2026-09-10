---
id: provider-terminal-state-normalization
title: 为什么要统一 LLM Provider 的终态
category: AI / 模型协议
tags: [LLM, Provider, State-Machine, Compatibility]
createdAt: "2026-09-10T18:42:30+08:00"
type: qa
---

## 问题

不同 LLM Provider 的 finish reason、拒绝和异常字段为什么需要归一成内部终态？

## 答案

Provider 协议不同，同一个 HTTP 200 也可能表示正常完成、输入被拒绝、输出被策略中止或协议异常。业务层若直接依赖原始字段或英文正文，会产生错误重试、误续写、重复计费和敏感文案泄露。

内部状态至少应区分：正常完成、达到输出上限、输入策略拒绝、输出内容过滤、协议异常、未知终态和传输中断，并为每种状态定义：是否重试、是否保留部分正文、是否允许续写、如何计费以及展示哪个稳定错误码。

分类顺序也很重要：先处理结构化终态，再判断普通空正文；不能把明确拒绝降级成 `empty response`。客户端只消费稳定内部状态，未知新增字段应安全忽略，从而支持后端和客户端独立滚动发布。
