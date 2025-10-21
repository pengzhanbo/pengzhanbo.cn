---
url: /interview-question/h4casm3q/index.md
---
::: tip 提问

1. 归并排序
2. 实现

:::

## 归并排序

归并排序是建立在归并操作上的一种有效的排序算法。该算法是采用分治法（Divide and Conquer）的一个非常典型的应用。将已有序的子序列合并，得到完全有序的序列；即先使每个子序列有序，再使子序列段间有序。若将两个有序表合并成一个有序表，称为2-路归并。

### 描述

* 把长度为n的输入序列分成两个长度为n/2的子序列；
* 对这两个子序列分别采用归并排序；
* 将两个排序好的子序列合并成一个最终的排序序列。

## 实现

```js
function mergeSort(arr) {
  if (!Array.isArray(arr) || arr.length <= 1)
    return arr
  const len = arr.length
  const middle = Number.parseInt(len >> 1)
  const left = arr.slice(0, middle)
  const right = arr.slice(middle, len)
  return merge(mergeSort(left), mergeSort(right))
}

function merge(left, right) {
  const result = []
  const leftLen = left.length
  const rightLen = right.length
  let il = 0
  let ir = 0

  while (il < leftLen && ir < rightLen) {
    if (left[il] < right[ir]) {
      result.push(left[il++])
    }
    else {
      result.push(right[ir++])
    }
  }

  while (il < leftLen) {
    result.push(left[il++])
  }

  while (ir < rightLen) {
    result.push(right[ir++])
  }
  return result
}
```
