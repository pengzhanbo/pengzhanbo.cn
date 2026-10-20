---
url: /algorithm/backtracking/index.md
---
## 概述

\==回溯算法== 是一种通过尝试所有可能的候选解来解决问题的通用算法。

当发现当前候选解不可能满足条件时，会回退（回溯）到上一步，尝试其他选择。
它本质上是 **深度优先搜索（DFS）** 的一种优化形式，通过剪枝减少不必要的搜索。

## 核心思想

* **试错**：逐步构建候选解
* **剪枝**：发现无效解时立即回溯
* **状态管理**：记录当前路径，回溯时撤销选择

```ts
function backtrack(路径: 解的部分, 选择列表: 可用选项): void {
  if (满足结束条件) {
    结果集.push(路径副本) // 保存有效解
    return
  }

  for (选择 of 选择列表) {
    if (无效选择)
      continue // 剪枝

    做选择
    backtrack(新路径, 新选择列表)
    撤销选择 // 关键：状态重置
  }
}
```

## 实现

### 子集问题（无重复元素）

```ts
function subsets(nums: number[]): number[][] {
  const res: number[][] = []

  const backtrack = (start: number, path: number[]) => {
    res.push([...path]) // 保存当前子集

    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]) // 做选择
      backtrack(i + 1, path) // 递归
      path.pop() // 撤销选择
    }
  }

  backtrack(0, [])
  return res
}

// 示例：subsets([1,2,3])
// 输出：[[],[1],[1,2],[1,2,3],[1,3],[2],[2,3],[3]]
```

### 全排列（无重复元素）

```ts
function permute(nums: number[]): number[][] {
  const res: number[][] = []
  const used: boolean[] = Array.from({ length: nums.length }).fill(false)

  const backtrack = (path: number[]) => {
    if (path.length === nums.length) {
      res.push([...path])
      return
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i])
        continue // 剪枝：已使用

      used[i] = true
      path.push(nums[i])
      backtrack(path)
      path.pop()
      used[i] = false // 关键：撤销状态
    }
  }

  backtrack([])
  return res
}

// 示例：permute([1,2,3])
// 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```

## 优化技巧

* **剪枝策略**：

  * 提前终止无效路径（如组合总和中的 `sum > target`）
  * 跳过重复解（排序后判断 `if (i > start && nums[i] === nums[i-1])` ）

* **状态存储**：

  * 使用索引（`start`）避免重复组合
  * 使用布尔数组（`used[]`）标记已选元素

* **迭代代替递归**：

  * 对于深度大的问题，可用栈模拟递归

* **记忆化搜索**：

  * 缓存中间结果（适用于重叠子问题）

## 相关问题

[**LeetCode** - 回溯算法](https://leetcode.cn/problem-list/backtracking/){.read-more}

### 组合与求和问题

* **39. 组合总和**（[LeetCode](https://leetcode.cn/problems/combination-sum/)）
* **40. 组合总和 II**（[LeetCode](https://leetcode.cn/problems/combination-sum-ii/)）
* **216. 组合总和 III**（[LeetCode](https://leetcode.cn/problems/combination-sum-iii/)）

### 子集与排列问题

* **78. 子集**（[LeetCode](https://leetcode.cn/problems/subsets/)）
* **90. 子集 II**（[LeetCode](https://leetcode.cn/problems/subsets-ii/)）
* **46. 全排列**（[LeetCode](https://leetcode.cn/problems/permutations/)）
* **47. 全排列 II**（[LeetCode](https://leetcode.cn/problems/permutations-ii/)）

### 字符串与构造问题

* **22. 括号生成**（[LeetCode](https://leetcode.cn/problems/generate-parentheses/)）
* **51. N 皇后**（[LeetCode](https://leetcode.cn/problems/n-queens/)）
