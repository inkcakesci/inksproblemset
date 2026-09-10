---
id: java-annotation-retention-policies
title: Java 注解的 SOURCE、CLASS 和 RUNTIME 有什么区别？
category: Java / 注解
tags: [java, annotation, retention, reflection]
createdAt: "2026-08-01T23:07:01+08:00"
type: qa
---

## 问题

Java 注解的 `RetentionPolicy.SOURCE`、`CLASS` 和 `RUNTIME` 有什么区别？

## 答案

`@Retention` 决定注解信息保留到哪个阶段：

- **SOURCE**：只存在于源码，编译后丢弃。适合编译期检查或源码处理，例如 `@Override`。
- **CLASS**：写入 class 文件，但 JVM 运行时不要求通过反射提供。它是未声明 `@Retention` 时的默认策略。
- **RUNTIME**：写入 class 文件并保留到运行时，可以通过反射读取，Spring 等运行时框架经常使用。

Lombok 的核心工作发生在编译期，它读取注解并修改或生成编译结果；运行程序通常不需要再读取这些 Lombok 注解。

Retention 只说明“保留多久”，注解能标在哪里由 `@Target` 决定，是否被子类继承等行为则由其他元注解控制。
