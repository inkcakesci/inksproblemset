---
id: java-hashmap-capacity-resize-and-treeify
title: HashMap 为什么使用 2 的幂容量，如何扩容和树化？
category: Java / 集合
tags: [java, hashmap, capacity, resize, treeify]
type: qa
---

## 问题

JDK 8 HashMap 为什么通常将容量保持为 2 的幂？它何时扩容、何时把链表树化？

## 答案

容量为 2 的幂时，可以使用 `(length - 1) & hash` 高效计算桶下标，并让哈希值的低位较均匀地参与索引。

默认负载因子是 `0.75`。元素数量超过 `capacity × loadFactor` 对应的阈值后，HashMap 通常扩容到原容量的两倍。JDK 8 扩容时，节点根据哈希值中新增的那一位，留在原索引或移动到 `原索引 + 旧容量`，不必为每个节点重新做完整取模。

在 JDK 8 的当前实现细节中，桶内节点达到树化阈值 8 时才会考虑树化；如果数组容量小于 64，会优先扩容，而不是立即转红黑树。节点减少到一定程度后还可能退化回链表。

这些数值属于具体 JDK 实现细节，不是 `Map` 接口契约，面试中应说明版本前提。
