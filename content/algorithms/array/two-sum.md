---
id: algorithm-two-sum
title: 两数之和
category: 算法 / 数组
tags: [array, hash-table]
createdAt: "2026-07-29T22:55:34+08:00"
type: algorithm
difficulty: easy
---

## 问题

给定一个整数数组和目标值，返回数组中和为目标值的两个元素下标。假定恰好存在一个答案，且同一元素不能重复使用。

## 思路

遍历数组时，用哈希表保存已经访问过的数字及其下标。对于当前数字 `value`，查询 `target - value` 是否已存在。

## TypeScript 解法

```ts
function twoSum(nums: number[], target: number): number[] {
  const seen = new Map<number, number>()
  for (let index = 0; index < nums.length; index++) {
    const otherIndex = seen.get(target - nums[index])
    if (otherIndex !== undefined) return [otherIndex, index]
    seen.set(nums[index], index)
  }
  return []
}
```

## 复杂度

- 时间复杂度：`O(n)`
- 空间复杂度：`O(n)`

## 易错点

先查询再写入哈希表，避免同一个元素被使用两次。
