---
id: java-hashset-linkedhashset-treeset
title: HashSet、LinkedHashSet 和 TreeSet 有什么区别？
category: Java / 集合
tags: [java, hashset, linkedhashset, treeset, set]
createdAt: "2026-08-01T23:07:01+08:00"
type: qa
---

## 问题

`HashSet`、`LinkedHashSet` 和 `TreeSet` 有什么区别？如何选择？

## 答案

- `HashSet` 基于 `HashMap`，不保证迭代顺序，增删查平均接近 `O(1)`，通过 `hashCode()` 和 `equals()` 判重。
- `LinkedHashSet` 在哈希结构外维护链接顺序，通常按插入顺序迭代，性能和内存开销略高于 `HashSet`。
- `TreeSet` 基于红黑树，按自然顺序或 `Comparator` 排序，增删查通常为 `O(log n)`。

TreeSet 判断元素是否重复依赖比较结果是否为 `0`，不直接以 `equals()` 为唯一标准。因此比较规则应与 `equals()` 保持一致，否则可能出现“equals 不相等但 Set 认为重复”等反直觉行为。

只需去重和快速查找用 `HashSet`；还要保留插入顺序用 `LinkedHashSet`；需要排序、范围视图或相邻元素查询用 `TreeSet`。
