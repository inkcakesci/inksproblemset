---
id: frontend-openapi-generated-client-contract
title: OpenAPI TypeScript Client 契约一致性
category: 前端 / API
tags: [OpenAPI, TypeScript, Contract]
type: qa
---

## 问题

OpenAPI 生成的 TypeScript Client 如何与 Spring 后端保持契约一致？

## 答案

把后端 OpenAPI 文档作为唯一契约来源，在 CI 中生成并版本化 TypeScript Client，前端固定使用与后端兼容的版本。生成文件不手改；接口、DTO 或枚举变化后重新生成，并通过 CI 检查是否存在未提交的差异。

仅有类型生成还不够，还要覆盖 nullability、日期和金额格式、错误响应、分页和枚举兼容，并运行契约或集成测试验证真实 Spring 序列化结果。

### 展开回答

- 后端 DTO 明确 required、nullable、format、约束和稳定的 error schema。
- 新增字段尽量保持向后兼容；删除或改变语义需要版本化和迁移窗口。
- 生成器及配置要固定版本，避免开发机与 CI 产生不同代码。
- 前端封装认证、错误映射和 trace ID，但不要再手写一套重复接口类型。
- CI 可启动后端导出 spec、生成客户端、类型检查，再跑关键接口测试。

### 项目实践

金额在 OpenAPI 中明确是 decimal string 还是 minor unit integer，时间明确时区，枚举包含未知值策略。这样能避免 Java `BigDecimal` 到 TypeScript `number` 后发生精度丢失。
