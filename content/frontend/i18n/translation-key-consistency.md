---
id: frontend-i18n-key-consistency
title: 多语言资源 Key 一致性
category: 前端 / 国际化
tags: [i18n, English, French, Chinese]
createdAt: "2026-08-03T20:06:03+08:00"
type: qa
---

## 问题

如何保证 English、French 和 Chinese 的翻译 key 完整一致？

## 答案

选一个 canonical locale 或独立 schema 作为 Key 集合，在 CI 中递归比较 English、French、Chinese 的所有 Key，缺失、额外、类型不一致都直接失败。同时检查插值变量和复数规则，例如英文使用 `{{count}}`，其他语言也必须保留同名参数。

可以从 canonical 资源生成 TypeScript Key Union，让代码只能引用存在的 Key。运行时 fallback 只用于容错，不能让 CI 因有默认语言就放过漏翻。

### 展开回答

- 按业务域拆分 namespace，但每种语言保持相同目录和对象结构。
- 检查空字符串、未翻译占位、HTML/Markdown 格式以及日期和金额本地化。
- 删除 Key 前先确认所有代码引用已移除，避免生产页面显示原始 Key。
- 开发环境突出显示缺失翻译，生产记录监控但避免泄露内部信息。
- 支付、KYC 和拒绝原因需要业务与合规复核，不能只做机械直译。

### 项目实践

在测试中加载三种 locale，比较扁平化后的 Key 集合及 placeholder 集合；Pull Request 新增英文文案但未补法语或中文时立即阻止合并。
