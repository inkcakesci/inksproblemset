---
id: mysql-server-vs-storage-engine
title: MySQL Server 层和存储引擎层有什么区别？
category: MySQL / 架构
tags: [mysql, server-layer, innodb, storage-engine]
createdAt: "2026-08-07T22:12:09+08:00"
type: qa
---

## 问题

MySQL Server 层和 Storage Engine 层分别负责什么？

## 答案

Server 层负责通用 SQL 能力，存储引擎负责数据如何组织、读取和持久化。二者通过存储引擎接口协作。

- **Server 层**：连接管理、SQL 解析、权限、优化器、执行器以及函数、排序、聚合等通用能力；Binary Log 也属于 Server 层。
- **存储引擎层**：表和索引的物理组织、数据页访问、缓存、事务、锁、MVCC 与崩溃恢复。InnoDB 是现代 MySQL 的默认引擎。

优化器决定“准备怎样查”，执行器通过 Handler 接口让 InnoDB “实际取哪些记录”。Server 层知道访问路径和表达式，但具体的 B+ 树、Buffer Pool、行锁与 Undo/Redo 属于 InnoDB。

因此不能笼统地说“MySQL 一定支持事务”：是否支持及具体语义与表所使用的存储引擎有关。线上定位问题也要区分是执行计划问题，还是 InnoDB 的 I/O、锁或日志问题。
