---
id: java-when-not-to-use-hashmap
title: 什么时候不应该使用 HashMap？
category: Java / 集合
tags: [java, hashmap, enummap, treemap]
createdAt: "2026-08-09T18:44:33+08:00"
type: qa
---

## 问题

`HashMap` 适合什么场景？哪些需求使用其他 Map 或数据结构更合适？

## 答案

HashMap 适合单线程或线程隔离环境中，按任意 Key 做快速等值查找，且不需要排序和稳定遍历顺序的场景。它的优势是平均读写接近 `O(1)`，但不是所有 Key-Value 需求的默认最优解。

- 多线程共享修改：使用 `ConcurrentHashMap` 或明确同步边界。
- Enum 作为 Key：`EnumMap` 通常更紧凑、语义也更明确。
- 需要插入顺序、访问顺序或 LRU 基础：使用 `LinkedHashMap`。
- 需要排序、范围查询、floor/ceiling：使用 `TreeMap` 或其他 `NavigableMap`。
- Key 是连续且范围很小的整数：数组或 List 往往更直接，避免哈希和装箱。
- 需要按对象身份而不是 `equals()` 比较：极少数框架场景才考虑 `IdentityHashMap`。

选型时同时考虑并发、顺序、范围、内存、Key 类型和 API 语义。为了“查询快”而把所有数据都塞进 HashMap，可能换来高内存、GC 和一致性问题。
