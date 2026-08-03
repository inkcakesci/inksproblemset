---
id: database-acid-with-adjustment-example
title: 事务 ACID 如何在资金调账中体现？
category: 架构 / 数据库
tags: [transaction, acid, adjustment, consistency]
type: qa
---

## 问题

事务的 ACID 分别是什么？在异常调账场景中如何体现？

## 答案

ACID 是原子性、一致性、隔离性和持久性。面试时不要只背定义，要说明数据库机制与业务不变量之间的关系。

- **原子性 Atomicity**：审核状态更新和 `TradeFlow` 创建要么都成功，要么都回滚，不能只完成一半。
- **一致性 Consistency**：事务前后都满足借贷账户合法、币种一致、单据状态合法、流水唯一等业务约束；数据库不会自动替你定义这些规则。
- **隔离性 Isolation**：并发审核通过行锁或条件更新串行化关键状态，避免两次审批都认为自己成功。
- **持久性 Durability**：事务提交后，即使服务重启，审批结果和流水仍由数据库日志与持久化机制保证可恢复。

ACID 只覆盖同一个数据库事务。Kafka、邮件或外部支付不自动加入本地事务，需要 Outbox、幂等消费和对账等机制处理跨系统最终一致性。
