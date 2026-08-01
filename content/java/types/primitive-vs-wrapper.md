---
id: java-primitive-vs-wrapper-types
title: Java 为什么同时有基本类型和包装类型？
category: Java / 类型系统
tags: [java, primitive, wrapper, autoboxing]
type: qa
---

## 问题

Java 为什么同时提供基本类型和包装类型？使用时有什么区别？

## 答案

基本类型直接表示简单值，开销较低；包装类型把值表示成对象，可以参与泛型、表示 `null`，并提供对象方法和工具方法。

例如泛型类型参数必须是引用类型：

```java
List<Integer> numbers = new ArrayList<>(); // 不能写 List<int>
```

包装类型常用于：

- 集合和泛型
- 需要表达“未设置”或数据库 `NULL` 的字段
- 需要调用 `parseInt()`、`compare()` 等工具方法

基本类型通常更节省内存，也避免装箱、拆箱和额外对象带来的开销，适合不能为空的数值计算和局部变量。

需要注意自动拆箱可能抛出空指针异常：

```java
Integer count = null;
int value = count; // NullPointerException
```

包装对象使用 `==` 还可能受到缓存机制影响，比较数值内容应使用 `equals()` 或拆箱后比较。
