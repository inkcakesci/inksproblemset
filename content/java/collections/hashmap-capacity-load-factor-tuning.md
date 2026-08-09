---
id: java-hashmap-capacity-load-factor-tuning
title: 如何设置 HashMap 初始容量和负载因子？
category: Java / 集合
tags: [java, hashmap, capacity, load-factor]
type: qa
---

## 问题

已知预计元素数量时，怎样设置 `HashMap` 容量以减少扩容？负载因子是否越低越快？

## 答案

默认负载因子 `0.75` 通常是时间和空间的良好折中。若预计写入 `n` 个不同 Key，可按约 `n / loadFactor` 估算所需桶容量，再让 HashMap 向 2 的幂取整，以避免写入过程中反复扩容。

在 JDK 19+ 可以优先使用：

```java
HashMap<K, V> map = HashMap.newHashMap(expectedSize);
```

较老版本可以显式传入经过溢出保护的估算容量，但不要把预计元素数直接误当成一定不会扩容的桶容量。

负载因子并非越低越好：降低它会增加桶数组和内存占用，还会让遍历成本上升，因为 HashMap 视图遍历大致与 `capacity + size` 有关；设置过高又会增加碰撞和查找成本。容量也不能盲目给得巨大，应基于可测的规模和访问模式调优。
