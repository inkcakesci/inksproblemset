---
id: messaging-reliability-by-business-criticality
title: 消息队列如何按业务重要性设计可靠性？
category: 架构 / 消息
tags: [kafka, reliability, retry, idempotency]
type: qa
---

## 问题

消息队列如何保证可靠性？订单追踪日志和资金事件应该采用相同策略吗？

## 答案

消息可靠性不是只打开 producer ack。完整链路包括生产确认与重试、持久化副本、消费 offset、幂等处理、失败重试、死信、积压监控和恢复演练，但具体强度应由数据丢失的业务后果决定。

订单追踪日志是辅助排障数据。项目的 Appender 发送失败会限频记录错误并继续主业务，目标是“可观测性降级不能拖垮支付”。这接受少量日志丢失来换取交易可用性。

资金状态或账务事件则不同：丢失会造成资金不一致，应先在业务数据库事务中写 Outbox，再投递 Kafka；消费者以 eventId 幂等，处理成功后提交 offset，失败进入重试和 DLQ，并通过对账发现漏单。

面试时应先说清楚语义：Kafka 常提供 at-least-once 处理基础，exactly-once 配置也不能自动保证外部数据库和支付渠道的端到端 exactly-once。业务最终仍需要幂等键、状态机和对账。
