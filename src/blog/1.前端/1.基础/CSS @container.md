---
title: CSS @container：组件级响应式设计
createTime: 2023/12/23 16:41:33
permalink: /article/qv8ce43o/
tags:
  - css
---

在传统响应式设计中，我们依赖媒体查询（`@media`）来根据视口尺寸调整样式。但随着组件化开发的普及，这种方法显得力不从心。CSS `@container` 规则的到来，标志着我们进入了**组件级响应式设计**的新时代！

## 什么是容器查询？

容器查询（Container Queries）允许元素根据其**父容器**的尺寸变化进行样式调整，而不是依赖视口大小。这意味着组件可以自主响应其所在容器的环境，实现真正的模块化和可复用性。

:::tip 核心优势

- **组件级响应**：组件自主响应容器尺寸，不依赖视口
- **上下文感知**：组件可感知不同容器环境自动适配
- **高复用性**：同一组件在不同容器中呈现不同布局
:::

## 快速入门：三步实现容器查询

:::steps

- **步骤1**：定义容器上下文
- **步骤2**：编写容器查询规则
- **步骤3**：应用响应式样式

:::

### 1. 定义容器上下文

```css title="定义容器"
.component-container {
  container-type: inline-size; /* 监控内联方向尺寸（宽度） */
  container-name: main-container; /* 可选命名 */
}
```

或者使用简写形式：

```css title="简写语法"
.component-container {
  container: main-container / inline-size;
}
```

### 2. 编写容器查询

```css title="容器查询示例"
@container main-container (min-width: 400px) {
  .card {
    grid-template-columns: 1fr 2fr;
    gap: 2rem;
  }
  .card__title {
    font-size: clamp(1.25rem, 3vw, 1.5rem);
  }
}
```

## 实战案例：智能卡片组件

让我们通过一个完整的示例来理解容器查询的强大之处：

:::: demo normal title="响应式卡片演示" desc="根据容器宽度自动调整布局的卡片组件"
::: code-tabs
@tab HTML

```html
<div class="card-container">
  <div class="card">
    <img src="/images/defensive-css/ratio.png" alt="示例图片">
    <div class="content">
      <h3>智能响应式卡片</h3>
      <p>这个卡片会根据父容器的宽度自动调整布局，实现真正的组件级响应式设计。</p>
      <button>了解更多</button>
    </div>
  </div>
</div>
```

@tab CSS

```css
.card-container {
  container: card-container / inline-size;
  resize: horizontal; /* 仅用于演示，允许手动调整宽度 */
  overflow: auto;
  border: 1px solid #e0e0e0;
  padding: 1rem;
  max-width: 800px;
}

/* 默认样式 - 移动端优先 */
.card {
  display: block;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  overflow: hidden;
}

.card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card .content {
  padding: 1.5rem;
}

.card h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.card p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.card button {
  background: #007bff;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
}

/* 容器宽度 ≥ 400px 时切换为并排布局 */
@container card-container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 150px 1fr;
    align-items: start;
    gap: 1.5rem;
  }

  .card img {
    height: 120px;
    border-radius: 8px;
  }
}

/* 容器宽度 ≥ 600px 时优化排版 */
@container card-container (min-width: 600px) {
  .card {
    grid-template-columns: 200px 1fr;
    gap: 2rem;
    padding: 1.5rem;
  }

  .card img {
    height: 150px;
  }

  .card h3 {
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
  }

  .card button {
    padding: 1rem 2rem;
    font-size: 1rem;
  }
}

/* 容器宽度 ≥ 800px 时大屏优化 */
@container card-container (min-width: 800px) {
  .card {
    grid-template-columns: 250px 1fr;
    padding: 2rem;
  }

  .card img {
    height: 180px;
  }

  .card h3 {
    font-size: 1.75rem;
  }
}
```

:::
::::

## 容器类型详解

`container-type` 属性定义了容器的监控维度：

| 类型 | 描述 | 适用场景 |
|------|------|----------|
| `inline-size` | 监控内联方向尺寸（通常是宽度） | ==最常用=={.success}，性能最佳 |
| `size` | 监控宽高两个维度 | 需要高度响应的特殊情况 |
| `normal` | 不监控尺寸，仅用于样式查询 | 样式查询场景 |

