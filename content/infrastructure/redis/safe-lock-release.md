---
id: redis-lock-owner-token-safe-release
title: Redis 锁释放为什么必须校验 lockValue？
category: 基础设施 / Redis
tags: [redis, distributed-lock, lua, ttl]
createdAt: "2026-08-03T20:17:32+08:00"
type: qa
---

## 问题

Redis 分布式锁为什么需要唯一 `lockValue`，释放时为什么必须比较它？

## 答案

锁的 Key 只代表资源，唯一 `lockValue` 才代表本次持有者。若请求 A 的锁已经过期、请求 B 又获得同一 Key，A 在 `finally` 中直接 `DEL` 就会误删 B 的锁，因此释放前必须确认 value 仍属于 A。

加锁通常使用一条原子命令 `SET key uniqueValue NX PX ttl`。释放也必须原子地“比较并删除”，生产上应使用 Lua 脚本：value 相等才 `DEL`。单独执行 `GET` 再 `DEL` 仍存在两条命令之间锁过期并被别人获取的竞态。

项目的 `ExcelExportRedisGuard` 已为每次锁生成 UUID 并在释放前比较当前值，避免了直接删锁；更严格的改进是把 compare-and-delete 改成 Lua 原子操作。

此外还要考虑 TTL 过短、任务超时续租、Redis 主从切换以及客户端暂停。分布式锁适合减少重复工作，资金唯一性仍需数据库唯一约束、状态机和幂等兜底。
