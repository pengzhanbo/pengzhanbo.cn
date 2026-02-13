---
url: /algorithm/data-structure/graph/index.md
---
[**维基百科** - 图论](https://zh.wikipedia.org/wiki/%E5%9B%BE%E8%AE%BA){.read-more}

::: warning 受限于篇幅和作者个人水平，本篇仅粗略的介绍 **图** 的一些基本概念，有兴趣的读者可以自行了解更多的知识。
:::

## 概述

\==图（Graph）== 是一种表示多对多关系的非线性数据结构，由 **顶点（Vertex）** 和 **边（Edge）** 组成。

## 图的核心概念

* **顶点（Vertex）**：图中的基本元素（节点）

* **边（Edge）**：连接两个顶点的关系（可带权重）

* **类型**：

  * **无向图**：边无方向（A-B 表示双向关系）

  * **有向图**：边有方向（A→B 表示单向关系）

* **术语**：

  * **度（Degree）**：顶点连接的边数

  * **路径（Path）**：顶点序列通过边连接

  * **环（Cycle）**：起点=终点的路径

  * **连通图**：任意两顶点间存在路径

## 图的表示方法

### 邻接矩阵（Adjacency Matrix）

```ts
class GraphMatrix {
  private matrix: number[][]
  private vertices: string[]

  constructor(vertices: string[]) {
    this.vertices = vertices
    this.matrix = Array.from({ length: vertices.length })
      .fill(0)
      .map(() => Array.from({ length: vertices.length }).fill(0))
  }

  // 添加边（无向图）
  addEdge(v1: string, v2: string, weight: number = 1) {
    const i = this.vertices.indexOf(v1)
    const j = this.vertices.indexOf(v2)
    this.matrix[i][j] = weight
    this.matrix[j][i] = weight // 有向图时删除此行
  }

  // 打印矩阵
  print() {
    console.log(`  ${this.vertices.join(' ')}`)
    this.matrix.forEach((row, i) => {
      console.log(`${this.vertices[i]} ${row.join(' ')}`)
    })
  }
}

// 使用示例
const graph = new GraphMatrix(['A', 'B', 'C'])
graph.addEdge('A', 'B', 3)
graph.addEdge('B', 'C', 2)
graph.print()
/* 输出：
   A B C
A 0 3 0
B 3 0 2
C 0 2 0
*/
```

### 邻接表（Adjacency List）

```ts
interface Edge { vertex: string, weight: number }
class GraphList {
  private adjacencyList: Map<string, Edge[]> = new Map()

  addVertex(vertex: string): void {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, [])
    }
  }

  addEdge(v1: string, v2: string, weight: number = 1): void {
    this.adjacencyList.get(v1)?.push({ vertex: v2, weight })
    // 无向图需添加反向边（有向图时删除）
    this.adjacencyList.get(v2)?.push({ vertex: v1, weight })
  }

  getNeighbors(vertex: string): Edge[] {
    return this.adjacencyList.get(vertex) || []
  }

  print() {
    this.adjacencyList.forEach((edges, vertex) => {
      const edgeStr = edges.map(e => `${e.vertex}(${e.weight})`).join(', ')
      console.log(`${vertex} -> ${edgeStr}`)
    })
  }
}

// 使用示例
const graph = new GraphList()
graph.addVertex('A')
graph.addVertex('B')
graph.addVertex('C')
graph.addEdge('A', 'B', 3)
graph.addEdge('B', 'C', 2)
graph.print()
/* 输出：
A -> B(3)
B -> A(3), C(2)
C -> B(2)
*/
```

## 图的应用场景

* **社交网络**：好友关系（顶点=用户，边=关注）
* **路径规划**：地图导航（顶点=地点，边=道路权重）
* **依赖分析**：编译顺序（有向无环图拓扑排序）
* **推荐系统**：用户-商品二部图

## 相关问题

[**LeetCode** - 图](https://leetcode.cn/problem-list/graph/){.read-more}

### 基础遍历与连通性问题

* **200. 岛屿数量**（[LeetCode](https://leetcode.cn/problems/number-of-islands/)）
* **133. 克隆图**（[LeetCode](https://leetcode.cn/problems/clone-graph/)）

### 环检测与树结构判断

* **261. 以图判树**（[LeetCode](https://leetcode.cn/problems/graph-valid-tree/)）
* **207. 课程表**（[LeetCode](https://leetcode.cn/problems/course-schedule/)）

### 最短路径与多源遍历

* **743. 网络延迟时间**（[LeetCode](https://leetcode.cn/problems/network-delay-time/)）
* **994. 腐烂的橘子**（[LeetCode](https://leetcode.cn/problems/oranges-rotting/)）

### 拓扑排序与应用

* **210.课程表 II**（[LeetCode](https://leetcode.cn/problems/course-schedule-ii/)）
* **310. 最小高度树**（[LeetCode](https://leetcode.cn/problems/minimum-height-trees/)）

### 矩阵与隐式图转换

* **417. 太平洋大西洋水流问题**（[LeetCode](https://leetcode.cn/problems/pacific-atlantic-water-flow/)）
* **127. 单词接龙**（[LeetCode](https://leetcode.cn/problems/word-ladder/)）
