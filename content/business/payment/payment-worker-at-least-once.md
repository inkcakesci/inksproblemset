---
id: payment-worker-at-least-once-delivery
title: Payment Worker 的重复消费与失败处理
category: 业务 / 支付
tags: [SQS, Worker, Retry, DLQ]
createdAt: "2026-08-03T20:06:03+08:00"
type: qa
---

## 问题

SQS 等队列通常是 at-least-once delivery，Payment Worker 如何处理重复消费、失败重试和死信？

## 答案

At-least-once 意味着同一消息可能被投递多次，因此 Worker 必须以 eventId 或 PaymentOperation ID 做幂等。可用 inbox/消费记录唯一约束配合操作状态机，只有未完成的合法状态才能执行外部支付；业务结果持久化后才确认消息。

临时故障采用指数退避和抖动重试，永久参数错误直接终止；超过次数进入 DLQ 并报警。对于调用 Stripe 超时这类“结果未知”，必须先查询 provider 状态，不能直接再次扣款。

### 展开回答

- Visibility Timeout 应覆盖正常处理时间，长任务要续租，避免尚未完成就被并发消费。
- 使用数据库唯一约束或条件更新，而不是只靠 Redis 锁防重复。
- 区分网络错误、限流、业务拒绝和代码缺陷，制定不同重试策略。
- DLQ 要配置监控、保留期、诊断字段和受控 redrive 流程，不能成为消息墓地。
- Worker 崩溃后应能从数据库状态恢复，日志带上 eventId、tradeId 和 provider request ID。

### 项目实践

处理流程可概括为：读取消息、抢占 PaymentOperation、检查当前状态、调用 Stripe、事务保存结果与 outbox、再 ACK。重复消息看到成功终态时直接返回成功，看到处理中且租约有效时不重复调用。
