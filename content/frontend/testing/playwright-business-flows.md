---
id: frontend-playwright-business-flow-testing
title: Playwright 验证真实业务流程
category: 前端 / 测试
tags: [Playwright, E2E, Payment]
type: qa
---

## 问题

如何用 Playwright 验证真实的登录、Profile 保存、银行账户和交易流程？

## 答案

在隔离的测试环境准备独立用户和可重复初始化的数据，让 Playwright 通过真实 UI 与后端 API 完成登录、保存 Profile、添加银行账户、获取 FX Quote 和创建 Trade。支付使用 Stripe Test Mode 或可控 provider sandbox，不连接生产资金系统。

断言不能只看提示框，还要刷新页面确认数据持久化、检查脱敏银行信息、等待异步 PaymentOperation 到达预期状态，并验证重复提交和越权请求不会产生第二笔交易。

### 展开回答

- 每个测试拥有独立 tenant/user，测试前建立、测试后清理，避免相互污染。
- 登录态可按 worker 安全复用 storageState，但不同角色和用户不能混用。
- 用 API 响应或可观测业务状态等待异步完成，避免固定 `sleep` 导致脆弱测试。
- Webhook 可通过测试夹具或 provider CLI 触发，覆盖成功、失败、乱序和重复事件。
- 失败时保留 trace、截图、video、网络日志和关联的 operationId。

### 项目实践

核心 happy path 之外，至少覆盖错误密码、Profile 校验、他人 bank account ID、过期 quote、重复 Idempotency Key、KYC 未通过和 Worker 暂时失败后的恢复。测试环境严禁使用生产密钥和真实银行卡。
