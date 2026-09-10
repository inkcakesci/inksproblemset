---
id: token-budget-complete-turn-selection
title: LLM 上下文为什么要按完整轮次和 Token 选窗
category: AI / 上下文工程
tags: [LLM, Context-Window, Token, Prompt]
createdAt: "2026-09-10T18:42:30+08:00"
type: qa
---

## 问题

为什么不能只按固定消息条数截取 LLM 上下文？怎样选择连续完整的对话轮次？

## 答案

消息条数与 Token 数没有稳定比例，同一个配置还可能被不同客户端解释成消息数或回复轮数。可靠做法是先读取有界的宽候选，再根据具体模型窗口、输出预留、固定 Prompt 和安全余量计算输入预算。

选择时保留 system 内容和当前 user turn，然后从新到旧加入完整的 user-led turn；某一整轮无法容纳时停止，不留下孤立 assistant 或中间叙事缺口。当前用户输入不能被静默删除，若它本身过大，应返回明确错误或仅压缩发送给 Provider 的副本，数据库原文保持不变。

候选读取硬上限仍然必要，但它只是数据库保护边界，不能替代最终 Token 预算。
