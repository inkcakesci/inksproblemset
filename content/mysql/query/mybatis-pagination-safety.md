---
id: mysql-mybatis-pagination-query-safety
title: MyBatis 分页与全量查询要注意什么？
category: MySQL / 查询
tags: [mybatis, pagination, index, memory]
createdAt: "2026-08-03T20:17:32+08:00"
type: qa
---

## 问题

MyBatis 或 MyBatis-Plus 做分页查询时需要注意什么？为什么不能轻易提供不分页全量查询？

## 答案

分页首先要校验 page、size 和最大页大小，并使用稳定且唯一的排序，例如 `create_time DESC, id DESC`，否则数据变化时可能重复或漏项。筛选和排序字段还要有合适索引，并关注 count SQL 在复杂 join 上的成本。

不分页接口最危险：它可能一次加载几十万行到 JVM，再序列化或生成 Excel，造成数据库慢查询和内存耗尽。项目中的资金流水与收入报表会用 `QUERY_ALL_LIMIT + 1` 做探测，超过限制就拒绝，而不是先把所有数据查出来再判断。

其他注意点包括：

- 深分页 `OFFSET` 扫描成本高，可改用基于唯一游标的 keyset pagination。
- 查询 DTO 只选择需要列，避免大字段和一对多 join 放大结果集。
- 租户、商户和权限条件必须进入 SQL，不能分页后再在内存过滤。
- 列表、总数和汇总条件保持一致，但可以按需求拆分或延迟昂贵的 count。
- 导出大数据应走异步流式任务，不把“不分页查询”当导出捷径。
