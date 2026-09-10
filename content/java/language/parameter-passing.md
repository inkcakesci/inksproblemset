---
id: java-parameter-passing-is-pass-by-value
title: Java 参数传递是值传递还是引用传递？
category: Java / 语言基础
tags: [java, parameter-passing, reference, jvm]
createdAt: "2026-07-31T21:00:27+08:00"
type: qa
---

## 问题

Java 的参数传递是值传递还是引用传递？为什么方法能够修改对象内容，却不能替换调用方持有的对象？

## 答案

Java 只有值传递，没有引用传递。

传递基本类型时，方法得到的是基本类型值的副本；传递对象时，方法得到的是“对象引用值”的副本，而不是调用方变量本身。

因此，方法可以通过复制得到的引用访问并修改同一个对象的内部状态：

```java
static void rename(User user) {
    user.setName("Alice");
}

User user = new User("Bob");
rename(user);
// user.getName() 是 "Alice"
```

但是，让形参指向一个新对象，只会改变方法内部那份引用副本，不会改变调用方变量：

```java
static void replace(User user) {
    user = new User("Alice");
}

User user = new User("Bob");
replace(user);
// 调用方的 user 仍然指向原来的 User("Bob")
```

如果 Java 是引用传递，方法重新给形参赋值时，调用方变量也会跟着指向新对象；实际并不会发生这种情况。

一句话：基本类型复制具体值，对象类型复制引用值；两者本质上都是值传递。
