---
id: mysql-trigger-design-and-risks
title: 什么是 Trigger，为什么不要滥用？
category: MySQL / 数据库对象
tags: [mysql, trigger, maintainability]
createdAt: "2026-08-07T22:12:09+08:00"
type: qa
---

## 问题

MySQL Trigger 是什么？为什么核心业务通常不应依赖复杂触发器？

## 答案

Trigger 是在表发生 `INSERT`、`UPDATE` 或 `DELETE` 时由数据库自动执行的逻辑，可在 BEFORE 或 AFTER 时机运行。它适合非常局部、稳定并且必须贴近数据库的数据约束或派生维护。

不要滥用的原因是它属于隐式副作用：代码只看到一条 DML，背后可能又修改多张表，导致调用链难发现、调试与压测困难、执行顺序和失败影响不直观，也容易与应用重试、ORM 和数据迁移冲突。

支付记账、通知和状态推进更适合显式 Service、Outbox 与审计链路。若必须使用 Trigger，应保持短小、无远程调用、可幂等，写入迁移脚本并测试批量 DML、级联操作和异常回滚；能用唯一约束、外键或 CHECK 表达的规则优先使用声明式约束。
