---
id: java-collection-collections-stream
title: Collection、Collections 和 Stream 有什么区别？
category: Java / 集合
tags: [java, collection, collections, stream]
type: qa
---

## 问题

Java 的 `Collection`、`Collections` 和 `Stream` 分别是什么？

## 答案

- `Collection` 是集合框架的核心接口之一，表示一组元素，`List`、`Set`、`Queue` 等属于该体系；`Map` 不继承 Collection。
- `Collections` 是 `java.util` 下的工具类，提供排序、反转、查找、不可修改视图和同步包装等静态方法。
- `Stream` 是一次性数据处理流水线，用于过滤、转换、聚合，不负责长期存储数据。

```java
List<Order> orders = new ArrayList<>(); // Collection 实现
Collections.shuffle(orders);            // 工具操作
orders.stream().filter(Order::isPaid);  // 处理流水线
```

`Collections.synchronizedList()` 只为单次方法调用提供同步包装，遍历和复合操作仍需按文档在外部同步；它不等同于所有使用方式都自动线程安全。
