---
id: java-hashmap-hash-spread-and-bucket-index
title: HashMap 如何根据 Key 定位桶？
category: Java / 集合
tags: [java, hashmap, hash, bucket]
type: qa
---

## 问题

JDK 8+ 的 `HashMap` 如何从 `key.hashCode()` 计算哈希值和桶下标？为什么还要做扰动？

## 答案

核心过程是：先取得 Key 的 `hashCode()`，再让高位信息参与低位，最后用数组长度减一做位与运算定位桶。

JDK 8 的典型实现可以概括为：

```java
int h = key == null ? 0 : key.hashCode();
int hash = h ^ (h >>> 16);
int index = (table.length - 1) & hash;
```

因为桶数组长度保持为 2 的幂，`length - 1` 的低位是一串 1，位与运算等价于高效取模。若直接只取原始哈希低位，一些 Key 即使高位差异很大，也可能集中到同一桶；把高 16 位异或到低位能以较低成本改善分布。

扰动不是密码学哈希，也不能修复一个始终返回常数的 `hashCode()`。这些公式属于具体 JDK 实现细节；`Map` 接口只要求相等性和映射语义，不承诺桶结构。
