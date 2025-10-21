---
url: /article/ci39ae1o/index.md
---
这里收集了一些各种类型的好玩的库或者框架。

***

## Client Framework

### Lit

[![Lit](https://lit.dev/images/logo.svg){style="width:40px"}](https://lit.dev/)

**lit** 是一个简单的、高效的、用于构建 web component 的轻量级库。

它替代了 [polymer](https://github.com/Polymer/polymer) 成为 WebComponent/customElement开发的首选库。

::: code-tabs
@tab my-element.ts

```ts
import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('my-element')
export class MyTimer extends LitElement {
  static styles = css`...`

  @property() count = 0

  render() {
    return html`<div>${this.count}</div>`
  }
}
```

@tab index.html

```html
<!doctype html>
<head>
  ...
</head>
<body>
  <my-timer count="7"></my-timer>
</body>
```

:::

### solid-js

[solid-js](https://www.solidjs.com/)

一个用于构建用户界面，简单高效、性能卓越的JavaScript库。

Solid 站在 React, Knockout 等巨人的肩膀上。如果你之前用 React Hooks 开发过，Solid 应该看起来很自然。事实上，Solid 模型更简单，没有 Hook 规则。每个组件执行一次，随着依赖项的更新，钩子和绑定会多次执行。

Solid 遵循与 React 相同的理念，具有单向数据流、读/写隔离和不可变接口。但是放弃了使用虚拟 DOM，使用了完全不同的实现。

> 号称比 react 还 react 的库

```jsx
import { createSignal, onCleanup } from 'solid-js'
import { render } from 'solid-js/web'

function CountingComponent() {
  const [count, setCount] = createSignal(0)
  const interval = setInterval(
    () => setCount(count => count + 1),
    1000
  )
  onCleanup(() => clearInterval(interval))
  return (
    <div>
      Count value is
      {count()}
    </div>
  )
}

render(() => <CountingComponent />, document.getElementById('app'))
```

### inferno

[inferno](https://www.infernojs.org/) 是一个快速的、类似于 React 的库，用于在客户端和服务器上构建高性能用户界面。

```tsx
import { Component, render } from 'inferno'

class MyComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      counter: 0,
    }
  }

  render() {
    return (
      <div>
        <h1>Header!</h1>
        <span>
          Counter is at:
          {this.state.counter}
        </span>
      </div>
    )
  }
}

render(<MyComponent />, document.getElementById('app'))
```

### cycle-js

[cycle.js](https://cycle.js.org/)

Cycle.js是一个极简的JavaScript框架,提供了一种函数式，响应式的人机交互接口。

Cycle.js 有别于其他如 React/Vue 等框架，它提供的是一套完整的开发范式，需要在其范式基础上进行开发，相对来说并不
容易入门，但其函数式、响应式的思想，会带来非常好的启示和学习。

```js
import { div, h1, hr, input, label, makeDOMDriver } from '@cycle/dom'
import { run } from '@cycle/run'

function main(sources) {
  const input$ = sources.DOM.select('.field').events('input')

  const name$ = input$.map(ev => ev.target.value).startWith('')

  const vdom$ = name$.map(name =>
    div([label('Name:'), input('.field', { attrs: { type: 'text' } }), hr(), h1(`Hello ${name}`)]),
  )

  return { DOM: vdom$ }
}

run(main, { DOM: makeDOMDriver('#app-container') })
```

### svelte

[svelte](https://svelte.dev/)

Svelte 是一种全新的构建用户界面的方法。传统框架如 React 和 Vue 在浏览器中需要做大量的工作，而 Svelte 将这些工作放到构建应用程序的编译阶段来处理。

与使用虚拟（virtual）DOM 差异对比不同。Svelte 编写的代码在应用程序的状态更改时就能像做外科手术一样更新 DOM。

```html
<script>
  let count = 0

  function handleClick() {
    count += 1
  }
</script>

<button on:click="{handleClick}">Clicked {count} {count === 1 ? 'time' : 'times'}</button>
```
