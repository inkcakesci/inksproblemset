---
id: payment-accounting-domain-models
title: Trade、PaymentOperation、Ledger 与对账记录
category: 业务 / 支付
tags: [Trade, Ledger, Reconciliation]
createdAt: "2026-08-03T20:06:03+08:00"
type: qa
---

## 问题

Trade、PaymentOperation、Ledger 和 ProviderReconciliationRecord 分别解决什么问题？如何保证内部账务与 Stripe 最终一致？

## 答案

Trade 表示用户的一次业务交易意图；PaymentOperation 表示针对它执行的具体支付动作或 provider 尝试；Ledger 是内部不可变的复式账本，记录资金在账户间的变化；ProviderReconciliationRecord 保存 Stripe 侧账单、余额交易与内部记录的匹配结果和差异。

四者分开后，业务状态、技术重试、会计事实和外部对账不会混在一张表里。通过稳定关联 ID、幂等 Webhook、事务化记账、定期拉取 provider 数据以及差异修复流程，实现最终一致。

### 展开回答

- 一笔 Trade 可能有多次 PaymentOperation，但同一业务动作只能有一个有效成功结果。
- Ledger 使用借贷平衡的不可变分录；纠错通过冲正或补偿分录，不能直接改历史金额。
- ProviderReconciliationRecord 记录 provider 对象、金额、币种、费用、结算时间和匹配状态。
- Webhook 推动实时状态，对账任务发现丢失、乱序回调和人工操作造成的差异。
- 差异应进入可审计的运营队列，不能自动把内部账改成 Stripe 返回值而不留原因。

### 项目实践

先定义“谁是业务状态真相、谁是资金事实真相”：Trade 负责流程，Ledger 负责内部余额，Stripe 负责外部资金事实。每次状态推进带上 Trade ID、PaymentOperation ID、provider ID 和 Ledger transaction ID，形成完整追踪链。
