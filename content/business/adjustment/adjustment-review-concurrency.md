---
id: business-adjustment-review-concurrency-locking
title: 调账审核如何处理并发？
category: 业务实践 / 异常调账
tags: [adjustment, synchronized, row-lock, concurrency]
createdAt: "2026-08-03T20:17:32+08:00"
type: qa
---

## 问题

调账审核如何处理并发？数据库行锁和 Java `synchronized` 有什么区别？

## 答案

`synchronized` 只能保护当前 JVM，数据库行锁可以覆盖多个服务实例。资金审核的最终并发保证应落在数据库事务、行锁或条件更新上，不能只依赖本地锁。

`baijin_server` 的审核流程按 `adjustNo` 做本机同步，然后在事务内通过 `selectByAdjustNoForUpdate` 锁住调账单，再确认状态仍为 `PENDING + UNPOSTED`，之后更新审批结果并创建 `TradeFlow`。这样第二个并发请求拿到锁后会看到状态已经变化，不能重复审核。

需要注意：

- `adjustNo.intern()` 只是一层单实例优化，多实例正确性仍来自数据库锁。
- 大量动态字符串长期 intern 还可能增加内存压力，更稳妥的是有界 keyed lock。
- 行锁必须在事务中持有，查询条件应命中索引，并保持事务短小，避免扩大锁等待。
- `先查后改` 若不加锁或版本条件仍会竞态；也可以使用 `UPDATE ... WHERE status = PENDING` 并检查影响行数。
- `TradeFlow` 仍应有业务唯一约束，作为重复执行的最终兜底。
