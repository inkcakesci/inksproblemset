---
id: java-stream-lazy-intermediate-terminal
title: Stream 的惰性求值、中间操作和终止操作是什么？
category: Java / Stream
tags: [java, stream, lazy-evaluation, terminal-operation]
type: qa
---

## 问题

Java Stream 为什么是惰性求值？中间操作和终止操作有什么区别？

## 答案

`filter`、`map`、`sorted` 等中间操作只组装流水线，通常不会立即遍历数据；`collect`、`toList`、`count`、`reduce`、`forEach` 等终止操作才触发执行。

惰性执行让 Stream 能融合多个步骤，并配合 `findFirst`、`anyMatch`、`limit` 等短路操作，只处理得到结果所需的元素。

```java
boolean hasRiskOrder = orders.stream()
    .filter(Order::isPending)
    .anyMatch(riskService::isHighRisk);
```

`anyMatch` 找到第一个匹配项后即可停止。但如果把有副作用的逻辑放进 `filter` 或 `peek`，实际执行次数可能与直觉不同。业务代码不应依赖中间操作必然对每个元素执行。
