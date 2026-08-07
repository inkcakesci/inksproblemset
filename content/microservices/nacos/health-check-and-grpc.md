---
id: nacos-health-check-and-grpc-connection
title: Nacos 如何判断实例存活，2.x 为什么引入 gRPC？
category: 微服务 / Nacos
tags: [nacos, health-check, grpc, heartbeat]
type: qa
---

## 问题

Nacos 如何维护实例健康状态？Nacos 2.x 引入 gRPC 长连接带来了什么变化？

## 答案

健康机制要区分临时和持久实例。临时实例依赖活跃客户端：gRPC SDK 下实例与客户端连接关联，连接释放后服务端会移除相应运行时状态，客户端重连后按本地 redo 数据恢复注册和订阅；HTTP 兼容客户端则需要心跳续约。持久实例可由服务端使用 TCP、HTTP 等探测方式维护健康状态。

Nacos 2.x 的重要变化是客户端与服务端大量通信转向 gRPC 长连接，便于注册、订阅和变更推送，减少频繁 HTTP 轮询开销。部署时除了常见的 8848 主端口，还要正确转发客户端 gRPC 端口；默认规则通常是主端口加 1000，即 9848。

不能只回答“通过心跳检测”：实例类型、客户端协议和 Nacos 版本不同，存活语义也不同。生产环境还要监控连接数、推送失败、客户端重连和实例保护阈值。
