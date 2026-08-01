---
id: java-generational-garbage-collection
title: Java 分代回收是什么，对象如何在年轻代和老年代流转？
category: Java / GC
tags: [java, jvm, gc, young-generation, old-generation]
type: qa
---

## 问题

Java 分代垃圾回收的基本思想是什么？对象通常如何在年轻代和老年代之间流转？

## 答案

分代回收利用“多数对象朝生夕死、少数对象长期存活”的经验规律，把堆按对象年龄或用途划分区域，并为不同区域采用适合的回收策略。

在经典分代布局中，新对象通常分配在 Eden；年轻代回收时，存活对象在 Survivor 区之间复制并增加年龄，达到晋升条件或 Survivor 空间不足时进入老年代。大对象、分配担保等规则可能让对象直接或提前进入老年代。

Eden、S0、S1、年龄阈值等是常见收集器的实现方式，不是所有收集器都完全相同。现代 ZGC、Shenandoah 等收集器是否以及如何分代，还取决于具体 JDK 版本和启用模式。

Spring Bean、缓存或连接池对象可能因为长期可达而进入老年代，但“对象类型”本身不会决定它一定在哪一代。
