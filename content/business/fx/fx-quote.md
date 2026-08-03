---
id: business-fx-quote-security
title: FX Quote 快照与安全校验
category: 业务 / 外汇
tags: [FX, Quote, Pricing]
type: qa
---

## 问题

FX Quote 为什么需要保存快照、过期时间、状态和 owner？如何防止客户端篡改汇率、金额或重复使用报价？

## 答案

汇率会变化，FX Quote 必须保存生成时的汇率来源、货币对、买卖方向、输入输出金额、费用和舍入结果，形成可审计快照。它还要有 owner、过期时间和 `ACTIVE/CONSUMED/EXPIRED/CANCELLED` 等状态，确保报价只能被正确用户在有效期内按约定条件使用。

客户端只提交 quoteId 和交易意图，服务端重新读取快照并校验 owner、状态、期限、币种和金额，绝不能信任客户端回传的汇率或换算结果。消费报价应使用条件更新在事务中原子完成，防止并发重复使用。

### 展开回答

- 快照记录 rate、spread、fee、rate source、rounding mode 和生成时间。
- quoteId 应不可猜测，但不可猜测不能替代 owner 权限校验。
- 单次报价用 `WHERE status = ACTIVE AND expires_at > now()` 原子改为已消费。
- 如果业务允许多次使用，需明确次数和累计额度，而不是默认无限复用。
- 过期后必须重新报价；不要让客户端通过修改本地时间绕过。

### 项目实践

Trade 保存实际采用的 quoteId 和最终金额。报价与成交的金额精度、币种小数位和舍入规则保持一致，运营后台能追溯“客户看到的价格”和最终 Ledger 分录为何一致。
