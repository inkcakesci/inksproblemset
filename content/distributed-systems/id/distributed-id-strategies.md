---
id: distributed-id-uuid-redis-snowflake
title: 分库分表为什么需要分布式 ID，常见方案如何选择？
category: 分布式系统 / ID
tags: [distributed-system, id, uuid, redis, snowflake]
type: qa
---

## 问题

数据库分库分表后为什么通常需要分布式 ID？UUID、Redis INCR 和 Snowflake 各有什么特点？

## 答案

各数据库分片独立生成自增值时可能产生重复 ID，也难以只凭 ID 定位数据或按全局时间排序，因此通常需要跨节点唯一的 ID 方案。

- **UUID**：本地生成、无中心依赖、唯一性强；传统随机 UUID 较长且写入聚簇索引时局部性差，可能增加页分裂和存储开销。UUIDv7 等时间有序方案能改善局部性。
- **Redis INCR**：利用原子递增生成有序数字，简单且吞吐较高；需要考虑 Redis 的高可用、持久化、容量分段和跨地域延迟。
- **Snowflake 类算法**：节点本地生成 64 位趋势递增 ID，吞吐高、无需每次访问中心服务；需要分配机器标识并处理时钟回拨。

选择时应综合唯一性、趋势有序、可用性、生成吞吐、跨地域、存储长度和是否允许暴露业务规模，而不是只比较生成速度。
