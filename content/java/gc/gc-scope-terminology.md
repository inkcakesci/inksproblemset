---
id: java-minor-major-full-gc
title: Minor GC、Major GC 和 Full GC 有什么区别？
category: Java / GC
tags: [java, jvm, gc, minor-gc, full-gc]
type: qa
---

## 问题

Minor GC、Major GC 和 Full GC 通常分别指什么？为什么这些术语需要结合收集器理解？

## 答案

传统分代语境中：

- **Minor GC / Young GC**：主要回收年轻代。
- **Major GC / Old GC**：通常指以老年代为主的回收，但不同资料和收集器对该术语定义并不统一。
- **Full GC**：通常表示覆盖整个 Java 堆，并可能同时处理类元数据等区域的全局回收，往往停顿更重。

这些名称不是 Java 虚拟机规范为所有收集器统一定义的严格分类。G1、ZGC、Shenandoah 等具有并发阶段、混合回收或不同代际模式，日志中的事件含义也不完全相同。

排查时不要只看名称，应结合收集器类型、GC 日志中的回收范围、触发原因、暂停时间、并发阶段和回收前后占用判断影响。
