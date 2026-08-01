---
id: java-hashmap-linkedhashmap-treemap
title: HashMap、LinkedHashMap 和 TreeMap 有什么区别？
category: Java / 集合
tags: [java, hashmap, linkedhashmap, treemap, map]
type: qa
---

## 问题

`HashMap`、`LinkedHashMap` 和 `TreeMap` 有什么区别？如何选择？

## 答案

- `HashMap` 基于哈希桶，不保证迭代顺序，增删查平均接近 `O(1)`。
- `LinkedHashMap` 在 HashMap 基础上维护双向链表，可保持插入顺序，也可配置为访问顺序。结合 `removeEldestEntry()` 可以实现简单的 LRU 缓存策略。
- `TreeMap` 基于红黑树，按 key 的自然顺序或 `Comparator` 排序，增删查通常为 `O(log n)`，并支持范围、上界、下界等导航操作。

普通键值查询优先 `HashMap`；要求稳定迭代顺序或访问顺序时用 `LinkedHashMap`；需要按 key 排序或范围查询时用 `TreeMap`。

TreeMap 的 key 必须能被比较，比较结果为 `0` 时会被视为同一个 key，因此比较规则最好与 `equals()` 一致。
