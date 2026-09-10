---
id: java-concurrenthashmap-jdk7-vs-jdk8
title: JDK 7 和 JDK 8 的 ConcurrentHashMap 有什么区别？
category: Java / 集合
tags: [java, concurrenthashmap, jdk7, jdk8]
createdAt: "2026-08-07T22:12:09+08:00"
type: qa
---

## 问题

JDK 7 与 JDK 8 的 `ConcurrentHashMap` 在结构和并发控制上有什么核心变化？

## 答案

JDK 7 使用 `Segment[]` 分段结构，每个 Segment 类似一个独立哈希表并继承 `ReentrantLock`；不同 Segment 的写入可并行，读取大多利用 volatile 可见性而无需加锁，写竞争粒度受 Segment 限制。

JDK 8 取消运行时分段结构，主表是 `Node[]`，桶内使用链表或红黑树。空桶初始化常通过 CAS；桶内冲突更新对桶首节点使用 `synchronized`；扩容还能由多个线程协作，并用特殊转发节点标识迁移状态。

这使锁粒度从 Segment 更贴近具体桶，也移除了固定 Segment 数量带来的结构限制。`concurrencyLevel` 在 JDK 8 主要保留为初始化容量提示。

“为什么不用 ReentrantLock”不应只答 `synchronized` 一定更快：JDK 8 的整体算法已经围绕 CAS、普通对象监视器和协作扩容重构，JVM 又能优化 `synchronized`，因此不再需要为每个分段维护显式锁对象。具体实现细节应带上 JDK 版本，不能外推到所有后续版本。
