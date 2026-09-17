---
url: /article/xqniz7cb/index.md
---
在现代 Web 开发中，流畅的页面过渡效果能够显著提升用户体验。View Transitions API 是一个革命性的浏览器原生 API，它让创建复杂的页面过渡动画变得前所未有的简单。本文将带你从零开始，全面掌握这个强大的 API。

## 什么是 View Transitions API？

View Transitions API 是一个新的 Web 标准，它提供了一种声明式的方法来创建页面之间的平滑过渡动画。想象一下，当你在相册应用中切换图片时，图片会平滑地从一个位置过渡到另一个位置——View Transitions API 让这样的效果变得轻而易举。

:::info 核心优势

* **简化复杂动画**：以前需要大量 JavaScript 和 CSS 的动画，现在几行代码就能实现
* **性能优化**：浏览器原生支持，性能远超 JavaScript 实现的动画
* **跨文档过渡**：支持单页应用和多页应用中的页面过渡
* **自动状态捕获**：浏览器自动处理前后状态的快照
  :::

## 基础用法

### 1. 启用 View Transitions

要使用 View Transitions API，首先需要检查浏览器支持情况：

```javascript
// 检查浏览器支持
if (document.startViewTransition) {
  // 浏览器支持 View Transitions API
}
else {
  // 降级方案
  console.log('View Transitions API 不被支持')
}
```

### 2. 基本页面过渡

最简单的用法是在页面导航时添加过渡效果：

```javascript
// 拦截导航事件
document.addEventListener('click', (event) => {
  const link = event.target.closest('a')
  if (!link)
    return

  // 如果是站内链接
  if (link.href && link.origin === location.origin) {
    event.preventDefault()

    // 开始视图过渡
    document.startViewTransition(() => {
      // 导航到新页面
      location.href = link.href
    })
  }
})
```

### 3. 单页应用中的使用

在单页应用（SPA）中，View Transitions API 可以创建更精细的过渡效果：

```javascript
// 假设我们有一个简单的 SPA 路由
async function navigateTo(url) {
  // 开始视图过渡
  const transition = document.startViewTransition(async () => {
    // 获取新内容
    const response = await fetch(url)
    const html = await response.text()

    // 更新页面内容
    document.body.innerHTML = html
  })

  // 等待过渡完成
  await transition.finished
  console.log('过渡完成！')
}
```

## 深入理解过渡过程

View Transitions API 的过渡过程分为几个关键阶段：

:::steps

* **捕获快照**：浏览器捕获当前页面的快照
* **更新 DOM**：执行你提供的回调函数来更新页面
* **捕获新快照**：浏览器捕获更新后页面的快照
* **执行动画**：浏览器在两个快照之间执行过渡动画

:::

## 自定义过渡动画

### 1. 使用 CSS 自定义动画

View Transitions API 的强大之处在于可以使用 CSS 完全自定义动画效果：

```css
/* 为所有视图过渡设置基础样式 */
::view-transition-old(root) {
  animation: 0.5s ease-out both fade-out;
}

::view-transition-new(root) {
  animation: 0.5s ease-out both fade-in;
}

@keyframes fade-out {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(20px);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### 2. 为特定元素创建命名过渡

你可以为页面中的特定元素创建独立的过渡效果：

```javascript
// 更新特定元素的过渡名称
function updateElementWithTransition(element, newContent) {
  // 为元素设置唯一的过渡名称
  element.style.viewTransitionName = 'special-element'

  document.startViewTransition(() => {
    element.innerHTML = newContent
  }).finished.then(() => {
    // 过渡完成后清除名称
    element.style.viewTransitionName = 'none'
  })
}
```

然后在 CSS 中定义这个命名过渡：

```css
::view-transition-old(special-element) {
  animation: 0.3s both slide-out;
}

::view-transition-new(special-element) {
  animation: 0.3s both slide-in;
}

@keyframes slide-out {
  to {
    transform: translateX(-100%);
    opacity: 0;
  }
}

@keyframes slide-in {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
}
```

## 高级特性

### 1. 共享元素过渡

共享元素过渡是 View Transitions API 最强大的功能之一，它允许元素在不同页面间平滑移动：

```javascript
// 为图片元素设置过渡名称
function setupImageTransitions() {
  const images = document.querySelectorAll('.gallery-image')

  images.forEach((img, index) => {
    // 为每个图片设置唯一的过渡名称
    img.style.viewTransitionName = `image-${index}`

    img.addEventListener('click', () => {
      // 在详情页使用相同的过渡名称
      document.startViewTransition(() => {
        // 导航到详情页
        showImageDetail(img.src, `image-${index}`)
      })
    })
  })
}
```

### 2. 控制过渡时序

你可以精确控制过渡的时序和分组：

```css
::view-transition-group(special-element) {
  /* 控制整个过渡组的动画时长 */
  animation-duration: 0.8s;
}

