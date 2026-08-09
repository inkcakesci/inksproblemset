---
id: java-hashmap-equals-hashcode-key-contract
title: HashMap 的 Key 为什么必须正确实现 equals 和 hashCode？
category: Java / 集合
tags: [java, hashmap, equals, hashcode]
type: qa
---

## 问题

作为 `HashMap` Key 的对象应满足什么 `equals()`/`hashCode()` 契约？可变 Key 为什么危险？

## 答案

最关键的契约是：如果两个对象 `equals()` 为 true，它们的 `hashCode()` 必须相同；反过来不要求成立，哈希相同可以只是碰撞。两种方法都应在对象未发生相等性字段变化时保持稳定。

若只重写 `equals()` 而不重写 `hashCode()`，逻辑相等的 Key 可能进入不同桶，导致查找和去重失败。若只看哈希不正确实现 `equals()`，不同业务对象又可能被当成同一个 Key。

插入后修改参与 `equals/hashCode` 的字段尤其危险：节点仍在旧桶，但新哈希会去另一个桶查找，于是 `get()`、`containsKey()` 和 `remove()` 看起来都找不到它。

因此优先使用不可变类型、record 或只包含稳定 ID 的 Key。IDE/Lombok 生成方法也要检查字段选择，不能把会变化的状态、懒加载集合或高开销对象无脑加入。
