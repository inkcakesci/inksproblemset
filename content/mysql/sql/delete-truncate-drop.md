---
id: mysql-delete-truncate-drop-differences
title: DELETE、TRUNCATE 和 DROP 有什么区别？
category: MySQL / SQL
tags: [mysql, delete, truncate, drop]
createdAt: "2026-08-07T22:12:09+08:00"
type: qa
---

## 问题

MySQL 中 `DELETE`、`TRUNCATE TABLE` 和 `DROP TABLE` 的语义与事务行为有什么区别？

## 答案

- `DELETE` 是 DML，删除满足条件的行，支持 `WHERE`；InnoDB 中可以在事务提交前回滚，并会执行相应的 DELETE Trigger。
- `TRUNCATE TABLE` 是 DDL，快速清空整表并保留表定义，不支持 `WHERE`，通常会重置 `AUTO_INCREMENT`，也不会逐行触发 DELETE Trigger。
- `DROP TABLE` 是 DDL，删除表定义及其数据，之后该表不再存在。

MySQL 8.x 的 InnoDB 支持许多 atomic DDL，意味着服务器崩溃后单条 DDL 不会留下半完成的字典和存储状态；但 DDL 仍通常隐式提交，不能把 `TRUNCATE` 或 `DROP` 当成普通 DML 放进事务后再 `ROLLBACK`。

生产环境执行后两者前应确认外键依赖、权限、备份和恢复方案。选择依据是业务语义与恢复要求，而不只是“哪个更快”。
