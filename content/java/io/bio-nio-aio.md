---
id: java-bio-nio-aio-comparison
title: Java BIO、NIO 和 AIO 有什么区别？
category: Java / IO
tags: [java, io, bio, nio, aio]
type: qa
---

## 问题

Java BIO、NIO 和 AIO 分别是什么？它们的线程与事件处理模型有什么区别？

## 答案

- **BIO** 通常指基于 `InputStream`、`OutputStream` 和传统 `Socket` 的阻塞式 IO。线程执行读写时会等待操作完成。传统服务器常采用一个连接一个线程或线程池模型，但这不是 BIO API 强制规定的唯一架构。
- **NIO** 提供 `Channel`、`Buffer`、`Selector` 等组件。网络通道可配置为非阻塞，一个线程能够通过 Selector 监听多个连接的就绪事件，再处理可读、可写或连接事件。
- **AIO/NIO.2** 提供 `AsynchronousChannel` 系列 API。程序提交异步操作后，通过 `Future` 或完成回调接收结果；底层是否真正使用操作系统异步 IO 取决于平台和 JDK 实现。

BIO 编程模型简单，适合连接数较少或阻塞不是瓶颈的场景；NIO 适合大量连接和事件驱动服务，但状态管理更复杂；AIO 采用完成通知模型，但生态使用程度和平台表现需要结合实际评估。

不能脱离连接数量、任务耗时和实现质量，简单断言 NIO/AIO 一定比 BIO 更快。
