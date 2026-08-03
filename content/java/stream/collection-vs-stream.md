---
id: java-collection-vs-stream
title: Java Collection 和 Stream 有什么区别？
category: Java / Stream
tags: [java, collection, stream, pipeline]
type: qa
---

## 问题

Java `Collection` 和 `Stream` 有什么区别？Stream 是否保存或修改数据？

## 答案

Collection 是保存元素的数据结构；Stream 是描述数据处理步骤的一次性流水线，本身不保存元素。

Stream 从集合、数组或其他数据源读取数据，经过 `filter`、`map`、`sorted` 等操作后，由终止操作产生结果。原集合默认不会因为 Stream 操作自动改变，但如果 Lambda 主动修改元素或源集合，仍可能产生副作用和并发问题。

Stream 只能被终止消费一次；需要再次处理时，应从数据源重新创建 Stream。

```java
List<PaymentDTO> result = payments.stream()
    .filter(Payment::isSucceeded)
    .map(PaymentDTO::from)
    .toList();
```

支付核心流程应避免在 Stream 中隐藏数据库写入、远程调用等副作用，否则失败位置、重试边界和事务语义会变得难以判断。
