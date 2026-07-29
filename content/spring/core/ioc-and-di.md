---
id: spring-ioc-and-di
title: 如何理解 IoC 和 DI？
category: Spring / 核心
tags: [spring, ioc, dependency-injection]
type: qa
---

## 问题

如何理解控制反转（IoC）和依赖注入（DI）？二者是什么关系？

## 答案

IoC 是一种设计思想，DI 是实现 IoC 最常见的方式。

传统写法中，对象会主动创建自己的依赖：

```java
private PaymentService paymentService = new PaymentService();
```

使用 Spring 后，对象只声明自己需要什么，由容器负责创建对象、管理生命周期并组装依赖：

```java
public OrderService(PaymentService paymentService) {
    this.paymentService = paymentService;
}
```

构造器接收依赖是 DI；由 Spring 决定创建 `OrderService`、创建 `PaymentService` 并组装二者，则体现了 IoC。

这样可以降低耦合、方便单元测试、统一管理对象，也让 Spring 更容易为对象增加事务和 AOP 等能力。

一句话：IoC 是“我不自己控制依赖的创建”，DI 是“容器把我需要的依赖传进来”。
