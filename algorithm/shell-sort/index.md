---
url: /algorithm/shell-sort/index.md
---
## 概述

\==希尔排序（Shell sort）==，也称为缩小增量排序法，是 [插入排序](./3.插入排序.md) 的一种改进版本。
希尔排序以它的发明者 希尔（Donald Shell）命名。

### 核心思想

**让距离较远的元素先部分有序，减少后续插入排序的工作量。**

### 核心概念

* **增量序列 (Gap Sequence)**

  决定如何划分子序列。初始间隔较大，逐步缩小至 1（最后一次为标准的插入排序）。

  **常用序列**：希尔原始序列（N/2, N/4, ..., 1）、Hibbard 序列等。

* **子序列排序**

  对每个增量间隔形成的子序列独立进行插入排序。

* **逐步细化**

  随着增量减小，序列越来越有序，插入排序的效率显著提高。

## 过程

排序对不相邻的记录进行比较和移动：

1. 将待排序序列分为若干子序列（每个子序列的元素在原始数组中间距相同）；
2. 对这些子序列进行插入排序；
3. 减小每个子序列中元素之间的间距，重复上述过程直至间距减少为 $1$。

## 时间复杂度

取决于增量序列：

* 平均：$O(n log n)$ ~ $O(n²)$
* 最佳：$O(n log n)$

## 空间复杂度

希尔排序的空间复杂度为 $O(1)$。

## 稳定性

希尔排序是一种不稳定的排序算法。

## 实现

### 基础实现（使用希尔原始序列）

```ts
function shellSort(arr: number[]): number[] {
  const n = arr.length
  // 初始增量 gap = n/2，逐步减半直至 1
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    // 从 gap 开始，对每个子序列执行插入排序
    for (let i = gap; i < n; i++) {
      const temp = arr[i] // 当前待插入元素
      let j = i
      // 在子序列中向前比较并移位
      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap] // 较大元素后移
        j -= gap
      }
      arr[j] = temp // 插入到正确位置
    }
  }
  return arr
}

// 测试
const arr = [64, 34, 25, 12, 22, 11, 90]
console.log('排序前:', arr)
console.log('排序后:', shellSort(arr))
```

### 优化实现（使用 Knuth 增量序列）

```ts
function shellSortOptimized(arr: number[]): number[] {
  const n = arr.length
  // 生成 Knuth 增量序列：1, 4, 13, 40, 121, ...
  let gap = 1
  while (gap < Math.floor(n / 3)) {
    gap = gap * 3 + 1 // 计算最大有效增量
  }

  while (gap > 0) {
    for (let i = gap; i < n; i++) {
      const temp = arr[i]
      let j = i
      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap]
        j -= gap
      }
      arr[j] = temp
    }
    gap = Math.floor((gap - 1) / 3) // 缩小增量
  }
  return arr
}
```

### 执行示例（`[8, 3, 5, 1, 4, 2]`）

* **初始 Gap = 3**

  * 子序列 1：`[8, 1]` → 排序后 `[1, 8]`
  * 子序列 2：`[3, 4]` → 排序后 `[3, 4]`
  * 子序列 3：`[5, 2]` → 排序后 `[2, 5]`
  * 新数组：`[1, 3, 2, 8, 4, 5]`

* **Gap = 1**（标准插入排序）

  * 逐步插入排序后得到 \[1, 2, 3, 4, 5, 8]

## 优点

比简单插入排序更快（减少元素移动次数），代码简洁，空间效率高。

## 缺点

时间复杂度依赖增量序列，不稳定。
