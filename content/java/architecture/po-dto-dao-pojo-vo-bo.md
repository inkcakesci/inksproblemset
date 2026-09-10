---
id: java-po-dto-dao-pojo-vo-bo
title: PO、DTO、DAO、POJO、VO、BO 分别是什么？
category: Java / 分层设计
tags: [java, dto, dao, pojo, vo, bo]
createdAt: "2026-08-01T15:06:33+08:00"
type: qa
---

## 问题

Java 项目中的 PO、DTO、DAO、POJO、VO 和 BO 分别是什么？

## 答案

这些名称主要用于表达对象在分层架构中的职责，不是 Java 语言强制规定：

- **PO（Persistent Object）**：持久化对象，通常与数据库表或持久化记录对应。
- **DAO（Data Access Object）**：数据访问组件，封装数据库读写；它是组件职责，不是数据对象。
- **DTO（Data Transfer Object）**：数据传输对象，用于接口、服务或进程边界之间传递数据。
- **VO（View Object）**：面向展示或接口响应的对象，可隐藏内部字段并进行格式转换。部分团队也用 VO 表示 Value Object，应以项目约定为准。
- **BO（Business Object）**：承载业务语义或组合业务数据的对象。
- **POJO（Plain Old Java Object）**：不依赖特定重量级框架约束的普通 Java 对象。PO、DTO、VO、BO 都可以采用 POJO 形式。

常见数据流可以是：

```text
Database → DAO/Mapper → PO → Service/BO → DTO/VO → Controller → Client
```

实际项目不必机械地为每一层复制对象；是否拆分应根据边界隔离、安全性和复杂度决定。
