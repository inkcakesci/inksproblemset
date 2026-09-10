---
id: security-refresh-token-rotation-revocation-replay
title: Refresh Token 如何轮换、撤销并防止重放？
category: 安全 / 认证
tags: [refresh-token, rotation, revocation, replay]
createdAt: "2026-08-03T20:06:03+08:00"
type: qa
---

## 问题

Refresh Token 如何做到轮换、撤销和防止重放？用户被冻结后为什么需要撤销它？

## 答案

每次刷新时签发新的 Refresh Token，并立即使旧 Token 失效。服务端保存 Token 哈希、用户、会话族 ID、前驱关系、到期时间、使用时间和撤销状态，不保存可直接使用的明文。

旧 Token 再次出现说明可能被窃取。系统应将其识别为重放，撤销整个 Token family，要求重新登录并产生安全告警，而不是只拒绝这一次请求。

退出登录、改密、设备移除、风险事件和用户冻结时，应撤销对应会话或该用户全部 Refresh Token。否则攻击者仍能用长期 Token 换取新的 Access Token，绕过“账号已冻结”的业务决定。

Access Token 还应短期有效，并在关键请求中检查用户当前状态或安全版本；只撤销 Refresh Token 不能瞬间消灭已经签发的 Access Token。
