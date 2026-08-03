---
id: payment-stripe-idempotency
title: Stripe 支付幂等设计
category: 业务 / 支付
tags: [Stripe, Idempotency, PaymentOperation]
type: qa
---

## 问题

Stripe 支付操作为什么需要幂等？如何设计 Idempotency Key、幂等表和重复请求处理？

## 答案

支付请求可能因用户连点、网络超时、网关重试而重复到达。如果每次都创建扣款，就可能重复扣钱。服务端应为同一个业务操作使用稳定的 Idempotency Key，并用本地幂等表对“商户或用户 + 操作类型 + Key”建立唯一约束。

首次请求保存请求参数摘要、处理中状态和最终响应；重复请求参数一致时返回原结果，参数不一致时拒绝。调用 Stripe 时再传稳定的 provider idempotency key，超时重试继续使用同一个 Key，而新的业务意图必须生成新 Key。

### 展开回答

- 本地幂等负责长期业务语义，Stripe Key 负责一次外部 API 操作，两者不能互相替代。
- 表中可保存 `request_hash`、状态、PaymentOperation ID、Stripe 对象 ID、响应摘要和过期策略。
- 收到请求时先以唯一约束抢占；若仍在处理中，可返回处理中或短暂等待，不能再次扣款。
- Stripe 会保存某个 Key 首次执行的结果并校验后续参数，但本地系统仍需处理其保留期限和自身重试状态。
- 网络超时意味着结果未知，应先用保存的操作 ID 查询 Stripe，而不是换 Key 重新创建支付。

### 项目实践

Key 由客户端为一次用户意图生成，服务端把它绑定当前 owner、金额、币种和业务单号。成功响应、确定性失败和未知结果应分别建模，方便 Payment Worker 后续查询和修复。
