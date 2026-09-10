---
id: java-hashmap-vs-concurrenthashmap
title: HashMap 和 ConcurrentHashMap 有什么区别？
category: Java / 集合
tags: [java, hashmap, concurrenthashmap, concurrency]
createdAt: "2026-07-29T22:55:34+08:00"
type: qa
---

## 问题

`HashMap` 和 `ConcurrentHashMap` 有什么区别？并发场景下使用时要注意什么？

## 答案

`HashMap` 线程不安全，适合单线程或线程隔离场景；`ConcurrentHashMap` 线程安全，适合多线程共享并修改同一个 Map。

JDK 8 中，两者底层都主要由数组、链表和红黑树组成。`ConcurrentHashMap` 通过 CAS、`volatile` 和桶级别的 `synchronized` 等机制控制并发，不会锁住整个 Map，因此具有较好的并发性能。

两者还有这些区别：

- `HashMap` 允许一个 `null` key 和多个 `null` value。
- `ConcurrentHashMap` 不允许 `null` key 或 `null` value，避免并发环境下产生“值不存在还是值为 null”的歧义。
- 并发复合操作不能简单地把多个 `get()`、`put()` 拼在一起，应使用 `putIfAbsent()`、`computeIfAbsent()`、`compute()`、`merge()` 等原子方法。

一句话：线程私有用 `HashMap`；线程共享且会修改时，优先考虑 `ConcurrentHashMap`。
