---
id: frontend-react-query-server-state
title: React Query 的业务缓存与竞态处理
category: 前端 / React
tags: [React Query, Cache, Race Condition]
type: qa
---

## 问题

React Query 如何处理 profile、bank info 和 FX quote 的缓存、失效和竞态？

## 答案

Query Key 必须完整表达资源身份，例如包含当前 userId、bank account ID 或 quote 参数。Profile 和 bank info 修改成功后，可以用服务端返回值更新缓存，并使相关查询失效；FX Quote 则把服务端 `expiresAt` 当作有效期上限，过期后禁止提交并重新获取。

竞态处理要取消已过时请求或忽略旧响应，避免切换用户、币种或金额后，较慢的旧请求覆盖新结果。Mutation 还要绑定 operationId/quoteId，并防止重复提交。

### 展开回答

- Query Key 不能只写 `['profile']` 后在多用户场景复用，登出时应清除敏感缓存。
- 银行信息只缓存脱敏结果，不在浏览器长期保存完整账号等敏感数据。
- Mutation 成功后优先使用返回对象精确更新，再 invalidate 可能受影响的列表或汇总。
- FX Quote 的 `staleTime` 不能超过报价有效期；前端倒计时只是提示，服务端仍要再次校验。
- 使用 AbortSignal、请求序号或当前参数比对处理快速输入造成的乱序响应。

### 项目实践

把 query key 建成集中工厂，并为“保存 Profile 后刷新”“更改金额后旧报价失效”“登出后看不到上一用户银行信息”编写测试。不要用全局 `invalidateQueries()` 粗暴刷新所有数据。
