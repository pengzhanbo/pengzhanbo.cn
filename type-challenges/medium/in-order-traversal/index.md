---
url: /type-challenges/medium/in-order-traversal/index.md
---
## 题目

Github: [InorderTraversal](https://github.com/type-challenges/type-challenges/blob/main/questions/03376-medium-inordertraversal/README.md)

实现二叉树中序遍历的类型版本。

```ts
const tree1 = {
  val: 1,
  left: null,
  right: {
    val: 2,
    left: {
      val: 3,
      left: null,
      right: null,
    },
    right: null,
  },
} as const

type A = InorderTraversal<typeof tree1> // [1, 3, 2]
```

## 解题思路

在二叉树的有序遍历中，我们遍历一个节点的子树，然后“访问”这个节点，然后遍历它的另 一个子树。通常，我们会先遍历左子树，然后再遍历节点的右子树。

```txt
      A
    /   \
   B     C
 /   \
D     E

In-order Traversal: D, B, E, A, C
```

## 答案

```ts
interface TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
}

type InorderTraversal<
  T extends TreeNode | null,
  R extends TreeNode = NonNullable<T>
> =
  T extends null
    ? []
    : [...InorderTraversal<R['left']>, R['val'], ...InorderTraversal<R['right']>]
```

## 验证

```ts twoslash
import type { Equal, Expect } from '~/tc-utils'

interface TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
}

type InorderTraversal<
  T extends TreeNode | null,
  R extends TreeNode = NonNullable<T>
> =
  T extends null
    ? []
    : [...InorderTraversal<R['left']>, R['val'], ...InorderTraversal<R['right']>]

// ---cut---
const tree1 = {
  val: 1,
  left: null,
  right: {
    val: 2,
    left: {
      val: 3,
      left: null,
      right: null,
    },
    right: null,
  },
} as const

const tree2 = {
  val: 1,
  left: null,
  right: null,
} as const

const tree3 = {
  val: 1,
  left: {
    val: 2,
    left: null,
    right: null,
  },
  right: null,
} as const

const tree4 = {
  val: 1,
  left: null,
  right: {
    val: 2,
    left: null,
    right: null,
  },
} as const

type cases = [
  Expect<Equal<InorderTraversal<null>, []>>,
  Expect<Equal<InorderTraversal<typeof tree1>, [1, 3, 2]>>,
  Expect<Equal<InorderTraversal<typeof tree2>, [1]>>,
  Expect<Equal<InorderTraversal<typeof tree3>, [2, 1]>>,
  Expect<Equal<InorderTraversal<typeof tree4>, [1, 2]>>,
]
```

## 参考

* [Tree Traversal Techniques](https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/)
* [条件类型 Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
