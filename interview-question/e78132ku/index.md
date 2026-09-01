---
url: /interview-question/e78132ku/index.md
---
::: tip 提问

1. 冒泡排序
2. 实现

:::

## 冒泡排序

冒泡排序是指， 对相邻的元素进行两两比较，顺序相反则进行交换。 这样每次都会将最小或者最大的元素 "浮" 到顶端，最终达到完全有序。

冒泡排序的平均时间复杂度为 O(n²) ，最坏时间复杂度为 O(n²) ，空间复杂度为 O(1) ，是稳定排序。

### 优化

* 外层循环优化，记录当前循环中是否发生了交换，如果没有发生交换，则说明该序列已经为有序序列了。 因此我们不需要再执行之后的外层循环，此时可以直接结束。
* 内层循环的优化，记录当前循环中最后一次元素交换的位置，该位置以后的序列都是已排好的序列，因此下 一轮循环中无需再去比较。

优化后的冒泡排序，当排序序列为已排序序列时，为最好的时间复杂度为 O(n)。

## 实现

```js
function bubbleSort(arr) {
  if (!Array.isArray(arr) || arr.length <= 1)
    return arr
  let lastIndex = arr.length - 1
  while (lastIndex > 0) {
    let flag = true
    const k = lastIndex
    for (let j = 0; j < k; j++) {
      if (arr[j] > arr[j + 1]) {
        flag = false
        lastIndex = j
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
    if (flag)
      break
  }
  return arr
}
```
