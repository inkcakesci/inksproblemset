---
id: security-cors-cookie-authorization
title: CORS、Cookie、Authorization Header 与 credentials
category: 安全 / Web
tags: [CORS, Cookie, JWT, CSRF]
type: qa
---

## 问题

CORS、Cookie、Authorization Header 和 `credentials: include` 之间是什么关系？为什么跨域登录经常出问题？

## 答案

CORS 是浏览器对跨源请求的限制，不是认证机制。Cookie 是否随跨源请求发送，由前端的 `credentials: include`、服务端 `Access-Control-Allow-Credentials: true`、精确的允许来源，以及 Cookie 的 `SameSite`、`Secure` 属性共同决定。`credentials: include` 不会自动添加 `Authorization`，Bearer Token 仍需代码显式设置，而且通常会触发 OPTIONS 预检。

跨域登录常见问题就是其中某一环不匹配：服务端把允许来源写成 `*`、没有放行预检或 `Authorization` 请求头、Cookie 被 `SameSite` 拦截，或者前后端把“跨源”和“跨站”混为一谈。

### 展开回答

- Cookie 认证需要考虑 CSRF；重要写操作应使用 SameSite、CSRF Token 和来源校验等防护。
- Bearer Token 放在 Header 中通常不依赖 Cookie，因此 CSRF 风险较低，但仍要防 XSS 和 Token 泄露。
- 使用凭证时，`Access-Control-Allow-Origin` 必须返回受信任的具体 Origin，不能是 `*`。
- 开发环境不同端口也是不同 Origin，应显式维护允许列表，不要在生产环境全放开。
- OPTIONS 预检应在认证过滤器之前正确处理，否则业务请求还没到 Controller 就会失败。

### 项目实践

统一在安全配置中维护可信前端 Origin、允许的方法和 Header；明确选择 Cookie 方案还是 Bearer Header 方案，避免一半放 Cookie、一半读 Header。线上还要记录被拒绝的 Origin 和预检原因，便于定位“登录成功但后续接口未携带身份”的问题。
