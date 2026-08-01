---
id: java-memory-model-visibility-atomicity-ordering
title: Java 内存模型（JMM）是什么？
category: Java / 并发
tags: [java, jmm, visibility, atomicity, ordering]
type: qa
---

## 问题

Java 内存模型（JMM）解决什么问题？如何理解可见性、原子性和有序性？

## 答案

JMM 是 Java 语言对多线程读写共享内存行为的抽象规范，定义线程何时必须看到其他线程的写入，以及哪些执行重排序是允许的。它不是 JVM 堆、栈等运行时内存区域的划分。

- **可见性**：一个线程的写入何时对其他线程可见。`volatile`、锁和线程启动/结束等规则可以建立 happens-before 关系。
- **原子性**：一个操作是否不可分割。例如 `count++` 包含读取、计算和写回，不是原子操作，可使用锁或 `AtomicInteger`。
- **有序性**：编译器和处理器可以在不违反单线程语义的前提下重排序；同步规则会限制可能影响线程间正确性的重排序。

`volatile` 可以提供可见性和一定的有序性，但不能让 `count++` 这样的复合操作自动变成原子操作。`synchronized` 和 `Lock` 既提供互斥，也建立相应的可见性保证。
