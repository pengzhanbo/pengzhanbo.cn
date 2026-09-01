---
url: /article/ofdnzflv/index.md
---
> 在现代前端开发中，创造流畅、高性能的动画效果已成为提升用户体验的关键。Web Animations API 为我们提供了一种强大而灵活的方式来控制动画，让我们一起来探索它的魅力！

## 什么是 Web Animations API？

Web Animations API (WAAPI) 是一个现代的 JavaScript API，它允许开发者使用 JavaScript 来控制 CSS 动画和过渡。与传统的 CSS 动画相比，WAAPI 提供了更精细的控制能力和更强大的编程接口。

:::info 为什么选择 WAAPI？

* **性能优异**：与 CSS 动画性能相当，但控制更灵活
* **编程友好**：完全使用 JavaScript，便于逻辑控制
* **时间轴控制**：精确的播放控制和时间管理
* **兼容性良好**：现代浏览器广泛支持
  :::

## 基础入门

### 1. 创建第一个动画

让我们从一个简单的动画开始：

```javascript title="基础动画示例"
// 获取要动画的元素
const element = document.getElementById('animatedElement')

// 创建动画
const animation = element.animate(
  [
    // 关键帧：从状态
    { transform: 'translateX(0px)', opacity: 1 },
    // 关键帧：到状态
    { transform: 'translateX(100px)', opacity: 0.5 }
  ],
  {
    // 动画选项
    duration: 1000, // 持续时间：1秒
    easing: 'ease-in-out', // 缓动函数
    fill: 'forwards' // 动画结束后保持最终状态
  }
)
```

### 2. 动画选项详解

WAAPI 提供了丰富的配置选项：

```javascript title="完整动画配置"
const animation = element.animate(
  [
    { transform: 'scale(1)', backgroundColor: 'red' },
    { transform: 'scale(1.5)', backgroundColor: 'blue' },
    { transform: 'scale(1)', backgroundColor: 'green' }
  ],
  {
    duration: 2000, // 动画持续时间（毫秒）
    delay: 500, // 开始前延迟（毫秒）
    iterations: 3, // 重复次数（Infinity 表示无限循环）
    direction: 'alternate', // 播放方向：normal, reverse, alternate, alternate-reverse
    easing: 'cubic-bezier(0.42, 0, 0.58, 1)', // 缓动函数
    fill: 'both', // 填充模式：none, forwards, backwards, both
    composite: 'replace' // 复合操作：replace, add, accumulate
  }
)
```

## 核心概念深入

### 1. 关键帧格式

WAAPI 支持多种关键帧格式：

::: code-tabs
@tab 对象数组格式

```javascript
element.animate(
  [
    { opacity: 0, transform: 'translateY(-100px)' },
    { opacity: 1, transform: 'translateY(0)' }
  ],
  { duration: 1000 }
)
```

@tab 属性数组格式

```javascript
element.animate(
  {
    opacity: [0, 1],
    transform: ['translateY(-100px)', 'translateY(0)']
  },
  { duration: 1000 }
)
```

@tab 偏移指定格式

```javascript
element.animate(
  [
    { opacity: 0, offset: 0 },
    { opacity: 0.5, offset: 0.3 },
    { opacity: 1, offset: 1 }
  ],
  { duration: 1000 }
)
```

:::

### 2. 缓动函数

缓动函数决定了动画的变化速率：

```javascript title="常用缓动函数示例"
const easings = {
  linear: 'linear',
  ease: 'ease',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
  customBezier: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  steps: 'steps(5, jump-end)'
}

// 使用不同的缓动函数
Object.entries(easings).forEach(([name, easing]) => {
  element.animate(
    [{ transform: 'translateX(0)' }, { transform: 'translateX(100px)' }],
    { duration: 1000, easing }
  )
})
```

## 动画控制与管理

### 1. 播放控制

WAAPI 提供了完整的播放控制接口：

```javascript title="动画控制方法"
const animation = element.animate(
  [{ opacity: 0 }, { opacity: 1 }],
  { duration: 2000, fill: 'forwards' }
)

// 播放控制
animation.play() // 开始或恢复播放
animation.pause() // 暂停播放
animation.cancel() // 取消动画并重置
animation.finish() // 立即完成动画

// 播放状态查询
console.log(animation.playState) // running, paused, finished, etc.

// 反转播放
animation.reverse()
```

### 2. 时间控制

```javascript title="时间控制示例"
const animation = element.animate(
  [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }],
  { duration: 5000, iterations: Infinity }
)

// 时间控制
animation.currentTime = 1000 // 跳转到指定时间（毫秒）
animation.playbackRate = 2 // 2倍速播放
animation.playbackRate = -1 // 反向播放

// 监听时间更新
animation.onframe = () => {
  console.log('当前时间:', animation.currentTime)
}
```

### 3. 事件监听

