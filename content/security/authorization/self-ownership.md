---
id: security-self-ownership-authorization
title: 如何防止修改 URL 中的 userId 越权访问其他用户数据？
category: 安全 / 授权
tags: [authorization, idor, ownership, spring-security]
createdAt: "2026-08-03T20:06:03+08:00"
type: qa
---

## 问题

如何防止用户通过修改 URL 中的 `userId` 访问其他用户的数据？Self-ownership 校验应该放在哪里？

## 答案

永远以认证上下文中的用户身份作为可信主体，URL、请求体和查询参数中的 `userId` 只是待授权资源标识，不能决定当前用户是谁。

能设计成 `/me/profile` 的接口应直接使用当前 subject。必须按资源 ID 操作时，Service 或方法级授权组件应检查资源 owner、商户/租户边界和所需权限；Repository 查询也可以使用 `resource_id + owner_id`，让越权对象根本查不到。

Controller 可以做早期拒绝，但核心所有权规则不能只放前端或散落在 Controller。推荐使用统一 AuthorizationService、`@PreAuthorize` 或领域访问策略，并让批量查询、导出、文件下载和异步任务复用同一规则。

这类漏洞属于 IDOR/BOLA。管理员跨用户操作应走独立权限和审计链路，而不是跳过 ownership 校验。
