---
url: /algorithm/bucket-sort/index.md
---
## 概述

\==桶排序（Bucket Sort）== 是一种分布式排序算法，适用于数据分布均匀的场景。

### 核心思想

将数据分散到多个有序的桶中，对每个桶单独排序，最后合并所有桶。

## 基本原理

* **分桶**：根据元素范围创建固定数量的桶，将元素分配到对应的桶中。
* **桶内排序**：对每个非空桶单独排序（通常用插入排序等简单算法）。
* **合并结果**：按桶顺序合并所有元素。

## 过程

桶排序按下列步骤进行：

1. 设置一个定量的数组当作空桶；
2. 遍历序列，并将元素一个个放到对应的桶中；
3. 对每个不是空的桶进行排序；
4. 从不是空的桶里把元素再放回原来的序列中。

## 时间复杂度

桶排序的平均时间复杂度为 $O(n + n^2/k + k)$（将值域平均分成 $n$ 块 + 排序 + 重新合并元素），当 $k\approx n$ 时为 $O(n)$。

桶排序的最坏时间复杂度为 $O(n^2)$。

## 空间复杂度

桶排序的空间复杂度为 $O(n + k)$。 （需额外存储桶）

## 稳定性

如果使用稳定的内层排序，并且将元素插入桶中时不改变元素间的相对顺序，那么桶排序就是一种稳定的排序算法。

由于每块元素不多，一般使用插入排序。此时桶排序是一种稳定的排序算法。

## 实现

```ts
function bucketSort(arr: number[], bucketSize: number = 5): number[] {
  if (arr.length === 0)
    return arr

  // 1. 计算数组最小/最大值
  let min = arr[0]
  let max = arr[0]
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < min)
      min = arr[i]
    else if (arr[i] > max)
      max = arr[i]
  }

  // 2. 初始化桶
  const bucketCount = Math.floor((max - min) / bucketSize) + 1
  const buckets: number[][] = Array.from({ length: bucketCount })
  for (let i = 0; i < bucketCount; i++) {
    buckets[i] = []
  }

  // 3. 元素分配到桶中
  for (let num of arr) {
    const bucketIndex = Math.floor((num - min) / bucketSize)
    buckets[bucketIndex].push(num)
  }

  // 4. 对每个桶排序并合并
  const sortedArr: number[] = []
  for (let bucket of buckets) {
    if (bucket.length > 0) {
      // 使用插入排序（可替换为其他排序）
      insertionSort(bucket)
      sortedArr.push(...bucket)
    }
  }
  return sortedArr
}

// 插入排序辅助函数
function insertionSort(arr: number[]): void {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i]
    let j = i - 1
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j]
      j--
    }
    arr[j + 1] = key
  }
}

// 测试用例
const arr = [0.42, 0.32, 0.75, 0.12, 0.98, 0.63]
console.log(bucketSort(arr))
// 输出: [0.12, 0.32, 0.42, 0.63, 0.75, 0.98]
```

## 优化

* **动态桶大小**：根据数据分布动态调整 `bucketSize` 。
* **桶内排序算法**：对大数据桶使用 ==快速排序（QuickSort）== 提升效率。
* **空桶处理**：跳过空桶减少不必要的遍历。
