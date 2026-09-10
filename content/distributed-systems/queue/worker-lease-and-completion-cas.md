---
id: worker-lease-and-completion-cas
title: Worker 为什么同时需要 Lease 和完成 CAS
category: 分布式系统 / 任务队列
tags: [Worker, Lease, CAS, Concurrency]
createdAt: "2026-09-10T18:42:30+08:00"
type: qa
---

## 问题

多实例 Worker 处理任务时，Lease、Lease Token 和完成 CAS 分别解决什么问题？

## 答案

Lease 只授予一段有期限的处理权；Lease Token 标识这一次具体的领取；完成 CAS 则保证只有仍持有当前处理权的实例才能提交终态。三者组合用于处理进程崩溃、暂停、超时接管和旧 Worker 迟到提交。

典型流程是：

1. 用条件更新把可领取任务改成 `processing`，写入随机 token 和过期时间。
2. 长任务在需要时续租，但续租必须校验同一个 token。
3. 完成时使用 `WHERE status='processing' AND lease_token=?` 条件更新。
4. CAS 影响行数为零，说明任务已被接管、取消或终结，当前结果不得覆盖新状态。

只有过期时间而没有 token，会让旧实例在任务被重新领取后仍可能续租或提交；只有分布式锁而没有持久任务状态，则难以恢复、审计和隔离失败。