:::warning 重要提醒
使用 `container-type: size` 时要特别小心，因为它会阻止容器根据内容调整大小，可能导致布局问题。==大多数情况下推荐使用 `inline-size`=={.tip}。
:::

## 容器查询长度单位

容器查询引入了一套新的相对单位，专门用于容器上下文：

```css title="容器查询单位使用"
@container (min-width: 400px) {
  .responsive-element {
    /* 使用容器宽度百分比 */
    font-size: calc(1rem + 1cqw);
    padding: 2cqi; /* 内联方向的2% */
    margin: 1cqb;  /* 块级方向的1% */
  }
}
```

可用的容器查询单位：

- `cqw` - 容器宽度的1%
- `cqh` - 容器高度的1%
- `cqi` - 内联尺寸的1%
- `cqb` - 块级尺寸的1%
- `cqmin` - 较小尺寸的1%
- `cqmax` - 较大尺寸的1%

## 高级特性

### 1. 多容器嵌套查询

```css title="多容器查询"
/* 查询最近的父级容器 */
@container (min-width: 300px) {
  .component {
    /* 样式 */
  }
}

/* 查询特定命名容器 */
@container sidebar (min-width: 500px) {
  .widget {
    /* 样式 */
  }
}

/* 组合查询 */
@container (min-width: 400px) and (max-width: 800px) {
  .component {
    /* 中等尺寸样式 */
  }
}
```

### 2. 样式查询（实验性功能）

样式查询允许基于容器的样式值（目前主要是自定义属性）进行条件渲染：

```css title="样式查询示例"
.product-card-container {
  container-type: inline-size;
}

/* 基于自定义属性的样式查询 */
@container style(--status: new) {
  .product-badge::after {
    content: "新品";
    background: #28a745;
  }
}

@container style(--status: low-stock) {
  .product-badge::after {
    content: "库存紧张";
    background: #ffc107;
  }
}
```

## 浏览器兼容性与降级方案

### 浏览器支持情况

@[caniuse](mdn-css_at-rules_container)

### 渐进增强策略

```css title="兼容性处理"
/* 基础样式（所有浏览器） */
.card {
  display: block;
  padding: 1rem;
  margin: 1rem 0;
}

/* 容器查询增强（仅支持浏览器生效） */
@supports (container-type: inline-size) {
  .card-container {
    container-type: inline-size;
  }

  @container (min-width: 400px) {
    .card {
      display: grid;
      grid-template-columns: 1fr 2fr;
    }
  }
}

/* 备用媒体查询方案 */
@media (min-width: 768px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}
```

## 性能优化建议

:::important 性能提示

- **优先使用 `inline-size`**：比 `size` 性能更好
- **避免深层嵌套**：建议容器查询嵌套不超过3层
- **使用 CSS Containment**：优化渲染性能
- **限制查询触发频率**：避免过于频繁的布局重计算
:::

```css title="性能优化示例"
.optimized-container {
  container-type: inline-size;
  contain: layout style; /* 启用布局和样式 containment */
}
```

## 实际应用场景

容器查询特别适合以下场景：

1. **自适应侧边栏组件**
2. **动态网格布局系统**
3. **响应式数据表格**
4. **自适应导航菜单**
5. **卡片组件的多形态展示**
6. **仪表盘小部件**
7. **多列布局内容流**

## 最佳实践总结

1. **移动端优先**：从最小尺寸开始设计，逐步增强
2. **语义化命名**：为容器使用有意义的名称
3. **渐进增强**：确保不支持时的基本功能
4. **性能意识**：避免不必要的复杂查询
5. **测试驱动**：在不同容器尺寸下全面测试

容器查询标志着 CSS 响应式设计的重大进步，它为组件化开发提供了前所未有的灵活性。虽然需要一些时间来适应新的思维模式，但一旦掌握，你将能够创建出真正智能、自适应的用户界面。

## 参考

- [MDN 容器查询文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_containment/Container_queries)
- [Chrome 开发者文档：样式查询](https://developer.chrome.com/docs/css-ui/style-queries?hl=zh-cn)
- [Container Queries 规范](https://www.w3.org/TR/css-contain-3/)
