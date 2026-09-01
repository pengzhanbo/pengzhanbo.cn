---
url: /design-pattern/adapter/index.md
---
## 什么是适配器模式？

\==Adapter(适配器)模式== 是一种结构型设计模式。

用于将不兼容的接口转换为客户端期望的接口。它通过创建一个中间层（适配器），
使原本因接口不匹配而无法协作的类或对象能够协同工作。适配器模式的核心是 **转换**，而非修改原有代码。

## 实现适配器模式

在 JavaScript 中，适配器模式可以通过以下两种方式实现：

### 对象适配器

通过组合（持有被适配对象的实例）实现接口转换：

```ts
// 被适配的旧接口
class OldLogger {
  logMessage(message) {
    console.log(`旧日志格式: [${new Date()}] ${message}`)
  }
}

// 新系统期望的接口
class NewLoggerAdapter {
  constructor(oldLogger) {
    this.oldLogger = oldLogger
  }

  // 适配旧接口到新接口
  print(text) {
    this.oldLogger.logMessage(text.toUpperCase()) // 转换逻辑
  }
}

// 使用适配器
const oldLogger = new OldLogger()
const adapter = new NewLoggerAdapter(oldLogger)
adapter.print('hello world') // 输出：旧日志格式: [当前时间] HELLO WORLD
```

### 函数适配器

通过高阶函数包装原有函数：

```ts
// 旧函数：参数顺序是 (width, height)
function calculateArea(width, height) {
  return width * height
}

// 适配器：将新接口 (height, width) 转换为旧接口
const adaptedCalculateArea = (height, width) => calculateArea(width, height)

console.log(adaptedCalculateArea(10, 5)) // 输出 50
```

## 优点

* **解耦性**：分离客户端代码与被适配对象，避免直接依赖不兼容的接口。
* **复用性**：整合旧代码或第三方库时无需修改其源码。
* **灵活性**：适配器可以作为临时过渡方案，支持逐步重构。
* **开闭原则**：通过新增适配器扩展功能，而非修改现有代码。

## 缺点

* **复杂度增加**：过多适配器会使得代码结构复杂，维护成本上升。
* **性能损耗**：额外的调用层可能轻微影响性能（通常可忽略）。
* **可能掩盖问题**：滥用适配器可能导致设计缺陷被隐藏，而非彻底解决。

## 适用场景

* **整合第三方库**：将外部库的接口转换为符合当前系统的接口。
* **旧系统改造**：逐步迁移遗留代码时，新旧接口共存。
* **统一接口规范**：多个类/对象功能类似但接口不同，需统一调用方式。
* **数据格式转换**：如将 XML 响应适配为 JSON 格式。