```javascript title="动画事件监听"
const animation = element.animate(
  [{ opacity: 0 }, { opacity: 1 }],
  { duration: 1000 }
)

// 事件监听
animation.onfinish = () => {
  console.log('动画完成！')
}

animation.oncancel = () => {
  console.log('动画被取消')
}

// 使用 addEventListener
animation.addEventListener('finish', () => {
  console.log('动画完成事件')
})

animation.addEventListener('cancel', () => {
  console.log('动画取消事件')
})
```

## 高级特性

### 1. 组合动画

```javascript title="动画组合示例"
// 创建多个动画
const moveAnimation = element.animate(
  [{ transform: 'translateX(0)' }, { transform: 'translateX(200px)' }],
  { duration: 1000, fill: 'forwards' }
)

const fadeAnimation = element.animate(
  [{ opacity: 1 }, { opacity: 0.3 }],
  { duration: 1000, fill: 'forwards' }
)

const scaleAnimation = element.animate(
  [{ transform: 'scale(1)' }, { transform: 'scale(1.2)' }],
  { duration: 1000, fill: 'forwards' }
)

// 顺序执行动画
moveAnimation.finished.then(() => {
  return fadeAnimation.play()
}).then(() => {
  return scaleAnimation.play()
})
```

### 2. 动画时间轴

```javascript title="时间轴动画"
class AnimationTimeline {
  constructor() {
    this.animations = []
    this.currentTime = 0
  }

  addAnimation(animation, startTime) {
    this.animations.push({ animation, startTime })
  }

  play() {
    this.animations.forEach(({ animation, startTime }) => {
      setTimeout(() => {
        animation.play()
      }, startTime)
    })
  }
}

// 使用时间轴
const timeline = new AnimationTimeline()
timeline.addAnimation(moveAnimation, 0)
timeline.addAnimation(fadeAnimation, 500)
timeline.addAnimation(scaleAnimation, 1000)
timeline.play()
```

### 3. 性能优化技巧

:::warning 性能注意事项

* 使用 `transform` 和 `opacity` 属性进行动画，它们不会触发重排
* 避免在动画中修改会触发重排的属性（如 width、height、left 等）
* 使用 `will-change` 属性提示浏览器进行优化
  :::

```javascript title="性能优化示例"
// 好的做法 - 高性能
element.animate(
  [
    { transform: 'translateX(0) scale(1)' },
    { transform: 'translateX(100px) scale(1.5)' }
  ],
  { duration: 1000 }
)

// 避免的做法 - 性能较差
element.animate(
  [
    { left: '0px', width: '100px' },
    { left: '100px', width: '150px' }
  ],
  { duration: 1000 }
)
```

## 实战案例

### 1. 加载动画

```javascript title="加载动画实现"
function createLoadingAnimation(element) {
  return element.animate(
    [
      { transform: 'rotate(0deg)', opacity: 0.5 },
      { transform: 'rotate(180deg)', opacity: 1 },
      { transform: 'rotate(360deg)', opacity: 0.5 }
    ],
    {
      duration: 1500,
      iterations: Infinity,
      easing: 'ease-in-out'
    }
  )
}

// 使用
const loader = document.querySelector('.loader')
const loadingAnimation = createLoadingAnimation(loader)

// 页面加载完成后停止动画
window.addEventListener('load', () => {
  loadingAnimation.cancel()
})
```

### 2. 交互动画

```javascript title="鼠标交互动画"
class HoverAnimation {
  constructor(element) {
    this.element = element
    this.animation = null

    this.setupEventListeners()
  }

  setupEventListeners() {
    this.element.addEventListener('mouseenter', this.onMouseEnter.bind(this))
    this.element.addEventListener('mouseleave', this.onMouseLeave.bind(this))
  }

  onMouseEnter() {
    if (this.animation) {
      this.animation.cancel()
    }

    this.animation = this.element.animate(
      [
        { transform: 'scale(1)', boxShadow: '0 0 0 rgba(0,0,0,0)' },
        { transform: 'scale(1.05)', boxShadow: '0 5px 15px rgba(0,0,0,0.3)' }
      ],
      {
        duration: 300,
        easing: 'ease-out',
        fill: 'forwards'
      }
    )
  }

  onMouseLeave() {
    if (this.animation) {
      this.animation.cancel()
    }

    this.animation = this.element.animate(
      [
        { transform: 'scale(1.05)', boxShadow: '0 5px 15px rgba(0,0,0,0.3)' },
        { transform: 'scale(1)', boxShadow: '0 0 0 rgba(0,0,0,0)' }
      ],
      {
        duration: 300,
        easing: 'ease-in',
        fill: 'forwards'
      }
    )
  }
}

// 使用
const interactiveElements = document.querySelectorAll('.interactive')
interactiveElements.forEach(el => new HoverAnimation(el))
```

### 3. 页面过渡动画

