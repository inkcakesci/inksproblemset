---
id: java-hashmap-internals-and-put-process
title: JDK 8 HashMap 的底层结构和 put 流程是什么？
category: Java / 集合
tags: [java, hashmap, put, red-black-tree]
type: qa
---

## 问题

JDK 8 中 `HashMap` 的底层结构是什么？执行 `put(key, value)` 时经历哪些步骤？

## 答案

JDK 8 的 HashMap 主要由桶数组、链表和红黑树组成。

`put()` 的核心流程是：

1. 对 key 的 `hashCode()` 做扰动，计算哈希值。
2. 根据数组长度定位桶下标。
3. 桶为空时直接插入新节点。
4. 桶中已有节点时，先通过哈希值和 `equals()` 判断是否为同一个 key；相同则覆盖 value。
5. 如果是不同 key 的哈希冲突，则沿链表或红黑树查找并插入。
6. 链表达到树化条件时可能转为红黑树。
7. 插入新键后如果元素数量超过阈值，则触发扩容。

HashMap 允许一个 `null` key，它会按特定哈希值处理。平均查找接近 `O(1)`，严重冲突下树结构可改善最坏情况，但实际表现取决于哈希分布和 key 的相等性实现。
