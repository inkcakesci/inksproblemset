---
id: mysql-transaction-basics
title: 数据库事务是什么？
category: MySQL / 事务
tags: [mysql, transaction, commit, rollback]
createdAt: "2026-08-07T22:12:09+08:00"
type: qa
---

## 问题

数据库事务是什么？为什么转账等资金操作需要事务？

## 答案

事务把一组数据库操作定义为一个逻辑工作单元：要么提交后整体生效，要么失败时整体回滚。转账中的扣款、入账和业务状态更新如果属于同一数据库，就应在一个边界内完成，避免只成功一半。

MySQL 通常默认开启 autocommit，单条语句会作为一个事务自动提交；多语句场景使用 `START TRANSACTION`、`COMMIT` 和 `ROLLBACK` 明确边界。只有支持事务的存储引擎，例如 InnoDB，才能提供相应保证。

事务边界应围绕不可拆分的数据库不变量，而不是围绕整个 HTTP 请求。远程支付、Kafka、邮件等外部系统不会随本地 `ROLLBACK` 自动撤销，需要 Outbox、幂等、补偿和对账。
