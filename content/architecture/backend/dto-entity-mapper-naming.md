---
id: backend-dto-entity-mapper-naming
title: DTO、Entity、Mapper 与命名映射
category: 架构 / 后端分层
tags: [DTO, Entity, Mapper, Jackson]
type: qa
---

## 问题

DTO、Entity、Mapper 为什么要分开？`snake_case` 和 `camelCase` 不一致会导致什么问题？

## 答案

Entity 表示数据库持久化模型，DTO 表示 API 输入输出契约，Mapper 负责二者之间的显式转换。分开后，数据库字段变化不会直接污染接口，也能避免把密码、内部状态、懒加载关系等不该暴露的信息返回给前端。

数据库或 JSON 常用 `snake_case`，Java 和 TypeScript 常用 `camelCase`。如果 Jackson、ORM、SQL Mapper 或生成客户端没有统一配置，字段可能变成 `null`、无法落库，甚至被静默忽略，形成很难发现的数据错误。

### 展开回答

- 请求 DTO 负责格式和必填校验，响应 DTO 只暴露调用方需要的数据。
- Entity 关注表、索引、关联和持久化生命周期，不应直接充当外部契约。
- Mapper 是字段重命名、枚举转换、金额与时间格式转换的集中位置。
- 命名策略应明确放在 Jackson、MyBatis/JPA 和 OpenAPI 配置中，不依赖“刚好能自动映射”。
- 对敏感字段采用白名单映射，比把 Entity 全量复制后再排除更安全。

### 项目实践

通过序列化测试、数据库映射测试和 OpenAPI 契约测试覆盖关键 DTO；对支付金额、币种、用户 ID 等字段尤其要断言实际 JSON 名称，避免前端传了 `user_id`、后端却只读取 `userId`。
