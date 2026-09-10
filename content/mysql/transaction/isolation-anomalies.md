---
id: mysql-transaction-isolation-anomalies
title: 脏读、不可重复读和幻读有什么区别？
category: MySQL / 事务
tags: [mysql, isolation, mvcc, phantom-read]
createdAt: "2026-08-07T22:12:09+08:00"
type: qa
---

## 问题

什么是脏读、不可重复读和幻读？InnoDB 的隔离级别如何影响它们？

## 答案

- **脏读**：读到另一个事务尚未提交、之后可能回滚的数据。
- **不可重复读**：同一事务两次读取同一行，因其他事务已提交更新或删除而得到不同值。
- **幻读**：同一事务按同一范围条件再次查询，因其他事务插入或删除而看到不同的行集合。

标准四级隔离从低到高是 `READ UNCOMMITTED`、`READ COMMITTED`、`REPEATABLE READ`、`SERIALIZABLE`。InnoDB 默认是 `REPEATABLE READ`：普通一致性读复用快照，通常避免脏读和不可重复读；对锁定读和范围写入，InnoDB 还会使用 record/gap/next-key lock 控制并发插入。

不要只背“RR 一定完全解决幻读”。普通快照读、当前读和锁定读看到的数据视图不同，索引条件也会影响锁范围。设计并发流程时应明确使用的是快照读还是 `FOR UPDATE/FOR SHARE`，并通过唯一约束和条件更新保护业务不变量。
