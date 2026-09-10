---
id: canonical-business-idempotency-key
title: 如何用规范业务身份设计跨服务幂等键
category: 分布式系统 / 任务队列
tags: [Idempotency, Canonicalization, Distributed-System]
createdAt: "2026-09-10T18:42:30+08:00"
type: qa
---

## 问题

多个服务可能为同一业务事件创建任务时，为什么幂等键必须基于规范业务身份，而不能直接使用各端收到的参数？

## 答案

幂等键只有在所有生产者对“同一件事”的表示完全一致时才有效。不同服务若分别使用用户消息、助手回复、不同字段顺序或不同哈希规则，同一轮业务会生成不同键，数据库唯一约束也无法阻止重复任务。

设计时应先定义 canonical identity，例如：

```text
tenant + operation_type + canonical_source_id + source_revision
```

然后固定角色归一规则、字符串规范化、可选字段、JSON 键顺序、字符编码和哈希版本，并用跨语言 fixture 验证结果一致。幂等键应表达稳定业务意图，而不是 HTTP 请求、进程实例或数组下标。

修改 canonicalization 属于协议变更。需要兼容历史键、评估已存在数据，并防止滚动发布期间新旧生产者分别生成一条任务。
