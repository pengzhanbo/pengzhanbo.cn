---
url: /algorithm/selection-sort/index.md
---
## 概述

\==选择排序（Selection sort）== 是一种简单直观的排序算法。

### 核心思想

**每次从未排序部分中选择最小（或最大）元素，将其与未排序部分的起始位置交换。** 重复此过程直到所有元素有序。

## 算法步骤

1. 将数组分为 已排序区（左侧）和 未排序区（右侧）
2. 初始状态：已排序区为空，未排序区为整个数组
3. 遍历未排序区，找到最小元素的索引
4. 将最小元素与未排序区的第一个元素交换
5. 将已排序区向右扩展一位
6. 重复步骤 3-5 直到未排序区为空

## 时间复杂度

选择排序的最优时间复杂度、平均时间复杂度和最坏时间复杂度均为 $O(n^2)$。

## 空间复杂度

$O(1)$（原地排序，不需要额外空间）

## 稳定性

**不稳定排序**（交换操作可能改变相等元素的原始顺序）

## 伪代码

$$
\begin{array}{ll}
1 & \textbf{Input. } \text{An array } A \text{ consisting of }n\text{ elements.} \\
2 & \textbf{Output. } A\text{ will be sorted in nondecreasing order.} \\
3 & \textbf{Method. }  \\
4 & \textbf{for } i\gets 1\textbf{ to }n-1\\
5 & \qquad ith\gets i\\
6 & \qquad \textbf{for }j\gets i+1\textbf{ to }n\\
7 & \qquad\qquad\textbf{if }A\[j]\<A\[ith]\\
8 & \qquad\qquad\qquad ith\gets j\\
9 & \qquad \text{swap }A\[i]\text{ and }A\[ith]\\
\end{array}
$$

## 实现

```ts
function selectionSort(arr: number[]): number[] {
  const len = arr.length

  for (let i = 0; i < len - 1; i++) {
    // 1. 在未排序区寻找最小值索引
    let minIndex = i
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j // 更新最小元素索引
      }
    }

    // 2. 将最小值交换到未排序区起始位置
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]] // ES6解构赋值交换
    }
    // 此时 arr[0...i] 成为新的已排序区
  }
  return arr
}

// 测试示例
const testArray = [64, 25, 12, 22, 11]
console.log('排序前:', testArray)
console.log('排序后:', selectionSort(testArray))
```

### 执行过程示例（数组 \[64, 25, 12, 22, 11]）

| 轮次 | 已排序区          | 未排序区          | 最小值 | 交换后数组        |
| ---- | ----------------- | ----------------- | ------ | ----------------- |
| 初始 | \[]                | \[64,25,12,22,11] | -      | \[64,25,12,22,11] |
| 1    | \[11]             | \[25,12,22,64]    | 11     | \[11,25,12,22,64] |
| 2    | \[11,12]          | \[25,22,64]       | 12     | \[11,12,25,22,64] |
| 3    | \[11,12,22]       | \[25,64]          | 22     | \[11,12,22,25,64] |
| 4    | \[11,12,22,25]    | \[64]             | 25     | \[11,12,22,25,64] |
| 结果 | \[11,12,22,25,64] | \[]                | -      | 排序完成          |

## 优点

* **简单易实现**：逻辑清晰，代码量少
* **数据移动最少**：每轮只交换一次元素（ $O(n)$ 次交换）
* **适用场景**：小规模数据或内存受限环境
* **不足**：时间复杂度较高，不适合大规模数据

## 优化

### 双向选择排序

同时寻找最小值和最大值，减少迭代轮次

```ts
function bidirectionalSelectionSort(arr: number[]): number[] {
  let left = 0
  let right = arr.length - 1
  while (left < right) {
    let min = left
    let max = right
    for (let i = left; i <= right; i++) {
      if (arr[i] < arr[min])
        min = i
      if (arr[i] > arr[max])
        max = i
    }
    [arr[left], arr[min]] = [arr[min], arr[left]]
    // 修正最大值被交换的情况
    if (max === left)
      max = min;
    [arr[right], arr[max]] = [arr[max], arr[right]]
    left++
    right--
  }
  return arr
}
```

### 加入有序检查

提前终止已排序数组的遍历