```javascript title="页面过渡动画"
class PageTransition {
  constructor() {
    this.animations = new Map()
  }

  async fadeIn(element) {
    const animation = element.animate(
      [
        { opacity: 0, transform: 'translateY(20px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ],
      {
        duration: 600,
        easing: 'ease-out',
        fill: 'both'
      }
    )

    this.animations.set(element, animation)
    return animation.finished
  }

  async fadeOut(element) {
    const animation = element.animate(
      [
        { opacity: 1, transform: 'translateY(0)' },
        { opacity: 0, transform: 'translateY(-20px)' }
      ],
      {
        duration: 400,
        easing: 'ease-in',
        fill: 'both'
      }
    )

    this.animations.set(element, animation)
    return animation.finished
  }

  async transition(oldElement, newElement) {
    await this.fadeOut(oldElement)
    oldElement.style.display = 'none'
    newElement.style.display = 'block'
    await this.fadeIn(newElement)
  }
}
```

## 兼容性与降级方案

:::caution 兼容性提示
虽然现代浏览器广泛支持 WAAPI，但为了更好的兼容性，建议提供降级方案。
:::

```javascript title="兼容性处理"
// 特征检测
function supportsWebAnimations() {
  return 'animate' in Element.prototype
}

// 安全的动画创建函数
function safeAnimate(element, keyframes, options) {
  if (supportsWebAnimations()) {
    return element.animate(keyframes, options)
  }
  else {
    // 降级到 CSS 动画
    return fallbackToCSSAnimation(element, keyframes, options)
  }
}

function fallbackToCSSAnimation(element, keyframes, options) {
  const animationName = `anim-${Date.now()}`

  // 创建 CSS 关键帧
  const style = document.createElement('style')
  let css = `@keyframes ${animationName} {`

  keyframes.forEach((frame, index) => {
    const percent = (index / (keyframes.length - 1)) * 100
    css += `${percent}% {`
    Object.entries(frame).forEach(([property, value]) => {
      css += `${property}: ${value};`
    })
    css += '}'
  })

  css += '}'
  style.textContent = css
  document.head.appendChild(style)

  // 应用动画
  element.style.animation = `
    ${animationName}
    ${options.duration}ms
    ${options.easing || 'ease'}
    ${options.delay || 0}ms
    ${options.iterations || 1}
    ${options.direction || 'normal'}
    ${options.fill || 'none'}
  `

  // 返回模拟的动画对象
  return {
    cancel: () => {
      element.style.animation = ''
      document.head.removeChild(style)
    },
    finished: new Promise((resolve) => {
      element.addEventListener('animationend', resolve, { once: true })
    })
  }
}
```

## 调试与最佳实践

### 1. 调试技巧

```javascript title="动画调试工具"
class AnimationDebugger {
  static logAnimation(animation, name = 'Unnamed Animation') {
    console.group(`🎬 ${name}`)
    console.log('状态:', animation.playState)
    console.log('当前时间:', animation.currentTime)
    console.log('播放速率:', animation.playbackRate)
    console.log('总时间:', animation.effect.getComputedTiming().duration)
    console.groupEnd()

    // 定期更新
    const interval = setInterval(() => {
      if (animation.playState === 'finished') {
        clearInterval(interval)
      }
      console.log(`[${name}] 时间:`, animation.currentTime)
    }, 100)
  }
}

// 使用调试工具
const anim = element.animate([
  // ...
], {
  // ...
})
AnimationDebugger.logAnimation(anim, '示例动画')
```

### 2. 最佳实践总结

:::steps

* **性能优先**：始终使用 `transform` 和 `opacity` 进行动画
* **适当使用**：不要过度使用动画，保持用户体验的流畅性
* **可访问性**：为偏好减少动画的用户提供 `prefers-reduced-motion` 支持
* **错误处理**：始终处理动画可能失败的情况
* **资源清理**：及时取消不再需要的动画，释放资源

:::

```javascript title="最佳实践示例"
// 响应式动画 - 尊重用户偏好
const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

function createRespectfulAnimation(element, keyframes, options) {
  if (mediaQuery.matches) {
    // 用户偏好减少动画，立即应用最终状态
    const finalFrame = keyframes[keyframes.length - 1]
    Object.entries(finalFrame).forEach(([property, value]) => {
      element.style[property] = value
    })
    return { cancel: () => {}, finished: Promise.resolve() }
  }

  return element.animate(keyframes, options)
}
```

## 总结

Web Animations API 为前端开发者提供了强大而灵活的动画控制能力。

* **基础用法**：创建和控制简单动画
* **核心概念**：关键帧、缓动函数、时间控制
* **高级特性**：动画组合、时间轴、性能优化
* **实战应用**：加载动画、交互动画、页面过渡
* **生产就绪**：兼容性处理、调试技巧、最佳实践

WAAPI 不仅功能强大，而且与现有的 CSS 动画性能相当，是现代 Web 动画的首选方案。随着浏览器的不断更新和完善，WAAPI 将会成为 Web 动画的标准解决方案。

## 参考

* [MDN Web Animations API 文档](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)
* [WAAPI 规范](https://drafts.csswg.org/web-animations/)
* [动画性能指南](https://web.dev/animations/)
* [缓动函数速查表](https://easings.net/)
