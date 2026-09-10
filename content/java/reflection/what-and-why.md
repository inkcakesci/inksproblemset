---
id: java-reflection-what-and-why
title: Java 反射是什么，框架为什么需要它？
category: Java / 反射
tags: [java, reflection, framework, metadata]
createdAt: "2026-08-01T23:07:01+08:00"
type: qa
---

## 问题

Java 反射是什么？Spring、MyBatis 和 Jackson 等框架为什么需要反射？

## 答案

反射是 Java 在运行时检查和操作类型结构的机制。程序可以通过 `Class`、`Constructor`、`Method`、`Field`、`Annotation` 等 API 获取类信息、创建对象、调用方法或读写字段。

框架在编译自身时并不知道业务项目最终会提供哪些类，因此需要在运行时发现并适配用户代码。例如：

- Spring 扫描组件和注解、分析构造器参数并创建 Bean。
- MyBatis 根据映射信息创建结果对象并设置属性。
- Jackson 根据目标类型、字段、构造器或访问方法完成序列化和反序列化。

现代框架也可能结合生成字节码、Method Handle、缓存元数据或编译期代码生成来提高性能，不能把所有框架能力都简单归结为每次直接调用传统反射 API。
