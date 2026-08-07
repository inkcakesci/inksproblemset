---
id: mysql-view-basics-and-tradeoffs
title: MySQL View 是什么？
category: MySQL / 数据库对象
tags: [mysql, view, query, security]
type: qa
---

## 问题

MySQL 视图是什么？它能解决哪些问题，又有哪些限制？

## 答案

View 是保存了查询定义的虚拟表。普通 MySQL View 通常不单独保存结果数据，查询视图时优化器会按其定义访问底层表；它不同于需要刷新结果的物化视图。

用途包括复用复杂查询、为调用方提供稳定字段、隐藏部分底层结构，以及配合权限只暴露允许的数据。限制是嵌套复杂 View 容易掩盖真实执行计划，部分 View 不可更新，性能也不会因为“建了视图”自动提升。

安全上不能只靠隐藏列：要正确配置 `SQL SECURITY DEFINER/INVOKER`、定义者账号权限和行级租户条件。报表 View 上线前仍需用 `EXPLAIN ANALYZE` 检查索引、连接和过滤是否被有效下推。
