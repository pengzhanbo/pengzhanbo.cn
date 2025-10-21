---
url: /interview-question/alfe37yd/index.md
---
::: tip 提问

1. 希尔排序
2. 实现

:::

## 希尔排序

把数组按下标的一定增量分组，对每组使用直接插入排序算法排序；随着增量逐渐减少，每组包含的元 素越来越多，当增量减至1时，整个数组恰被分成一组，算法便终止。

## 实现

```js
function hillSort(arr) {
  if (!Array.isArray(arr) || arr.length <= 1)
    return arr
  const len = arr.length
  if (!Array.isArray(arr) || len <= 1)
    return
  for (let gap = Number.parseInt(len >> 1); gap >= 1; gap = Number.parseInt(gap >> 1)) {
    for (let i = gap; i < len; i++) {
      let temp = arr[i]
      let j = i

      while (j - gap >= 0 && arr[j - gap] > temp) {
        arr[j] = arr[j - gap]
        j -= gap
      }
      arr[j] = temp
    }
  }
  return arr
}
```
