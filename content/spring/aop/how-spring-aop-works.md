---
id: spring-aop-proxy-workflow
title: Spring AOP 的基本原理是什么？
category: Spring / AOP
tags: [spring, aop, proxy, interceptor]
type: qa
---

## 问题

Spring AOP 的基本工作原理是什么？一次被增强的方法调用会经过哪些步骤？

## 答案

Spring AOP 主要基于运行时代理实现方法级横切逻辑。容器识别匹配切点的 Bean 后，为其创建代理对象；外部调用进入代理，代理按顺序执行拦截器链，再调用目标方法，最后执行返回、异常或清理逻辑。

```text
调用方 → 代理对象 → 拦截器链 → 目标方法
```

事务、日志、权限和监控都可以复用这种机制。通知类型决定逻辑发生在方法前、成功返回后、抛出异常后或环绕整个调用。

Spring AOP 的代理模式主要拦截 Spring Bean 的方法执行，不等同于完整 AspectJ 的所有连接点能力。调用必须经过代理才能生效，因此同类 `this.method()` 自调用通常会绕过增强。
