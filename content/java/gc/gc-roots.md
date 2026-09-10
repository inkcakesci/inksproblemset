---
id: java-common-gc-roots
title: Java 中常见的 GC Roots 有哪些？
category: Java / GC
tags: [java, jvm, gc, gc-roots]
createdAt: "2026-08-01T23:07:01+08:00"
type: qa
---

## 问题

Java 可达性分析中常见的 GC Roots 有哪些？

## 答案

常见 GC Roots 包括：

- 活跃线程栈帧中局部变量表引用的对象。
- 已加载类的静态字段引用的对象。
- 运行时常量等 JVM 内部结构引用的对象。
- JNI 本地代码持有的全局或局部引用。
- 活跃的线程对象、同步监视器以及 JVM 内部为运行所保留的对象。

GC Roots 是“引用关系遍历的起点”，不是某一种固定内存区域。具体根集合会因 JVM 实现、收集时机和正在执行的代码而变化。

排查内存泄漏时，常通过堆转储查看某个对象到 GC Root 的引用链，找出是谁仍在持有本应释放的对象。
