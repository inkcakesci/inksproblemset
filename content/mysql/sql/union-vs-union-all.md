---
id: mysql-union-vs-union-all
title: SQL 中 UNION 和 UNION ALL 有什么区别？
category: MySQL / SQL
tags: [mysql, sql, union, union-all]
createdAt: "2026-08-01T23:07:01+08:00"
type: qa
---

## 问题

SQL 中 `UNION` 和 `UNION ALL` 有什么区别？如何选择？

## 答案

二者都用于纵向合并多个查询结果，并要求对应列数量兼容、数据类型可转换。

- `UNION` 会对合并结果去重。
- `UNION ALL` 保留所有行，包括重复行。

去重通常需要额外的排序或哈希处理，因此在业务允许重复、各分支本来就互斥，或者后续另有聚合时，应优先使用 `UNION ALL`，避免无意义的去重成本。

结果集的最终顺序不能依赖各子查询自身顺序；需要稳定顺序时，应在整个 UNION 结果末尾使用 `ORDER BY`。
