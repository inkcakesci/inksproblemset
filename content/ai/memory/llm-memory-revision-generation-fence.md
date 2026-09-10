---
id: llm-memory-revision-generation-fence
title: LLM 记忆为什么需要 Revision 和 Generation 围栏
category: AI / 长期记忆
tags: [LLM, Memory, Revision, Fencing]
type: qa
---

## 问题

长期记忆已经保存来源消息 ID，为什么还需要 source revision 和 conversation generation？

## 答案

消息 ID 只能标识对象，不能证明内容和会话分支仍是提取时的版本。Source revision 绑定规范化消息内容及必要元数据；conversation generation 则标识删除、重生或整体分支切换后的会话世代。

因此同一消息被编辑时 ID 不变但 revision 改变，旧事实会失效；会话被重建时，即使部分消息 ID 被保留，旧 generation 的记忆也不能复活。

Revision 的算法本身是跨端协议：引用内容、可见性、字段顺序、Unicode 和 JSON 编码差异都会造成 PHP、Java 等生产者生成不同幂等键。应提供版本化 canonicalization 和固定测试向量，同时在迁移期兼容已存在的旧 revision。
