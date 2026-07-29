---
id: spring-what-is-a-bean
title: Spring Bean 是什么？
category: Spring / 核心
tags: [spring, bean, ioc, aop]
type: qa
---

## 问题

Spring Bean 是什么？它与自己通过 `new` 创建的普通对象有什么区别？

## 答案

Bean 是进入 Spring IoC 容器、由容器创建和管理的 Java 对象。

Spring 可以负责 Bean 的实例化、依赖注入、生命周期、作用域以及 AOP 代理等。常见注册方式包括：

- `@Component`
- `@Service`
- `@Repository`
- `@Controller`
- 配置类中的 `@Bean`

Spring Bean 默认作用域是 `singleton`，表示同一个容器中同一个 Bean 定义通常对应一个实例；这不等同于 JVM 全局只能有一个实例。

自己通过 `new` 创建的对象没有经过 Spring 容器管理，因此容器提供的依赖注入、AOP 和声明式事务等能力通常不会自动生效。
