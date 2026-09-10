---
id: java-method-overloading-vs-overriding
title: Java 方法重载和方法重写有什么区别？
category: Java / 语言基础
tags: [java, overloading, overriding, polymorphism]
createdAt: "2026-08-01T15:06:33+08:00"
type: qa
---

## 问题

Java 的方法重载（Overloading）和方法重写（Overriding）有什么区别？

## 答案

重载发生在同一个类或继承体系的可见方法中：方法名相同，但参数列表不同，由编译器根据实参在编译期决定调用哪个方法，因此常称为编译时多态。

```java
int add(int a, int b) { return a + b; }
double add(double a, double b) { return a + b; }
```

返回类型不能单独作为重载依据，因为调用方可能忽略返回值，编译器无法据此消除歧义。

重写发生在父子类之间：子类为父类可继承的方法提供新的实现，方法签名相同，返回类型相同或协变，访问权限不能更严格。实际调用的方法由对象运行时类型决定，因此属于运行时多态。

```java
Animal animal = new Dog();
animal.speak(); // 调用 Dog 的实现
```

使用 `@Override` 可以让编译器帮助检查是否真正完成了重写。
