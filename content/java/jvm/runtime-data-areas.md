---
id: java-jvm-runtime-data-areas
title: JVM 运行时数据区有哪些？
category: Java / JVM
tags: [java, jvm, memory, runtime-data-area]
createdAt: "2026-08-01T15:06:33+08:00"
type: qa
---

## 问题

JVM 运行时数据区主要有哪些？各自保存什么？

## 答案

按照 Java 虚拟机规范，主要运行时数据区包括：

- **堆（Heap）**：线程共享，主要分配对象和数组，由 GC 管理。
- **方法区（Method Area）**：线程共享，保存每个类的结构信息、运行时常量池、字段和方法信息等。HotSpot 从 JDK 8 起主要用元空间实现方法区。
- **Java 虚拟机栈**：线程私有，为 Java 方法调用创建栈帧。
- **程序计数器（PC Register）**：线程私有，记录当前线程正在执行的 JVM 指令位置。
- **本地方法栈（Native Method Stack）**：支持本地方法执行，具体实现由 JVM 决定。

“方法区”是规范概念，“永久代”或“元空间”是 HotSpot 的具体实现，不应完全画等号。直接内存也常在性能调优中讨论，但不属于规范定义的运行时数据区。
