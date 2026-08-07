---
id: mysql-sql-command-categories
title: DDL、DML、DQL、DCL 和 TCL 分别是什么？
category: MySQL / SQL
tags: [mysql, sql, ddl, dml]
type: qa
---

## 问题

SQL 中的 DDL、DML、DQL、DCL 和 TCL 分别表示什么？

## 答案

- **DDL**（Data Definition Language）：定义数据库对象，例如 `CREATE`、`ALTER`、`DROP`、`TRUNCATE`。
- **DML**（Data Manipulation Language）：修改数据，例如 `INSERT`、`UPDATE`、`DELETE`。
- **DQL**（Data Query Language）：查询数据，主要是 `SELECT`；有些分类也把它归入广义 DML。
- **DCL**（Data Control Language）：管理权限，例如 `GRANT`、`REVOKE`。
- **TCL**（Transaction Control Language）：控制事务，例如 `COMMIT`、`ROLLBACK`、`SAVEPOINT`。

这些是便于理解的分类，不同教材对 DQL/TCL 是否独立可能略有差异。工程上更重要的是语句的真实事务行为：MySQL 的许多 DDL 会触发隐式提交；“原子 DDL”表示单条 DDL 在崩溃时整体成功或失败，不代表它能与其他 DML 放在同一个用户事务中回滚。
