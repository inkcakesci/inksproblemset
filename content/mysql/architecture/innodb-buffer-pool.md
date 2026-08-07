---
id: mysql-innodb-buffer-pool-read-path
title: MySQL 查询一定会从磁盘读取吗？
category: MySQL / 架构
tags: [mysql, innodb, buffer-pool, io]
type: qa
---

## 问题

InnoDB 查询数据一定会读取磁盘吗？Buffer Pool 起什么作用？

## 答案

不一定。InnoDB 以页为单位访问数据和索引，并优先从 Buffer Pool 查找：命中时主要在内存中完成；未命中时才把所需磁盘页读入 Buffer Pool，再返回记录。

Buffer Pool 不只是“查询结果缓存”，它缓存的是表页和索引页。更新通常先修改内存页并将其标记为 dirty page，之后由后台线程按策略刷盘；Redo Log 负责在数据页尚未落盘时提供崩溃恢复能力。

需要注意：

- 一次查询可能部分页命中、部分页读盘，不是非黑即白。
- 热数据是否命中取决于容量、访问模式和 LRU 等淘汰策略。
- 大范围扫描可能挤出热点页，因此报表查询也会影响交易负载。
- MySQL 8.0 已移除旧的 Server Query Cache，不要把 Buffer Pool 说成 SQL 结果缓存。

判断是否受 I/O 限制，应观察 Buffer Pool 命中、物理读、执行计划和实际扫描页，而不是仅凭查询耗时猜测。
