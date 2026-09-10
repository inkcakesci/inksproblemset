---
id: java-equals-hashcode-and-double-equals
title: Java 中 ==、equals() 和 hashCode() 有什么区别？
category: Java / 对象模型
tags: [java, object, equals, hashcode]
createdAt: "2026-08-01T15:06:33+08:00"
type: qa
---

## 问题

Java 中 `==`、`equals()` 和 `hashCode()` 分别有什么作用？为什么重写 `equals()` 时通常也要重写 `hashCode()`？

## 答案

`==` 比较基本类型时比较值，比较引用类型时判断两个引用是否指向同一个对象。

`equals()` 表示对象的逻辑相等规则。`Object` 默认实现与 `==` 等价，但 `String` 等类重写后会比较内容。

`hashCode()` 生成对象的哈希值，`HashMap`、`HashSet` 等哈希容器先用它定位桶，再通过 `equals()` 确认具体对象。

二者必须遵守契约：如果 `a.equals(b)` 为 `true`，则 `a.hashCode()` 和 `b.hashCode()` 必须相同；哈希值相同的对象不一定相等。

如果只重写 `equals()`，逻辑相等的对象可能被分配到不同桶，导致 `HashMap` 查找失败或 `HashSet` 保存逻辑重复元素。因此，参与逻辑相等判断的字段也应一致地参与哈希值计算。
