---
id: lombok-required-args-constructor
title: Lombok @RequiredArgsConstructor 如何使用？
category: Java / Lombok
tags: [java, lombok, constructor, requiredargsconstructor, spring]
type: qa
---

## 问题

Lombok 的 `@RequiredArgsConstructor` 会生成什么构造器？为什么常用于 Spring 构造器注入？

## 答案

`@RequiredArgsConstructor` 为所有未初始化的 `final` 字段，以及标记了 Lombok `@NonNull` 的字段生成构造器。

```java
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserMapper userMapper;
}
```

它会生成接收 `UserMapper` 的构造器。Spring Bean 只有一个构造器时可以省略构造器上的 `@Autowired`，因此这种写法能简洁地表达构造器注入，并让依赖字段保持 `final`。

需要注意：这是编译期生成代码。团队应确保 IDE、构建工具和代码审查环境正确支持 Lombok；对于需要明确公共 API 的代码，手写构造器有时可读性更好。
