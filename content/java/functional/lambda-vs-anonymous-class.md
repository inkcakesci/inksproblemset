---
id: java-lambda-vs-anonymous-class
title: Lambda 和匿名内部类有什么区别？
category: Java / 函数式编程
tags: [java, lambda, anonymous-class, invokedynamic]
type: qa
---

## 问题

Java Lambda 和匿名内部类有什么区别？

## 答案

Lambda 只能用于函数式接口，强调实现一个行为；匿名内部类会声明一个匿名类，可以实现接口或继承类，并拥有自己的成员和对象身份。

重要区别包括：

- Lambda 中的 `this` 指向外围实例；匿名内部类中的 `this` 指向匿名类实例。
- Lambda 不会引入新的变量作用域，不能重新声明外围局部变量同名变量；匿名内部类有自己的类作用域。
- Lambda 通常通过 `invokedynamic` 等机制链接实现，不应简单理解为每个 Lambda 都生成一个独立匿名 class 文件。
- 两者捕获的局部变量都必须是 final 或 effectively final。

只表达一个短行为时优先 Lambda；需要额外状态、多方法或明确类型语义时，使用命名类或匿名内部类更清晰。
