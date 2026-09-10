---
id: security-jwt-vs-session-access-refresh-token
title: JWT 与 Session 认证有什么区别，为什么分 Access Token 和 Refresh Token？
category: 安全 / 认证
tags: [jwt, session, access-token, refresh-token]
createdAt: "2026-08-03T20:06:03+08:00"
type: qa
---

## 问题

JWT 认证和传统 Session 认证有什么区别？为什么同时使用 Access Token 和 Refresh Token？

## 答案

Session 通常由服务端保存登录状态，客户端 Cookie 只携带随机会话标识，服务端容易集中撤销，但需要共享会话存储和 CSRF 防护。

JWT 常把签名后的身份与授权声明放入 Token，资源服务可本地验证，适合多服务调用；代价是已签发 Token 在到期前不容易立即撤销，并要防止泄露、错误算法、过宽权限和长期有效。

Access Token 应短期有效，用于访问 API；Refresh Token 生命周期更长，只用于认证服务换取新 Token。这样 Access Token 泄露窗口较短，用户又不必频繁登录。

Refresh Token 安全等级应更高，通常放在 Secure、HttpOnly、SameSite 合适的 Cookie 或受保护客户端存储中，不能把“使用 JWT”误解为服务端完全不保存任何安全状态。
