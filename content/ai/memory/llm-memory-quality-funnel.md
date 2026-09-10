---
id: llm-memory-quality-funnel
title: 如何建立长期记忆质量漏斗
category: AI / 长期记忆
tags: [LLM, Memory, Evaluation, Observability]
type: qa
---

## 问题

为什么只看长期记忆任务 completed 数量不能判断功能是否有效？应该建立怎样的质量漏斗？

## 答案

任务完成只说明 Worker 到达了某个终态，不代表产生了有效记忆，更不代表后续对话成功使用。完整漏斗至少应区分：

```text
scheduled → enqueued → claimed → extracted → accepted
→ persisted → recalled → injected → correctly used
```

每一层应记录数量、延迟和结构化拒绝原因，例如未到检查点、来源 stale、模型拒绝、合法空结果、去重 NOOP、预算淘汰或检索超时。指标只保存枚举、数量、稳定 ID/hash 和版本，不记录用户正文。

离线评测还要覆盖“该记住、该更新、该忘记、不该记住”，以及编辑、删除、重生和冲突。只有任务可靠性、召回质量和回答正确性同时可测，才能定位问题发生在哪一层。
