---
id: java-database-vs-stream-processing
title: 数据统计应该用数据库还是 Java Stream？
category: Java / Stream
tags: [java, stream, sql, database, aggregation]
createdAt: "2026-08-03T20:06:03+08:00"
type: qa
---

## 问题

订单筛选和统计应该交给数据库还是加载后用 Java Stream 处理？

## 答案

能够通过 SQL 完成的大规模过滤、连接、分组和聚合，通常应尽量下推到数据库；数据库可以利用索引、执行计划、列裁剪和聚合算法，避免把大量无用行传输到应用内存。

例如统计某商户某日成功交易额，应优先使用带商户、时间、状态条件的 SQL 聚合，而不是查询全部订单后再 Stream 求和。

Stream 更适合：

- 数据已经因业务流程加载到内存。
- 结果规模较小、规则难以用 SQL 清晰表达。
- 做 DTO 转换或补充应用层规则。

支付统计还要区分实时展示和财务口径。运营看板可以查询聚合表或分析系统；清结算与对账不能仅依赖临时内存聚合，应保留可追溯的数据口径和批次。
