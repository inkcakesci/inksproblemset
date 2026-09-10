---
id: java-hashmap-collision-causes
title: 什么是哈希碰撞，为什么一定可能发生？
category: Java / 集合
tags: [java, hashmap, hash-collision, hashcode]
createdAt: "2026-08-09T18:44:33+08:00"
type: qa
---

## 问题

`HashMap` 中什么叫哈希碰撞？碰撞为什么会发生？

## 答案

不同 Key 最终落入同一个桶，就发生了哈希碰撞。它可能是两个不同对象产生了相同 `hashCode()`，也可能原始哈希不同，但经过扰动和有限数组掩码后得到相同桶下标。

碰撞从数学上无法彻底消除：Java 的 `int hashCode` 只有约 42 亿种结果，而可能的对象数量没有这个限制；桶数组通常又远小于哈希空间，根据抽屉原理，足够多的 Key 必然共享桶。

碰撞不等于 Key 相同。HashMap 先比较哈希值，再通过引用相同或 `equals()` 判断是不是同一个逻辑 Key；哈希相同但 `equals()` 为 false 的节点会同时保存在桶中。

正常、均匀且低比例的碰撞是哈希表设计的一部分。真正的问题是分布过差、容量不足或攻击者构造大量碰撞，使桶退化并提高查找成本。
