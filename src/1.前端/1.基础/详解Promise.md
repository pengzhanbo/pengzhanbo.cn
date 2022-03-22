---
title: 详解 Promise
createTime: 2020/11/22 12:58:28
permalink: /post/q40nq4hv
author: pengzhanbo
top: false
type:   # original: 原创: reprint 转载  可为空不填
---


关于Promise的详细说明和使用说明，参照下面的文章。

> [Promise A+ 规范](https://malcolmyu.github.io/2015/06/12/Promises-A-Plus/)
> 
> [MDN Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)
>
> [MDN 使用Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Using_promises)

## 实现 `Promise.all` 源码：
``` js
function promiseAll(promises) {
  promises = promises || []
  let length = promises.length
  if (length === 0) return Promise.resolve([])
  let count = 0
  const list = []
  return new Promise((resolve, reject) => {
    const resolveFn = (res, index) => {
      list[index] = res
      count ++
      if (count >= length) {
        resolve(list)
      }
    }
    promises.forEach((item, i) => {
      if (item instanceof Promise) {
        item.then(res => resolveFn(res, i)).catch(reject)
      } else {
        resolveFn(item, i)
      }
    })
  })
}
```
## 实现 `Promise.allSettled 源码`
``` js
function promiseAllSettled(array) {
  array = array || []
  let length = array.length
  if (length === 0) return Promise.resolve([])
  let count = 0
  const list = []
  return new Promise((resolve) => {
    const resolveFn =  (res, index, status) => {
      list[index] = { status }
      if (status === 'fulfilled') {
        list[index].value = res
      } else {
        list[index].reason = res
      }
      count ++
      if (count >= length) {
        resolve(list)
      }
    }
    array.forEach((item, i) => {
      if (item instanceof Promise) {
        item.then(
          res => resolveFn(res, i, 'fulfilled'),
          reason => resolveFn(reason, i, 'rejected')
        )
      } else {
        resolveFn(item, i, 'fulfilled')
      }
    })
  })
}
```

## 实现 `Promise.race 源码`
``` js
function promiseRace(array) {
  array = array || []
  return new Promise((resolve, reject) => {
    array.forEach((item, i) => {
      if (item instanceof Promise) {
        item.then(resolve, reject)
      } else {
        resolve(item)
      }
    })
  })
}
```