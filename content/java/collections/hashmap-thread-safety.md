---
id: java-why-hashmap-is-not-thread-safe
title: HashMap 为什么线程不安全？
category: Java / 集合
tags: [java, hashmap, concurrency, thread-safety]
type: qa
---

## 问题

为什么 `HashMap` 不是线程安全的？并发读写可能出现什么问题？

## 答案

HashMap 的结构修改没有提供并发同步保证。多个线程同时 `put()`、删除或扩容时，可能发生更新丢失、结构状态不一致、读取到非预期结果等问题；单次方法之间组成的复合操作也不具备原子性和可见性保证。

即使只调用看似简单的：

```java
if (!map.containsKey(key)) {
    map.put(key, value);
}
```

检查和写入之间也可能被其他线程插入，形成竞态条件。

如果 Map 在安全发布后只读，可以被多个线程读取；只要存在共享修改，就应使用适合的同步方案。常见选择是 `ConcurrentHashMap` 及其 `putIfAbsent()`、`compute()`、`merge()` 等原子复合方法，而不是在并发场景直接使用 HashMap。
