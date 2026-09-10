---
id: lombok-no-args-constructor
title: Lombok @NoArgsConstructor 如何使用？
category: Java / Lombok
tags: [java, lombok, constructor, noargsconstructor]
createdAt: "2026-08-01T15:06:33+08:00"
type: qa
---

## 问题

Lombok 的 `@NoArgsConstructor` 有什么作用？常见使用场景和注意事项是什么？

## 答案

`@NoArgsConstructor` 为类生成无参构造器：

```java
@NoArgsConstructor
class User {
    private String name;
}
```

效果类似于显式声明 `User() {}`。它常用于需要通过无参构造器实例化对象的序列化、ORM 或反射框架，但是否必须取决于具体框架和配置。

如果类中存在未初始化的 `final` 字段，普通无参构造器无法完成初始化，编译会失败。`force = true` 可以把这些字段初始化为 Java 默认值，但可能暂时破坏对象不变量，应谨慎使用。

还可以通过 `access` 调整构造器可见性，例如 `@NoArgsConstructor(access = AccessLevel.PROTECTED)`。
