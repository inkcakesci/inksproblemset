---
id: java-hashmap-iteration-performance
title: 遍历 HashMap 时如何减少不必要开销？
category: Java / 集合
tags: [java, hashmap, iteration, performance]
createdAt: "2026-08-09T18:44:33+08:00"
type: qa
---

## 问题

同时需要 Key 和 Value 时，为什么通常使用 `entrySet()`？HashMap 遍历还要注意什么？

## 答案

同时需要键和值时，遍历 `entrySet()` 可以直接取得 `Map.Entry`；若遍历 `keySet()` 后每次再调用 `get(key)`，会重复计算哈希、定位桶和比较 Key。

```java
for (Map.Entry<K, V> entry : map.entrySet()) {
    use(entry.getKey(), entry.getValue());
}
```

只需要 Key 就用 `keySet()`，只需要 Value 就用 `values()`。还应注意：

- HashMap 不保证稳定迭代顺序，需要插入或访问顺序时选择 `LinkedHashMap`。
- 遍历成本与桶容量和元素数都有关，过度预分配也会拖慢全表遍历。
- 遍历期间直接结构性修改通常会触发 best-effort 的 fail-fast；应使用 Iterator 的 `remove()`、批量 API 或先收集待修改项。
- `ConcurrentModificationException` 只帮助发现错误，不能当作线程安全机制。

是否用 Stream 不是决定性优化，应以可读性、装箱分配和实际基准为准。