::view-transition-image-pair(special-element) {
  /* 控制新旧图片对的隔离行为 */
  isolation: auto;
}
```

## 实际应用示例

### 1. 图片画廊

让我们创建一个完整的图片画廊过渡示例：

::: code-tabs
@tab HTML

```html title="gallery.html"
<div class="gallery">
  <img src="image1.jpg" class="gallery-item" data-id="1">
  <img src="image2.jpg" class="gallery-item" data-id="2">
  <img src="image3.jpg" class="gallery-item" data-id="3">
</div>
```

@tab JavaScript

```javascript title="gallery.js"
document.addEventListener('DOMContentLoaded', () => {
  const galleryItems = document.querySelectorAll('.gallery-item')

  galleryItems.forEach((item) => {
    item.addEventListener('click', async () => {
      const imageId = item.getAttribute('data-id')

      // 设置过渡名称
      item.style.viewTransitionName = `gallery-image-${imageId}`

      await document.startViewTransition(async () => {
        // 导航到详情页
        await showImageDetail(imageId)

        // 在详情页设置相同的过渡名称
        const detailImage = document.querySelector('#detail-image')
        detailImage.style.viewTransitionName = `gallery-image-${imageId}`
      }).finished

      // 清理过渡名称
      item.style.viewTransitionName = 'none'
    })
  })
})
```

@tab CSS

```css title="gallery.css"
/* 画廊样式 */
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.gallery-item {
  width: 100%;
  height: 200px;
  object-fit: cover;
  cursor: pointer;
  border-radius: 8px;
}

/* 过渡动画 */
::view-transition-old(gallery-image-1),
::view-transition-old(gallery-image-2),
::view-transition-old(gallery-image-3) {
  animation: 0.4s both scale-out;
}

::view-transition-new(gallery-image-1),
::view-transition-new(gallery-image-2),
::view-transition-new(gallery-image-3) {
  animation: 0.4s both scale-in;
}

@keyframes scale-out {
  to {
    transform: scale(0.8);
    opacity: 0;
  }
}

@keyframes scale-in {
  from {
    transform: scale(1.2);
    opacity: 0;
  }
}
```

:::

### 2. 列表到详情过渡

另一个常见的使用场景是列表项到详情页的过渡：

```javascript
// 列表项点击处理
function setupListTransitions() {
  const listItems = document.querySelectorAll('.list-item')

  listItems.forEach((item, index) => {
    item.style.viewTransitionName = `item-${index}`

    item.addEventListener('click', () => {
      document.startViewTransition(async () => {
        // 显示详情
        await showItemDetail(item.dataset.id)

        // 在详情页设置过渡名称
        const detailElement = document.querySelector('.detail-content')
        detailElement.style.viewTransitionName = `item-${index}`
      })
    })
  })
}
```

## 性能优化和最佳实践

### 1. 性能考虑

:::warning 性能提示

* **避免过度使用**：不是所有的页面变化都需要过渡效果
* **注意内存使用**：快照会占用内存，特别是在移动设备上
* **测试降级方案**：确保在不支持的浏览器中页面仍能正常工作
  :::

### 2. 降级方案

```javascript
function safeViewTransition(updateCallback) {
  if (document.startViewTransition) {
    return document.startViewTransition(updateCallback)
  }
  else {
    // 直接执行更新，没有过渡效果
    updateCallback()
    return {
      finished: Promise.resolve(),
      ready: Promise.resolve(),
      updateCallbackDone: Promise.resolve()
    }
  }
}

// 使用安全的过渡函数
safeViewTransition(() => {
  // 更新页面内容
  updateContent()
})
```

### 3. 可访问性考虑

```css
/* 为偏好减少动画的用户提供支持 */
@media (prefers-reduced-motion: reduce) {
  ::view-transition-group(*),
  ::view-transition-old(*),
  ::view-transition-new(*) {
    animation: none !important;
  }
}
```

## 常见问题解答

### Q: View Transitions API 支持哪些浏览器？

**A:** 目前 Chrome/Edge 111+ 和 Opera 98+ 支持，其他浏览器正在逐步支持中。

### Q: 可以在 iframe 中使用吗？

**A:** 目前 iframe 中的 View Transitions 支持有限，建议在主文档中使用。

### Q: 过渡过程中可以取消吗？

**A:** 是的，你可以使用 `transition.skipTransition()` 来取消进行中的过渡。

## 总结

View Transitions API 为 Web 开发带来了革命性的页面过渡体验。通过本文的学习，你应该已经掌握了：

* \==基础使用方法=={.success}：如何使用 `document.startViewTransition()` 创建基本过渡
* \==自定义动画=={.info}：通过 CSS 伪元素完全控制过渡效果
* \==高级特性=={.important}：共享元素过渡、命名过渡等高级用法
* \==实际应用=={.tips}：在图片画廊、列表详情等场景中的具体实现
* \==最佳实践=={.warning}：性能优化、降级方案和可访问性考虑

## 参考

* [MDN View Transitions API 文档](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)
* [Chrome Developers 官方指南](https://developer.chrome.com/docs/web-platform/view-transitions/)
* [View Transitions API 示例集合](https://github.com/argyleink/view-transitions-api-examples)
