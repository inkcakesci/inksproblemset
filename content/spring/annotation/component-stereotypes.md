---
id: spring-component-service-repository-controller
title: Spring 的 @Component、@Service、@Repository 和 @Controller 有什么区别？
category: Spring / 注解
tags: [spring, component, service, repository, controller]
createdAt: "2026-08-01T23:07:01+08:00"
type: qa
---

## 问题

Spring 中 `@Component`、`@Service`、`@Repository` 和 `@Controller` 有什么区别？

## 答案

它们都可以让类成为组件扫描候选并注册为 Spring Bean，但表达的分层语义和附加处理有所不同：

- `@Component`：通用组件。
- `@Service`：业务服务层组件，目前主要提供清晰的架构语义。
- `@Repository`：数据访问层组件；配合相关基础设施时，还可参与持久化异常转换。
- `@Controller`：Spring MVC 控制器，由 Web MVC 基础设施处理请求映射。

`@Service`、`@Repository` 和 `@Controller` 都以 `@Component` 作为元注解。按职责使用专用注解能提高可读性，也让框架或工具有机会针对特定角色提供附加行为。
