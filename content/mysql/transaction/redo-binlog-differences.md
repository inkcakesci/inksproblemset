---
id: mysql-redo-log-vs-binlog
title: Redo Log 和 Binlog 有什么区别？
category: MySQL / 事务
tags: [mysql, redo-log, binlog, replication]
createdAt: "2026-08-07T22:12:09+08:00"
type: qa
---

## 问题

MySQL 的 Redo Log 和 Binary Log 分别负责什么？它们为什么都需要？

## 答案

Redo Log 属于 InnoDB，服务于存储引擎的数据页崩溃恢复；Binlog 属于 MySQL Server 层，记录数据库变更事件，主要用于复制、时间点恢复和 CDC。

- Redo 更接近物理页变化，只关注 InnoDB 如何恢复本实例。
- Binlog 可按 statement、row 或 mixed 格式记录；现代 MySQL 通常使用 row-based，更适合复制变更结果。
- Redo 不能替代跨实例复制，Binlog 也不能替代 InnoDB 对未刷盘数据页的本地恢复。

一次事务提交时，MySQL 需要协调 Redo 和 Binlog，避免“引擎认为已提交，但 Binlog 没有该事务”或相反。面试可提到内部两阶段提交，但不要把它与业务微服务的 2PC 混为一谈。
