---
id: java-map-common-operations
title: Java Map 的常见操作及语义区别
category: Java / 集合
tags: [java, map, collections]
createdAt: "2026-07-29T22:55:34+08:00"
type: qa
---

## 问题

Java `Map` 有哪些常见操作？`put()`、`putIfAbsent()`、`replace()`、`computeIfAbsent()` 和 `merge()` 的语义有什么区别？

## 答案

常见读取和修改操作包括：

```java
map.put(key, value);                  // 新增或覆盖，返回旧值
map.get(key);                         // 获取值，不存在通常返回 null
map.getOrDefault(key, defaultValue);  // 不存在时返回默认值，但不写入
map.containsKey(key);                 // 判断 key 是否存在
map.remove(key);                      // 删除并返回旧值
map.entrySet();                       // 获取键值对，适合同时遍历 key 和 value
```

几个容易混淆的方法：

- `put()`：key 不存在时新增，存在时覆盖。
- `putIfAbsent()`：key 没有关联值时才写入。
- `replace()`：只有 key 已存在时才修改。
- `computeIfAbsent()`：没有关联值时才计算并写入，常用于按 key 初始化集合。
- `merge()`：没有关联值时写入给定值，已有值时通过函数合并，常用于计数。

```java
map.computeIfAbsent(key, k -> new ArrayList<>()).add(value);
map.merge(key, 1, Integer::sum);
```

在并发场景下，应使用 `ConcurrentHashMap` 提供的这些复合方法，才能获得相应的原子性保证。
