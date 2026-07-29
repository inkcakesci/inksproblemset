---
id: spring-core-design-patterns
title: Spring 中使用了哪些核心设计模式？
category: Spring / 核心
tags: [spring, design-patterns, ioc, aop]
type: qa
---

## 问题

Spring 中使用了哪些核心设计模式或设计思想？请结合常见组件说明。

## 答案

Spring 最核心的设计思想是 IoC 和 DI，由容器统一管理对象及其依赖关系。常见模式包括：

- **工厂模式**：`ApplicationContext` 可以理解为一个大型 Bean 工厂，负责创建和获取 Bean。
- **代理模式**：Spring AOP 和声明式事务通常通过 JDK 动态代理或 CGLIB 代理，在方法调用前后添加事务、日志、权限等逻辑。
- **单例模式**：Bean 默认是容器级单例，因此 Service 通常应尽量保持无状态，避免共享可变字段引发线程安全问题。
- **模板方法思想**：`JdbcTemplate`、`RedisTemplate` 等封装资源获取、异常处理和释放等固定流程，开发者提供 SQL、参数或回调。

Spring Boot 还强调约定优于配置和条件化自动配置。它会根据 classpath、已有 Bean 和配置属性决定创建哪些 Bean，从而减少手动配置。
