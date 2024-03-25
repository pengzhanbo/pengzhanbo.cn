---
title: NaN
createTime: 2022/04/15 03:35:01
author: pengzhanbo
permalink: /interview-question/jilzuxpt/
---

::: tip 提问

1. typeof NaN的结果是什么？
2. isNaN() 和 Number.isNaN() 有什么区别？
:::

## typeof NaN

`NaN` 表示不是一个数字 （not a number），NaN 是一个警戒值，用于指出数字类型中的错误情况，
即 执行数字预算没有成功，这是失败后返回的结果。

``` js
typeof NaN; // "number"
```

NaN 作为一个特殊值， 它和自身是不相等的，是唯一个非自反的值，即

``` js
NaN === NaN; // false
```

## isNaN() 和 Number.isNaN()

`isNaN()` 接受参数后，会尝试将这个参数转换为数值，任何不能被转换为数值的值都会返回true，因此非数字值传入也会
返回 true，影响 NaN 的判断。

`Number.isNaN()` 会首先判断传入的参数是否为数字，如果是数字再继续判断是否为 NaN, 这种方法对NaN的判断更为准确。
