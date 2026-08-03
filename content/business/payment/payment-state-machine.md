---
id: payment-order-state-machine
title: 支付订单状态机如何设计？
category: 业务实践 / 支付
tags: [payment, state-machine, concurrency, callback]
type: qa
---

## 问题

支付订单为什么需要状态机？如何处理同步响应、异步回调和并发更新？

## 答案

支付结果可能由同步响应、主动查询和异步回调在不同时间到达，状态机用于限制合法迁移，避免成功订单被迟到的失败消息覆盖。

可以有 `CREATED → PROCESSING → SUCCESS/FAILED/CLOSED` 等状态，但具体状态要按业务定义。终态是否允许变化必须明确，例如支付成功通常不能直接回退为失败，退款应使用独立退款单表达。

更新时应采用带前置状态条件的 SQL、版本号 CAS 或锁：

```sql
UPDATE payment_order
SET status = 'SUCCESS'
WHERE id = ? AND status = 'PROCESSING';
```

同时记录状态变更事件、来源、渠道流水号和时间。重复回调应幂等；乱序消息应根据当前状态和事件语义忽略、补偿或进入人工处理，而不是最后写入者获胜。
