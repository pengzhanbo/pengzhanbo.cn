---
url: /interview-question/wnuvm4t1/index.md
---
::: tip 提问
String有哪些原始方法？
:::

## 静态方法

* `String.fromCharCode()` 返回一个由指定的 UTF-16 代码单元序列创建的字符串

## 实例方法

* `String.prototype.charAt()` 从一个字符串中返回指定的字符
* `String.prototype.charCodeAt()` 返回 0 到 65535 之间的整数，表示给定索引处的UTF-16代码单元
* `String.prototype.concat()` 将一个或多个字符串与原字符串连接合并成一个新的字符串并返回
  （不建议使用，使用赋值操作符 `+`， `+=` 代替）
* `String.prototype.endsWith()` 判断当前字符串是否是以给定的字符串结尾的，并返回布尔值
* `String.prototype.includes()` 判断一个字符串中是否包含另一个字符串，并返回布尔值
* `String.prototype.indexOf()` 返回当前字符串中第一次出现指定值的索引，不存在则返回 -1
* `String.prototype.lastIndexOf()` 返回当前字符串中最后一次出现指定值的索引，不存在则返回 -1
* `String.prototype.match()` 检索返回一个字符串匹配正则表达式的结果
* `String.prototype.matchAll()` 返回一个包含所有匹配正则表达式的结果及分组捕获组的迭代器
* `String.prototype.padEnd()` 用一个字符串填充当前字符串，返回填充后达到指定长度的字符串，从末尾开始填充
* `String.prototype.padStart()` 用一个字符串填充当前字符串，返回填充后达到指定长度的字符串，从左侧开始填充
* `String.prototype.repeat()` 构造并返回一个新字符串，该字符串包含被链接在一起的制定数量的字符串。
* `String.prototype.replace()` 返回一个由替换字符串替换部分或所有的模式匹配项后的新字符串。
* `String.prototype.replaceAll()` 返回一个新字符串，新字符串所有满足模式匹配和被替换部分字符串都被替换
* `String.prototype.search()` 执行正则表达式和 字符串之间一个搜索匹配。
* `String.prototype.slice()` 提取某个字符串的一部分，并返回一个新的字符串
* `String.prototype.split()` 使用指定的分隔符字符串将一个字符串分割成子字符串数组，并返回。
* `String.prototype.startsWith()` 判断当前字符串是否以给定的字符串开头，并返回布尔值
* `String.prototype.substring()` 返回当前字符串从开始索引到结束索引之间的子集。
* `String.prototype.toLocaleLowerCase()` 根据任何指定区域语言环境设置的大小写映射，返回当前字符串被转换为小写格式的新字符串
* `String.prototype.toLocaleUpperCase()` 根据任何指定区域语言环境设置的大小写映射，返回当前字符串被转换为答谢格式的新字符串
* `String.prototype.toLowerCase()` 将当前字符串转为小写形式并返回
* `String.prototype.toUpperCase()` 将当前字符串转为大写形式并返回
* `String.prototype.trim()` 删除当前字符串两端的空白字符，并返回新的字符串
* `String.prototype.trimEnd()` 删除当前字符串末端的空白字符
* `String.prototype.trimStart()` 删除当前字符串开头的空白字符
