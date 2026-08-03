---
id: java-lambda-expression-basics
title: Java Lambda 表达式是什么，为什么引入它？
category: Java / 函数式编程
tags: [java, lambda, functional-programming]
type: qa
---

## 问题

Java Lambda 表达式是什么？Java 8 为什么引入它？

## 答案

Lambda 是函数式接口实例的一种简洁写法，用来把一段行为作为值传递，而不必显式编写匿名内部类。

```java
Predicate<Order> succeeded =
    order -> order.getStatus() == OrderStatus.SUCCESS;
```

Java 引入 Lambda 的核心价值是让集合处理、回调和策略组合更声明式：调用方描述“筛选成功订单”“把订单转换为 DTO”，通用流程负责遍历和执行。

Lambda 不是脱离类型独立存在的函数。它必须在目标类型上下文中转换为某个函数式接口实例，参数类型、返回值和异常约束都由目标接口决定。

在支付系统中，Lambda 适合表达轻量、无状态的过滤和转换规则；复杂渠道流程仍应使用有名称的策略类，便于注入依赖、监控和测试。
