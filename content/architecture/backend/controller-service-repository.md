---
id: backend-controller-service-dao-repository-layering
title: Spring Boot 项目为什么采用 Controller、Service、DAO/Repository 分层？
category: 项目设计 / 后端架构
tags: [spring-boot, controller, service, dao, repository]
createdAt: "2026-08-03T20:06:03+08:00"
type: qa
---

## 问题

Spring Boot 项目为什么采用 Controller、Service、DAO、Repository 分层？每层分别负责什么？

## 答案

分层的目标是隔离协议、业务和持久化变化，让权限、事务和测试边界更清晰，而不是单纯把代码放进不同目录。

- **Controller**：处理 HTTP 协议、参数校验、身份上下文和响应映射，不承载核心业务规则。
- **Service**：编排用例、校验业务不变量、控制事务、调用领域能力和外部服务。
- **DAO/Repository**：封装数据访问。DAO 更强调表和 SQL 操作；Repository 更强调按领域对象集合的方式持久化，实际项目命名可二选一，不必机械叠加两层。

支付创建应由 Service 在事务中完成幂等校验和状态变更，Controller 只接收请求，Repository 只负责原子读写。分层过细会产生无意义转发，因此应以职责和可替换边界为准。
