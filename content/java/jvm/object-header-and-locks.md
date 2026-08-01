---
id: java-object-header-and-synchronized-locks
title: Java 对象头为什么与 synchronized 锁有关？
category: Java / JVM
tags: [java, jvm, object-header, synchronized, lock]
type: qa
---

## 问题

Java 对象头为什么与 `synchronized` 锁有关？“无锁、偏向锁、轻量级锁、重量级锁”还是固定升级流程吗？

## 答案

HotSpot 会利用对象头中的 Mark Word 编码同步相关状态，必要时还会关联锁记录或监视器，因此对象本身可以作为 `synchronized` 的监视器。

经典 JDK 8 资料常描述无锁、偏向锁、轻量级锁和重量级锁等状态，并在竞争加剧时升级。但这不是 Java 语言规范承诺的固定单向流程，而且实现随 JDK 演进：偏向锁后来被默认禁用并已从现代 HotSpot 中移除，轻量级锁实现也持续变化。

面试时应先回答：`synchronized` 的快速路径和锁状态与 HotSpot 对象头及监视器实现有关；再说明具体位布局、锁状态和优化策略必须带上 JDK 版本，不能把 JDK 8 的实现细节当成所有版本的永久规则。
