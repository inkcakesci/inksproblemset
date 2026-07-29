# 题目内容规范

每个 Markdown 文件对应一个知识点页面和一张复习卡片。

## 必填 Front Matter

```yaml
---
id: 稳定且唯一的英文短横线标识
title: 题目标题
category: 一级分类 / 二级分类
tags: [标签一, 标签二]
type: qa
---
```

`type` 只能是 `qa` 或 `algorithm`。算法题可以增加 `difficulty: easy | medium | hard`。

普通问答必须包含 `## 问题` 和 `## 答案`。算法题必须包含 `## 问题` 和 `## 思路`。

- 一篇文件只考察一个核心概念。
- `id` 发布后不可修改，否则本地复习记录会失去关联。
- 添加前先搜索相近标题、ID 和标签，避免重复。
- 答案先给结论，再补充推导和例子。
- 运行 `npm run content:check` 校验全部内容。
