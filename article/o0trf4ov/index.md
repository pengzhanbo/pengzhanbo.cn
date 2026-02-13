---
url: /article/o0trf4ov/index.md
---
写这篇文章，其实有些晚了，早在今年的 3 月份（2025 年），
微软宣布 [Typescript 官方编译器将移植到 Go](https://devblogs.microsoft.com/typescript/typescript-native-port/)，并承诺速度比当前编译器要快 10 倍。这引起了 Javascript 社区对 Go 语言的广泛关注。

因此，这篇文章旨在为对 ==Go 语言== 感到好奇或希望进一步了解的 ==JavaScript 开发者=={.info} 提供一个起点。
我将尝试涵盖 Go 的核心基础概念，同时与 `JavaScript/TypeScript` 中的类似概念进行比较，并分享一些我作为 JavaScript 开发者思维需要适应的注意事项。

::: tip 本文并不能完整的作为 Go 语言的入门教程。
:::

JavaScript 拥有多个运行时环境，为避免混淆，示例中的 JavaScript 代码均使用 `Typescript` 编写，并运行在 `Node.js` 环境下。

## 基础概念 {#basic}

### 编译与执行 {#compile-and-run}

首先需要了解的是，`Go` 是一种编译型语言，因此需要先编译成本地机器码二进制文件才能执行；
而 `JavaScript` 则是一种解释型语言，无需编译即可执行。

例如，你可以编写一个 `JavaScript` 文件，然后使用 `node` 命令直接运行它：

```js title="hello.js"
console.log('Hello, world!')
```

然后可以直接执行它：

```sh title="Terminal"
node hello.js
> Hello, world!
```

::: info 开始使用 `Go`
要开始使用Go，你需要从 <https://go.dev/dl/> 下载适用于你的系统的 Go 二进制发行版。
:::

以下是 `Go` 语言的示例：

```go title="hello.go"
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}

```

要运行此程序，你需要先构建它，然后执行生成的二进制文件：

```sh title="Terminal"
go build hello.go

./hello
> Hello, World!
```

或者，你也可以直接使用 `run` 命令，它能够一步完成编译与执行：

```sh title="Terminal"
go run hello.go
> Hello, World!
```

::: info 由于Go编译为本地机器码，若希望代码能在不同平台上运行，就需要为不同架构编译不同的二进制文件。
:::

### Packages - 包 {#packages data-outline="4"}

每个 `Go` 程序都由包构成，并从运行主包开始。
主包中必须包含一个名为 `main` 的函数，该函数作为程序的入口点，当主函数返回时程序结束。

::: go-repl title="main.go"

```go
package main // 声明 main 包
// 导入其他包
import (
  "fmt"
)
// 运行 main 包时， main 函数会默认执行
func main() {
  // 在控制台打印 Hello world
  fmt.Println("Hello world")
}
```

:::

::: tip 可通过代码片段标题右侧的在线运行按钮来执行示例。
:::

`Go` 语言中的包类似于`JavaScript` 中的模块，它们是一组相关的源文件集合。
你可以像在 `JavaScript` 中导入模块一样创建和导入包。
在上面的代码片段中，我们也从 `Go` 的标准库中导入了 `fmt` 包。

::: info
`fmt`（format的缩写）是Go语言的核心包之一。它用于格式化输入输出。
上文中的 `Println` 函数会以默认格式打印参数，并在末尾添加换行符。

:::

#### `go.mod`

类似于 `package.json`，`Go` 程序有一个 `go.mod` 文件，它作为 Go 模块的配置文件，包含了模块及其依赖项的信息。
一个典型的 `Go` 模块文件如下所示：

```go title="go.mod"
module myproject

go 1.16

require (
    github.com/gin-gonic/gin v1.7.4
    golang.org/x/text v0.3.7
)
```

* 第一行声明了模块的导入路径，作为该模块的唯一标识；
* 第二行指定了模块所需的最低 Go 版本；
* 最后列出了所有直接和间接依赖项及其具体版本。

要在 Go 中创建一个包，你需要新建一个目录，目录名即为包名，
然后该目录下的所有 Go 文件通过在文件顶部声明包名来成为该包的一部分。

在Go语言中，从包中导出内容的方式也很有趣。
在 JavaScript 中，如果使用 ES 模块，我们会用 `export` 关键字来使模块内的内容对外可用。
但在 Go 语言中，==如果一个名称以大写字母开头，它就会被导出=={.important}。

以下示例展示了我们之前讨论的所有内容：

::: go-repl

```go
package main

import (
  "fmt"
  "myproject/fib"
)

func main() {
  sequence := fib.FibonacciSequence(10)

  // 这将导致一个错误
  // firstFibonacciNumber := fib.fibonacci(1)

  fmt.Println("Fibonacci sequence of first 10 numbers:")
  fmt.Println(sequence)
}

-- go.mod --
module myproject

-- fib/fib.go --
package fib

// 由于此函数未以大写字母开头，因此它不会被导出。
func fibonacci(n int) int {
    if n <= 0 {
        return 0
    }
    if n == 1 {
        return 1
    }

    return fibonacci(n-1) + fibonacci(n-2)
}

// 该函数导出，因为它以大写字母开头
func FibonacciSequence(n int) []int {
    sequence := make([]int, n)

    for i := 0; i < n; i++ {
        sequence[i] = fibonacci(i)
    }

    return sequence
}
```

[在 **go playground** 中运行](https://goplay.tools/snippet/YGirZs_tEtD){.readmore}

在上述示例中，我们通过创建同名目录生成了另一个名为 `fib` 的包。
此外，如果仔细观察，只有 `FibonacciSequence` 函数被导出，因为它以 **大写字母开头**，因此可以在包外部访问。

### Variables - 变量 {#variables}

Go 是静态类型语言，即你需要声明（或推断）每个变量的类型，这些类型会在编译阶段进行检查。
这与 JavaScript 不同，在 JavaScript 中变量可以持有任意类型的值，且仅在程序运行时才会进行类型评估。

例如，在 JavaScript 中，你可以这样操作：

::: code-tabs
@tab JavaScript

```ts
let x = 5
let y = 2.5
let sum = x + y // 运行正常：7.5
// eslint-disable-next-line prefer-template
let weird = x + '2' // 同样“有效”：“52”（但可能并非你所期望！）
```

:::

但在 Go 语言中，你需要非常明确地指定类型，`var` 相当于现代 JavaScript 中的 `let`：

```go title="GoLang"
var x int = 5
// 或者 x := 5 这是一个简短的赋值语句。
// 可以替代具有隐式类型的变量声明。

var y float64 = 2.5

// 这将无法编译：
sum := x + y  // Error: mismatched types int and float64

// 必须显式转换：
sum := float64(x) + y
```

类似于 JavaScript 中的 `const`，Go 语言也拥有 `const` 关键字用于声明常量。
其声明方式与变量类似，但需使用 `const` 关键字：

```go title="GoLang"
const pi float64 = 3.14

// 或者声明时不指定类型以直接推断
const s = "hello"
```

但与 JavaScript 不同，==Go 语言中的 `const` 仅能用于基本类型（字符、字符串、布尔值或数值）=={.important}，而不能用于其他复杂类型。

::: warning 在 Go 语言中，声明变量却不使用它，并不仅仅是像某些 linter 在 JavaScript 或 TypeScript 中给出的警告那样，而是一个编译错误。
:::

### Structs and Types - 结构体与类型 {#structs-and-types}

正如你可以用 JavaScript 对象来表示一组字段一样，在 Go 中你也可以使用结构体来表示一组字段。

```go title="GoLang"
type Person struct {
  Name string
  Age int
}

p := Person{
  Name: "John",
  Age: 32,
}

// 或创建复合结构体
type User struct {
  Person Person
  ID     string
}

u := User{
  Person: p,
  ID:     "123",
}
```

::: info
在 Go 语言中，结构体字段名必须首字母大写才能被导出（供其他包访问或用于 [JSON序列化](https://pkg.go.dev/encoding/json)）。
小写字母开头的结构体字段是未导出的，仅在包内可见。
:::

乍看之下，你可能会觉得这种语法与 TypeScript 的 `type / interface` 相似，但实际行为却不同：

* 在 TypeScript 中，类型仅规定值的结构，你可以传入任何其他类型的超集，代码仍能正常运行。
* 而在 Go 中，结构体是具体的数据类型，其赋值兼容性是基于名称而非结构。

因此，以下代码在 TypeScript 中可以运行：

```ts twoslash title="TypeScript"
interface Person {
  name: string
  age: number
}

interface User {
  name: string
  age: number
  username: string
}

function helloPerson(p: Person) {
  console.log(p)
}

helloPerson({
  name: 'John',
  age: 32
})

const x: User = {
  name: 'John',
  age: 32,
  username: 'john',
}

helloPerson(x)
```

这在Go语言中行不通：

:::go-repl title="GoLang"

```go
package main

type Person struct {
    Name string
    Age  int
}

type User struct {
    Name     string
    Age      int
    Username string
}

func HelloPerson(p Person) {
    fmt.Println(p)
}

func main() {
    // This works fine
    HelloPerson(Person{
        Name: "John",
        Age:  32,
    })

    // 不能正常工作
    x := User{
        Name:     "John",
        Age:      32,
        Username: "john",
    }

    // Error: cannot use x (variable of struct type User) as Person value in argument to HelloPerson
    HelloPerson(x)

    // 要使其正常工作，你需要明确进行转换：
    // HelloPerson(Person{Name: x.Name, Age: x.Age})
}
```

:::

[在 **Go Playground** 中运行](https://goplay.tools/snippet/icNQx5SCNIx){.readmore}

Go 语言中的类型不仅限于结构体，它们可以定义变量能够持有的任何类型的值：

```go title="GoLang"
type ID int

var i ID
i = 2
```

一个常见的用例是创建基于字符串的枚举：

```go title="GoLang"
type Status string

const (
  StatusPending  Status = "pending"
  StatusApproved Status = "approved"
  StatusRejected Status = "rejected"
)

type Response struct {
  Status Status
  Meta   string
}

res := Response{
  Status: StatusApproved,
  Meta:   "Request successful",
}
```

与TypeScript的联合类型不同，Go 的自定义类型（如 `Status`）仅仅是其基础类型的别名。
编译器不会阻止你将任意字符串赋值给 `Status` 变量：

```go title="GoLang"
var s Status
s = "hello" // 可以正常编译
```

就 TypeScript 而言，它的类型系统是图灵完备的，允许你扩展或操作现有类型来创建新类型，
并完全在类型层面执行复杂计算。这使得高级类型验证和类型安全的抽象成为可能。

```ts title="TypeScript" twoslash
interface Person {
  firstName: string
  lastName: string
  age: number
}

// 扩展类型，包含Person的所有属性，以及额外的属性
type Doctor = Person & {
  speciality: string
}

type Res = { status: 'success', data: Person } | { status: 'error', error: string }

// Res 是一个区分联合类型，允许你根据状态访问不同的属性。
function getData(res: Res) {
  switch (res.status) {
    case 'success':
      console.log(res.data)
      break
    case 'error':
      console.log(res.error)
      break
  }
}

// 所有属性都是可选的类型
type OptionalDoctor = Partial<Doctor>

// 仅包含 firstName 和 speciality 属性的类型
type MinimalDoctor = Pick<Doctor, 'firstName' | 'speciality'>
```

Go 语言中的结构体主要是数据容器，不具备像TypeScript类型那样的操作特性。
最相似的功能是结构体嵌入，这是 Go 实现组合和一种继承形式的方式：

::: go-repl title="GoLang"

```go
package main

import "fmt"

type Person struct {
  FirstName string
  LastName  string
}

type Doctor struct {
  Person
  Speciality string
}

func main() {
  d := Doctor{
    Person: Person{
      FirstName: "Bruce",
      LastName:  "Banner",
    },
    Speciality: "gamma",
  }

  fmt.Println(d.Person.FirstName) // Bruce

  // 嵌入的结构体的键会被提升
  // 所以这也有效
  fmt.Println(d.FirstName) // Bruce
}

```

:::

[在 **Go Playground** 中运行](https://goplay.tools/snippet/llYHWGG0u35){.readmore}

### Zero Values - 零值 {#zero-values}

另一个可能让习惯 JavaScript 的你一开始感到困惑的概念是 Go 中的 ==零值=={.important}。
在 JavaScript 中，你可以定义一个变量，默认情况下它的值会是 `undefined` 。

```ts title="TypeScript" twoslash
let x: number | undefined
console.log(x) // undefined

x = 3
console.log(x) // 3
```

但在 Go 语言中，如果你初始化一个变量而未显式赋值，它会被赋予与类型相应的零值。

以下是一些基本类型的默认值：

```go title="GoLang"
var i int // 0
var f float64 // 0
var b bool // false
var s string // ""

x := i + 7 // 7
y := !b // true
z := s + "string" // string
```

同样地，结构体字段默认也具有零值：

```go title="GoLang"
type Person struct {
  name string  // ""
  age  int     // 0
}

p := Person{} // 创建一个名为空字符串且年龄为0的Person
```

Go语言也有 `nil` ，类似于 JavaScript 中的 `null`，但只有 **引用类型的变量** 才能持有 `nil` 值。
要理解这些概念，我们需要先了解 Go 语言中的指针。

### Pointers - 指针 {#pointers}

Go 语言拥有指针，其概念与 `C` 和 `C++` 等语言类似，指针用于存储指向某个值的内存地址。

您可以使用 `*T` 语法为类型 `T` 声明指针。在 Go 语言中，任何指针的零值都是 `nil`。

```go title="GoLang"
var i *int

i == nil // true
```

`&` 运算符生成指向其操作数的指针，而 `*` 运算符获取指针所指向的底层值，这也被称为 ==解引用指针=={.important}。

::: go-repl title="GoLang"

```go
package main

import "fmt"

func main() {
  x := 42
  i := &x
  fmt.Println(*i) // 42

  *i = 84
  fmt.Println(x) // 84
}
```

:::

[在 **Go Playground** 中运行](https://goplay.tools/snippet/VjT8Pafk3xN){.readmore}

但请记住，如果指针是nil，而你尝试解引用它，就会引发著名的 ==空指针解引用错误=={.warning} ：

```go title="GoLang"
var x *string

fmt.Println(*x)
// panic: runtime error: invalid memory address or nil pointer dereference
```

这引出了 JavaScript 开发者的需要关注的一个关键差异：

* 在 JavaScript 中，除了原始值外，所有内容都是隐式地通过引用传递的；
* 而 Go 则通过指针使其显式化。

例如，JavaScript 中的对象是通过引用传递的，因此如果你在函数内部修改对象，它会修改原始对象：

```ts title="TypeScript" twoslash
let obj = { value: 42 }

function modifyObject(o: any) {
  o.value = 84 // Original object is modified
}

modifyObject(obj)
console.log(obj.value) // 84
```

在 Go语言中，几乎所有内容都是按值传递的（除了切片、映射和通道，我们将在后续章节中介绍），
除非你使用指针，因此以下做法在 Go 中行不通：

::: go-repl title="GoLang"

```go
package main

type Object struct {
  Value int
}

func modifyObject(o Object) {
  o.Value = 84
}

func main() {
  o := Object{Value: 42}
  modifyObject(o) // 原始对象不会被修改
  fmt.Println(o.Value) // 42
}
```

:::

[在 **Go Playground** 中运行](https://goplay.tools/snippet/-nt_ZN68xMx){.readmore}

除非通过指针实现：

::: go-repl title="GoLang"

```go
package main

type Object struct {
  Value int
}

func modifyObjectPtr(o *Object) {
  o.Value = 84  // Go语言允许对结构体使用这种简写形式。
  // 而不是执行 (*o).Value
}

func main() {
  o := Object{Value: 42}
  modifyObjectPtr(&o)
  fmt.Println(o.Value) // 84
}
```

:::

[在 **Go Playground** 中运行](https://goplay.tools/snippet/0rq7_RnlxxV){.readmore}

这是因为当我们传递指针时，实际上传递的是 ==原始对象的内存地址=={.important}，这使得我们能够直接修改其底层值。
而且这不仅限于结构体，你可以为任何类型创建指针，包括基本类型：

::: go-repl title="GoLang"

```go
package main

func modifyValue(x *int) {
    *x = 100
}

func main() {
  y := 42
  modifyValue(&y)
  fmt.Println(y) // 100
}
```

:::

[在 **Go Playground** 中运行](https://goplay.tools/snippet/3jXZoqLjHpe){.readmore}

### Functions - 函数 {#functions}

我们在上一节简要介绍了函数，你可能已经猜到，它们与 JavaScript 中的工作方式非常相似。
除了使用 `func` 关键字而非 `function` 之外，它们的声明语法也与 JavaScript 颇为接近。

```go title="GoLang"
func greet(name string) string {
  if name == "" {
    name = "there"
  }
  return "Hello, " + name
}
```

与 JavaScript 类似，它们也是一等公民，这意味着它们可以被赋值给变量并传递，因此也支持高阶函数和闭包。
例如：

::: go-repl title="GoLang"

```go
package main

import "fmt"

func makeMultiplier(multiplier int) func(int) int {
  return func(x int) int {
    return x * multiplier
  }
}

func main() {
  double := makeMultiplier(2)

  fmt.Println(double(2)) // 4
}
```

:::

[在 **Go Playground** 中运行](https://goplay.tools/snippet/6l3X5QjvjA9){.readmore}

Go 语言同样支持从函数返回多个值。
这一模式在处理错误时尤为实用，我们将在后续章节中详细探讨。

::: go-repl title="GoLang"

```go
package main

import (
  "fmt"
  "strings"
)

func parseName(fullName string) (string, string) {
  parts := strings.Split(fullName, " ")
  if len(parts) < 2 {
    return parts[0], ""
  }
  return parts[0], parts[1]
}

func main() {
  firstName, lastName := parseName("Bruce Banner")

  fmt.Printf("%s, %s", lastName, firstName) // Banner, Bruce
}
```

:::

[在 **Go Playground** 中运行](https://goplay.tools/snippet/iv0rrwHGQgf){.readmore}

### Arrays and Slices - 数组与切片 {#arrays-and-slices}

在 Go 语言中，与 JavaScript 不同，数组具有固定容量，长度是其类型的一部分，因此无法调整大小。
这听起来可能有些局限，但我们马上会介绍一种处理数组的更好方法。

首先，我们来回顾一下 JavaScript 中数组的工作原理：

```ts title="TypeScript" twoslash
let s: Array<number> = [1, 2, 3]

s.push(4)

s[1] = 0

console.log(s) // [1, 0, 3, 4]
```

在 Go 语言中，你可以这样声明一个指定大小的数组：

```go title="GoLang"
var a [3]int
//  ^ 这将创建一个包含三个零值的数组：[0 0 0]

a[1] = 2 // [0 2 0]

// 或者你也可以定义一个带有初始值的数组：
b := [3]int{1,2,3}
```

注意这里没有 `push` 方法，因为在 Go 语言中数组长度是固定的。
而这正是切片发挥作用的地方。切片是对数组的动态大小灵活视图：

```go title="GoLang"
c := [6]int{1,2,3,4,5,6}

d := c[1:4] // [2 3 4]
```

乍一看，这或许像是 JavaScript 中的 `slice` 方法，但请记住：

* JavaScript 的 `slice` 返回的是 ==浅拷贝==，
* \==Go 中的切片则保持对底层数组的引用=={.important}。

因此，在 JavaScript 中可以这样操作：

```ts title="TypeScript" twoslash
let x: Array<number> = [1, 2, 3, 4, 5, 6]
let y = x.slice(1, 4)

y[1] = 0
console.log(x, y) // x = [1, 2, 3, 4, 5, 6] y = [2, 0, 4]
```

现在重点的部分是 ==切片字面量==。你可以通过 ==省略数组中的长度部分=={.important} 来创建切片字面量。

```go title="GoLang"
var a []int
// 或者
b := []int{1,2,3}

a == nil // true
```

对于 `b`，它创建了我们之前看到的相同数组，但 `b` 存储了引用该数组的切片。
另外，如果还记得上节中的 [零值](#zero-values) 概念，切片的零值是 `nil`，
因此在上面的例子中，`a` 将是 `nil`，因为指向底层数组的指针是 `nil` 。

除了底层数组外，切片还拥有 ==长度== 和 ==容量== 两个属性，
其中长度表示切片当前包含的元素数量，容量则代表底层数组的元素总数。
可以通过 `len` 和 `cap` 方法获取切片的长度与容量信息：

:::go-repl title="GoLang"

```go
package main

import "fmt"

func main() {
  s := []int{1,2,3,4,5,6}
  t := s[0:3]

  fmt.Printf("len=%d cap=%d %v\n", len(t), cap(t), t)
  // len=3 cap=6 [1 2 3]
}
```

:::

[在 **Go Playground** 中运行](https://goplay.tools/snippet/a-YG-bMozDz){.readmore}

在上述示例中，切片 `t` 的长度为 `3`，这是因为它从原始数组中被截取的方式所致，但底层数组的剩余容量仍为 `6`。

你也可以使用内置的 `make` 函数来创建一个切片，语法为 `make([]T, len, cap)` 。
它会分配一个初始化为零值的数组，并返回一个引用该数组的切片。

```go title="GoLang"
a := make([]int, 5)  // len(a)=5, cap(a)=5

b := make([]int, 0, 5) // len(b)=0, cap(b)=5
```

[在 **Go Playground** 中运行](https://goplay.tools/snippet/a4ZBuDj0VWn){.readmore}

此外，还有一个内置的 `append` 方法，它允许将项目追加到切片中，而无需担心切片的长度或容量：

```go title="GoLang"
a := []int{1,2,3}

a = append(a,4) // [1 2 3 4]
```

`append` 总是返回一个包含原切片所有元素及所提供值的新切片。
如果底层数组容量不足以容纳新增值，`append` 会创建更大的数组并返回指向该数组的切片。

与 JavaScript 不同，Go 语言没有内置声明式的函数式辅助工具，如 `map`、`reduce`、`filter` 等。
因此，你可以使用传统的 `for` 循环来遍历切片或数组：

```go title="GoLang"
for i, num := range numbers {
  fmt.Println(i, num)
}

// 或者如果你只想要数字的话
// for _, num := range numbers
```

最后，我们知道在 JavaScript 中数组属于非原始类型，因此它们总是通过引用传递：

```ts title="Typescript" twoslash
function modifyArray(arr: number[]) {
  arr.push(4)
  console.log('Inside function:', arr) // Inside function: [1, 2, 3, 4]
}

const myArray: number[] = [1, 2, 3]
modifyArray(myArray)
console.log('Outside function:', myArray) // Outside function: [1, 2, 3, 4]
```

在 Go 语言中，==数组是按值传递的=={.important}，正如我们在前一节所见，
**切片是数组片段的描述符，它包含一个指向数组的指针**，因此传递这个描述符意味着 ==对切片元素的修改会影响底层数组=={.important}。

::: go-repl title="GoLang"

```go
package main

import "fmt"

func modifyArray(arr [3]int) {
    arr[0] = 100
    fmt.Println("Array Inside:", arr) // Array Inside: [100, 2, 3]
}

func modifySlice(slice []int) {
    slice[0] = 100
    fmt.Println("Slice Inside:", slice) // Slice Inside: [100, 2, 3]
}

func main() {
  myArray := [3]int{1, 2, 3}
  mySlice := []int{1, 2, 3}

  modifyArray(myArray)
  fmt.Println("Array After:", myArray) // Array After: [1, 2, 3]

  modifySlice(mySlice)
  fmt.Println("Slice After:", mySlice) // Slice After: [100, 2, 3]
}
```

:::

[在 **Go Playground** 中运行](https://goplay.tools/snippet/EkXXRTBKYzh){.readmore}

### Maps - 映射 {#maps}

Go 中的 `Maps` 实际上更类似于 JavaScript 中的 `Map`，而非 JavaScript 对象（`JSON`），后者在存储键值对时更为常见。

简单回顾一下，JavaScript 中 `Map` 的工作原理如下：

```ts title="Typescript" twoslash
const userScores: Map<string, number> = new Map()

// 添加键值对
userScores.set('Alice', 95)
userScores.set('Bob', 82)
userScores.set('Charlie', 90)

// 定义一个用户年龄对象的 interface
interface UserAgeInfo {
  age: number
}

// 使用 interface 来定义一个映射
const userAges: Map<string, UserAgeInfo> = new Map([
  ['Alice', { age: 28 }],
  ['Bob', { age: 34 }],
  ['Charlie', { age: 22 }]
])

// 访问映射
console.log(userScores.get('Alice')) // 95

// 删除键值对
userScores.delete('Bob')

// 映射大小
console.log(userScores.size) // 2
```

同样地，这也是Go语言中映射（`map`）的工作原理：

::: go-repl title="GoLang"

```go
package main

import "fmt"

func main() {
  // Creating a map
  userScores := map[string]int{
    "Alice":   95,
    "Bob":     82,
    "Charlie": 90,
  }

  type UserAge struct {
    age int
  }

  // Alternative way to create
  userAges := make(map[string]UserAge)
  userAges["Alice"] = UserAge{age: 28}
  userAges["Bob"] = UserAge{age: 34}
  userAges["Charlie"] = UserAge{age: 22}

  // Getting values
  aliceScore := userScores["Alice"]
  fmt.Println(aliceScore) // 95

  // Deleting an entry
  delete(userScores, "Bob")

  // Size of the map
  fmt.Println(len(userScores)) // 2
}

```

:::

[在 **Go Playground** 中运行](https://goplay.tools/snippet/SC0q91MPMrd){.readmore}

需要注意的是，如果你尝试访问映射中不存在的键，你将得到该值类型的零值。
因此，在上面的例子中，这会导致 `davidScore` 被设置为 `0`，而不是像 JavaScript 中的 `undefined`。

```go title="GoLang"
davidScore := userScores["David"] // 0
```

那么，如何判断一个元素是否真的存在于映射中呢？
从映射中检索值会返回两个值：

* 第一个是值本身，也就是我们在上述例子中看到的
* 第二个是一个布尔值，表示该值是否确实存在于映射中。

::: go-repl title="GoLang"

```go
package main

import "fmt"

func main() {
  userScores := map[string]int{
    "Alice":   95,
    "Bob":     82,
    "Charlie": 90,
  }

  davidScore, exists := userScores["David"]
  if !exists {
    fmt.Println("David not found")
  }

  fmt.Println(davidScore)
}

```

:::

[在 **Go Playground** 中运行](https://goplay.tools/snippet/Pr2bOa4ofQi){.readmore}

最后，类似于我们之前看到的切片，映射变量同样是指向底层数据结构的指针，因此它们也像切片一样通过引用传递。

::: go-repl title="GoLang"

```go
package main

import "fmt"

func modifyMap(m map[string]int) {
  m["Zack"] = 100 // 这个更改将对调用者可见
}

func main() {
  scores := map[string]int{
    "Alice": 95,
    "Bob":   82,
  }

  fmt.Println("Before:", scores) // 之前: map[Alice:95 Bob:82]

  modifyMap(scores)

  fmt.Println("After:", scores) // 之后: map[Alice:95 Bob:82 Zack:100]
}
```

:::

[在 **Go Playground** 中运行](https://goplay.tools/snippet/tXlHkIfmLMd){.readmore}

### Comparisons - 比较 {#comparisons}

在 JavaScript中，进行严格相等性检查时，有时会让人感到困惑。
你可以按值比较原始类型，但其他所有类型都是通过引用来比较和传递的。

```ts title="Typescript" twoslash
let a = 5
let b = 5
console.log(a === b) // true - 按值比较

let str1 = 'hello'
let str2 = 'hello'
console.log(str1 === str2) // true - 按值比较

let a1 = { name: 'Hulk' }
let a2 = { name: 'Hulk' }
let a3 = a1

console.log(a1 === a2) // false - 内容相同但引用不同
console.log(a1 === a3) // true - 引用相同
```

但在 Go 语言中情况并非如此，几乎所有内容都 ==按值比较== ，即使是结构体和数组这样的复合类型，
只要它们不包含不可比较的类型（如切片、映射等）。例如

::: go-repl title="GoLang"

```go
package main

import "fmt"

type Person struct {
  Name string
  Age  int
}

func main() {
  p1 := Person{Name: "Alice", Age: 30}
  p2 := Person{Name: "Alice", Age: 30}

  fmt.Println("p1 == p2:", p1 == p2) // true - 相同内容，不同实例

  // 数组按值比较
  arr1 := [3]int{1, 2, 3}
  arr2 := [3]int{1, 2, 3}

  fmt.Println("arr1 == arr2:", arr1 == arr2) // true - 相同内容，不同实例

  // 但切片不能
  tasks := []string{"Task1", "Task2", "Task3"}
  tasks2 := []string{"Task1", "Task2", "Task3"}

  // 这不会编译：
  fmt.Println(tasks == tasks2) // 无效操作: tasks == tasks2

  // 尽管这是允许的
  fmt.Println(tasks == nil) // false

  // 但当一个结构体包含不可比较的类型时，它本身也成为不可比较的
  type Container struct {
    Items []int // 切片是不可比较的
  }

  c1 := Container{Items: []int{1, 2, 3}}
  c2 := Container{Items: []int{1, 2, 3}}

  // 这不会编译：
  fmt.Println("c1 == c2:", c1 == c2) // error: struct containing slice cannot be compared

  // 指针通过引用（地址）进行比较
  pp1 := &Person{Name: "Bob", Age: 25}
  pp2 := &Person{Name: "Bob", Age: 25}
  pp3 := pp1

  fmt.Println("pp1 == pp2:", pp1 == pp2)     // false - 不同实例
  fmt.Println("pp1 == pp3:", pp1 == pp3)     // true - 相同实例
  fmt.Println("*pp1 == *pp2:", *pp1 == *pp2) // true - 解引用比较值
}
```

:::

[在 **Go Playground** 中运行](https://goplay.tools/snippet/t7tOVCutIJ6){.readmore}

### Methods and Interfaces - 方法和接口 {#methods-and-interfaces}

在JavaScript中，我们使用类对象将相关的属性和方法打包成一个实体，以模拟现实世界中的概念。
你可以通过类来创建对象，而类本质上只是JavaScript原型继承系统的语法糖。

```ts title="Typescript" twoslash
class Rectangle {
  length: number
  width: number

  constructor(length: number, width: number) {
    this.length = length
    this.width = width
  }

  area() {
    return this.length * this.width
  }
}

const r = new Rectangle(4, 5)
console.log(r.area()) // 20
```

Go 语言不像许多其他语言那样拥有类，但它允许你直接在类型上定义方法。
方法是一种特殊的函数，它在 `func` 关键字和方法名之间有一个 ==特殊的接收者参数=={.important}。

例如：

::: go-repl title="GoLang"

```go
package main

import "fmt"

type Rectangle struct {
  length float64
  width  float64
}

func (r Rectangle) Area() float64 {
  return r.length * r.width
}

func main() {
  r := Rectangle{
    length: 4,
    width:  5,
  }
  fmt.Println(r.Area()) // 20
}

```

:::

[在 **Go Playground** 中运行](https://goplay.tools/snippet/HWQk6JXotK8){.readmore}

由于方法本质上就是带有接收者参数的函数，上述示例可以在功能完全不变的情况下重写为：

```go title="GoLang"
func Area(r Rectangle) float64 {
  return r.length * r.width
}
```

上述代码片段展示了一个值接收器的例子，其中接收器变量获取的是类型的副本。
尽管在大多数情况下，你会使用指针接收器来声明方法。
带有指针接收器的方法可以修改接收器所指向的值。

::: go-repl title="GoLang"

```go
package main

import "fmt"

type Rectangle struct {
  length float64
  width  float64
}

func (r Rectangle) Area() float64 {
  return r.length * r.width
}

func (r *Rectangle) Double() {
  r.length = r.length * 2
  r.width = r.width * 2
}

func main() {
  r := Rectangle{
    length: 4,
    width:  5,
  }

  r.Double()
  fmt.Println(r.Area()) // 80
}

```

:::

[在 **Go Playground** 中运行](https://goplay.tools/snippet/hoakk7i4sGJ){.readmore}

::: info 为了方便起见，Go 会自动将语句 `r.Double()` 解释为 `(&r).Double()`，因为 `Double()` 方法具有指针接收器。
:::

使用指针接收器的另一个好处是，你可以避免在每次方法调用时复制值，如果它是一个大型结构体，这可能会提高效率。

### Interfaces - 接口 {#interfaces}

正如我们所知，TypeScript 使用 `type` 和 `interface` 来定义对象的签名，
与其他语言类似，它们也可以与类结合使用，通过 `implements` 关键字来定义类的签名变量和方法：

```ts title="TypeScript" twoslash
interface Shape {
  area: () => number
  perimeter: () => number
}

class Circle implements Shape {
  #radius: number

  constructor(radius: number) {
    this.#radius = radius
  }

  area(): number {
    return Math.PI * this.#radius * this.#radius
  }

  perimeter(): number {
    return 2 * Math.PI * this.#radius
  }
}

function printArea(s: Shape) {
  console.log(s.area())
}

let c = new Circle(3)

printArea(c)
```

Go 语言的接口也服务于类似的目的，在 Go 中接口类型同样被定义为一组方法签名，并且它可以持有实现了这些方法的值。

例如

::: go-repl title="GoLang"

```go
package main

import (
  "fmt"
  "math"
)

type Shape interface {
  area() float64
  perimeter() float64
}

type Rectangle struct {
  length float64
  width  float64
}

func (r *Rectangle) area() float64 {
  return r.length * r.width
}

func (r *Rectangle) perimeter() float64 {
  return 2 * (r.length + r.width)
}

type Circle struct {
  radius float64
}

func (c *Circle) area() float64 {
  return math.Pi * c.radius * c.radius
}

func (c *Circle) perimeter() float64 {
  return 2 * math.Pi * c.radius
}

func printArea(s Shape) {
  fmt.Println(s.area())
}

func main() {
  r := &Rectangle{
    length: 4,
    width:  5,
  }

  c := &Circle{
    radius: 3,
  }

  fmt.Println("Rectangle area:")
  printArea(r)

  fmt.Println("Circle area:")
  printArea(c)
}
```

:::

[在 **Go Playground** 中运行](https://goplay.tools/snippet/EjS07cGLbxs){.readmore}

在上述示例中，请注意虽然 `Rectangle` 没有使用 `implements` 关键字，
但我们仍能将其传递给需要 `Shape` 类型参数的函数。
在 Go 语言中，类型通过实现接口的方法来隐式满足该接口，无需任何显式的 `implements` 关键字。

起初这可能看起来有些奇怪，但这是Go设计中的一个非常强大的特性，
它允许我们将接口的定义与其实现解耦，这意味着你可以为现有类型创建接口。

在 Go 语言中，接口的底层实现可以看作是一个包含值和具体类型的元组。以上述示例为例：

```go title="GoLang"
var r Shape

r = &Rectangle{
  length: 4,
  width:  5,
}

fmt.Printf("%v, %T", r, r) // &{4 5}, *main.Rectangle
```

同样地，一个空的接口既没有值也没有具体类型，访问该接口上的属性会导致空指针异常。

```go title="GoLang"
var r Shape

fmt.Printf("(%v, %T)\n", r, r) // <nil>, <nil>

r.Area() // Runtime error: nil pointer exception
```

一个空接口类型的变量可以容纳任何值，它相当于 TypeScript 中的 `any`。

```go title="GoLang"
var r interface{}

r = 42

r = "Bruce Banner"
```

::: info Go 1.18 还引入了一个名为 `any` 的类型，它实际上是空接口的别名，因此在上面的例子中，`var r any` 同样适用。
:::

最后，Go 语言中还有类型断言，可用于获取接口的底层具体值。例如在上述情况中

::: go-repl title="GoLang"

```go
package main

import (
  "fmt"
  "math"
)

type Shape interface {
  area() float64
  perimeter() float64
}

type Rectangle struct {
  length float64
  width  float64
}

func (r *Rectangle) area() float64 {
  return r.length * r.width
}

func (r *Rectangle) perimeter() float64 {
  return 2 * (r.length + r.width)
}

type Circle struct {
  radius float64
}

func (c *Circle) area() float64 {
  return math.Pi * c.radius * c.radius
}

func (c *Circle) perimeter() float64 {
  return 2 * math.Pi * c.radius
}

func printArea(s Shape) {
  fmt.Println(s.area())
}

func main() {
  var s Shape

  s = &Circle{
    radius: 3,
  }

  c, ok := s.(*Circle) // c 的类型是 *Circle
  fmt.Println(c, ok)   // &{3} true

  r, ok := s.(*Rectangle) // r 的类型将是 *Rectangle
  fmt.Println(r, ok)      // <nil> false
}

```

:::

[在 **Go Playground** 中运行](https://goplay.tools/snippet/OMvHoC4ztD7){.readmore}

而且这不仅仅适用于结构体类型，类型断言同样适用于基本类型：

::: go-repl title="GoLang"

```go
package main

import (
  "fmt"
)

func main() {
  var i interface{} = "hello"

  s, ok := i.(string)
  fmt.Println(s, ok)

  f, ok := i.(float64)
  fmt.Println(f, ok)
}
```

:::

[在 **Go Playground** 中运行](https://goplay.tools/snippet/JysEU1GCbiS){.readmore}

### Error Handling - 错误处理 {#error-handling}

这是我喜欢 Go 语言的一点，也是 JavaScript 值得借鉴的地方。
Go 语言处理错误的方式极其明确，而且如果你没有处理错误，还会有 linter 工具发出警告。

在 JavaScript 中处理错误最常见的方法之一是使用 `try catch`，以下是一个典型的函数示例，
该函数读取一些 JSON 文件，处理它们并返回 JSON ：

```ts title="TypeScript" twoslash
import fs from 'node:fs'

async function processFiles(filePaths: string[]): Promise<any[] | null> {
  try {
    const fileContents = await Promise.all(
      filePaths.map(path => fs.promises.readFile(path, 'utf-8'))
    )

    const results = fileContents.map(content => JSON.parse(content))
    return results
  }
  catch (error) {
    // 哪个操作失败了？是文件读取还是JSON解析？
    // 哪个文件导致了问题？
    console.error('Something went wrong:', error)
    return null
  }
}
```

在上述代码中，尽管我们处理了异常，但若没有额外操作（例如将每个文件读取和解析操作都包裹在 `try-catch` 中），
我们仍无法细致了解具体哪个环节可能出错。

但 Go 语言采用了不同的错误处理方式。它不使用异常机制，而是允许函数返回多个值。
按照惯例，最后一个返回值通常是错误类型。因此，上述示例在 Go 中会呈现为类似这样的形式：

```go title="GoLang"
func processFiles(filePaths []string) ([]map[string]string, error) {
  var results []map[string]string

  for _, path := range filePaths {
    // 在源头单独处理每个错误
    data, err := os.ReadFile(path)
    if err != nil {
      return nil, fmt.Errorf("failed to read file %s: %w", path, err)
    }

    var result map[string]string
    err = json.Unmarshal(data, &result)

    if err != nil {
      return nil, fmt.Errorf("failed to parse JSON from file %s: %w", path, err)
    }

    results = append(results, result)
  }

  return results, nil
}
```

在上述 Go 语言的示例中，错误在每一步都得到了显式处理，从而清晰地展示了故障发生的位置和原因。
每个可能失败的操作之后都会立即检查错误值，一旦出现错误，函数便会提前返回并附带详细的错误信息。

这种方法还促使开发者必须明确考虑并处理各种错误情况，而不是让异常在调用栈中未经处理地向上传递。

Go语言中也有一种称为延迟函数（`defer`）的特性，它允许我们在外围函数退出后立即执行某个语句。例如：

::: go-repl title="GoLang"

```go
package main

import "fmt"

func main() {
  defer fmt.Println("World")
  defer fmt.Println("Go")
  fmt.Println("Hello")
}
```

:::

[在 **Go Playground** 中运行](https://goplay.tools/snippet/6aLLD8qxgZo){.readmore}

`defer` 函数遵循后进先出（`LIFO`）的顺序执行，因此 `“World”` 会在最后打印。

`defer` 函数与 Go 语言的错误处理机制配合得天衣无缝，它允许你将清理代码紧邻资源分配的位置编写，
但仅在函数退出时执行。例如：

```go title="GoLang"
package main

import (
  "database/sql"
  "fmt"
  _ "github.com/lib/pq" // PostgreSQL driver
)

func getUsername(userID int) (string, error) {
    // 打开数据库连接
    db, err := sql.Open("postgres", "postgresql://username:password@localhost/mydb?sslmode=disable")
    if err != nil {
        return "", fmt.Errorf("无法连接到数据库: %w", err)
    }
    defer db.Close() // 这确保了函数退出时数据库连接被关闭。

    // 执行查询
    var username string
    err = db.QueryRow("SELECT username FROM users WHERE id = $1", userID).Scan(&username)
    if err != nil {
        return "", fmt.Errorf("获取用户名失败： %w", err)
    }

    return username, nil
}

```

在上面的示例中，用于关闭数据库的 `defer` 语句紧接在打开数据库连接之后，
这确保了只要打开连接时没有错误，无论函数如何退出，连接都会被关闭，
同时将清理代码紧邻资源获取处放置，清晰地展示了需要释放哪些资源。

在 JavaScript 中，我们使用类似 `finally` 代码块来实现类似的目标。
以下是上述示例在 JavaScript 中的方式：

```ts title="TypeScript"
import { Client } from 'pg'

async function getUsername(userId: string) {
  const client = new Client({
    connectionString: 'postgresql://username:password@localhost/mydb'
  })

  try {
    await client.connect()

    // 执行查询
    const result = await client.query('SELECT username FROM users WHERE id = $1', [userId])

    if (result.rows.length === 0) {
      throw new Error('User not found')
    }

    return result.rows[0].username
  }
  catch (error) {
    throw new Error(`Database error: ${error.message}`)
  }
  finally {
    await client.end() // 这相当于 Go 语言中用于清理的 defer 语句。
  }
}
```

延迟函数也可用于从 `panics` 中恢复，`panics` 是 Go 语言中与 JavaScript 运行时错误或异常相对应的概念。
在这两种语言中，当发生 `panics` 或运行时异常时，程序会停止执行当前函数并开始展开调用栈；
如果异常最终未被处理，程序将终止（在Go语言中，展开过程中仍会执行调用栈上的所有延迟函数）。

在 JavaScript 中，你可以使用相同的 `try-catch` 块来优雅地处理运行时错误；

而在 Go 语言中，你需要在 `defer` 函数中使用名为 `recover` 的特殊函数来处理 `panic`。例如：

::: go-repl title="GoLang"

```go
package main

import "fmt"

func riskyOperation() {
  defer func() {
    if r := recover(); r != nil {
      fmt.Println("Recovered from panic:", r)
    }
  }()

  // 这将引发 panic
  var arr []int
  fmt.Println(arr[1]) // 访问越界
}

func main() {
  riskyOperation()
  fmt.Println("Program continues after recovery")
}

```

:::

[在 **Go Playground** 中运行](https://goplay.tools/snippet/NfqH0R3d0rA){.readmore}

在上述示例中，当发生 `panic` 时，会执行延迟函数，该函数调用 `recover` 来捕获 `panic` 并防止程序崩溃。
这使得你能够优雅地处理错误并继续执行。

### Concurrency - 并发 {#concurrency}

这两种语言处理并发的方式是它们最大的不同之处。

JavaScript 本质上是单线程的，但由于其事件驱动的架构，它允许在主线程上通过回调、Promise 等方式执行非阻塞 I/O 操作。
这种事件驱动的架构使 JavaScript 能够在没有多线程的情况下实现并发。

Go通过 `goroutine` 支持真正的并发，这些是由 Go 运行时管理的轻量级线程（每个约 2KB）。
与 JavaScript 的单线程事件循环不同，Go 可以在多个操作系统线程上并行执行代码。
虽然 Go 代码本身是同步的，但 `goroutine` 使得跨 CPU 核心的并行执行成为可能。

以下是创建 `goroutine` 的方法：

::: go-repl title="GoLang"

```go
package main

import (
  "fmt"
  "time"
)

func say(s string) {
  fmt.Println(s)
}

func main() {
  go say("world")
  say("hello")

  // 添加睡眠以防止程序退出
  // 在 goroutine 运行之前，有更好的方式
  // 使用通道和等待组来处理这种情况
  time.Sleep(100 * time.Millisecond)
}

```

:::

[在 **Go Playground** 中运行](https://goplay.tools/snippet/0tQR1874rNG){.readmore}

在上面的示例中，`go` 关键字会在一个新的 `goroutine` 中执行该函数，该 `goroutine` 与当前 `goroutine` 并行运行。

要理解 `goroutine` 与 JavaScript 事件循环的对比，这里有一个示例：

我们并行发起多个 API 调用，并使用 `Promise.all` 等待响应：

```ts title="TypeScript"
async function fetchData() {
  try {
    // 同时发起两个请求, “并行”
    const postPromise = fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => response.json())

    const commentsPromise = fetch('https://jsonplaceholder.typicode.com/posts/1/comments')
      .then(response => response.json())

    // 等待两个 promises 都 resolve
    const [post, comments] = await Promise.all([postPromise, commentsPromise])

    console.log('Post:', post)
    console.log('Comments:', comments)
  }
  catch (error) {
    console.error('Error fetching data:', error)
  }
}

fetchData()
```

以下是在 Go 语言中使用goroutine实现类似功能的示例：

::: go-repl title="GoLang"

```go
package main

import (
  "fmt"
  "io/ioutil"
  "net/http"
  "sync"
)

func main() {
  var wg sync.WaitGroup
  var postJSON, commentsJSON string
  var postErr, commentsErr error

  // Add two items to wait for
  wg.Add(2)

  // Fetch post in a goroutine
  go func() {
    defer wg.Done()
    resp, err := http.Get("https://jsonplaceholder.typicode.com/posts/1")
    if err != nil {
      postErr = err
      return
    }
    defer resp.Body.Close()

    body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
      postErr = err
      return
    }

    postJSON = string(body)
  }()

  // Fetch comments in a goroutine
  go func() {
    defer wg.Done()
    resp, err := http.Get("https://jsonplaceholder.typicode.com/posts/1/comments")
    if err != nil {
      commentsErr = err
      return
    }
    defer resp.Body.Close()

    body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
      commentsErr = err
      return
    }

    commentsJSON = string(body)
  }()

  // Wait for both goroutines to complete
  wg.Wait()

  // Handle any errors
  if postErr != nil {
    fmt.Println("Error fetching post:", postErr)
    return
  }
  if commentsErr != nil {
    fmt.Println("Error fetching comments:", commentsErr)
    return
  }

  // Print results
  fmt.Println("Post JSON:", postJSON)
  fmt.Println("Comments JSON:", commentsJSON)
}
```

:::

[在 **Go Playground** 中运行](https://goplay.tools/snippet/a36f7R8WqtT){.readmore}

::: important
上述示例使用了 `WaitGroup`，它属于 `sync` 包，为 Go 提供了基本的 `synchronization primitives`。

`Channels` 是 Go 另一个强大的特性，它允许 `goroutine` 之间相互通信，并可用于同步执行。
本文未涵盖 `Channels`，因为它们值得单独撰文探讨，但如果你想深入了解 Go 的并发模型，`Channels` 绝对值得关注。
:::

示例的关键区别在于：

* JavaScript 通过异步 I/O 和事件循环实现并发，将 I/O 操作委托给 浏览器 或 Node.js 在主线程外执行；
* 但对于 CPU 密集型任务，JavaScript 仍会在单主线程上运行，从而阻塞其他操作。
* 而 Go 通过 `goroutine` 实现真正的并行，这些协程可以跨 CPU 核心同时执行。以下是通过协程并行运行 CPU 密集型任务的示例：

::: go-repl title="GoLang"

```go
package main

import (
  "fmt"
  "sync"
)

func sum(s []int, result *int, wg *sync.WaitGroup) {
  defer wg.Done() // 表示此 goroutine 已完成

  sum := 0
  for _, v := range s {
    sum += v
  }
  *result = sum
}

func main() {
  s := []int{7, 2, 8, -9, 4, 0}

  var wg sync.WaitGroup
  var x, y int

  // 向等待组添加 2 个 goroutine
  wg.Add(2)

  // 运行 goroutines
  go sum(s[:len(s)/2], &x, &wg)
  go sum(s[len(s)/2:], &y, &wg)

  // 等待两个 goroutine 都完成
  wg.Wait()

  fmt.Println(x, y, x+y)
}
```

:::

[在 **Go Playground** 中运行](https://goplay.tools/snippet/hVHIuly3-bZ){.readmore}

在上述示例中，我们通过 `goroutine` 并行执行一个 CPU 密集型任务——对切片的两半分别求和，
类似这样的操作在 JavaScript 中除非使用 [Web Workers](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Using_web_workers) 或 [Node.js 的工作线程](https://nodejs.org/api/worker_threads.html)，否则无法原生支持。

### Formatting and Linting - 格式化和检查 {#formatting-and-linting}

Go 在标准库中通过 [Gofmt](https://pkg.go.dev/cmd/gofmt) 包提供了官方格式化工具。

与 JavaScript 生态中不同项目使用 `Prettier` / `Eslint` / `Biome` / `oxlint` 进行个性化配置不同，
`Gofmt` 的可配置性不强，但已被 大多数 Go 项目广泛接受，且多数编辑器默认通过扩展插件支持基于它的自动代码格式化。

在代码检查方面，Go 与 JavaScript 类似，社区构建了一系列检查规则，能够警告或自动修复各类代码质量问题。
[golangci-lint](https://golangci-lint.run/welcome/install/) 是流行的Go检查器运行工具之一，它能并行运行多个检查器，并集成了上百个可配置的检查器。

## 结语

如果你已经读到这里，希望本文为你对 Go 有所启发，并帮助你理解 Go 与 JavaScript 的异同——无论是语言特性还是运行机制。

## 相关资源 {#resources}

* [Go Playground](h**ttps://goplay.tools/)
* [Go 官方文档](https://go.dev/learn/)
* [Go 边学边练](https://go.dev/tour/)
* [Go Examples](https://gobyexample.com/)
* [urfave cli](https://github.com/urfave/cli)
