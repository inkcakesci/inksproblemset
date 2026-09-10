---
id: java-stream-common-operations
title: Stream 常见操作如何用于业务集合处理？
category: Java / Stream
tags: [java, stream, filter, map, reduce, grouping]
createdAt: "2026-08-03T20:06:03+08:00"
type: qa
---

## 问题

Java Stream 的 `filter`、`map`、`reduce` 和 `groupingBy` 分别适合什么业务场景？

## 答案

- `filter`：保留满足条件的元素，例如筛选成功支付单。
- `map`：把元素转换为另一种形式，例如领域对象转 DTO。
- `reduce`：把多个元素归并为一个值，例如金额求和；金额必须使用 `BigDecimal` 或最小货币单位，不能使用 `double`。
- `Collectors.groupingBy`：按渠道、商户或状态分组统计。

```java
Map<String, Long> successCountByChannel = payments.stream()
    .filter(Payment::isSucceeded)
    .collect(Collectors.groupingBy(
        Payment::getChannelCode,
        Collectors.counting()
    ));
```

Stream 适合已经加载到内存、规模可控的集合转换。不要为了一行链式代码混入远程调用、逐条 SQL 或状态更新，以免形成 N+1、难以重试和部分成功问题。
