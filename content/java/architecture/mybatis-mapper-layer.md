---
id: java-mybatis-mapper-is-data-access-layer
title: MyBatis Mapper 属于哪一层？
category: Java / 分层设计
tags: [java, mybatis, mapper, dao]
type: qa
---

## 问题

MyBatis Mapper 属于哪一层？它与传统 DAO 有什么关系？

## 答案

MyBatis Mapper 通常属于数据访问层，职责上相当于 DAO。

传统 JDBC 项目可能由 DAO 接口、手写实现类和 JDBC 代码组成；MyBatis 中，开发者声明 Mapper 接口及 SQL 映射，由 MyBatis 在运行时生成代理实现，负责执行 SQL、参数绑定和结果映射。

```text
Service → Mapper 接口 → MyBatis 代理 → SQL → Database
```

Mapper 不应承载复杂业务规则。需要组合多个 Mapper、处理事务或表达业务流程的逻辑，通常放在 Service 层。
