---
id: mysql-where-vs-having
title: SQL 中 WHERE 和 HAVING 有什么区别？
category: MySQL / SQL
tags: [mysql, sql, where, having, group-by]
createdAt: "2026-08-01T23:07:01+08:00"
type: qa
---

## 问题

SQL 中 `WHERE` 和 `HAVING` 有什么区别？普通条件为什么应尽量放在 WHERE？

## 答案

`WHERE` 在分组和聚合前过滤输入行；`HAVING` 在 `GROUP BY` 和聚合后过滤分组结果，因此可以使用 `COUNT()`、`SUM()` 等聚合条件。

```sql
SELECT department_id, COUNT(*)
FROM employee
WHERE active = 1
GROUP BY department_id
HAVING COUNT(*) > 10;
```

这里 `WHERE` 先排除非活跃员工，`HAVING` 再筛选人数超过 10 的部门。

不依赖聚合结果的条件通常应放进 `WHERE`，以便尽早减少参与分组的数据量，并给优化器更多使用索引的机会。SQL 的逻辑处理顺序可以概括为 `FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY`，但物理执行计划可以由优化器调整。
