---
id: spring-transactional-implementation-and-pitfalls
title: "@Transactional 如何实现，为什么会失效？"
category: Spring / 事务
tags: [spring, transaction, aop, transactional]
type: qa
---

## 问题

Spring 的 `@Transactional` 是如何实现的？默认回滚规则是什么？哪些常见情况会导致事务失效？

## 答案

在常见的代理模式下，`@Transactional` 由 Spring AOP 和事务拦截器实现。外部代码调用代理对象时，`TransactionInterceptor` 读取事务配置，再通过 `PlatformTransactionManager` 开启、提交或回滚事务。

以 JDBC 为例，事务管理器会管理数据库连接的自动提交、提交和回滚。Spring 通过 `TransactionSynchronizationManager` 将连接等事务资源绑定到当前线程，使同一事务中的数据访问代码能够复用相同资源。

默认情况下，Spring 对 `RuntimeException` 和 `Error` 回滚，对受检异常默认不回滚。需要对所有 `Exception` 回滚时可以显式配置：

```java
@Transactional(rollbackFor = Exception.class)
```

常见失效场景：

- 同类内部通过 `this` 调用事务方法，没有经过代理。
- 将事务标在代理无法拦截的方法上，例如 `private` 方法。
- 对象由自己 `new`，不是 Spring Bean。
- 异常在方法内部被捕获且没有继续抛出，事务拦截器感知不到失败。

一句话：声明式事务依赖代理拦截，因此判断是否生效的关键是“调用有没有经过 Spring 代理，以及异常有没有传播到拦截器”。
