---
url: /design-pattern/visitor/index.md
---
## 什么是访问者模式？

\==Visitor（访问者）模式== 是一种行为型设计模式。

它允许在不修改现有对象结构的前提下，为对象结构中的元素添加新的操作。

核心思想是将数据操作与数据结构分离，通过“访问者”对象实现对不同元素的操作扩展。

访问者模式主要由以下部分组成：

### Visitor（访问者）

声明访问具体元素的方法（visitElementA, visitElementB）。

### ConcreteVisitor（具体访问者）

实现访问者接口，定义对元素的具体操作逻辑。

### Element（元素）

定义 accept(visitor) 方法，接收访问者对象。

### ConcreteElement（具体元素）

实现 accept() 方法，调用访问者的对应方法。

### ObjectStructure（对象结构）

维护元素集合，提供遍历接口供访问者操作。

## 实现访问者模式

```js
// 1. 定义元素接口
class Shape {
  accept(visitor) {
    throw new Error('Method \'accept()\' must be implemented.')
  }
}

// 2. 具体元素：圆形
class Circle extends Shape {
  constructor(radius) {
    super()
    this.radius = radius
  }

  accept(visitor) {
    visitor.visitCircle(this) // 将自身传递给访问者
  }
}

// 3. 具体元素：矩形
class Rectangle extends Shape {
  constructor(width, height) {
    super()
    this.width = width
    this.height = height
  }

  accept(visitor) {
    visitor.visitRectangle(this)
  }
}

// 4. 访问者接口
class Visitor {
  visitCircle(circle) {}
  visitRectangle(rectangle) {}
}

// 5. 具体访问者：面积计算器
class AreaCalculator extends Visitor {
  visitCircle(circle) {
    const area = Math.PI * circle.radius ** 2
    console.log(`Circle area: ${area.toFixed(2)}`)
  }

  visitRectangle(rectangle) {
    const area = rectangle.width * rectangle.height
    console.log(`Rectangle area: ${area}`)
  }
}

// 6. 具体访问者：周长计算器
class PerimeterCalculator extends Visitor {
  visitCircle(circle) {
    const perimeter = 2 * Math.PI * circle.radius
    console.log(`Circle perimeter: ${perimeter.toFixed(2)}`)
  }

  visitRectangle(rectangle) {
    const perimeter = 2 * (rectangle.width + rectangle.height)
    console.log(`Rectangle perimeter: ${perimeter}`)
  }
}

// 7. 对象结构（管理元素集合）
class Drawing {
  constructor() {
    this.shapes = []
  }

  add(shape) {
    this.shapes.push(shape)
  }

  accept(visitor) {
    this.shapes.forEach(shape => shape.accept(visitor))
  }
}

// 客户端代码
const drawing = new Drawing()
drawing.add(new Circle(5))
drawing.add(new Rectangle(4, 6))

const areaCalculator = new AreaCalculator()
const perimeterCalculator = new PerimeterCalculator()

console.log('--- Area Calculation ---')
drawing.accept(areaCalculator)

console.log('\n--- Perimeter Calculation ---')
drawing.accept(perimeterCalculator)
```

```console
--- Area Calculation ---
Circle area: 78.54
Rectangle area: 24

--- Perimeter Calculation ---
Circle perimeter: 31.42
Rectangle perimeter: 20
```

## 优点

* **开闭原则**：新增操作只需添加访问者，无需修改元素类。
* **单一职责**：将相关操作集中到访问者中，分离数据结构与算法。
* **扩展性好**：可轻松添加新操作（如新增 VolumeCalculator）。
* **状态累积**：访问者可在遍历过程中收集数据（如计算总面积）。

## 缺点

* **破坏封装**：元素需暴露内部状态供访问者操作（如 circle.radius）。
* **增加新元素困难**：新增元素类型需修改所有访问者（违反开闭原则）。
* 不适合元素类频繁变化的场景。
* 可能引入循环依赖（元素与访问者相互依赖）。

## 适用场景

* 对象结构稳定，但需频繁添加新操作。
* 需要对复杂结构（如 AST、DOM 树）执行多种独立操作。
* 避免污染元素类代码（如分离业务逻辑与数据模型）。
* 跨多个类执行统一操作（如报表生成、导出功能）。

## 典型应用案例

* **抽象语法树（AST）处理**：编译器中的类型检查、代码优化。
* **文档处理**：导出 HTML/PDF、拼写检查。
* **UI 组件树**：渲染、布局计算。
* **游戏开发**：角色属性计算、碰撞检测。
