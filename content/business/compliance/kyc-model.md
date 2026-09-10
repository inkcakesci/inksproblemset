---
id: compliance-kyc-aml-level-model
title: KYC、AML 与交易额度建模
category: 业务 / 合规
tags: [KYC, AML, Sanctions, Limit]
createdAt: "2026-08-03T20:06:03+08:00"
type: qa
---

## 问题

身份资料上传为什么不能直接称为完整 KYC？如何设计 KYC Level、审核状态、人工复核、AML/制裁筛查和交易额度？

## 答案

上传证件只是收集资料，完整 KYC 还包括身份真实性验证、风险评估、审核决策、制裁与 AML 筛查、持续监控和可审计记录。因此应把 KYC 建模为独立 Case：包含 level、审核状态、资料版本、自动检查、人工复核、决策原因和审计日志，而不是在 User 表放一个 `kyc=true`。

交易入口由后端统一的 policy/eligibility service 检查 KYC Level、国家、产品风险、制裁结果和日/月额度。前端只能展示结果，不能成为最终拦截点。

### 展开回答

- 状态可包括 `NOT_STARTED/IN_REVIEW/ACTION_REQUIRED/APPROVED/REJECTED/EXPIRED`，迁移必须受控。
- KYC Level 对应允许的产品、单笔与累计额度，而不是仅代表上传了多少文件。
- Screening 保存 provider、名单版本、命中项、处置结果和复核人，支持重新筛查。
- 高风险、信息不一致或模糊命中进入人工队列，所有查看和决策都有审计记录。
- 客户资料变化、证件到期和名单更新应触发重新审核，批准不是永久状态。

### 项目实践

在创建 Trade、入金、出金和提高额度前调用同一套后端策略，返回稳定的拒绝原因供前端与运营后台展示。具体级别、名单和额度必须由目标司法辖区的合规与法律团队确认，不能只靠工程经验决定。
