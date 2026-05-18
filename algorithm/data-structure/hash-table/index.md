---
url: /algorithm/data-structure/hash-table/index.md
---
## 概述

\==哈希表（Hash Table）== 是一种基于键值对（key-value）存储的高效数据结构，通过哈希函数将键映射到存储位置，
实现平均时间复杂度 $O(1)$ 的插入、删除和查找操作。

::: center
![hash-table](/images/algorithm/hashtable.svg)
:::

以 `key-value` 形式存储数据，是指任意的键值 key 都唯一对应到内存中的某个位置。
只需要输入查找的键值，就可以快速地找到其对应的 value。
可以把哈希表理解为一种高级的数组，这种数组的下标可以是很大的整数，浮点数，字符串甚至结构体。

## 核心特性

### 哈希函数 (Hash Function)

**将任意大小的数据（键）映射到固定大小的值（哈希值）。**

要让键值对应到内存中的位置，就要为键值计算索引，也就是计算这个数据应该放到哪里。
这个根据键值计算索引的函数就叫做哈希函数，也称散列函数。

举个例子，如果键值是一个人的身份证号码，哈希函数就可以是号码的后四位，当然也可以是号码的前四位。
生活中常用的「手机尾号」也是一种哈希函数。
在实际的应用中，键值可能是更复杂的东西，比如浮点数、字符串、结构体等，这时候就要根据具体情况设计合适的哈希函数。
哈希函数应当易于计算，并且尽量使计算出来的索引均匀分布。

**对于 哈希函数，应该满足以下要求**：

* **一致性**：相同的键总是产生相同的哈希值。
* **高效性**：计算速度快。
* **均匀性**：尽可能均匀地分布哈希值，以减少冲突。

### 冲突解决 (Collision Resolution)

如果对于任意的键值，哈希函数计算出来的索引都不相同，那只用根据索引把 $(key, value)$ 放到对应的位置就行了。
但实际上，常常会出现两个不同的键值，他们用哈希函数计算出来的索引是相同的。这时候就需要一些方法来处理冲突。

**常见的冲突解决方法包括**:

* **开散列法（Open hashing）**：也称 **拉链法**，在每个存放数据的地方开一个链表，如果有多个键值索引到同一个地方，
  只用把他们都放到那个位置的链表里就行了。
  查询的时候需要把对应位置的链表整个扫一遍，对其中的每个数据比较其键值与查询的键值是否一致。

  如果索引的范围是 $1\ldots M$，哈希表的大小为 $N$，那么一次 插入/查询 需要进行期望 $O(\frac{N}{M})$ 次比较。

* **闭散列法（Closed hashing）**：把所有记录直接存储在散列表中，如果发生冲突则根据某种方式继续进行探查。

  比如线性探查法：如果在 `d` 处发生冲突，就依次检查 `d + 1`，`d + 2` ……

### 动态扩容 (Rehashing)

当负载因子（元素数/桶数）超过阈值（如 0.75）时，扩容并重新哈希所有元素。

## 哈希表的实现

```ts
type Bucket<K, V> = Array<[K, V]> // 桶结构：存储键值对元组的数组

class HashTable<K, V> {
  private buckets: Array<Bucket<K, V>>
  private capacity: number
  private size: number
  private loadFactor: number = 0.75

  constructor(initialCapacity: number = 16) {
    this.capacity = initialCapacity
    this.size = 0
    this.buckets = Array.from({ length: initialCapacity }, () => [])
  }

  // 哈希函数（简化版，实际需更健壮）
  private hash(key: K): number {
    const keyString = String(key)
    let hash = 0
    for (let i = 0; i < keyString.length; i++) {
      hash = (hash << 5) + keyString.charCodeAt(i)
      hash = hash & hash // 转为32位整数
      hash = Math.abs(hash)
    }
    return hash % this.capacity
  }

  // 插入/更新键值对
  put(key: K, value: V): void {
    const index = this.hash(key)
    const bucket = this.buckets[index]

    // 检查是否已存在相同key
    for (const pair of bucket) {
      if (pair[0] === key) {
        pair[1] = value // 更新值
        return
      }
    }

    // 新增键值对
    bucket.push([key, value])
    this.size++

    // 检查扩容
    if (this.size / this.capacity > this.loadFactor) {
      this.resize()
    }
  }

  // 获取值
  get(key: K): V | undefined {
    const index = this.hash(key)
    const bucket = this.buckets[index]
    for (const [k, v] of bucket) {
      if (k === key)
        return v
    }
    return undefined
  }

  // 删除键值对
  remove(key: K): boolean {
    const index = this.hash(key)
    const bucket = this.buckets[index]
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1)
        this.size--
        return true
      }
    }
    return false
  }

  // 动态扩容
  private resize(): void {
    const oldBuckets = this.buckets
    this.capacity *= 2
    this.buckets = Array.from({ length: this.capacity }, () => [])
    this.size = 0

    // 重新哈希所有元素
    for (const bucket of oldBuckets) {
      for (const [key, value] of bucket) {
        this.put(key, value) // 插入到新桶
      }
    }
  }

  // 当前元素数量
  getSize(): number {
    return this.size
  }
}
```

## 时间复杂度

| 操作     | 时间复杂度                | 说明                    |
| -------- | ------------------------- | ----------------------- |
| put()    | 平均 $O(1)$ ，最坏 $O(n)$ | 哈希计算 + 桶内线性扫描 |
| get()    | 平均 $O(1)$ ，最坏 $O(n)$ | 桶内线性查找            |
| remove() | 平均 $O(1)$ ，最坏 $O(n)$ | 桶内查找后删除          |
| resize() | $O(n)$                    | 所有元素重新哈希        |

## 适用场景

* 高频插入/删除且需快速查找
* 缓存实现（如 LRU Cache）
* 数据库索引
* 字典类应用（词频统计）

## 相关问题

[**LeetCode** - 哈希表](https://leetcode.cn/problem-list/hash-table/){.read-more}
[**LeetCode** - 哈希函数](https://leetcode.cn/problem-list/hash-function/){.read-more}

### 基础操作（数组/集合/映射）

* **1. 两数之和**（[LeetCode](https://leetcode.cn/problems/two-sum/)）
* **242. 有效的字母异位词**（[LeetCode](https://leetcode.cn/problems/valid-anagram/)）
* **349. 两个数组的交集**（[LeetCode](https://leetcode.cn/problems/intersection-of-two-arrays/)）
* **202. 快乐数**（[LeetCode](https://leetcode.cn/problems/happy-number/)）

### 复杂数据结构与策略

* **146. LRU 缓存**（[LeetCode](https://leetcode.cn/problems/lru-cache/)）
* **49. 字母异位词分组**（[LeetCode](https://leetcode.cn/problems/group-anagrams/)）
* **974. 和可被 K 整除的子数组**（[LeetCode](https://leetcode.cn/problems/subarray-sums-divisible-by-k/)）

### 多步骤哈希优化

* **454. 四数相加 II**（[LeetCode](https://leetcode.cn/problems/4sum-ii/)）
* **347. 前 K 个高频元素**（[LeetCode](https://leetcode.cn/problems/top-k-frequent-elements/)）
* **128. 最长连续序列**（[LeetCode](https://leetcode.cn/problems/longest-consecutive-sequence/)）
