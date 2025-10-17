---
title: CSS at-Rule @supports 和 `CSS.supports()` API
createTime: 2021/08/21 12:20:30
permalink: /article/nb46t3t0/
---

在现代前端开发中，浏览器兼容性是一个永恒的话题。随着 CSS 标准的快速发展，
如何优雅地检测浏览器是否支持某个 CSS 特性变得尤为重要。本文将深入探讨两种强大的特性检测工具：
JavaScript 的 `CSS.supports()` API 和 CSS 的 `@supports` at-rule。

## 引言：为什么需要特性检测

:::info 特性检测的重要性
在过去，开发者通常使用用户代理嗅探（User Agent Sniffing）来判断浏览器能力，但这种方法既不可靠又难以维护。特性检测提供了更准确、更面向未来的解决方案。
:::

随着 CSS 新特性的不断涌现，如 Grid、Flexbox、CSS Variables 等，确保网站在不同浏览器中都能提供良好的用户体验变得至关重要。

## CSS.supports() JavaScript API

`CSS.supports()` 是 CSS 对象模型（CSSOM）的一部分，允许开发者在 JavaScript 中检测浏览器是否支持特定的 CSS 声明或规则。

### 基本语法

```javascript
// 检测属性-值对
CSS.supports(propertyName, value)

// 检测条件字符串
CSS.supports(condition)
```

### 使用示例

:::: code-tabs
@tab 检测属性-值对

```javascript
// 检测浏览器是否支持 CSS Grid
if (CSS.supports('display', 'grid')) {
  console.log('CSS Grid 支持！')
  // 应用 Grid 布局
  document.body.style.display = 'grid'
}
else {
  console.log('CSS Grid 不支持，使用备用布局')
  // 使用传统布局
  document.body.style.display = 'flex'
}
```

@tab 检测条件字符串

```javascript
// 检测多个条件
if (CSS.supports('(display: grid) and (position: sticky)')) {
  console.log('支持 Grid 和 sticky 定位')
}

// 检测 CSS 自定义属性支持
if (CSS.supports('--main-color: red')) {
  console.log('支持 CSS 自定义属性')
}

// 检测新特性
if (CSS.supports('backdrop-filter: blur(10px)')) {
  console.log('支持毛玻璃效果')
}
```

::::

### 实际应用：渐进增强

```javascript title="渐进增强示例"
function applyModernStyles() {
  const container = document.getElementById('main-container')

  // 检测多个现代特性
  const supportsGrid = CSS.supports('display', 'grid')
  const supportsVariables = CSS.supports('--primary-color: #000')
  const supportsBackdrop = CSS.supports('backdrop-filter', 'blur(10px)')

  if (supportsGrid && supportsVariables) {
    container.classList.add('modern-layout')
    console.log('应用现代样式')
  }
  else {
    container.classList.add('fallback-layout')
    console.log('使用回退样式')
  }
}
```

## CSS @supports at-rule

`@supports` at-rule 允许在 CSS 中直接进行特性检测，类似于媒体查询，但针对的是 CSS 特性支持。

### 基本语法

```css
@supports (condition) {
  /* 当条件满足时应用的 CSS 规则 */
}

@supports not (condition) {
  /* 当条件不满足时应用的 CSS 规则 */
}

@supports (condition1) and (condition2) {
  /* 当所有条件都满足时应用的 CSS 规则 */
}

@supports (condition1) or (condition2) {
  /* 当任一条件满足时应用的 CSS 规则 */
}
```

### 使用示例

:::: code-tabs
@tab 基础检测

```css
/* 检测 Grid 支持 */
@supports (display: grid) {
    .container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
    }
}

/* 检测不支持的情况 */
@supports not (display: grid) {
    .container {
        display: flex;
        flex-wrap: wrap;
    }

    .item {
        flex: 1 1 300px;
        margin: 10px;
    }
}
```

@tab 复杂条件

```css
/* 组合条件检测 */
@supports (display: grid) and (position: sticky) {
    .header {
        position: sticky;
        top: 0;
    }

    .main-content {
        display: grid;
        grid-template-areas: "sidebar content";
    }
}

/* 或条件检测 */
@supports (backdrop-filter: blur(10px)) or
          (-webkit-backdrop-filter: blur(10px)) {
    .modal {
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        background: rgba(255, 255, 255, 0.8);
    }
}
```

@tab 实际布局示例

```css
/* 现代布局系统 */
.container {
    display: flex; /* 基础回退 */
}

@supports (display: grid) {
    .container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1rem;
    }
}

/* CSS 变量支持检测 */
:root {
    --primary-color: #2c3e50; /* 基础值 */
}

@supports (--css-variables: yes) {
    :root {
        --primary-color: #3498db;
        --secondary-color: #e74c3c;
    }

    .button {
        background-color: var(--primary-color);
        color: white;
    }
}
```

::::

## 实际应用场景

### 1. 布局系统的渐进增强

