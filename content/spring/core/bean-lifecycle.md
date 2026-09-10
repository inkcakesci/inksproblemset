---
id: spring-bean-lifecycle
title: Spring Bean 的生命周期是什么？
category: Spring / 核心
tags: [spring, bean, lifecycle, beanpostprocessor]
createdAt: "2026-08-01T23:07:01+08:00"
type: qa
---

## 问题

Spring Bean 从创建到销毁通常经历哪些生命周期阶段？

## 答案

典型单例 Bean 的主要流程是：

1. 实例化 Bean。
2. 填充属性和依赖。
3. 调用相关 Aware 回调，让 Bean 获得容器上下文信息。
4. 执行 `BeanPostProcessor` 的初始化前处理。
5. 执行初始化回调，例如 `@PostConstruct`、`InitializingBean.afterPropertiesSet()` 和自定义 init-method。
6. 执行 `BeanPostProcessor` 的初始化后处理；AOP 代理常在后处理阶段创建或暴露。
7. Bean 进入可用状态。
8. 容器正常关闭时执行销毁回调，例如 `@PreDestroy`、`DisposableBean.destroy()` 和自定义 destroy-method。

具体细节会受 Bean 作用域、循环依赖、后处理器和代理方式影响。Prototype Bean 创建后，Spring 通常不会自动管理其完整销毁过程。
