---
url: /algorithm/data-structure/heap/index.md
---
::: info 本篇仅讨论 **二叉堆**
:::

## 概述

\==堆（heap）== 是一种完全二叉树结构，满足以下性质：

* **堆序性**：每个节点的值必须满足特定顺序关系

  * **最大堆**：父节点值 ≥ 子节点值（根节点最大）
  * **最小堆**：父节点值 ≤ 子节点值（根节点最小）

* **结构完整性**：除最后一层外，其他层节点必须全满，且最后一层节点靠左排列

## 堆的实现

### 插入操作

**插入操作** 是指向二叉堆中插入一个元素，要保证插入后也是一棵完全二叉树。

最简单的方法就是，最下一层最右边的叶子之后插入。如果最下一层已满，就新增一层。
插入之后如果不满足堆性质，则采用 **向上调整** ：

如果这个节点的权值大于它父节点的权值，就交换，重复此过程直到不满足或者到根。
可以证明，插入之后向上调整后，没有其他接点会不满足堆性质。

**向上调整** 的时间复杂度是 $O(\log n)$ 。

:::center
![插入操作](/images/algorithm/binary-heap-insert.svg)
:::

### 删除操作

**删除操作** 指删除堆中最大的元素，即删除根结点。

但是如果直接删除，则变成了两个堆，难以处理。
所以不妨考虑 **插入操作的逆过程**，设法将根节点移到最后一个结点，然后直接删掉。
然而实际上不好做，我们通常采用的方法是，把根节点和最后一个节点直接交换。
于是直接删掉（在最后一个节点处的）根结点，但是新的根节点可能不满足堆性质。
这时候可以采用 **向下调整** :

在该节点的子节点中，找一个最大的，与该节点交换，重复此过程直到底层。
可以证明，删除并向下调整后，没有其他节点不满足堆性质。

时间复杂度 $O(\log n)$ 。

### 核心特性

* **数组表示**：堆通常使用数组存储（利用完全二叉树特性）

  索引计算（设当前索引为 i）：

  ```ts
  parentIndex = Math.floor((i - 1) / 2)
  leftChildIndex = 2 * i + 1
  rightChildIndex = 2 * i + 2
  ```

### 最大堆实现

```ts :collapsed-lines
class MaxHeap {
  private heap: number[]

  constructor() {
    this.heap = []
  }

  // 获取父节点索引
  private getParentIndex(index: number): number {
    return Math.floor((index - 1) / 2)
  }

  // 获取左子节点索引
  private getLeftChildIndex(index: number): number {
    return 2 * index + 1
  }

  // 获取右子节点索引
  private getRightChildIndex(index: number): number {
    return 2 * index + 2
  }

  // 交换元素
  private swap(i: number, j: number): void {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]]
  }

  // 上浮操作（插入后维护堆）
  private siftUp(): void {
    let currentIndex = this.heap.length - 1
    while (currentIndex > 0) {
      const parentIndex = this.getParentIndex(currentIndex)
      if (this.heap[currentIndex] > this.heap[parentIndex]) {
        this.swap(currentIndex, parentIndex)
        currentIndex = parentIndex
      }
      else {
        break
      }
    }
  }

  // 下沉操作（删除后维护堆）
  private siftDown(): void {
    let currentIndex = 0
    const size = this.heap.length

    while (this.getLeftChildIndex(currentIndex) < size) {
      const leftChildIndex = this.getLeftChildIndex(currentIndex)
      const rightChildIndex = this.getRightChildIndex(currentIndex)
      let largerChildIndex = leftChildIndex

      // 选择较大的子节点
      if (rightChildIndex < size
        && this.heap[rightChildIndex] > this.heap[leftChildIndex]) {
        largerChildIndex = rightChildIndex
      }

      // 与当前节点比较
      if (this.heap[currentIndex] < this.heap[largerChildIndex]) {
        this.swap(currentIndex, largerChildIndex)
        currentIndex = largerChildIndex
      }
      else {
        break
      }
    }
  }

  // 插入元素
  insert(value: number): void {
    this.heap.push(value)
    this.siftUp()
  }

  // 删除并返回堆顶元素
  extractMax(): number | null {
    if (this.heap.length === 0)
      return null

    const max = this.heap[0]
    const last = this.heap.pop()!

    if (this.heap.length > 0) {
      this.heap[0] = last
      this.siftDown()
    }

    return max
  }

  // 获取堆顶元素（不删除）
  peek(): number | null {
    return this.heap[0] ?? null
  }

  // 获取堆大小
  size(): number {
    return this.heap.length
  }

  // 堆排序（原地排序）
  static heapSort(arr: number[]): number[] {
    const heap = new MaxHeap()

    // 构建堆
    for (const num of arr) heap.insert(num)

    // 依次提取最大值
    const sorted: number[] = []
    while (heap.size() > 0) {
      sorted.unshift(heap.extractMax()!)
    }

    return sorted
  }
}
```

