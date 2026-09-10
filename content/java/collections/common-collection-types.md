---
id: java-common-collection-types
title: Java 常用集合如何选择？
category: Java / 集合
tags: [java, collections, arraylist, linkedlist, hashset, hashmap]
createdAt: "2026-07-29T22:55:34+08:00"
type: qa
---

## 问题

Java 集合框架中 `ArrayList`、`LinkedList`、`HashSet` 和 `HashMap` 分别有什么特点？实际开发中如何选择？

## 答案

Java 集合框架主要分为 `Collection` 和 `Map` 两个体系。`Collection` 下包括 `List`、`Set` 和 `Queue`，`Map` 是独立的键值对体系。

### ArrayList

底层是动态数组，有序且允许重复。按下标查询接近 `O(1)`，中间插入和删除通常需要移动元素，接近 `O(n)`。普通列表默认优先使用它。

### LinkedList

底层是双向链表，同时实现 `List` 和 `Deque`。随机访问需要遍历，复杂度为 `O(n)`；头尾操作方便。但“增删快”只在已经定位到节点时成立，实际使用频率通常低于 `ArrayList`。

### HashSet

用于保存不重复元素，不保证插入顺序，增删查平均接近 `O(1)`。底层基于 `HashMap`，元素判重依赖 `hashCode()` 和 `equals()`。

### HashMap

保存 key-value 键值对，key 不重复，value 可以重复。同一 key 再次 `put()` 会覆盖旧值，平均增删查接近 `O(1)`。

选择口诀：普通列表用 `ArrayList`；只需要高效头尾队列操作时优先考虑 `ArrayDeque`；需要去重用 `HashSet`；需要通过 key 查 value 用 `HashMap`。
