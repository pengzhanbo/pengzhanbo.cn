---
url: /interview-question/oi8seb1b/index.md
---
集合对象是指： `Set`、 `Map` 、`WeakSet`、 `WeakMap`

::: tip 提问
简单介绍一下 `Set`、 `Map` 、`WeakSet`、 `WeakMap`
:::

## Set

`Set` 对象是 值的集合，Set中的元素只会出现一次，即 Set 中的元素值是唯一的。

* `Set.prototype.add()` 在当前实例的尾部添加一个元素，并返回当前Set实例
* `Set.prototype.clear()` 移除当前实例的所有元素
* `Set.prototype.delete()` 移除当前实例中的指定的元素
* `Set.prototype.has()` 判断当前实例中是否存在指定的元素
* `Set.prototype.entries()` 返回一个迭代器对象，该对象包含按照插入顺序排列所有元素的 `[value, value]`数组
* `Set.prototype.keys()` 同 `values()` 方法
* `Set.prototype.values()` 返回一个迭代器对象，该对象包含按照插入顺序排列的所有元素的值

## Map

`Map` 对象保存键值对，并且能够记住键的原始插入顺序。任何值都可以作为一个键或一个值。

* `Map.prototype.set()` 在当前实例添加或更新一个指定的键和值的键值对
* `Map.prototype.get()` 返回当前实例中的一个指定元素
* `Map.prototype.has()` 判断当前实例中是否存在指定元素，返回 布尔值
* `Map.prototype.delete()` 移除当前实例中指定元素
* `Map.prototype.clear()` 移除当前实例所有元素
* `Map.prototype.entries()` 返回一个迭代器对象，该对象包含按照插入顺序排列所有元素的 `[key, value]`数组
* `Map.prototype.keys()` 返回一个迭代器对象，该对象包含按照插入顺序排列的所有元素的键
* `Map.prototype.values()` 返回一个迭代器对象，该对象包含按照插入顺序排列的所有元素的值

## WeakSet

`WeakSet` 对象是一些对象值的集合，并且其中的每个对象值都只能出现一次，在集合中是唯一的。

`WeakSet` 和 `Set` 的区别：

* 与`Set` 相比，`WeakSet`只能是对象的集合，而不能是任何类型的任意值

* `WeakSet`集合中的对象的引用为弱引用。如果没有其他的对`WeakSet`中的对象的引用，那么这些对象会被当成垃圾回收掉。

* `WeakSet` 是不可枚举的。

* `WeakSet.prototype.add()` 在当前实例的尾部添加一个元素，并返回当前Set实例

* `WeakSet.prototype.delete()` 移除当前实例中的指定的元素

* `WeakSet.prototype.has()` 判断当前实例中是否存在指定的元素

## WeakMap

`WeakMap` 对象是一组 键值对 的集合，其中的键是弱引用的，且键必须是对象，而值可以是任意的。

`WeakMap` 和 `Map` 的区别

* `WeakMap` 的键必须是对象，值可以使任意的。

* 由于键是弱引用的，所以当键所指对象没有其他地方引用的时候，它会被GC回收掉。

* `WeakMap` 是不可枚举的。

* `WeakMap.prototype.set()` 在当前实例添加或更新一个指定的键和值的键值对

* `WeakMap.prototype.get()` 返回当前实例中的一个指定元素

* `WeakMap.prototype.has()` 判断当前实例中是否存在指定元素，返回 布尔值

* `WeakMap.prototype.delete()` 移除当前实例中指定元素
