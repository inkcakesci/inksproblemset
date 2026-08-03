---
id: observability-logback-kafka-appender-pitfalls
title: Logback Appender 发送 Kafka 有哪些坑？
category: 基础设施 / 可观测性
tags: [logback, kafka, recursion, non-blocking]
type: qa
---

## 问题

在自定义 Logback Appender 中把订单日志发送到 Kafka，需要防范哪些问题？

## 答案

Appender 位于日志热路径，第一原则是不阻塞和不拖垮主业务。发送应异步、设置超时和缓冲上限；Kafka 不可用时按追踪日志的重要性丢弃或降级，并用限频告警暴露问题，不能无限堆积内存。

最大的特殊风险是递归日志：Appender 内部或 Kafka Client 自己打出的日志若再次被同一 Appender 捕获，会形成递归甚至日志风暴。项目中会排除 `org.apache.kafka`、`org.springframework.kafka` 和 Appender 自身 logger，并使用 `AtomicBoolean` 只记录一次重复错误。

`OrderTraceKafkaAppender` 还使用异步 callback 观察发送结果，并在 Spring Bean 不可用时构造 fallback `KafkaTemplate`。面试时可以继续指出：

- fallback producer 必须在 Appender stop 时关闭，避免资源泄露。
- 只发送含订单业务上下文的日志，避免把所有应用日志灌进同一 Topic。
- payload 构造失败不能反向抛出影响支付请求。
- 若日志属于资金审计而非普通追踪，就不能简单丢弃，应改用事务 Outbox 或同步持久化。