### 最小堆实现

最小堆实现进需要在 最大堆 的基础上进行修改，调整比较逻辑：

```ts
class MinHeap {
  private heap: number[] = []

  // ...（索引计算和swap方法同MaxHeap）

  private siftUp() {
    let index = this.heap.length - 1
    while (index > 0) {
      const parentIndex = this.getParentIndex(index)
      if (this.heap[index] < this.heap[parentIndex]) {
        this.swap(index, parentIndex)
        index = parentIndex
      }
      else {
        break
      }
    }
  }

  private siftDown() {
    let index = 0
    const length = this.heap.length

    while (true) {
      const leftChildIndex = this.getLeftChildIndex(index)
      const rightChildIndex = this.getRightChildIndex(index)
      let smallest = index

      if (leftChildIndex < length
        && this.heap[leftChildIndex] < this.heap[smallest]) {
        smallest = leftChildIndex
      }

      if (rightChildIndex < length
        && this.heap[rightChildIndex] < this.heap[smallest]) {
        smallest = rightChildIndex
      }

      if (smallest !== index) {
        this.swap(index, smallest)
        index = smallest
      }
      else {
        break
      }
    }
  }

  // 其他方法与MaxHeap类似
}
```

## 时间复杂度

| 操作           | 时间复杂度   | 说明                          |
| -------------- | ------------ | ----------------------------- |
| `insert()`     | $O(log n)$   | 最坏情况下上浮整棵树高度      |
| `extractMax()` | $O(log n)$   | 最坏情况下下沉整棵树高度      |
| `peek()`       | $O(1) $      | 直接访问数组首元素            |
| `buildHeap()`  | $O(n)$       | Floyd 算法自底向上堆化        |
| `heapSort()`   | $O(n log n)$ | 每次 extractMax 为 $O(log n)$ |

:::warning 注意
虽然单个插入操作是 $O(log n)$ ，但将 n 个元素插入空堆的总体时间复杂度是 $O(n log n)$ ，而 Floyd 建堆算法只需 $O(n)$ 。
:::

## 适用场景

* **优先队列**：

  ```ts
  class PriorityQueue {
    private heap = new MaxHeap()

    enqueue(val: number) { this.heap.insert(val) }
    dequeue() { return this.heap.extractMax() }
  }
  ```

* **堆排序**：

  * 时间复杂度：O(n log n)
  * 空间复杂度：O(1)（原地排序）

  ```ts
  const arr = [4, 10, 3, 5, 1]
  const sorted = MaxHeap.heapSort(arr) // [1, 3, 4, 5, 10]
  ```

* **Top K 问题**：

  ```ts
  function findTopK(nums: number[], k: number): number[] {
    const minHeap = new MinHeap() // 最小堆实现类似
    for (const num of nums) {
      minHeap.insert(num)
      if (minHeap.size() > k)
        minHeap.extractMin()
    }
    return minHeap.toArray()
  }
  ```

* **Dijkstra 算法**：优先队列优化最短路径搜索

## 相关问题

[**LeetCode** - 堆（优先队列）](https://leetcode.cn/problem-list/heap-priority-queue/){.read-more}

### 堆排序与选择问题

* **703. 数据流中的第 K 大元素**（[LeetCode](https://leetcode.cn/problems/kth-largest-element-in-a-stream/)）
* **215. 数组中的第K个最大元素**（[LeetCode](https://leetcode.cn/problems/kth-largest-element-in-an-array/)）
* **347. 前 K 个高频元素**（[LeetCode](https://leetcode.cn/problems/top-k-frequent-elements/)）

### 多堆结构与复杂规则处理

* **23. 合并 K 个升序链表**（[LeetCode](https://leetcode.cn/problems/merge-k-sorted-lists/)）
* **295. 数据流的中位数**（[LeetCode](https://leetcode.cn/problems/find-median-from-data-stream/)）
* **239. 滑动窗口最大值**（[LeetCode](https://leetcode.cn/problems/sliding-window-maximum/)）

### 综合场景

* **313. 超级丑数**（[LeetCode](https://leetcode.cn/problems/super-ugly-number/)）
* **786. 第 K 个最小的素数分数**（[LeetCode](https://leetcode.cn/problems/k-th-smallest-prime-fraction/)）
* **871. 最低加油次数**（[LeetCode](https://leetcode.cn/problems/minimum-number-of-refueling-stops/)）
