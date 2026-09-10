---
id: payment-money-precision-and-currency
title: 支付系统如何正确存储和计算金额？
category: 业务实践 / 支付
tags: [payment, money, bigdecimal, currency]
createdAt: "2026-08-03T20:06:03+08:00"
type: qa
---

## 问题

支付系统为什么不能用 `double` 表示金额？金额字段应该如何设计？

## 答案

`double` 是二进制浮点数，很多十进制金额无法精确表示，连续计算可能出现舍入误差。支付金额应使用整数最小货币单位，或使用明确精度和舍入规则的 `BigDecimal`。

常见方案：

- 数据库使用整数最小单位，例如人民币分，并同时保存币种。
- 或使用 `DECIMAL`，Java 使用 `BigDecimal`，创建时优先使用字符串或 `valueOf()`。
- 每种币种的有效小数位不同，不能全系统假定都是两位。
- 比较金额时使用 `compareTo()`，不要依赖 `BigDecimal.equals()` 忽略 scale 差异。

订单原金额、优惠、手续费、实付、退款和结算金额应有明确口径，并在边界处统一校验精度、币种与舍入模式。财务核心金额不应从展示字符串反向推导。
