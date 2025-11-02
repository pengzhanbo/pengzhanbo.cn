---
title: Vue 原理解析 —— diff 算法
createTime: 2024/05/11 11:57:02
permalink: /article/mlm6wnvq/
---

[源码位置：**vuejs/core —— runtime-core/src/renderer.ts**](https://github.com/vuejs/core/blob/main/packages/runtime-core/src/renderer.ts){.read-more}

在 Vue 中，**虚拟 DOM（Virtual DOM）** 与 **`diff` 算法** 一直是高性能渲染的核心引擎。

Vue 3 对 `diff` 算法进行了革命性的重构，其性能提升远超 Vue 2，秘密就在于 **编译时优化** 与 **运行时靶向更新** 的完美结合。今天，我们就深入剖析 Vue 3 的 `diff` 算法，揭示其如何将 DOM 操作降至最低。

## 虚拟 DOM 和 Diff 算法的必要性

### 什么是虚拟 DOM

虚拟 DOM（Virtual DOM）是一个轻量级的 JavaScript 对象，它是对真实 DOM 结构的抽象表示。

当应用状态变化时，Vue 会创建一个新的虚拟 DOM 树，然后将其与上一次渲染的旧虚拟 DOM 树进行比较，计算出最小的变更集，最后将这些变更应用到真实 DOM 上。

```ts
// 简化的虚拟 DOM 节点表示
const vnode = {
  type: 'div',
  props: {
    id: 'app',
    class: 'container'
  },
  children: [
    { type: 'p', children: 'Hello Vue 3' },
    { type: 'button', children: 'Click me' }
  ]
}
```

### 为什么需要虚拟 DOM ？

频繁的直接操作真实 DOM 的成本极高：

- 浏览器渲染引擎工作流程复杂（解析、布局、绘制）
- 频繁的 DOM 操作会导致性能瓶颈
- 跨平台渲染的统一抽象层

虚拟 DOM 的核心价值在于：

- **抽象层**：提供与平台无关的UI描述，便于跨平台渲染。
- **批处理与优化**：将多次DOM操作合并为单次执行，减少昂贵操作。
- **差异最小化**：通过智能算法找出状态变更所需的最小DOM操作集。

### diff 算法的必要性

每次状态变更都完全替换 DOM 显然不可行：

```ts
// 低效的 DOM 替换
document.body.innerHTML = newHTML
```

diff 算法通过智能比较新旧虚拟 DOM 树，找出两者之间的差异，并仅更新必要的部分：

```ts
// 高效的差异更新
patch(oldVNode, newVNode)
```

**Diff 算法** 的核心任务就是高效地比较新旧两棵虚拟DOM树的差异，
并计算出应用于真实DOM的最小操作集合（如创建、移动、更新、删除节点）。
算法的效率直接决定了框架在复杂视图更新时的性能表现。

## 回顾 Vue 2 的 diff 算法

Vue2 采用的是一种双端比较（Two-Pointers Diff） 算法，主要策略包括：

- **同层比较**：只比较同一层级的节点，不跨层级移动节点。
- **双端四指针**：使用四个指针（oldStartIdx, oldEndIdx, newStartIdx, newEndIdx）同时从新旧子节点列表的两端向中间移动比较。
- **Key的重要性**：依赖key标识节点身份，识别可复用的节点。
- **就地复用**：尝试移动节点位置而非销毁重建。

### 典型流程

```ts
function updateChildren(oldCh, newCh) {
  let oldStartIdx = 0
  let newStartIdx = 0
  let oldEndIdx = oldCh.length - 1
  let newEndIdx = newCh.length - 1
  let oldStartVnode = oldCh[0]
  let newStartVnode = newCh[0]
  let oldEndVnode = oldCh[oldEndIdx]
  let newEndVnode = newCh[newEndIdx]

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    // 四种比较情况：头头、尾尾、头尾、尾头
    if (isSameVnode(oldStartVnode, newStartVnode)) {
      patchVnode(oldStartVnode, newStartVnode)
      oldStartVnode = oldCh[++oldStartIdx]
      newStartVnode = newCh[++newStartIdx]
    }
    else if (isSameVnode(oldEndVnode, newEndVnode)) {
      // ...类似处理尾尾
    }
    else if (isSameVnode(oldStartVnode, newEndVnode)) {
      // ...头尾匹配，移动节点
    }
    else if (isSameVnode(oldEndVnode, newStartVnode)) {
      // ...尾头匹配，移动节点
    }
    else {
      // 暴力查找：遍历旧节点寻找匹配的新节点
      const idxInOld = findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx)
      if (idxInOld) {
        const vnodeToMove = oldCh[idxInOld]
        patchVnode(vnodeToMove, newStartVnode)
        parentElm.insertBefore(vnodeToMove.elm, oldStartVnode.elm)
        oldCh[idxInOld] = undefined // 标记已处理
      }
      else {
        createElm(newStartVnode, parentElm, oldStartVnode.elm)
      }
      newStartVnode = newCh[++newStartIdx]
    }
  }
  // 处理剩余节点...
}
```

[源码位置 - **vuejs/vue - core/vdom/patch.ts**](https://github.com/vuejs/vue/blob/main/src/core/vdom/patch.ts#L413){.read-more}

### 主要瓶颈

- **全量遍历**：即使节点无变化，仍需遍历所有节点进行isSameVnode检查。
- **潜在的高复杂度**：在无法通过双端匹配时（如列表乱序），退化为 $O(n²)$ 的暴力查找。
- **过度移动**：算法有时会产生非必要的DOM移动操作。

## 编译时优化

Vue 3 的核心突破在于编译器（`@vue/compiler-dom`）。
它在编译模板时，进行静态分析并注入优化提示，供运行时 `patch` 算法使用。

### 缓存静态内容

在模板中常常有部分内容是不带任何动态绑定的：

```html
<div>
  <div>foo</div> <!-- [!code hl:2]-->
  <div>bar</div>
  <div>{{ dynamic }}</div>
</div>
```

`foo` 和 `bar` 这两个 div 是完全静态的，没有必要在重新渲染时再次创建和比对它们。

编译器在编译 SFC 或模板字符串时，会识别出纯静态的节点（没有任何动态绑定 `v-bind`, `v-if`, `v-for`, 插值`{{ }}`等）和静态的 props。

**编译结果**：

```js
import { createCommentVNode as _createCommentVNode, createElementBlock as _createElementBlock, createElementVNode as _createElementVNode, openBlock as _openBlock, toDisplayString as _toDisplayString } from 'vue'

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createElementBlock('div', null, [
    _cache[0] || (_cache[0] = _createElementVNode('div', null, 'foo', -1 /* CACHED */)),
    _createCommentVNode(' cached '),
    _cache[1] || (_cache[1] = _createElementVNode('div', null, 'bar', -1 /* CACHED */)),
    _createCommentVNode(' cached '),
    _createElementVNode('div', null, _toDisplayString(_ctx.dynamic), 1 /* TEXT */)
  ]))
}
```

**作用**：

- **避免重新创建 VNode**： 这些静态节点或 props 对应的 VNode 对象在首次渲染时创建一次后，会被缓存起来。后续每次渲染都直接复用这个缓存的 VNode，而无需重新创建。
- **跳过 Diff**： 在 `patch` 过程中，当遇到这个静态 VNode 时，由于知道它永远不会改变，Vue 会完全跳过对这个节点及其整个子树的 diff 过程。

**收益**：

- 减少了创建 VNode 对象的开销（内存分配、GC 压力）。
- 显著缩小了需要 diff 的树的范围。大型应用中静态部分（如页头、页脚、固定布局元素）占比可能很高，跳过它们能极大提升性能。

当有足够多连续的静态元素时，它们还会再被压缩为一个“静态 vnode”，其中包含的是这些节点相应的纯 HTML 字符串。
这些静态节点会直接通过 innerHTML 来挂载。

::: code-tabs

@tab 源码

```html
<div>
  <div class="foo">foo</div>
  <div class="foo">foo</div>
  <div class="foo">foo</div>
  <div class="foo">foo</div>
  <div class="foo">foo</div>
  <div>{{ dynamic }}</div>
</div>
```

@tab 编译结果

```js
import { createElementBlock as _createElementBlock, createElementVNode as _createElementVNode, createStaticVNode as _createStaticVNode, openBlock as _openBlock, toDisplayString as _toDisplayString } from 'vue'

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createElementBlock('div', null, [
    _cache[0] || (_cache[0] = _createStaticVNode('<div class="foo">foo</div><div class="foo">foo</div><div class="foo">foo</div><div class="foo">foo</div><div class="foo">foo</div>', 5)),
    _createElementVNode('div', null, _toDisplayString(_ctx.dynamic), 1 /* TEXT */)
  ]))
}
```

:::

### 缓存事件处理函数

对于内联的事件处理函数 (如 `@click="handleClick(param)"` )，编译器会生成代码，在父组件更新时，只有当事件处理函数依赖的 param 真正改变时，才重新创建该函数。否则，复用之前的事件处理函数。

```vue
<script setup>
import { ref } from 'vue'

const dynamic = ref('Hello World!')
function onClick(val) {
  console.log(val)
}
</script>

<template>
  <div>
    <div @click="onClick(dynamic)">
      {{ dynamic }}
    </div>
  </div>
</template>
```

**编译结果**:

```js
import { createElementBlock as _createElementBlock, createElementVNode as _createElementVNode, openBlock as _openBlock, toDisplayString as _toDisplayString } from 'vue'
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createElementBlock('div', null, [
    _createElementVNode('div', {
      onClick: _cache[0] || (_cache[0] = $event => ($setup.onClick($setup.dynamic))) // [!code hl]
    }, _toDisplayString($setup.dynamic), 1 /* TEXT */)
  ]))
}
```

**作用**：

避免在每次父组件渲染时都给子组件传递一个全新的函数引用，从而防止子组件不必要的重新渲染。

**收益**：

减少了不必要的 VNode 创建和子组件渲染。

### Patch Flags / 更新类型标记

编译器分析模板中的动态绑定（`v-bind`, `v-if`, `v-for`, 插值 `{{ }}`, 自定义指令等）。
对于每个包含动态绑定的元素，编译器会在生成的代码中给其 VNode 添加一个 `patchFlag` 属性。
这个标志是一个 **位掩码** ，精确地标记出该 VNode 上哪些类型的属性或内容是动态的、需要被检查更新的。

常见标志位：

```ts
enum PatchFlags {
  TEXT = 1, // 表示一个具有动态文本内容（子元素快速路径）的元素
  CLASS = 1 << 1, // 表示一个具有动态 class 绑定的元素。
  STYLE = 1 << 2, // 表示具有动态样式的元素
  PROPS = 1 << 3, // 表示一个具有非类/样式动态属性的元素。
  FULL_PROPS = 1 << 4, // 表示一个具有动态键属性的元素
  NEED_HYDRATION = 1 << 5, // 表示一个需要进行属性水合的元素（但不一定需要修补）
  STABLE_FRAGMENT = 1 << 6, // 表示一个子节点顺序不变的片段。
  KEYED_FRAGMENT = 1 << 7, // 表示一个带有键控或部分键控子元素的片段
  UNKEYED_FRAGMENT = 1 << 8, // 表示一个包含无键子元素的片段。
  NEED_PATCH = 1 << 9, // 表示一个仅需非属性修补的元素
  DYNAMIC_SLOTS = 1 << 10, // 表示一个具有动态插槽的组件
  DEV_ROOT_FRAGMENT = 1 << 11, // 表示一个仅因用户在模板根层级放置了注释而创建的片段。（仅限开发使用的标记）

  CACHED = -1, // 表示一个缓存的静态虚拟节点(vnode)。
  BAIL = -2, // 一个特殊标志，表示差异比较算法应退出优化模式
}
```

例如，一个 VNode 上有 `class` 和 `style` 两个动态属性，那么这个 VNode 的 `patchFlag` 就会包含 `PatchFlags.CLASS` 和 `PatchFlags.STYLE` ，从而标记出这个 VNode 的更新类型标记：

```ts
// 使用示例
const vnode = {
  type: 'div',
  // 按位或运算，合并上述两个标志
  patchFlag: PatchFlags.CLASS | PatchFlags.STYLE, // [!code hl]
  props: {
    class: dynamicClass, // 动态 class
    style: dynamicStyle, // 动态 style
    id: 'static-id' // 静态属性
  }
}
```

在执行 patch 操作时，根据这个标志，可以知道该 VNode 的更新类型是什么，从而进行相应的更新操作:

```ts
const { patchFlag } = n2 // 从新的虚拟 DOM 中获取 patchFlag

if (patchFlag > 0) {
  // 通过 按位与 运算，判断是否有需要更新的内容
  if (patchFlag & PatchFlags.CLASS) {
    // 更新 class
  }

  if (patchFlag & PatchFlags.STYLE) {
    // 更新 style
  }
  // ...
}
```

**作用**：

根据 `patchFlag` 的值，`patch` 函数可以只执行特定类型的更新检查，而无需遍历 VNode 的所有属性和子节点。

**收益**：

- **大幅减少属性/内容比较次数**： 从全量比较变为只比较真正可能变化的部分。
- **消除不必要的操作**： 避免了大量永远不会变化的属性或内容的冗余检查和 DOM 操作。

### 树结构打平

回顾 [缓存静态内容](#缓存静态内容) 中的 编译结果代码，可以发现所返回的虚拟 DOM 树是经一个特殊的 `createElementBlock()` 调用创建的：

```ts
export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createElementBlock('div', null, [
    /** children */
  ]))
}
```

在 vue 3 的模板编译结果中，引入了一个 **“区块”** 的概念，内部结构是稳定的一个部分可被称之为一个区块。
在这个用例中，整个模板只有一个区块，因为这里没有用到任何结构性指令 (比如 `v-if` 或者 `v-for`)。

每一个块都会追踪其所有带更新类型标记的后代节点 (不只是直接子节点)，举例来说：

```html
<div> <!-- root block -->
  <div>...</div>         <!-- 不会追踪 -->
  <div :id="id"></div>   <!-- 要追踪 --> <!-- [!code hl]-->
  <div>                  <!-- 不会追踪 -->
    <div>{{ bar }}</div> <!-- 要追踪 --> <!-- [!code hl]-->
  </div>
</div>
```

编译的结果会被打平为一个数组，仅包含所有动态的后代节点：

```txt
div (block root)
- div 带有 :id 绑定
- div 带有 {{ bar }} 绑定
```

当这个组件需要重渲染时，只需要遍历这个打平的树而非整棵树。
这也就是我们所说的 **树结构打平**，这大大减少了我们在虚拟 DOM 协调时需要遍历的节点数量。
模板中任何的静态部分都会被高效地略过。

一个 Block 由一个稳定的根节点（通常是带 `v-if` / `v-for` 的元素）和其动态子节点组成。

```html
<div> <!-- 根区块 -->
  <div>
    <div v-if> <!-- if 区块 -->
      ...
    </div>
    <div v-for="item in items"> <!-- for 区块 -->
      ...
    </div>
  </div>
</div>
```

**特性**:

- **稳定结构**：Block根节点自身结构稳定（如 `v-for` 的容器 `<ul>`）。
- **动态子节点数组**：Block 内部维护一个动态子节点数组（ `dynamicChildren` ），只包含可能变化的子节点（如 `v-for` 循环项）。

**收益**：

- 当Block根节点需要更新时（如 `v-for` 的源数据 items 变化），只需 Diff 该 Block 内部的 `dynamicChildren` 数组。
- 完全跳过 Block 内部所有静态节点和兄弟 Block 的 Diff

这是比静态提升更激进的优化。
它彻底改变了传统的树递归 Diff 方式。运行时 diff 的 **复杂度不再与模板整体大小直接相关，而只与动态节点的数量相关**。
即使模板非常庞大，只要动态部分少且集中，更新就非常快。

同时避免了深入遍历大量静态节点，减少了函数调用栈开销。

### 编译时优化的作用

- Vue 3 的编译器不再是简单的 模板->渲染函数转换器 。
  它是一个强大的优化器，在编译阶段就深入分析模板结构，识别出所有静态和动态部分，并生成高度优化的、
  带有丰富提示信息（Patch Flags, Block Tree）的代码。这使得运行时 `diff` 算法（`patch` 过程）能有的放矢。
- 不再进行全量 VNode 属性比较，而是根据编译时标记，只检查和更新真正可能变化的部分（文本、特定 class、特定 props 等）。
  极大减少了属性遍历和比较的开销。
- 通过树结构打平，`diff` 过程 **完全避开了静态子树**，只在一个扁平的动态节点列表 (`dynamicChildren`) 中进行。
  这使得 `diff` 的复杂度从 $O(n^3)$ / $O(n)$ 优化到接近 $O$ (动态节点数量)，尤其是在大型静态模板中效果惊人。
  这是 Vue 3 渲染性能飞跃的关键。
- 复用静态节点和 props 的 VNode，减少内存分配、垃圾回收压力和创建开销。
- 减少副作用 (缓存事件处理函数)， 避免因父组件更新导致的无意义子组件更新。

## Diff 算法

[源码位置：**vuejs/core —— runtime-core/src/renderer.ts**](https://github.com/vuejs/core/blob/v3.5.17/packages/runtime-core/src/renderer.ts){.read-more}

vue3 的 diff 算法，在
[runtime-core/src/renderer.ts](https://github.com/vuejs/core/blob/v3.5.17/packages/runtime-core/src/renderer.ts#342)
的 `baseCreateRenderer` 内部 的 `patch` 函数实现。

先从它的类型定义开始:

```ts
type PatchFn = (
  n1: VNode | null, // 旧的虚拟节点， null 表示这是一个挂载操作
  n2: VNode, // 新的虚拟节点
  container: RendererElement, // 容器元素
  anchor?: RendererNode | null, // 锚点元素
  parentComponent?: ComponentInternalInstance | null, // 父组件实例
  parentSuspense?: SuspenseBoundary | null, // 父 Suspense 边界
  namespace?: ElementNamespace, // 命名空间，主要用于 SVG / Math
  slotScopeIds?: string[] | null, // 插槽作用域 ID
  optimized?: boolean, // 是否启用优化
) => void
```

在这里，我们主要关注的是它的参数 `n1` 、 `n2`、 `container` 和 `anchor` 。

- `n1` 表示旧的虚拟节点，当如接收到的是 `null` ，则表示是一个 挂载 （mount） 操作。
- `n2` 表示新的虚拟节点。它将会与 `n1` 进行比较，以更新或创建新的 DOM 节点。
- `container` 是一个 DOM 元素，用于将新的虚拟节点渲染到容器中。
- `anchor` 表示锚点元素，用于在执行 插入或移动 操作时的参考点。

接下来，我们来看它的实现，`patch` 首先根据 `n1` 和 `n2` 的不同情况进行不同的处理：

1. 如果 `n1` 和 `n2` 相同，则表示是一个无需更新的操作，直接跳过。
2. 如果 `n1` 和 `n2` 节点类型不同，说明它们是两个完全不同的节点，直接卸载旧节点，挂载新的节点。
3. 如果 `n1` 不存在，说明是一个全新的挂载操作，需要进行挂载。
4. 根据 `type` 和 `shapeFlag` 的不同情况，进行不同的处理，包括文本节点、注释节点、静态节点等。

```ts
const patch: PatchFn = (
  n1,
  n2,
  container,
  anchor = null,
) => {
  // 如果新旧节点相同，直接跳过
  if (n1 === n2) {
    return
  }

  // 如果新旧节点类型不同，需要卸载旧节点树
  if (n1 && !isSameVNodeType(n1, n2)) {
    // 卸载旧节点
    unmount(n1, parentComponent, parentSuspense, true)
    // 将旧节点设置为 null，表示这是一个全新的挂载操作
    n1 = null
  }

  const { type, shapeFlag } = n2
  // 取出节点类型，根据类型进行不同的处理
  switch (type) {
    case Text: // 文本节点
      processText(n1, n2, container, anchor)
      break
    case Comment: // 注释节点
      processCommentNode(n1, n2, container, anchor)
      break
    case Static: // 静态节点
      if (n1 == null) {
        mountStaticNode(n2, container, anchor, namespace)
      }
      break
    case Fragment: // 片段节点
      processFragment(n1, n2, container, anchor,)
      break
    default: // 其它节点
      // 根据 shapeFlag 进行不同的处理
      if (shapeFlag & ShapeFlags.ELEMENT) {
        processElement(n1, n2, container, anchor, /* ...args */)
      }
      else if (shapeFlag & ShapeFlags.COMPONENT) {
        processComponent(n1, n2, container, anchor, /* ...args */)
      }
      else if (shapeFlag & ShapeFlags.TELEPORT) {
        ;(type as typeof TeleportImpl).process(n1, n2, container, anchor, /* ...args */)
      }
      else if (shapeFlag & ShapeFlags.SUSPENSE) {
        ;(type as typeof SuspenseImpl).process(n1, n2, container, anchor, /* ...args */)
      }
  }
}
```

### ShapeFlags / 节点类型标记

ShapeFlags 是用于描述虚拟节点（VNode）类型和结构的标志位系统。

[源码位置：**vuejs/core - shared/src/shapeFlags.ts**](https://github.com/vuejs/core/blob/v3.5.17/packages/shared/src/shapeFlags.ts){.read-more}

```ts
export const enum ShapeFlags {
  ELEMENT = 1, // 普通 DOM 元素（如 div）
  FUNCTIONAL_COMPONENT = 1 << 1, // 函数式组件
  STATEFUL_COMPONENT = 1 << 2, // 有状态组件（普通组件）
  TEXT_CHILDREN = 1 << 3, // 子节点是文本（如 vnode.children = "text"）
  ARRAY_CHILDREN = 1 << 4, // 子节点是数组（多个子节点）
  SLOTS_CHILDREN = 1 << 5, // 子节点是插槽（scoped slots）
  TELEPORT = 1 << 6, // Teleport 组件
  SUSPENSE = 1 << 7, // Suspense 组件
  COMPONENT_SHOULD_KEEP_ALIVE = 1 << 8, // 需要被 keep-alive 的组件
  COMPONENT_KEPT_ALIVE = 1 << 9, // 已被 keep-alive 缓存的组件
  COMPONENT = ShapeFlags.STATEFUL_COMPONENT | ShapeFlags.FUNCTIONAL_COMPONENT // 组件类型（函数式/有状态）
}
```

它在 `createVNode` 和 `normalizeChildren` 阶段被用于标记节点的类型和子节点的类型，以便在 `patch` 阶段进行相应的处理。

[源码位置：**vuejs/core - runtime-core/src/vnode.ts - createVNode**](https://github.com/vuejs/core/blob/v3.5.17/packages/runtime-core/src/vnode.ts#L609){.read-more}

```ts
function createVNode(type, props, children) {
  // ...
  const shapeFlag = isString(type)
    ? ShapeFlags.ELEMENT
    : __FEATURE_SUSPENSE__ && isSuspense(type)
      ? ShapeFlags.SUSPENSE
      : isTeleport(type)
        ? ShapeFlags.TELEPORT
        : isObject(type)
          ? ShapeFlags.STATEFUL_COMPONENT
          : isFunction(type)
            ? ShapeFlags.FUNCTIONAL_COMPONENT
            : 0
  // ...
}
```

[源码位置：**vuejs/core - runtime-core/src/vnode.ts - normalizeChildren**](https://github.com/vuejs/core/blob/v3.5.17/packages/runtime-core/src/vnode.ts#L814){.read-more}

```ts
function normalizeChildren(vnode: VNode, children: unknown): void {
  let type = 0
  const { shapeFlag } = vnode

  if (isArray(children)) {
    type = ShapeFlags.ARRAY_CHILDREN // 标记为数组子节点
  }
  else if (typeof children === 'object') {
    if (shapeFlag & (ShapeFlags.ELEMENT | ShapeFlags.TELEPORT)) {
      // ...
      return
    }
    else {
      type = ShapeFlags.SLOTS_CHILDREN // 标记为插槽
      const slotFlag = (children as RawSlots)._
      if (!slotFlag && !isInternalObject(children)) {
        // ...
      }
      else if (slotFlag === SlotFlags.FORWARDED && currentRenderingInstance) {
        // 子组件接收来自父组件转发的插槽。
        // 其插槽类型由父组件的插槽类型决定。
        if (currentRenderingInstance.slots._ === SlotFlags.STABLE) {
          // ...
        }
        else {
          vnode.patchFlag |= PatchFlags.DYNAMIC_SLOTS // 标记为动态插槽
        }
      }
    }
  }
  else if (isFunction(children)) {
    type = ShapeFlags.SLOTS_CHILDREN // 标记为插槽
  }
  else {
    // 强制将子元素传送到数组以便移动
    if (shapeFlag & ShapeFlags.TELEPORT) {
      type = ShapeFlags.ARRAY_CHILDREN // 标记为数组子节点
    }
    else {
      type = ShapeFlags.TEXT_CHILDREN // 标记为文本子节点
    }
  }
  vnode.shapeFlag |= type
}
```

ShapeFlags 通过 位运算 描述 VNode 的特性，主要用于：

- 快速判断 VNode 类型

  ```ts
  // 判断是否是组件
  const isComponent = vnode.shapeFlag & ShapeFlags.COMPONENT
  ```

- 优化 Diff 算法: 根据 shapeFlag 选择不同的处理逻辑

- 子节点类型优化:

  - 文本子节点 (`TEXT_CHILDREN`)：直接设置 `textContent`
  - 数组子节点 (`ARRAY_CHILDREN`)：递归 `patch` 每个子节点
  - 插槽 (`SLOTS_CHILDREN`)：动态更新插槽内容

`shapeFlag` 结合位运算的高效特性，使用 `|` 组合标志、`&` 检测标志，比字符串比较快得多。
一个 VNode 可同时拥有多个标志（如 `ELEMENT` | `ARRAY_CHILDREN`），同时也便于后期的扩展。

### 处理不同的节点类型

在处理不同的节点类型时，其主要思路大体是类似的：

```ts
function processSomething(n1, n2, container, anchor) {
  // 新节点，进行挂载
  if (n1 === null) {
    mountSomething(n2, container, anchor)
  }
  else {
    // 对比节点差异，进行更新
    patchSomething(n1, n2, container, anchor)
  }
}
```

比如，处理 `Text` 节点，它的处理逻辑大致如下：

```ts
const processText: ProcessTextOrCommentFn = (n1, n2, container, anchor) => {
  if (n1 == null) {
    // 创建一个文本节点，并插入到对应的容器位置中
    hostInsert(
      (n2.el = hostCreateText(n2.children as string)),
      container,
      anchor,
    )
  }
  else {
    // 复用旧节点上的 dom 元素，并更新文本内容
    const el = (n2.el = n1.el!)
    if (n2.children !== n1.children) {
      hostSetText(el, n2.children as string)
    }
  }
}
```

处理静态节点时，由于其内容不会发生变化，因此直接进行挂载即可（不考虑 DEV 模式下的热更新）：

```ts
function mountStaticNode(n2: VNode, container: RendererElement, anchor: RendererNode | null, namespace: ElementNamespace) {
  ;[n2.el, n2.anchor] = hostInsertStaticContent!(
    n2.children as string,
    container,
    anchor,
    namespace,
    n2.el,
    n2.anchor,
  )
}
```

在接下来的其他处理函数中，我们不再关注 `mountSomething` 的实现，主要专注于 `patchSomething` 部分。

### patchFragment

在处理 `Fragment` 节点时，对于 `patchFragment` 处理部分，由于 `Fragment` 包含多个子节点，因此需要重点关注的是：

- [`pathBlockChildren`](#patchblockchildren) 函数，处理 “区块” 内的子节点
- [`patchChildren`](#patchchildren) 函数，处理子节点

```ts
function processFragment(n1: VNode | null, n2: VNode, container: RendererElement, anchor: RendererNode | null) {
  const fragmentStartAnchor = (n2.el = n1 ? n1.el : hostCreateText(''))!
  const fragmentEndAnchor = (n2.anchor = n1 ? n1.anchor : hostCreateText(''))!

  let { patchFlag, dynamicChildren } = n2
  // ...
  if (
    patchFlag > 0
    && patchFlag & PatchFlags.STABLE_FRAGMENT
    // 包含动态子节点
    && dynamicChildren
    && n1.dynamicChildren
  ) {
    // 一个稳定的片段（模板根节点或带有`<template v-for>`的模板）不需要
    // 处理子节点顺序，但它可能包含动态子节点。
    patchBlockChildren(n1.dynamicChildren, dynamicChildren, container) // [!code hl]
  }
  else {
    // keyed / unkeyed, 或 手动片段。
    // 对于键控和非键控情况，由于它们是由v-for编译器生成的，
    // 每个子节点都确保是一个区块，因此片段永远不会包含动态子节点。
    patchChildren(n1, n2, container, fragmentEndAnchor) // [!code hl]
  }
  // ...
}
```

[源码位置：**vuejs/core - runtime-core/src/renderer.ts - processElement**](https://github.com/vuejs/core/blob/v3.5.17/packages/runtime-core/src/renderer.ts#L595){.read-more}

:::details 什么是 Fragment 片段 ？

Fragment 不会渲染为真实 DOM 元素，仅作为逻辑容器存在。

组件的 template 中包含多个顶级元素：

```html
<template>
  <span>...</span>
  <span>...</span>
</template>
```

显式 `<template>` 标签，当 `<template>` 标签用于逻辑分组但不需要渲染为 DOM 元素时：

```html
<template>
  <template v-if="isMobile">
    <MobileHeader />
  </template>
  <template v-else>
    <DesktopHeader />
  </template>
</template>
```

在 `setup()` 或渲染函数中直接返回节点数组时：

```ts
export default defineComponent({
  // 返回多个根节点
  setup() {
    return () => [
      h('div', 'Top'),
      h('div', 'Bottom')
    ]
  }
})
```

当插槽内容包含多个节点时：

```html
<!-- Parent.vue -->
<Child>
  <span>Slot 1</span>  <!-- 这些节点会被包裹在 -->
  <span>Slot 2</span>  <!-- Fragment 中传递给子组件 -->
</Child>
```

当 `v-if` / `v-else` 分支包含多个同级节点：

```html
<div>
  <template v-if="condition">
    <p>A</p>
    <p>B</p>  <!-- 这个分支会生成 Fragment -->
  </template>
  <div v-else>C</div>
</div>
```

当 `v-for` 渲染多个节点且无包裹元素

```html
<ul>
  <template v-for="item in list" :key="item.id">
    <li>{{ item.name }}</li>
    <li>{{ item.desc }}</li> <!-- 每组两个 <li> 会被包裹在 Fragment 中 -->
  </template>
</ul>
```

`Teleport/Suspense` 内置组件的内容区域自动成为 Fragment：

```html
<Teleport to="#modal">
  <div>Title</div>  <!-- 这些节点会被包裹在 -->
  <div>Content</div> <!-- Fragment 中传送 -->
</Teleport>
```

函数式组件返回多个根节点时：

```tsx
function FunctionalComp(props, { slots }) {
  return [
    <div>Header</div>,
    slots.default(),
    <div>Footer</div>
  ]
}
```

:::

### patchElement

处理 `Element` 节点时，需要重点关注的是：

- [`pathBlockChildren`](#patchblockchildren) 函数，处理 “区块” 内的子节点
- [`patchChildren`](#patchchildren) 函数，处理子节点
- `patchProps` 函数，处理属性

```ts
function patchElement(n1: VNode, n2: VNode, parentComponent: ComponentInternalInstance | null) {
  const el = (n2.el = n1.el!)
  let { patchFlag, dynamicChildren, dirs } = n2
  patchFlag |= n1.patchFlag & PatchFlags.FULL_PROPS
  const oldProps = n1.props || EMPTY_OBJ
  const newProps = n2.props || EMPTY_OBJ
  if (dynamicChildren) {
    patchBlockChildren(n1.dynamicChildren!, dynamicChildren, el, parentComponent) // [!code hl]
  }
  else if (!optimized) {
    // full diff
    patchChildren(n1, n2, el, null) // [!code hl]
  }
  if (patchFlag > 0) {
    // patchFlag 的存在意味着该元素的渲染代码由编译器生成，可启用快速路径。
    // 在此路径下，新旧节点保证具有相同的结构
    // (即在源模板中的位置完全一致)
    if (patchFlag & PatchFlags.FULL_PROPS) {
      // 元素属性包含动态键，需进行完整差异比对
      patchProps(el, oldProps, newProps, parentComponent, namespace) // [!code hl]
    }
    else {
      // class
      // 当元素具有动态类绑定时，此标志会被匹配。
      if (patchFlag & PatchFlags.CLASS) {
        if (oldProps.class !== newProps.class) {
          hostPatchProp(el, 'class', null, newProps.class, namespace)
        }
      }

      // style
      // 当元素具有动态样式绑定时，此标志会被匹配
      if (patchFlag & PatchFlags.STYLE) {
        hostPatchProp(el, 'style', oldProps.style, newProps.style, namespace)
      }

      // props
      // 当元素具有动态属性/特性绑定时会匹配此标志
      // 不包括 class 和 style。动态属性/特性的键会被保存以便更快迭代
      // 注意像 :[foo]="bar" 这样的动态键会导致此优化失效
      // 转而执行完整差异对比， 因为需要清除旧键
      if (patchFlag & PatchFlags.PROPS) {
        const propsToUpdate = n2.dynamicProps!
        for (let i = 0; i < propsToUpdate.length; i++) {
          const key = propsToUpdate[i]
          const prev = oldProps[key]
          const next = newProps[key]
          if (next !== prev || key === 'value') {
            hostPatchProp(el, key, prev, next, namespace, parentComponent)
          }
        }
      }
    }
    // ...
  }
  else if (!optimized && dynamicChildren == null) {
    patchProps(el, oldProps, newProps, parentComponent, namespace) // [!code hl]
  }
}
```

[源码位置：**vuejs/core - runtime-core/src/renderer.ts - patchElement**](https://github.com/vuejs/core/blob/v3.5.17/packages/runtime-core/src/renderer.ts#L802){.read-more}

### patchBlockChildren

`BlockChildren` 是一个优化路径，专门用于处理 编译优化后的动态子节点更新。

```ts
const patchBlockChildren: PatchBlockChildrenFn = (
  oldChildren,
  newChildren,
  fallbackContainer,
  parentComponent,
  parentSuspense,
  namespace: ElementNamespace,
  slotScopeIds,
) => {
  for (let i = 0; i < newChildren.length; i++) {
    const oldVNode = oldChildren[i]
    const newVNode = newChildren[i]
    // 确定补丁（patch）所在的容器（父元素）。
    const container = oldVNode.el || fallbackContainer // 省略代码...
    patch(
      oldVNode,
      newVNode,
      container,
      null,
      parentComponent,
      parentSuspense,
      namespace,
      slotScopeIds,
      true,
    )
  }
}
```

[源码位置：**vuejs/core - runtime-core/src/renderer.ts - patchBlockChildren**](https://github.com/vuejs/core/blob/v3.5.17/packages/runtime-core/src/renderer.ts#L943){.read-more}

它主要用于优化以下两种场景：

- `v-for` 动态列表的更新：

  ::: code-tabs

  @tab 源码

  ```html
  <!-- 编译后生成的 block -->
  <template v-for="item in list" :key="item.id">
    <div>{{ item.name }}</div>  <!-- 动态节点 -->
    <span>foo</span>        <!-- 静态节点（跳过更新） -->
  </template>
  ```

  @tab 编译结果

  ```ts
  function render(_ctx, _cache, $props, $setup, $data, $options) {
    return (_openBlock(true), _createElementBlock(_Fragment, null, _renderList($setup.list, (item) => {
      return (_openBlock(), _createElementBlock(_Fragment, {
        key: item.id
      }, [
        // 动态节点
        _createElementVNode('div', null, _toDisplayString(item.name), 1 /* TEXT */),
        // 静态节点，复用缓存
        _cache[0] || (_cache[0] = _createElementVNode('span', null, 'foo', -1 /* CACHED */))
      ], 64 /* STABLE_FRAGMENT */))
    }), 128 /* KEYED_FRAGMENT */))
  }
  ```

  :::

  Vue 的编译器会将 `v-for` 包裹的内容标记为 **block**，并记录其中的动态节点（`dynamicChildren`）

  `patchBlockChildren` 直接遍历 `dynamicChildren` 数组，跳过静态节点，仅更新动态节点

- Fragment 多根节点组件的优化更新

  ::: code-tabs

  @tab 源码

  ```html
  <!-- 多根组件（Fragment） -->
  <template>
    <header>{{ dynamicTitle }}</header>  <!-- 动态节点 -->
    <main>静态内容</main>               <!-- 静态节点 -->
    <footer :class="dynamicClass"></footer>  <!-- 动态节点 -->
  </template>
  ```

  @tab 编译结果

  ```ts
  function render(_ctx, _cache, $props, $setup, $data, $options) {
    return (_openBlock(), _createElementBlock(_Fragment, null, [
      _createElementVNode('header', null, _toDisplayString($setup.dynamicTitle), 1 /* TEXT */),
      _cache[0] || (_cache[0] = _createElementVNode('main', null, '静态内容', -1 /* CACHED */)),
      _createElementVNode('footer', {
        class: _normalizeClass($setup.dynamicClass)
      }, null, 2 /* CLASS */)
    ], 64 /* STABLE_FRAGMENT */))
  }
  ```

  :::

  编译器将多根组件标记为 **block**，并提取动态节点到 `dynamicChildren`

  `patchBlockChildren` 仅更新 `dynamicChildren` 中的 `<header>` 和 `<footer>`，跳过静态的 `<main>`

### patchChildren

`patchChildren` 是用于更新子节点的核心函数，负责处理新旧虚拟节点的子节点差异，采用不同的更新策略：

1. 优化路径：

   - 处理带 key 的片段（KEYED_FRAGMENT）
   - 处理不带 key 的片段（UNKEYED_FRAGMENT）

2. 常规路径：

   - 处理文本子节点：直接更新文本内容
   - 处理数组子节点：使用 diff 算法比较和更新
   - 处理无子节点的情况

更新策略的选择基于：
`patchFlag` 优化标记，指示更新的具体类型；
`shapeFlag` 节点的形状标记，表明子节点的类型（文本/数组）

在这里，我们需要关注的是：

- `patchKeyedChildren`:处理带 key 的片段
- `patchUnkeyedChildren`:处理不带 key 的片段

```ts
const patchChildren: PatchChildrenFn = (
  n1,
  n2,
  container,
  anchor,
) => {
  const c1 = n1 && n1.children
  const prevShapeFlag = n1 ? n1.shapeFlag : 0
  const c2 = n2.children

  const { patchFlag, shapeFlag } = n2
  // 快速路径
  if (patchFlag > 0) {
    if (patchFlag & PatchFlags.KEYED_FRAGMENT) {
      // 这可能是全 key 的 或混合式的（部分有 key，部分无 key）
      // 存在 patchFlag 意味着子节点保证是数组
      patchKeyedChildren(c1, c2, container, anchor) // [!code hl]
      return
    }
    // 编译器会在没有 key 的情况下标记为 UNKEYED_FRAGMENT
    else if (patchFlag & PatchFlags.UNKEYED_FRAGMENT) {
      // unkeyed
      patchUnkeyedChildren(c1, c2, container, anchor) // [!code hl]
      return
    }
  }

  if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
    // ...
  }
  else {
    if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      // 先前子级为数组
      if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        // 两个数组，不做任何假设，进行完整差异比较
        patchKeyedChildren(c1, c2, container, anchor) // [!code hl]
      }
      else {
        // 没有新的子节点，仅卸载旧的子节点
        unmountChildren(c1, parentComponent, parentSuspense, true)
      }
    }
    // ...
  }
}
```

[源码位置：**vuejs/core - runtime-core/src/renderer.ts - patchChildren**](https://github.com/vuejs/core/blob/v3.5.17/packages/runtime-core/src/renderer.ts#L1609){.read-more}

### patchUnkeyedChildren

`patchUnkeyedChildren` 用于更新没有 key 的子节点数组，采用简单的位置对比策略，按顺序更新、移除或添加节点。

**更新流程**：

1. 确保新旧子节点数组至少是空数组
2. 计算新旧数组的公共长度
3. 更新公共长度范围内的节点：
   - 优化模式下克隆已挂载的节点
   - 非优化模式下标准化处理新节点
   - 对相同位置的节点进行 patch 更新
4. 处理长度差异：
   - 如果旧数组更长，移除多余的节点
   - 如果新数组更长，挂载新增的节点

```ts
function patchUnkeyedChildren(
  c1: VNode[],
  c2: VNodeArrayChildren,
  container: RendererElement,
  anchor: RendererNode | null
) {
  c1 = c1 || EMPTY_ARR
  c2 = c2 || EMPTY_ARR
  const oldLength = c1.length
  const newLength = c2.length
  // 计算新旧数组的公共长度
  const commonLength = Math.min(oldLength, newLength)
  let i
  for (i = 0; i < commonLength; i++) {
    const nextChild = (c2[i] = optimized ? cloneIfMounted(c2[i] as VNode) : normalizeVNode(c2[i]))

    // 对相同位置的节点进行 patch 更新
    patch(c1[i], nextChild, container, null)
  }
  if (oldLength > newLength) {
    // 如果旧数组更长，需要移除多余的节点
    // 从 commonLength 开始移除剩余的旧节点
    unmountChildren(c1, /* ...args, */ commonLength)
  }
  else {
    // 如果新数组更长，需要挂载新增的节点
    // 从 commonLength 开始挂载剩余的新节点
    mountChildren(c2, container, anchor, /* ...args, */ commonLength)
  }
}
```

### patchKeyedChildren

`patchKeyedChildren` 用于更新带 `key` 的子节点数组，它是 Vue Diff 算法最核心的部分。
它专门处理带 `key` 的可复用节点组成的列表。
`key` 是 Vue 识别节点身份、实现高效复用和最小化移动的关键。

它主要有为 5 流程，每一步都针对特定的列表变更模式进行优化：

1. **同步前导节点 (`sync from start`)**:

   - **目标**： 快速处理列表开头未变化的节点。
   - **过程**： 使用指针 i 同时从新旧列表开头遍历。
   - **条件**： `oldVNode[i]` 和 `newVNode[i]` `key` 相同 (即 `sameVnodeType` 判定)。
   - **操作**： 调用 `patch` 递归更新这些相同节点。
   - **终止**： 当遇到第一个 `key` 不同的节点时停止。
   - **优化意义**： 如果只有列表尾部有变化，这一步能快速跳过所有前面未变的节点。

2. **同步后导节点 (`sync from end`)**:

   - **目标**： 快速处理列表末尾未变化的节点。
   - **过程**： 使用指针 `e1` (指向旧列表最后一个节点) 和 `e2` (指向新列表最后一个节点) 从列表末尾开始向前遍历。
   - **条件**： `oldVNode[e1]` 和 `newVNode[e2]` key 相同。
   - **操作**： 调用 `patch` 递归更新这些相同节点。
   - **终止**： 当遇到第一个 `key` 不同的节点时停止。
   - **优化意义**： 如果只有列表开头有变化（如头部插入），这一步能快速跳过所有后面未变的节点。
    结合第 1 步，高效处理了仅在列表两端增删的情况。

3. **处理新增节点 (`common sequence + mount`)**:

   - **场景**： 经过前两步同步后，可能出现：
     - `i > e1` (旧列表已遍历完) 且 `i <= e2` (新列表还有剩余节点)。
     - 这意味着新列表在中间或末尾新增了节点。
   - **操作**：
     - 遍历新列表中剩余的节点 (索引 `i` 到 `e2`)。
     - 找到这些节点应该插入的位置 (`nextPos = e2 + 1`, 如果 `nextPos < newChildren.length` 则参考节点是 `newChildren[nextPos].el`，否则参考节点是 `anchor`，通常是 `null` 表示追加)。
     - 逐个调用 `patch(null, newVNode, container, anchor, ...)` 创建并挂载这些新节点。

4. **处理删除节点 (`common sequence + unmount`)**:

   - **场景**： 经过前两步同步后，可能出现：
     - `i > e2` (新列表已遍历完) 且 `i <= e1` (旧列表还有剩余节点)。
     - 这意味着新列表在中间或开头删除了节点。
   - **操作**：
     - 遍历旧列表中剩余的节点 (索引 `i` 到 `e1`)。
     - 逐个调用 `unmount(oldVNode, parentComponent, parentSuspense, true)` 卸载这些不再需要的节点及其子组件。

5. **处理未知序列 (unknown sequence)**：==最长递增子序列 (LIS)==

   - **场景**： 经过前四步处理后，新旧列表中都还有未处理的节点 (`i <= e1 && i <= e2`)，并且这些节点的顺序发生了复杂的变化（移动、新增、删除混合）。
   - 这是最复杂的情况，需要以最小的 DOM 移动代价，将旧节点序列变成新节点序列。
   - **Vue3 的解决方案**：基于 `key` 映射和 **最长递增子序列 (Longest Increasing Subsequence - LIS)**。

```ts
// 可以是 all-key 的 或 混合的
function patchKeyedChildren(
  c1: VNode[],
  c2: VNodeArrayChildren,
  container: RendererElement,
  parentAnchor: RendererNode | null
) {
  let i = 0 // 当前对比的起始索引
  const l2 = c2.length // 新子节点数组的长度
  let e1 = c1.length - 1 // 旧子节点数组的结束索引
  let e2 = l2 - 1 // 新子节点数组的结束索引

  // 1. 同步前导节点 / sync from start
  // (a b) c
  // (a b) d e
  while (i <= e1 && i <= e2) {
    const n1 = c1[i]
    const n2 = (c2[i] = optimized
      ? cloneIfMounted(c2[i] as VNode)
      : normalizeVNode(c2[i]))
    if (isSameVNodeType(n1, n2)) {
      patch(n1, n2, container, null) // [!code hl]
    }
    else {
      break
    }
    i++
  }

  // 2. 同步后导节点 / sync from end
  // a (b c)
  // d e (b c)
  while (i <= e1 && i <= e2) {
    const n1 = c1[e1]
    const n2 = (c2[e2] = optimized
      ? cloneIfMounted(c2[e2] as VNode)
      : normalizeVNode(c2[e2]))
    if (isSameVNodeType(n1, n2)) {
      patch(n1, n2, container, null) // [!code hl]
    }
    else {
      break
    }
    e1--
    e2--
  }

  // 3. 普通序列 + 挂载 / common sequence + mount
  // (a b)
  // (a b) c
  // i = 2, e1 = 1, e2 = 2
  // (a b)
  // c (a b)
  // i = 0, e1 = -1, e2 = 0
  if (i > e1) {
    if (i <= e2) {
      const nextPos = e2 + 1
      const anchor = nextPos < l2 ? (c2[nextPos] as VNode).el : parentAnchor
      while (i <= e2) {
        patch(
          null,
          (c2[i] = optimized
            ? cloneIfMounted(c2[i] as VNode)
            : normalizeVNode(c2[i])),
          container,
          anchor
        )
        i++
      }
    }
  }

  // 4. 普通序列 + 卸载 / common sequence + unmount
  // (a b) c
  // (a b)
  // i = 2, e1 = 2, e2 = 1
  // a (b c)
  // (b c)
  // i = 0, e1 = 0, e2 = -1
  else if (i > e2) {
    while (i <= e1) {
      unmount(c1[i], parentComponent, parentSuspense, true)
      i++
    }
  }

  // 5. 未知序列 / unknown sequence
  // [i ... e1 + 1]: a b [c d e] f g
  // [i ... e2 + 1]: a b [e d c h] f g
  // i = 2, e1 = 4, e2 = 5
  else {
    // LIS
    // 此部分在下个章节中进行
  }
}
```

[源码位置 - **vuejs/core - runtime-core/src/renderer.ts - patchKeyedChildren*](https://github.com/vuejs/core/blob/v3.5.17/packages/runtime-core/src/renderer.ts#L1771){.read-more}

### 处理未知序列：最长递增子序列 (Longest Increasing Subsequence - LIS)

对于 未知序列 的处理，Vue3 采用了 [最长递增子序列 -LIS](https://en.wikipedia.org/wiki/Longest_increasing_subsequence) 算法。

**详细步骤**：

1. **构建 Key-Index 映射 (keyToNewIndexMap)**:

   - 创建一个 `Map` (`keyToNewIndexMap = new Map()`)。
   - 遍历新列表中剩余未处理的节点 (索引 `i` 到 `e2`)。
   - 以每个节点的 `key` 为键，其在新列表中的索引位置 (`j`) 为值，存入 `Map`。`keyToNewIndexMap.set(newVNode.key, j)`。
   - **目的**： 后续能通过 `key` 快速查找新节点在新列表中的位置 (索引 `j`)。时间复杂度 $O(1)$。

2. **遍历旧列表剩余节点，寻找复用与记录位置**：

   - 初始化变量：
     - `patched = 0` (已处理的新节点计数)
     - `toBePatched = e2 - i + 1` (新列表剩余待处理的节点总数)
     - `newIndexToOldIndexMap = new Array(toBePatched)` (一个长度等于待处理新节点数的数组)
     - `newIndexToOldIndexMap.fill(0)` (初始化为 0，0 表示该新节点在旧列表中没有对应的可复用节点)
   - 遍历旧列表中剩余未处理的节点 (索引 `i` 到 `e1`)
   - 对于每个旧节点 `oldVNode`：
     - 如果 `patched >= toBePatched`：说明所有新节点都已被处理过，当前旧节点是多余的，直接卸载 `unmount(oldVNode, ...)`。
     - 否则，尝试通过 `oldVNode.key` 在 `keyToNewIndexMap` 中查找其在新列表中的位置 `newIndex`。
     - 如果 `newIndex` 未定义 (`undefined`)：说明该旧节点在新列表中不存在。卸载它 `unmount(oldVNode, ...)`。
   - 如果 `newIndex` 存在：
     - 说明找到了一个可复用的节点（`key` 相同）。
     - 将 `newIndexToOldIndexMap[newIndex - i] = oldIndex + 1`。注意这里 `+1` 是为了区分初始化的 `0`（表示无复用）。`oldIndex` 是当前旧节点的索引（通常就是循环变量，但需要记录实际位置）。
     - 记录移动可能性： 如果 `newIndex` 在遍历过程中不是持续递增的 (即 `newIndex < maxNewIndexSoFar`)，则设置 `moved = true` (表明节点顺序发生了变动，可能需要移动 DOM)。
     - 否则更新 `maxNewIndexSoFar = newIndex` (记录当前遇到的最大新索引)。
     - 调用 `patch(oldVNode, newVNode[newIndex], container, null, ...)` 递归更新这个可复用的节点。

3. 计算最小移动：最长递增子序列 (LIS)

   - 只有在 `moved` 为 `true` (即检测到顺序变动) 时，才需要计算 LIS。
   - `newIndexToOldIndexMap` 数组的含义：它的下标对应 **新列表待处理部分** 的相对索引 (`0` 对应新列表索引 `i`, `1` 对应 `i+1` ...)。它的值表示：该位置的新节点在 **旧列表中的索引值 + 1**  (如果是 0 表示该新节点是新增的)。
   - LIS 的核心目标： 在 `newIndexToOldIndexMap` 中找到一个最长的递增子序列 (Increasing Sequence)。
     这个子序列对应的新节点在新旧列表中的相对顺序没有改变。

4. 处理新增节点： 在步骤 5.2 中，`newIndexToOldIndexMap` 中值为 `0` 的项，对应的就是新列表中的新增节点。
   在移动过程中，当遍历到这些节点时，直接创建并插入到正确位置。

```ts
// 记录两个序列的开始索引
const s1 = i // 旧序列的开始索引
const s2 = i // 新序列的开始索引

// 5.1 为新的子节点构建 key 到索引的映射
// 这个映射用于快速查找新位置
const keyToNewIndexMap: Map<PropertyKey, number> = new Map()
for (i = s2; i <= e2; i++) {
  const nextChild = (c2[i] = optimized
    ? cloneIfMounted(c2[i] as VNode)
    : normalizeVNode(c2[i]))
  if (nextChild.key != null) {
    // 记录 key 到索引的映射
    keyToNewIndexMap.set(nextChild.key, i)
  }
}

// 5.2 遍历剩余的旧子节点，尝试修补匹配的节点并移除不再存在的节点
let j
let patched = 0 // 已经修补的节点数量
const toBePatched = e2 - s2 + 1 // 需要修补的新节点数量
let moved = false
// 用于追踪是否有节点移动
let maxNewIndexSoFar = 0
// 创建一个数组，记录新索引到旧索引的映射关系
// 注意：旧索引会加1，因为索引0是一个特殊值
// 表示新节点在旧节点中没有对应的节点
// 这个数组用于确定最长稳定子序列
const newIndexToOldIndexMap = Array.from({ length: toBePatched })
// eslint-disable-next-line no-unmodified-loop-condition
for (i = 0; i < toBePatched; i++) newIndexToOldIndexMap[i] = 0

// 遍历剩余的旧子节点
for (i = s1; i <= e1; i++) {
  const prevChild = c1[i]
  if (patched >= toBePatched) {
    // 如果已修补的节点数量超过需要修补的数量
    // 说明剩下的旧节点都需要被移除
    unmount(prevChild, parentComponent, parentSuspense, true)
    continue
  }
  // 查找旧节点在新子节点中的位置
  let newIndex
  if (prevChild.key != null) {
    // 如果节点有 key，直接从 Map 中查找新位置
    newIndex = keyToNewIndexMap.get(prevChild.key)
  }
  else {
    // 如果节点没有 key，则需要遍历查找相同类型的无 key 节点
    for (j = s2; j <= e2; j++) {
      // 找到未匹配的相同类型节点
      if (
        newIndexToOldIndexMap[j - s2] === 0
        && isSameVNodeType(prevChild, c2[j] as VNode)
      ) {
        newIndex = j
        break
      }
    }
  }
  // 如果在新子节点中找不到对应位置
  if (newIndex === undefined) {
    // 说明该节点在新的子节点中已经不存在，需要卸载
    unmount(prevChild, parentComponent, parentSuspense, true)
  }
  else {
    // 找到了对应位置，记录新旧索引的映射关系
    // i + 1 是为了避免 i = 0 的特殊情况，因为 0 表示没有对应的旧节点
    newIndexToOldIndexMap[newIndex - s2] = i + 1
    // 如果当前的新索引大于之前遇到的最大索引
    if (newIndex >= maxNewIndexSoFar) {
      maxNewIndexSoFar = newIndex
    }
    else {
      // 如果当前索引小于最大索引，说明节点需要移动
      moved = true
    }
    patch(prevChild, c2[newIndex], container, null)
    patched++
  }
}

// 5.3 移动和挂载节点
// 只有在有节点需要移动的情况下，才需要生成最长递增子序列
const increasingNewIndexSequence = moved
  ? getSequence(newIndexToOldIndexMap) // 获取最长递增子序列
  : EMPTY_ARR
j = increasingNewIndexSequence.length - 1
// 从后向前遍历，这样可以使用最后修补的节点作为锚点
for (i = toBePatched - 1; i >= 0; i--) {
  const nextIndex = s2 + i // 计算当前需要处理的节点索引
  const nextChild = c2[nextIndex] as VNode
  // 确定锚点：如果不是最后一个节点，使用下一个节点的 el 作为锚点
  const anchor = nextIndex + 1 < l2 ? (c2[nextIndex + 1] as VNode).el : parentAnchor
  // 如果映射中没有对应的旧节点索引（值为 0）
  if (newIndexToOldIndexMap[i] === 0) {
    // 说明是新节点，需要挂载
    patch(null, nextChild, container, anchor)
  }
  else if (moved) {
    // 如果需要移动节点，则检查：
    // 1. 没有稳定的子序列（例如完全倒序）
    // 2. 当前节点不在稳定子序列中
    if (j < 0 || i !== increasingNewIndexSequence[j]) {
      // 移动节点到正确的位置
      move(nextChild, container, anchor, MoveType.REORDER)
    }
    else {
      j--
    }
  }
}
```

**为什么 LIS 能最小化移动？**

- **LIS 中的节点**： 它们在更新前后保持了原有的相对顺序。这些节点是稳定的，不需要移动。
- **非 LIS 中的节点**： 它们要么是新增的，要么需要被移动到正确的位置。
- **移动策略**： 倒序遍历新列表待处理部分的节点。对于每个节点：
  - 如果它在 LIS 中，并且处于 LIS 的最后一个有效位置，则说明它位置正确，跳过移动。
  - 否则，它需要被移动。通过 `insertBefore` 将它插入到下一个节点（新列表中它的后一个节点）的前面。
    倒序插入保证了移动的 DOM 操作是顺序正确的。

Vue3 使用了一个 **贪心 + 二分查找的算法** (在 `getSequence` 函数中) 来高效计算 LIS。

其时间复杂度是 $O(n log n)$ ，远优于暴力 $O(n²)$。

## 实践建议

Vue3 通过大量的编译时优化和改进运行时的 diff 算法，使得渲染性能大大提升，
它相比于 vue2 有 2~10 倍的性能提升。

但要让其发挥最大效能，需要在开发过程中遵循这些建议：

- **始终使用稳定唯一的key**：尤其在 `v-for` 中，这是高效复用和LIS算法工作的基石。避免使用 `index` 作为 `key`（除非列表绝对静态）。
- **拥抱模板编译**：Vue3的编译时优化是其性能核心，尽量使用SFC单文件组件模板，而非手写渲染函数。
- **利用 `v-once`/`v-memo`**：对于纯静态内容使用 `v-once`。
  对于复杂但依赖特定条件更新的节点，使用 `v-memo` 进行细粒度控制，避免不必要的 Diff。
- **避免不必要的组件抽象**：过度拆分组件会增加 Block 边界和运行时开销。
  在性能敏感路径上权衡可维护性与性能。
- **理解 Block 边界**：`v-if`/ `v-for` 会创建Block边界。
  尽量保持Block内部结构稳定，避免在Block根节点上使用非响应式属性导致Block整体失效。
- **谨慎使用无 `key` 的 `v-for`**：无 `key` 时 Vue3 会退化为更简单的就地复用策略（patchUnkeyedChildren），在列表顺序变化时可能导致状态错乱或性能下降。
