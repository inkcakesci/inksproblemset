---
id: mysql-composite-index-leftmost-prefix
title: 联合索引为什么遵循最左前缀原则？
category: MySQL / 索引
tags: [mysql, composite-index, leftmost-prefix, range]
type: qa
---

## 问题

联合索引的最左前缀原则是什么？遇到范围查询后，后续列还能使用吗？

## 答案

对于联合索引 `(a, b, c)`，索引项先按 `a` 排序，`a` 相同时再按 `b`，最后按 `c`。因此 `(a)`、`(a,b)`、`(a,b,c)` 能形成连续可定位区间；只给 `(b)` 或 `(b,c)` 时，通常无法依靠这棵索引做高效起点查找。

SQL 条件在 `WHERE` 中的书写顺序不重要，关键是索引列顺序、条件类型和优化器计划。例如 `a=1 AND b>10 AND c=5` 中，`a,b` 可确定扫描区间；`c` 通常不能继续缩小同一个连续区间，但仍可能通过 Index Condition Pushdown 在索引层过滤，不能简单说“c 完全不使用”。

联合索引列顺序应结合等值条件、范围条件、排序、选择性和查询组合设计。最终用 `EXPLAIN ANALYZE` 确认访问类型、key parts、扫描行数和实际过滤效果，不靠口诀判断。
