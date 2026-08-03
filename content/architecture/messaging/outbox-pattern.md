---
id: messaging-outbox-pattern
title: Outbox Pattern 与事务消息
category: 架构 / 消息
tags: [Outbox, Transaction, Event]
type: qa
---

## 问题

Outbox Pattern 解决了什么问题？为什么数据库事务和消息发送不能简单写在同一个业务方法里？

## 答案

普通数据库事务不能原子地覆盖外部消息队列。先提交数据库再发消息，进程崩溃会漏消息；先发消息再提交数据库，回滚后消费者又会看到不存在的业务结果，这就是双写一致性问题。

Outbox Pattern 在同一个本地数据库事务中写业务数据和 outbox 事件，再由独立 Relay 扫描或通过 CDC 发布消息。这样不会丢失“应该发布的事件”，但发布通常仍是至少一次，因此消费者必须幂等。

### 展开回答

- Outbox 记录应包含 eventId、聚合 ID、事件类型、payload、创建时间和发布状态。
- Relay 发布成功后标记完成；如果标记前崩溃，可能重复发布，不能假设 exactly-once。
- 需要顺序时按 Trade 或 PaymentOperation ID 分区，并在消费者校验版本。
- 对失败发布做退避重试、告警和人工修复，定期归档已完成记录。
- 不要在数据库事务中长时间等待消息代理响应，否则会扩大锁范围和故障耦合。

### 项目实践

例如 Trade 状态迁移到 `PAYMENT_PENDING` 时，同事务写入 `PaymentRequested` outbox；Worker 即使晚几秒收到，也能确定数据库中已经存在对应操作。事件 payload 应使用稳定版本，避免新消费者无法读取旧事件。
