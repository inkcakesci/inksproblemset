---
id: spring-jdk-dynamic-proxy-vs-cglib
title: Spring 中 JDK 动态代理和 CGLIB 代理有什么区别？
category: Spring / AOP
tags: [spring, aop, jdk-proxy, cglib]
createdAt: "2026-08-01T23:07:01+08:00"
type: qa
---

## 问题

Spring AOP 中 JDK 动态代理和 CGLIB 代理有什么区别？各自有什么限制？

## 答案

JDK 动态代理基于接口生成代理对象，代理类型实现目标接口，调用由 `InvocationHandler` 分发；它要求被代理能力通过接口暴露。

CGLIB 代理通过生成目标类的子类来拦截可重写方法，不要求业务类实现接口。但 `final` 类不能被继承，`final` 或 `private` 方法不能通过子类重写，因此无法按这种方式增强。

Spring 会根据配置和目标类型选择代理策略。使用代理对象时还要注意：代理类型可能不同于具体实现类，同类内部自调用不会经过代理，只有可被相应代理机制拦截的方法调用才能应用增强。

现代 Spring 将 CGLIB 相关实现重新打包在框架内部，通常不需要应用单独引入传统 CGLIB 依赖。
