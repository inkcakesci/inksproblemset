---
id: java-hashmap-get-process-and-complexity
title: HashMap 的 get 流程和时间复杂度是什么？
category: Java / 集合
tags: [java, hashmap, get, complexity]
type: qa
---

## 问题

JDK 8+ 执行 `HashMap.get(key)` 时经历哪些步骤？为什么平均是 `O(1)`？

## 答案

`get()` 先计算扰动后的哈希并定位桶，然后比较桶首节点；未命中时继续在链表中顺序查找，或在树化桶中按红黑树规则查找。节点匹配同时要求哈希相同，并满足 Key 引用相同或 `equals()` 为 true。

哈希分布均匀、负载因子合理时，每个桶平均只有很少节点，定位数组加少量比较可以视为平均 `O(1)`。这不是无条件保证：

- 碰撞严重且仍是链表时，最坏可能退化到 `O(n)`。
- 树化桶可把适合树查找的严重碰撞成本改善到约 `O(log n)`，但会增加节点和比较开销。
- `hashCode()` 或 `equals()` 本身很昂贵时，整体查询也不会真正是常数级低成本。

性能分析不能只看大 O，还要看 Key 哈希质量、对象分配、缓存局部性、容量和真实碰撞分布。
