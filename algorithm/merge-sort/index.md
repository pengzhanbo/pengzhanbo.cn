---
url: /algorithm/merge-sort/index.md
---
## 概述

\==归并排序（merge sort）== 是高效的基于比较的稳定排序算法

### 核心思想

**将数组递归拆分为最小单元，再逐步合并有序子序列。**

## 基本原理

### 分解（Divide）

将长度为 n 的数组递归地拆分为两个长度为 n/2 的子数组，直到子数组长度为 1（天然有序）。

### 合并（Merge）

归并排序最核心的部分是合并（merge）过程：将两个有序的数组 `a[i]` 和 `b[j]` 合并为一个有序数组 `c[k]`。

从左往右枚举 `a[i]` 和 `b[j]`，找出最小的值并放入数组 `c[k]`；重复上述过程直到 `a[i]` 和 `b[j]` 有一个为空时，将另一个数组剩下的元素放入 `c[k]`。

为保证排序的稳定性，前段首元素小于或等于后段首元素时（`a[i] <= b[j]`）而非小于时（`a[i] < b[j]`）就要作为最小值放入 `c[k]`。

## 时间复杂度

归并排序基于分治思想将数组分段排序后合并，时间复杂度在最优、最坏与平均情况下均为 $O(n \log n)$，空间复杂度为 $O(n)$。

## 空间复杂度

归并排序可以只使用 $O(1)$ 的辅助空间，但为便捷通常使用与原数组等长的辅助数组 $O(n)$。

## 稳定性

归并排序是 稳定的。（合并时左子数组元素优先保证相等元素的原始顺序）

## 实现

```ts
/**
 * 合并两个有序数组
 * @param left 左有序数组
 * @param right 右有序数组
 * @returns 合并后的有序数组
 */
function merge(left: number[], right: number[]): number[] {
  const result: number[] = []
  let leftIndex = 0
  let rightIndex = 0

  // 双指针遍历比较元素
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex])
      leftIndex++
    }
    else {
      result.push(right[rightIndex])
      rightIndex++
    }
  }

  // 处理剩余元素（左或右数组有剩余）
  return result.concat(left.slice(leftIndex), right.slice(rightIndex))
}

/**
 * 归并排序主函数
 * @param arr 待排序数组
 * @returns 排序后的数组
 */
function mergeSort(arr: number[]): number[] {
  // 递归终止条件：数组长度为1时天然有序
  if (arr.length <= 1)
    return arr

  // 分解数组
  const mid = Math.floor(arr.length / 2)
  const left = arr.slice(0, mid) // 左子数组
  const right = arr.slice(mid) // 右子数组

  // 递归分解 + 合并有序子数组
  return merge(mergeSort(left), mergeSort(right))
}

// 测试示例
const array = [38, 27, 43, 3, 9, 82, 10]
console.log('排序前:', array)
console.log('排序后:', mergeSort(array))
// 输出: [3, 9, 10, 27, 38, 43, 82]
```

### 执行过程示例（`[38, 27, 43, 3]`）

```txt
分解过程：
  [38, 27, 43, 3]
    → [38, 27] 和 [43, 3]
      → [38] [27] | [43] [3]

合并过程：
  merge([38], [27]) → [27, 38]
  merge([43], [3])  → [3, 43]
  merge([27, 38], [3, 43]) → [3, 27, 38, 43]
```

## 优化

### 小数组切换插入排序

当子数组长度较小时（如 `< 15`），插入排序的常数因子更优：

```ts
if (arr.length <= 15)
  return insertionSort(arr)
```

### 避免重复分配内存

预分配一个全局临时数组，减少递归中多次创建数组的开销。

### 有序性检测优化

若 `left` 的最大值 `<= right` 的最小值，可直接拼接数组：

```ts
if (left[left.length - 1] <= right[0]) {
  return left.concat(right)
}
```
