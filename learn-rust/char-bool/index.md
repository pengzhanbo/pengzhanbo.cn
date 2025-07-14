---
url: /learn-rust/char-bool/index.md
---
## 字符

Rust 中的 字符 只能通过 `''` 来表示。

> `""` 是Rust中用于表示 字符串的。和 `''` 二者不能混用。

Rust 的字符不仅仅是 `ASCII` ，所有的 `Unicode` 值都可以作为 Rust 字符，包括单个的中文、日文、韩文、emoji 表情符号等等，都是合法的字符类型。`Unicode` 值的范围从 `U+0000 ~ U+D7FF` 和 `U+E000 ~ U+10FFFF`。

由于 `Unicode` 都是 4 个字节编码，因此字符类型也是占用 4 个字节：

```rust
fn main() {
  let x = 'x';
  let y = '人';
  let z = '😻';
}
```

## 布尔

Rust 中的布尔类型有两个可能的值：`true` 和 `false` ， 布尔值占用内存的大小为 `1` 个字节。

```rust
fn main() {
  let truely = true;
  let falsely: bool = false;
}
```

## 单元

单元类型就是 `()` ， 其唯一的值也是 `()` 。

函数 `main` 的返回值就是 `()`

单元的作用，比如： `()` 可以作为 map 的值，表示不关注 map 的值，只关注 key。它作为值的占位，但不会占用内存。
