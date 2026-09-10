---
id: java-netty-and-nio-relationship
title: Netty 和 Java NIO 是什么关系？
category: Java / IO
tags: [java, netty, nio, event-loop]
createdAt: "2026-08-01T15:06:33+08:00"
type: qa
---

## 问题

Netty 和 Java NIO 是什么关系？Netty 只是对 `Selector` 的简单封装吗？

## 答案

Netty 是事件驱动的异步网络应用框架。它可以基于 Java NIO 实现网络传输，并在其上封装连接生命周期、事件循环、缓冲区、编解码、Pipeline、背压和异常处理等能力，因此远不只是对 `Selector` 的简单包装。

在常见 NIO 传输中，Netty 的 EventLoop 使用 Selector 管理多个 Channel，并把 IO 事件沿 ChannelPipeline 交给 Handler 处理。

Netty 还提供或支持不同平台的传输实现，例如 Linux epoll、Linux io_uring 和 macOS/BSD kqueue；具体可用能力取决于 Netty 版本、依赖和运行平台。

使用 Netty 的主要价值是复用成熟的网络编程抽象和工程能力，避免业务代码直接处理 NIO 中大量复杂边界条件。
