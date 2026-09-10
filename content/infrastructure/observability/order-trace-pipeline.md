---
id: observability-order-trace-kafka-elasticsearch
title: 订单追踪系统如何设计？
category: 基础设施 / 可观测性
tags: [mdc, kafka, elasticsearch, tracing]
createdAt: "2026-08-03T20:17:32+08:00"
type: qa
---

## 问题

支付订单追踪系统如何通过 MDC、Kafka 和 Elasticsearch 串起完整调用链？为什么不让业务服务同步写 ES？

## 答案

请求入口和业务代码先把 `traceId`、`orderId`、`bizNo`、`merchantId` 等稳定标识放入 MDC；Logback Appender 从日志事件和 MDC 提取结构化字段，按订单标识作为 Key 异步发送 Kafka；Collector 消费后写入按日期分区的 Elasticsearch 索引，运营查询接口再按业务字段检索。

Kafka 的价值是隔离支付服务与 ES：ES 变慢或短暂不可用时，不应直接增加支付请求延迟；同时 Kafka 能削峰并让 Collector 独立扩缩容。结构化字段也比仅搜索一段日志文本更容易关联订单全生命周期。

项目落点是 `OrderTraceKafkaAppender -> Kafka -> OrderTraceCollectorServiceImpl -> Elasticsearch -> AdminOrderLogQueryServiceImpl`。设计时还应补齐：

- 跨服务通过 Header 传递 trace/order 字段，入口验证长度和格式。
- 消息携带 schemaVersion，ES mapping 和索引生命周期可演进。
- 日志脱敏，禁止卡号、密钥和完整个人资料进入追踪系统。
- 追踪链路故障要告警，但按业务重要性决定是否影响主交易。
