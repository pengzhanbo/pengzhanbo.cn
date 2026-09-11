---
url: /design-pattern/flyweight/index.md
---
## 什么是享元模式？

\==Flyweight(享元)模式== 是一种结构型设计模式，用于优化重复、缓慢以及数据共享效率较低的代码。

它旨在通过与相关的对象共享尽可能多的数据来减少应用程序中内存的使用（如：应用程序配置、状态等）。

Flyweight 数据共享会涉及获取多个对象使用的若干相似对象或数据结构，
以及将这些数据放到一个单一的外部对象中。
我们可以将该对象传递给依赖这些数据的对象，而不是在每一个对象都存储相同的数据。

## 使用享元模式

我们通过实现一个系统来管理图书馆中的所有书籍。

我们使用构造函数来创建图书馆中的书籍，每个书籍都有 `id`、 `title`、`author`、`isbn` 等基本属性，
同时，还需要使用 `checkoutDate`、`checkoutMember` `dueReturnDate` 等属性来管理借阅信息。

```ts
class Book {
  constructor(id, title, author, isbn) {
    this.title = title
    this.author = author
    this.isbn = isbn
    this.id = id
    this.checkoutDate = null
    this.checkoutMember = null
    this.dueReturnDate = null
  }
}
```

还需要添加 `updateCheckout` 方法来更新借阅信息:

```ts
class Book {
  // ...
  updateCheckout(checkoutDate, checkoutMember, dueReturnDate) {
    this.checkoutDate = checkoutDate
    this.checkoutMember = checkoutMember
    this.dueReturnDate = dueReturnDate
  }
}
```

`Book` 的每一个实例表示一本书。在刚开始对于少量书籍可能是行得通的。
但是，当图书馆夸大到拥有一个更大的库存，每本书都有多个副本时，就会发现随着时间的推移，
管理系统运行的越来越慢，使用数以千计的书籍对象可能会淹没可用内存。

我们可以使用 ==享元模式== 来改善这个问题。

我们将 `Book` 的数据分为 内部状态和 外部状态 两个部分。

内部状态包含 `title`、`author`、`isbn` 等基本属性。
外部状态包含 `checkoutDate`、`checkoutMember` `dueReturnDate` 等属性。

`Book` 只需要存储内部状态，虽然仍然会处理相当多的书籍对象，当需要处理的数据明显减少了：

```ts
export class Book {
  constructor(title, author, isbn) {
    this.title = title
    this.author = author
    this.isbn = isbn
  }
}
```

我们可以使用一个工厂来创建 `Book`，该工厂会返回一个 `Book` 的实例，在集合中存储图书馆中的书，
当往集合中添加数据时，如果该书已存在，则不会添加，否则往集合中添加新的实例。

```ts
const bookDatabase: Map<Book> = new Map()

export function createBook(title, author, isbn) {
  if (bookDatabase.has(isbn)) {
    return bookDatabase.get(isbn)
  }
  else {
    const book = new Book(title, author, isbn)
    bookDatabase.set(isbn, book)
    return book
  }
}
```

我们还需要追踪图书馆的书籍总数，书籍可能存在或者多个副本，当我们添加新的副本时，我们不必要每次都创建新的 `Book` 实例，
而是可以复用已经存在的 `Book` 实例：

```ts
const bookList = [] // 图书馆中的书籍（包含副本）

function addBook(title, author, isbn, sales, availibility) {
  const book = createBook(title, author, isbn)
  bookList.push({
    book,
    sales,
    availibility,
    isbn,
  })
}
```

而对于书籍借出记录，我们也进行单独的管理:

```ts
const bookCheckoutRecords = new Map()

function addRecord(isbn, checkoutDate, checkoutMember, dueReturnDate) {
  // 从图书馆中找到对应的可用的书籍
  const item = bookList.find(book => book.isbn === isbn && book.availibility)
  if (item) {
    const record = {
      book: item.book,
      checkoutDate,
      checkoutMember,
      dueReturnDate
    }
    item.availibility = false
    const recordId = `${isbn}-${checkoutMember}-${checkoutDate}`
    bookCheckoutRecords.set(recordId, record)
  }
  else {
    console.log(`isbn ${isbn} is not available`)
  }
}
```

完美！在图书馆书籍总数 和 借出记录中，我们复用了 `book` 对象，不必每次都创建新的 `Book` 对象。

当我们添加新的书籍副本时：

```ts
addBook('JavaScript', 'James', '978-1-59327-482-1', 100, true)
addBook('JavaScript', 'Jams', '978-1-59327-482-1', 100, true)
addBook('HTML', 'Jhon', '978-1-59327-482-2', 80, true)
addBook('HTML', 'Jhon', '978-1-59327-482-2', 80, false)
addBook('CSS', 'Yang', '978-1-59327-482-3', 50, true)
```

虽然书籍总数增加了 5 本，但在 bookDatabase 中，只新增了 3 本不同的图书。

当我们添加新的借出记录时，如果图书馆中有对应的书籍，那么就可以复用已经存在的 `book` 对象，不必创建新的 `book` 对象。

```ts
addRecord('978-1-59327-482-1', '2022-01-01', 'Jams', '2018-01-31')
addRecord('978-1-59327-482-2', '2022-01-01', 'Li', '2018-02-01')
addRecord('978-1-59327-482-3', '2022-01-01', 'Huang', '2018-03-31')
addRecord('978-1-59327-482-4', '2022-01-01', 'Has', '2018-04-11')
```

## 优点

当我们需要创建大量对象时，并且在这些对象中存在大量相同的数据时，享元模式 非常有用，可以大大减少内存开销。
