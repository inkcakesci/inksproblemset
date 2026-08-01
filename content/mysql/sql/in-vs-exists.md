---
id: mysql-in-vs-exists
title: SQL 中 IN 和 EXISTS 有什么区别？
category: MySQL / SQL
tags: [mysql, sql, in, exists, subquery]
type: qa
---

## 问题

SQL 子查询中 `IN` 和 `EXISTS` 有什么语义和性能区别？

## 答案

`IN` 判断某个值是否属于结果集合；`EXISTS` 判断相关子查询是否至少返回一行，通常写成与外层行关联的存在性测试。

```sql
WHERE user_id IN (SELECT id FROM user WHERE active = 1)
```

```sql
WHERE EXISTS (
  SELECT 1 FROM user
  WHERE user.id = orders.user_id AND user.active = 1
)
```

“小表用 IN、大表用 EXISTS”不是可靠定律。MySQL 优化器可能把两种写法改写成半连接等相似执行计划，实际性能应结合索引、数据分布和 `EXPLAIN ANALYZE` 判断。

还要注意 `NOT IN` 遇到子查询中的 `NULL` 时可能产生 UNKNOWN，导致结果与预期不同；表达不存在关系时，`NOT EXISTS` 通常更不容易踩这个语义陷阱。
