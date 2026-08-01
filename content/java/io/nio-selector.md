---
id: java-nio-selector
title: Java NIO Selector 是什么？
category: Java / IO
tags: [java, nio, selector, channel]
type: qa
---

## 问题

Java NIO 的 `Selector` 是什么？它如何让一个线程管理多个网络连接？

## 答案

`Selector` 是 Java NIO 的 IO 多路复用组件。多个非阻塞 `SelectableChannel` 可以注册到同一个 Selector，并声明关注连接、接收、读取或写入等就绪事件。

线程调用 `select()` 等待事件；返回后遍历 selected keys，只处理已经就绪的 Channel，而不需要为每个连接分配一个持续阻塞的线程。

```text
多个 Channel → Selector → 一个事件循环线程
```

需要注意，Selector 通知的是“某项操作已经就绪”，并不会替应用完成业务处理。应用仍需正确处理部分读写、兴趣事件更新、连接关闭，以及不能在事件循环中执行长时间阻塞任务。
