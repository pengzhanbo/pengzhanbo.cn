---
url: /algorithm/quick-sort/index.md
---
## 概述

\==快速排序（Quick sort）==，又称为 分区交换排序（partition-exchange sort），简称 **快排**，是一种被广泛运用的排序算法。

### 核心思想是

**选择一个基准值，将数组分成两个子数组（小于基准值和大于基准值），然后递归排序子数组。**

## 基本原理

快速排序的工作原理是通过 ==分治== 的方式来将一个数组排序。

快速排序分为三个过程：

* **选择基准值（Pivot）**：从数组中任选一个元素作为基准

* **分区（Partition）**：

  * 将小于基准的元素移到基准左侧
  * 将大于基准的元素移到基准右侧
  * 基准值此时位于最终排序位置

* **递归**：对左右子数组重复上述过程

和 **归并排序**不同，第一步并不是直接分成前后两个序列，而是在分的过程中要保证相对大小关系。
具体来说，第一步要是要把数列分成两个部分，然后保证前一个子数列中的数都小于后一个子数列中的数。
为了保证平均时间复杂度，一般是随机选择一个数 $m$ 来当做两个子数列的分界。

之后，维护一前一后两个指针 $p$ 和 $q$，依次考虑当前的数是否放在了应该放的位置（前还是后）。
如果当前的数没放对，比如说如果后面的指针 $q$ 遇到了一个比 $m$ 小的数，那么可以交换 $p$ 和 $q$ 位置上的数，
再把 $p$ 向后移一位。当前的数的位置全放对后，再移动指针继续处理，直到两个指针相遇。

快速排序没有指定应如何具体实现第一步，不论是选择 $m$ 的过程还是划分的过程，都有不止一种实现方法。

第三步中的序列已经分别有序且第一个序列中的数都小于第二个数，所以直接拼接起来就好了。

## 时间复杂度

快速排序的最优时间复杂度和平均时间复杂度为 $O(n\log n)$，最坏时间复杂度为 $O(n^2)$。

对于最优情况，每一次选择的分界值都是序列的中位数，此时算法时间复杂度满足的递推式为 $T(n) = 2T(\dfrac{n}{2}) + \Theta(n)$，由主定理，$T(n) = \Theta(n\log n)$。

对于最坏情况，每一次选择的分界值都是序列的最值，此时算法时间复杂度满足的递推式为 $T(n) = T(n - 1) + \Theta(n)$，累加可得 $T(n) = \Theta(n^2)$。

对于平均情况，每一次选择的分界值可以看作是等概率随机的。

## 空间复杂度

$O(log n)$（递归栈空间）

## 稳定性

快速排序是一种不稳定的排序算法。

## 实现

```ts
function quickSort(arr: number[]): number[] {
  if (arr.length <= 1)
    return arr // 基线条件：数组为空或只有一个元素时直接返回

  // 选择基准值（此处取中间元素避免最坏情况）
  const pivotIndex = Math.floor(arr.length / 2)
  const pivot = arr[pivotIndex]

  // 创建左右分区
  const left: number[] = []
  const right: number[] = []

  // 分区操作（跳过基准元素）
  for (let i = 0; i < arr.length; i++) {
    if (i === pivotIndex)
      continue // 跳过基准值本身
    arr[i] < pivot ? left.push(arr[i]) : right.push(arr[i])
  }

  // 递归排序并合并结果
  return [...quickSort(left), pivot, ...quickSort(right)]
}

// 测试用例
const testArr = [3, 7, 2, 5, 1, 4, 9, 6]
console.log(quickSort(testArr)) // 输出: [1, 2, 3, 4, 5, 6, 7, 9]
```

## 优化

### 避免最坏情况

* 三数取中法（选首、尾、中的中位数）

  通过 **三数取中（即选取第一个、最后一个以及中间的元素中的中位数）** 的方法来选择两个子序列的分界元素（即比较基准）。这样可以避免极端数据（如升序序列或降序序列）带来的退化；

  ```ts
  // 三数取中法选择基准
  const mid = Math.floor((low + high) / 2)
  if (arr[low] > arr[high])
    [arr[low], arr[high]] = [arr[high], arr[low]]
  if (arr[mid] > arr[high])
    [arr[mid], arr[high]] = [arr[high], arr[mid]]
  if (arr[low] < arr[mid])
    [arr[low], arr[mid]] = [arr[mid], arr[low]]
  return arr[low] // 此时arr[low]是三者的中位数
  ```
