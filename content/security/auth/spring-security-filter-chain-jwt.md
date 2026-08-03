---
id: spring-security-filter-chain-jwt-authentication
title: Spring Security Filter Chain 如何处理 JWT 认证？
category: 安全 / Spring Security
tags: [spring-security, filter-chain, jwt, security-context]
type: qa
---

## 问题

Spring Security Filter Chain 的执行流程是什么？JWT Filter 如何从 Token 中解析用户身份？

## 答案

Servlet 请求先进入容器 Filter，再由 `DelegatingFilterProxy` 转交 Spring 的 `FilterChainProxy`。它选择第一个匹配的 `SecurityFilterChain`，按既定顺序执行安全过滤器，最后才到 `DispatcherServlet` 和 Controller。

JWT 认证过滤器通常：

1. 从 `Authorization: Bearer ...` 读取 Token。
2. 校验签名、算法、issuer、audience、过期时间等声明。
3. 根据稳定 subject 获取或构造当前用户与权限，并检查账号状态。
4. 创建已认证 `Authentication`，放入 `SecurityContextHolder`。
5. 继续过滤器链，之后由授权过滤器或方法安全执行权限判断。

无 Token 的公开接口可以继续匿名访问；无效 Token 应按统一策略返回 401。过滤器顺序必须保证认证发生在授权之前，并避免把未经校验的 claims 当可信身份。
