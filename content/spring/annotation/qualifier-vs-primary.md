---
id: spring-qualifier-vs-primary
title: Spring 的 @Qualifier 和 @Primary 有什么区别？
category: Spring / 注解
tags: [spring, qualifier, primary, dependency-injection]
createdAt: "2026-08-01T23:07:01+08:00"
type: qa
---

## 问题

同一接口存在多个 Spring Bean 时，`@Qualifier` 和 `@Primary` 分别如何解决注入歧义？

## 答案

`@Primary` 用于在多个同类型候选 Bean 中声明一个默认优先候选；`@Qualifier` 用于在具体注入点进一步限定所需候选。

```java
@Service
@Primary
class DefaultPaymentService implements PaymentService {}

@Service("stripePaymentService")
class StripePaymentService implements PaymentService {}
```

需要默认实现时可以直接按类型注入；需要明确指定 Stripe 实现时：

```java
OrderService(
    @Qualifier("stripePaymentService") PaymentService paymentService
) {}
```

实际解析还会考虑类型、泛型、限定符、Bean 名称等信息，不能简单理解成只按注解固定排序。通常 `@Primary` 表示全局默认选择，`@Qualifier` 表示某个注入点的明确约束。
