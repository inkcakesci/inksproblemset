---
id: js-event-loop
title: JavaScript 事件循环
category: 前端 / JavaScript
tags: [javascript, browser, event-loop]
createdAt: "2026-07-29T22:55:34+08:00"
type: qa
---

## 问题

JavaScript 事件循环是怎么工作的？宏任务、微任务和浏览器渲染是什么关系？

## 答案

浏览器通常会从宏任务队列中取出一个任务执行；任务完成后清空当前产生的微任务，然后浏览器才有机会进行渲染，之后进入下一轮事件循环。

## 要点

- `Promise.then`、`queueMicrotask` 属于微任务。
- `setTimeout`、用户交互回调通常作为宏任务处理。
- 微任务队列会持续清空；不断创建微任务可能阻塞渲染。