```css title="响应式布局系统"
/* 基础移动端布局 */
.page-layout {
    display: block;
}

/* 中等屏幕 - Flexbox */
@supports (display: flex) and (max-width: 768px) {
    .page-layout {
        display: flex;
        flex-direction: column;
    }
}

/* 大屏幕 - Grid */
@supports (display: grid) and (min-width: 1024px) {
    .page-layout {
        display: grid;
        grid-template-areas:
            "header header"
            "sidebar content"
            "footer footer";
        grid-template-columns: 250px 1fr;
    }
}
```

### 2. 新特性的优雅降级

```css title="毛玻璃效果实现"
.card {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

@supports (backdrop-filter: blur(10px)) or
          (-webkit-backdrop-filter: blur(10px)) {
    .glass-card {
        background: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
    }
}

@supports not ((backdrop-filter: blur(10px)) or
               (-webkit-backdrop-filter: blur(10px))) {
    .glass-card {
        background: rgba(255, 255, 255, 0.95);
    }
}
```

### 3. JavaScript 中的动态特性检测

```javascript title="动态加载 polyfill"
class FeatureDetector {
  static checkFeatures() {
    const features = {
      cssGrid: CSS.supports('display', 'grid'),
      cssVariables: CSS.supports('--test: value'),
      backdropFilter: CSS.supports('backdrop-filter', 'blur(10px)')
        || CSS.supports('-webkit-backdrop-filter', 'blur(10px)'),
      aspectRatio: CSS.supports('aspect-ratio', '16 / 9')
    }

    return features
  }

  static loadPolyfills() {
    const features = this.checkFeatures()

    if (!features.cssGrid) {
      // 动态加载 Grid polyfill
      this.loadScript('css-grid-polyfill.js')
    }

    if (!features.cssVariables) {
      // 应用 CSS 变量回退方案
      this.applyVariableFallbacks()
    }

    // 更新 HTML 类以便 CSS 使用
    this.updateRootClasses(features)
  }

  static updateRootClasses(features) {
    const root = document.documentElement

    Object.entries(features).forEach(([feature, supported]) => {
      const className = supported
        ? `has-${feature}`
        : `no-${feature}`
      root.classList.add(className)
    })
  }
}

// 页面加载时检测
document.addEventListener('DOMContentLoaded', () => {
  FeatureDetector.loadPolyfills()
})
```

## 最佳实践与注意事项

:::warning 浏览器兼容性
虽然 `@supports` 和 `CSS.supports()` 在现代浏览器中得到良好支持，但在 IE 和旧版浏览器中不可用。==始终提供合理的回退方案=={.warning}。
:::

### 1. 性能考虑

```javascript
// 好的做法：缓存检测结果
class CSSSupportCache {
  constructor() {
    this.cache = new Map()
  }

  check(property, value = null) {
    const key = value ? `${property}:${value}` : property

    if (!this.cache.has(key)) {
      const result = value
        ? CSS.supports(property, value)
        : CSS.supports(property)
      this.cache.set(key, result)
    }

    return this.cache.get(key)
  }
}

const supportCache = new CSSSupportCache()

// 重复使用缓存结果
if (supportCache.check('display', 'grid')) {
  // 应用 Grid 样式
}
```

### 2. 渐进增强策略

:::: steps

- **定义核心体验**
  首先确保在不支持任何现代特性的浏览器中，网站的基本功能仍然可用

- **检测特性支持**
  使用 `@supports` 和 `CSS.supports()` 检测可用特性

- **分层增强**
  根据支持的特性逐步添加更高级的样式和交互

- **提供回退**
  为每个现代特性都准备合适的回退方案
::::

### 3. 测试策略

```javascript title="自动化特性检测测试"
describe('CSS 特性检测', () => {
  beforeEach(() => {
    // 重置缓存
    window.CSS._supportCache = null
  })

  test('应该检测 Grid 支持', () => {
    // 模拟不同环境
    const originalSupports = CSS.supports

    // 测试支持的情况
    CSS.supports = jest.fn().mockReturnValue(true)
    expect(CSS.supports('display', 'grid')).toBe(true)

    // 测试不支持的情况
    CSS.supports = jest.fn().mockReturnValue(false)
    expect(CSS.supports('display', 'grid')).toBe(false)

    CSS.supports = originalSupports
  })
})
```

## 总结

`CSS.supports()` JavaScript API 和 CSS `@supports` at-rule 为前端开发者提供了强大的特性检测能力，使得实现渐进增强和优雅降级变得更加简单可靠。

### 关键要点

:::important

- **使用场景**：`CSS.supports()` 适合动态检测，`@supports` 适合静态样式检测
- **渐进增强**：始终从基础体验开始，逐步添加增强功能
- **性能优化**：缓存检测结果，避免重复检测
- **回退方案**：为每个现代特性准备合适的回退方案
- **测试覆盖**：确保在不同浏览器环境下的兼容性

:::

### 参考

[MDN - CSS.supports()](https://developer.mozilla.org/zh-CN/docs/Web/API/CSS/supports){.read-more}
[MDN - @supports](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@supports){.read-more}
[Can I use - CSS Feature Queries](https://caniuse.com/css-featurequeries){.read-more}

通过合理运用这些特性检测工具，你可以构建出既现代化又具有良好兼容性的 Web 应用，为用户提供始终如一的优秀体验。
