---
id: spring-constructor-injection-over-field-injection
title: 为什么不推荐 Spring 字段注入？
category: Spring / 核心
tags: [spring, dependency-injection, autowired, testing]
type: qa
---

## 问题

为什么不推荐在字段上使用 `@Autowired`？构造器注入有什么优势？

## 答案

严格来说，不推荐的是字段注入，而不是 `@Autowired` 注解本身。构造器注入通常具有以下优势：

- 依赖关系直接体现在构造器签名中，更明确。
- 单元测试可以直接传入 Mock，不需要启动 Spring 容器或使用反射。
- 依赖字段可以声明为 `final`，保证对象创建后不被重新赋值。
- 构造器参数过多会及时暴露类职责过重的问题。
- 必要依赖在对象创建时就能得到保证。

推荐写法：

```java
public class OrderService {
    private final PaymentService paymentService;

    public OrderService(PaymentService paymentService) {
        this.paymentService = paymentService;
    }
}
```

Spring 4.3 以后，如果 Bean 只有一个构造器，构造器上的 `@Autowired` 可以省略。
