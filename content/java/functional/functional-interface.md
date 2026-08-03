---
id: java-functional-interface-and-common-types
title: Java 函数式接口是什么，常见类型有哪些？
category: Java / 函数式编程
tags: [java, functional-interface, predicate, function, consumer, supplier]
type: qa
---

## 问题

Java 函数式接口是什么？`Predicate`、`Function`、`Consumer` 和 `Supplier` 分别适合什么场景？

## 答案

函数式接口只有一个抽象方法，也称 SAM 接口，因此 Lambda 能明确对应到唯一行为。接口仍可以包含 `default`、`static` 方法，以及与 `Object` 公共方法匹配的声明。

- `Predicate<T>`：`boolean test(T)`，判断条件，如订单是否可退款。
- `Function<T, R>`：`R apply(T)`，类型转换，如支付订单转响应 DTO。
- `Consumer<T>`：`void accept(T)`，消费数据，如记录指标；应谨慎处理副作用和异常。
- `Supplier<T>`：`T get()`，延迟提供数据，如按需创建默认配置。

`@FunctionalInterface` 不是必需的，但能让编译器在接口意外增加第二个抽象方法时立即报错。

金额计算等核心规则不应为了使用 Lambda 而牺牲命名和可测试性；可以让命名清晰的领域服务实现函数式接口。
