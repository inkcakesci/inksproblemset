---
id: mysql-innodb-undo-vs-redo-log
title: Undo Log 和 Redo Log 有什么区别？
category: MySQL / 事务
tags: [mysql, innodb, undo-log, redo-log]
type: qa
---

## 问题

InnoDB 的 Undo Log 和 Redo Log 分别解决什么问题？

## 答案

Undo 保存生成旧版本所需的信息，用于事务回滚和 MVCC 一致性读；Redo 记录数据页变更的重做信息，配合 WAL 用于服务器异常后的崩溃恢复。

- 更新一行时，Undo 让系统能够撤销本次修改，也让较早的 Read View 找到可见旧版本。
- 修改后的数据页可以暂时只在 Buffer Pool 中成为 dirty page；Redo 先按持久化策略落盘，崩溃后可重放尚未写入数据文件的变化。
- 长事务会让相关旧版本无法及时 purge，导致 Undo 积累和一致性读成本上升。

不能机械地说“Undo 只保证原子性、Redo 只保证持久性”。事务恢复还涉及提交状态、刷盘配置和日志恢复流程；Redo 也可能包含未提交事务的变化，恢复时需要结合 Undo 处理未完成事务。
