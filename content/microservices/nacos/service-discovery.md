---
id: nacos-service-registration-and-discovery
title: Nacos 如何完成服务注册与发现？
category: 微服务 / Nacos
tags: [nacos, service-discovery, load-balancer]
type: qa
---

## 问题

Nacos 是什么？服务注册与发现流程是什么？它会代理业务请求吗？

## 答案

Nacos 主要提供 Naming 服务注册发现和 Config 动态配置。它维护服务、实例、集群、健康状态和订阅关系，但通常不处在业务请求的数据路径中。

Provider 启动后通过 Nacos Client 注册 serviceName、IP、port、cluster 和 metadata；Consumer 订阅目标服务，获得并缓存健康实例列表。真正调用时，LoadBalancer 从候选实例中选择一个地址，Consumer 再直接向 Provider 发起 HTTP/RPC 请求。

因此两者职责不同：Nacos 回答“当前有哪些可用实例”，LoadBalancer 回答“这次调用选哪一个”。Nacos 短暂不可用时，客户端通常会利用本地缓存和故障转移能力继续发现，但实例列表可能变旧，仍需要调用超时、重试、熔断和监控。
