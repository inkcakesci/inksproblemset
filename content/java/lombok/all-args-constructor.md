---
id: lombok-all-args-constructor
title: Lombok @AllArgsConstructor 如何使用？
category: Java / Lombok
tags: [java, lombok, constructor, allargsconstructor]
type: qa
---

## 问题

Lombok 的 `@AllArgsConstructor` 有什么作用？使用时应注意什么？

## 答案

`@AllArgsConstructor` 会生成一个包含类中所有实例字段参数的构造器，不论字段是否为 `final`。

```java
@AllArgsConstructor
class UserDTO {
    private Long id;
    private String name;
}
```

效果类似于生成 `UserDTO(Long id, String name)`。它适合字段较少、构造语义清晰的数据对象。

当字段很多或多个字段类型相同时，全参构造器容易出现参数顺序错误；新增字段还会改变构造器签名。此时可以考虑 Builder、静态工厂方法、Record 或显式构造器，以提高可读性和兼容性。
