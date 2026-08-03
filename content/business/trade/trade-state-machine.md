---
id: trade-state-machine-design
title: 交易状态机设计
category: 业务 / 交易
tags: [Trade, State Machine, Concurrency]
type: qa
---

## 问题

交易状态机应该如何设计？为什么不能直接对 Trade 状态做任意字符串修改？

## 答案

交易状态应定义为有限枚举，并明确每个状态允许的命令和迁移，例如 `CREATED -> PAYMENT_PENDING -> PAID -> SETTLED`，失败、取消和退款走各自受控分支。修改状态必须经过状态机校验，同时执行权限、金额和前置条件检查。

任意字符串更新既无法保证合法迁移，也容易让并发回调把终态覆盖回中间态。正确做法是使用条件更新或乐观锁，只在“当前状态仍为预期值”时迁移，并记录不可篡改的状态变更日志。

### 展开回答

- 用业务命令如 `authorize`、`capture`、`cancel` 表达意图，而不是暴露 `setStatus`。
- 终态是否允许退款，应由新的退款流程表达，而不是把 `SETTLED` 改回 `PENDING`。
- 状态迁移产生的 Ledger、通知和 Outbox 事件应与核心数据库修改处于同一事务。
- 外部回调可能乱序或重复，处理器必须检查当前状态并保持幂等。
- 保存操作者、来源、旧状态、新状态、原因和时间，支持运营审计。

### 项目实践

Controller 只接收业务动作，Service/Domain 层执行状态机和权限校验，Repository 使用 `WHERE id = ? AND status = ? AND version = ?` 防止并发覆盖。未知状态应报警，而不是默认映射成成功或失败。
