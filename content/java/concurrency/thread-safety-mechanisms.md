---
id: java-common-thread-safety-mechanisms
title: Java 中如何保证线程安全？
category: Java / 并发
tags: [java, concurrency, synchronized, volatile, lock, atomic]
createdAt: "2026-08-01T15:06:33+08:00"
type: qa
---

## 问题

Java 中有哪些常见的线程安全手段？`synchronized`、`volatile`、`Lock` 和原子类分别适合什么场景？

## 答案

应优先减少共享可变状态，例如使用不可变对象、线程封闭和消息传递。确实需要共享时，常用手段包括：

- **`synchronized`**：提供互斥和可见性，适合结构化的临界区，退出代码块时自动释放监视器。
- **`volatile`**：保证变量读写的可见性和相关有序性，适合状态标志等单次读写；不能保证 `count++` 等复合操作的原子性。
- **`Lock`**：如 `ReentrantLock`，支持可中断获取、超时、公平策略和多个条件队列，但必须在 `finally` 中释放。
- **原子类**：如 `AtomicInteger`，常基于 CAS 提供单变量原子操作，适合简单计数或状态更新。
- **并发容器**：如 `ConcurrentHashMap`、`BlockingQueue`，为特定数据结构封装了并发控制。

选择时既要保证操作整体的正确性，也要考虑锁粒度、竞争程度和代码可维护性。
