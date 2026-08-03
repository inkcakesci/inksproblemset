---
id: observability-mdc-thread-pool-service-propagation
title: MDC 在线程池和跨服务调用中如何传递？
category: 基础设施 / 可观测性
tags: [mdc, thread-local, task-decorator, trace]
type: qa
---

## 问题

MDC 在线程池和跨服务调用中为什么会丢失？`ThreadLocal` 有什么风险，应该如何解决？

## 答案

MDC 通常基于 `ThreadLocal`，只绑定当前线程。任务切换到线程池后不会自动继承调用方上下文；线程又会被复用，如果不清理，A 请求的 traceId 还可能污染 B 请求。

项目中的 `MDCTaskDecorator` 在提交任务时复制 `MDC.getCopyOfContextMap()`，在线程池工作线程执行前设置，最后在 `finally` 中 `MDC.clear()`。入口 Filter 同样应保存必要上下文并在请求结束清理。

跨服务则需要 HTTP/RPC 客户端拦截器把 traceId、orderId 等放入 Header，下游入口校验并恢复 MDC。不能把整个 MDC 无条件透传，因为里面可能有敏感数据或超长字段。

通用 `ThreadLocal` 还可能因在线程池中未 `remove()` 导致对象长期被线程引用，形成内存泄漏。可靠模板是“保存旧上下文 -> 设置新上下文 -> 执行 -> 清理并按需恢复旧上下文”，同时覆盖异常和嵌套任务。
