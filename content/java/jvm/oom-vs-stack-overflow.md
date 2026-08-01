---
id: java-jvm-oom-vs-stack-overflow
title: JVM 中常见的 OOM 和 StackOverflowError 有什么区别？
category: Java / JVM
tags: [java, jvm, oom, stackoverflow, memory]
type: qa
---

## 问题

JVM 中常见的内存相关异常有哪些？`OutOfMemoryError: Java heap space` 和 `StackOverflowError` 有什么区别？

## 答案

`Java heap space` 表示 JVM 无法在堆中完成对象分配，常见原因包括堆配置不足、对象增长过快、一次加载大量数据，或者仍被引用的无用对象形成内存泄漏。

`StackOverflowError` 表示当前线程的调用栈深度超出可用栈空间，最典型原因是无限递归，也可能是方法调用层级过深或单个栈帧过大。

二者区别：堆由线程共享并主要保存对象；Java 虚拟机栈是线程私有的，主要保存方法栈帧。排查 Heap OOM 通常关注堆转储、对象数量和引用链；排查栈溢出则先检查递归和调用链。

其他常见 OOM 还包括 Metaspace、Direct buffer memory，以及无法创建新的本地线程等；它们对应的资源与排查方向不同。
