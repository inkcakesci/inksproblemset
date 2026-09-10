---
id: mysql-sql-execution-flow
title: 一条 SQL 在 MySQL 中如何执行？
category: MySQL / 架构
tags: [mysql, sql, optimizer, executor]
createdAt: "2026-08-07T22:12:09+08:00"
type: qa
---

## 问题

一条 SQL 从客户端发送到 MySQL 后，会经过哪些主要阶段？

## 答案

可以概括为：**连接与认证 → 解析 → 预处理与权限检查 → 优化 → 执行 → 存储引擎 → 返回结果**。

1. 连接层建立会话、认证用户，并维护连接上下文。
2. Parser 做词法和语法分析，形成内部语法结构；语句不合法会在这里失败。
3. 预处理阶段解析表和列、检查语义与相应权限。
4. Optimizer 根据统计信息、索引和成本估算选择访问路径、连接顺序与执行计划。
5. Executor 按计划调用存储引擎接口读取或修改记录，并完成表达式、排序、聚合等操作。
6. InnoDB 等存储引擎访问 Buffer Pool、索引和数据页，必要时产生锁与事务日志。

这只是逻辑模型，不代表每条 SQL 都严格按一条直线执行；优化器可能改写子查询或连接。排查性能应结合 `EXPLAIN`、`EXPLAIN ANALYZE`、实际扫描行数和等待事件，而不是只背流程图。
