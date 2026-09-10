---
id: java-hotspot-object-layout
title: Java 对象在 HotSpot JVM 中通常如何布局？
category: Java / JVM
tags: [java, jvm, object-layout, hotspot]
createdAt: "2026-08-01T23:07:01+08:00"
type: qa
---

## 问题

Java 对象在 HotSpot JVM 中通常由哪些部分组成？

## 答案

在常见 HotSpot 实现中，对象通常由对象头、实例数据和对齐填充三部分组成：

- **对象头**：包含 Mark Word 和类型指针；数组对象通常还包含数组长度。
- **实例数据**：保存对象的实例字段，具体排列会受到字段类型、继承关系和 JVM 布局策略影响。
- **对齐填充**：为满足对象对齐要求补充的空白字节，常见默认对齐为 8 字节，但可以受 JVM 参数影响。

Mark Word 会复用有限位数保存对象哈希、GC 年龄和同步状态等信息；类型指针指向或编码对象所属类型的元数据。开启压缩类指针等选项后，对象头大小可能变化。

对象布局是 JVM 实现细节，不是 Java 语言规范固定格式。需要精确分析时可使用 JOL，并注明 JDK、JVM 和启动参数。
