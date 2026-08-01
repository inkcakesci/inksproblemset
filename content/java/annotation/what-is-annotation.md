---
id: java-what-is-annotation
title: Java Annotation 是什么？
category: Java / 注解
tags: [java, annotation, metadata]
type: qa
---

## 问题

Java Annotation 是什么？注解为什么能够让框架产生行为？

## 答案

Annotation 是 Java 的元数据机制，可以为类、方法、字段、参数等程序元素附加结构化信息。

注解本身通常不直接执行逻辑。真正产生行为的是读取并处理注解的组件，例如：

- 编译器进行语法检查，例如 `@Override`。
- 注解处理器在编译期生成代码或文件。
- 框架在运行时读取注解，注册组件、绑定配置或创建代理。

例如 `@Service` 只是标记组件角色，Spring 的扫描和 Bean 注册机制负责创建 Bean；`@Transactional` 提供事务元数据，Spring 的事务基础设施和 AOP 代理负责开启、提交或回滚事务。

一句话：注解负责描述“额外信息”，编译器、处理器或框架负责解释这些信息并执行逻辑。
