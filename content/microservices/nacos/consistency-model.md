---
id: nacos-ap-cp-consistency-model
title: Nacos 是 AP 还是 CP？
category: 微服务 / Nacos
tags: [nacos, ap, cp, distro]
type: qa
---

## 问题

为什么不能简单把 Nacos 归类为 AP 或 CP？

## 答案

Nacos 同时管理不同语义的数据，不能给整个产品贴一个固定 AP/CP 标签。当前服务发现模型中，临时服务实例属于运行时状态，使用 Distro 等 AP-oriented 路径，更重视分区时的可用性；持久服务实例和需要强一致的元数据走 CP-oriented 的持久化与 Raft 路径。

选择来自业务语义：临时实例随进程上下线，短暂不一致通常可以通过健康检查和调用失败恢复；持久配置或元数据如果多节点各自接受冲突写入，会产生更严重的问题，因此倾向一致性。

面试回答应先说明“按数据类型选择一致性协议”，再举临时与持久实例的例子。不要背成“Nacos 默认 AP、切开关变 CP”这种忽略版本和数据模型的绝对结论，也不要把 CAP 中的可用性理解为日常 SLA。
