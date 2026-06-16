---
url: /article/wo7znd9i/index.md
---
今天，我们就来聊聊一个日益流行的开放标准——**模型上下文协议（Model Context Protocol，简称 MCP）**，并用 TypeScript 从零开始，构建一个最小但功能齐全的 MCP 服务。

别担心，本文专为初学者打造，我将用最通俗易懂的语言，带你一步步揭开 MCP 的神秘面纱，让你不仅知道它是什么，更能亲手实现它！

:::tip 什么是 MCP？
简单来说，MCP 就像是为大语言模型（LLM）和外部工具、API、数据源之间搭建的一座标准化桥梁。

以前，我们可能需要为每个 AI 应用和外部服务编写大量定制化的“胶水代码”，不仅混乱且难以维护。 MCP 的出现，正是为了统一标准，提供一套通用的“沟通语言”和接口，让 AI 能更顺畅、更安全地调用外部能力。

它采用的是一种客户端-主机-服务器（Client-Host-Server）的架构。 你可以这样理解：

* **主机 (Host)**：比如 VS Code、Claude Desktop 这类我们直接操作的应用。
* **客户端 (Client)**：由主机创建，负责与某一个具体的 MCP 服务进行一对一通信。
* **服务器 (Server)**：这就是我们今天要构建的主角！它封装了具体的工具或数据，等待 AI 调用。

:::

准备好了吗？我们开始吧！

## 准备工作 - 环境搭建

“工欲善其事，必先利其器”。在开始编码前，我们需要先把开发环境搭好。

::::steps

* **初始化项目**
  首先，找一个合适的文件夹，创建新项目，并初始化 `package.json` 文件。

  ```bash
  mkdir my-mcp-server
  cd my-mcp-server
  npm init -y
  ```

* **安装核心依赖**
  我们需要安装 MCP 的 TypeScript SDK、`zod` 和 TypeScript 本身。`@modelcontextprotocol/sdk` 是我们的核心。

  ```bash
  npm install @modelcontextprotocol/sdk zod
  npm install typescript tsx @types/node --save-dev
  ```

  > `zod` 是一个出色的 TypeScript 优先的 schema 校验库，MCP 官方也用它来定义工具的输入输出规范，强烈推荐！ `tsx` 能让我们直接运行 TypeScript 文件，无需手动编译，非常方便。

* **配置 TypeScript**
  在项目根目录创建一个 `tsconfig.json` 文件，这是 TypeScript 的配置文件。

  ```json title="tsconfig.json"
  {
    "compilerOptions": {
      "target": "ES2022",
      "module": "NodeNext",
      "moduleResolution": "NodeNext",
      "strict": true,
      "esModuleInterop": true,
      "outDir": "dist"
    },
    "include": ["src/**/*"]
  }
  ```

* **创建项目结构**
  清晰的目录结构使代码更易于维护。

  :::file-tree

  * my-mcp-server
  * node\_modules
    * src
      * index.ts  # 我们的主入口文件
    * package.json
    * tsconfig.json

  :::

::::

搞定！开发环境已经就绪，我们开始构建服务吧。

## 第一个 MCP 服务 - "Hello World"

我们先从最简单的例子开始，创建一个能返回 "Hello, \[name]!" 的 MCP 服务。

### 1. 初始化服务器

在 `src/index.ts` 文件里，我们引入所需模块，并创建一个 MCP 服务器实例。

```typescript title="src/index.ts"
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio'
import { z } from 'zod'

// 1. 创建一个 MCP 服务器实例
const server = new McpServer({
  name: 'hello-mcp-server',
  version: '1.0.0',
})

console.log('Hello MCP Server is starting...')

// 后面我们会在这里注册工具...

// 4. 选择通信方式并启动服务
// StdioServerTransport 表示通过标准输入输出进行通信，非常适合本地调试
async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.log('Server connected to transport. Waiting for requests...')
}

main().catch(console.error)
```

### 2. 定义并注册一个“工具”

在 MCP 的世界里，一个具体的功能被称为“工具”(Tool)。 我们的第一个工具是 `sayHello`。

在 `src/index.ts` 中添加如下代码（放在服务器实例创建之后）：

```typescript title="src/index.ts"
// ... (之前的代码)

// 2. 定义工具的输入和输出 schema
const SayHelloInput = z.object({
  name: z.string().describe('The name of the person to greet.'),
})
const SayHelloOutput = z.object({
  message: z.string(),
})

// 3. 注册我们的第一个工具
server.registerTool(
  'sayHello',
  {
    title: 'Say Hello',
    description: 'Generates a friendly greeting to a person.',
    inputSchema: SayHelloInput,
    outputSchema: SayHelloOutput,
  },
  // 这是工具的具体实现逻辑
  async (input) => {
    const greeting = `Hello, ${input.name}! Welcome to the world of MCP.`
    console.log(`Generated greeting: ${greeting}`)

    const output = { message: greeting }

    // 按照 MCP 规范返回内容
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(output, null, 2),
        },
      ],
      structuredContent: output,
    }
  }
)

// ... (之后的 main 函数)
```

:::info 代码解读

* **McpServer**: 这是 MCP 服务端的核心类，我们通过它来定义服务信息和注册功能。
* **registerTool**: 此方法用于注册一个工具。它需要三个参数：工具的唯一名称、工具的元数据（描述、输入输出规范等）和工具的异步执行函数。
* **Schema 定义**: 我们用 `zod` 定义了清晰的输入 (`name: string`) 和输出 (`message: string`)。这样做的好处是，AI 模型就能清楚地知道调用这个工具需要什么参数，以及会返回什么结果。
* **实现逻辑**: 核心逻辑很简单，只是拼接一个字符串。但请注意返回值的格式，`content` 字段是一个数组，可以包含多种格式（如文本、图片等），`structuredContent` 则是结构化的 JSON 数据，便于程序处理。
* **StdioServerTransport**: MCP 支持多种通信协议，`stdio`（标准输入输出）是最简单的一种，适合本地开发和与 VS Code 等编辑器集成。

:::

### 3. 运行与测试

写好代码后，我们该如何测试呢？MCP 生态提供了一个非常方便的调试工具：**MCP Inspector**。

首先，在 `package.json` 中添加一个启动脚本：

```json title="package.json"
{
  // ...
  "scripts": {
    "start": "tsx src/index.ts"
  }
  // ...
}
```

然后在一个终端中启动我们的服务：

::: npm-to

```bash
npm start
```

:::

你会看到 `Hello MCP Server is starting...` 的输出。

接着，打开**另一个终端**，运行 MCP Inspector：

```bash
npx @modelcontextprotocol/inspector
```

这会在浏览器中打开一个调试界面。选择 "Stdio" 连接方式，然后将我们 `npm start` 的命令填入 "Command" 输入框中，点击 "Connect"。

连接成功后，你就能在 Inspector 里看到我们注册的 `sayHello` 工具了。你可以直接在界面上输入参数进行调用，观察返回结果，是不是非常方便？

## 进阶示例 - 调用外部 API

“Hello World” 只是开胃菜。MCP 强大的地方在于连接真实世界，比如调用一个天气 API。

我们来创建一个 `getWeather` 工具。

### 1. 安装 `axios`

我们需要一个 HTTP 客户端来发送网络请求。这里选用 `axios`。

```bash
npm install axios
```

### 2. 注册 `getWeather` 工具

在 `src/index.ts` 中添加获取天气的工具。

```typescript title="src/index.ts"
import axios from 'axios'
// ... (其他 import)

// ... (hello-mcp-server 的定义)

// ... (sayHello 工具的注册)

// --- 获取天气的工具 ---
const GetWeatherInput = z.object({
  city: z.string().describe('The city name, e.g., Shanghai'),
})

const GetWeatherOutput = z.object({
  city: z.string(),
  temperature: z.number(),
  description: z.string(),
})

server.registerTool(
  'getWeather',
  {
    title: 'Get Weather',
    description: 'Fetches the current weather for a specified city.',
    inputSchema: GetWeatherInput,
    outputSchema: GetWeatherOutput,
  },
  async ({ city }) => {
    try {
      // 注意：这里使用 OpenWeatherMap API，实际使用时请替换 'YOUR_API_KEY'
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY&units=metric`)

      const weatherData = response.data
      const output = {
        city: weatherData.name,
        temperature: weatherData.main.temp,
        description: weatherData.weather[0].description,
      }

      return {
        content: [{ type: 'text', text: JSON.stringify(output, null, 2) }],
        structuredContent: output,
      }
    }
    catch (error: any) {
      // 错误处理很重要！
      const errorMessage = `Failed to get weather for ${city}: ${error.message}`
      console.error(errorMessage)
      // 同样将错误信息返回给 AI
      return { content: [{ type: 'text', text: errorMessage }] }
    }
  }
)

// ... (main 函数)
```

:::warning 提醒
上面的代码用到了 OpenWeatherMap 的 API，你需要去官网注册并获取一个免费的 `API_KEY` 替换 `YOUR_API_KEY` 才能正常工作。
:::

现在，重新启动服务 (`npm start`)，并刷新 MCP Inspector，你就会看到新的 `getWeather` 工具。试试查询 "Beijing" 的天气，看看会返回什么结果。

## 再进一步 - 多模型协调的思考

我们已经实现了两个独立的工具。但如果一个任务需要多个工具协作完成呢？比如，“查询北京的天气，然后用友好地问候语告诉我今天的天气情况”。

这个任务需要两步：

1. 调用 `getWeather` 工具获取天气数据。
2. 将天气数据作为上下文信息，让 AI 模型生成一段自然语言描述。

这正是 MCP 发挥作用的地方。当一个 AI 客户端（如 VS Code 内的 Copilot）连接到我们的 MCP 服务后，它就能“看到”我们提供的所有工具。当用户提出复杂需求时，AI 模型会自动进行任务拆解 (Task Decomposition)：

1. **AI 分析需求**：识别出需要“查询天气”和“生成问候语”。
2. **选择工具**：发现我们的 MCP 服务提供了 `getWeather` 工具，决定调用它。
3. **执行工具**：向我们的服务发送请求 `getWeather({ city: 'Beijing' })`。
4. **获取结果**：我们的服务返回 `{ "city": "Beijing", "temperature": 25, "description": "sunny" }`。
5. **整合上下文并生成回答**：AI 将上一步的结果作为新的上下文信息，结合原始问题，最终生成回答：“你好！北京今天天气晴朗，温度是 25 摄氏度。祝你拥有愉快的一天！”

> 整个过程对 MCP 服务的开发者而言是透明的。我们只需专注于提供稳定、原子化的工具，而工具的编排和协调则交给了上层的 AI 模型。

这正是 MCP “关注点分离” (Separation of Concerns) 设计思想的体现。

## 总结

恭喜你！到这里，你已经成功构建了一个最小化但包含核心功能的 MCP 服务。我们回顾一下关键点：

1. **MCP 的核心价值**：为 AI 和外部世界提供了一套标准的“连接器”，大大简化了 AI 应用的开发。
2. **核心 SDK**：使用 `@modelcontextprotocol/sdk`，通过 `McpServer` 类来创建服务，并通过 `registerTool` 来暴露能力。
3. **工具 (Tool)**：是 MCP 服务功能的最小单元。一个设计良好的工具应该功能单一、职责明确，并使用 `zod` 定义清晰的输入输出。
4. **通信 (Transport)**：我们使用了 `StdioServerTransport`，它非常适合本地开发和IDE集成。
5. **调试**：`@modelcontextprotocol/inspector` 是我们开发过程中的好伙伴。
6. **可组合性**：我们只需提供独立的工具，复杂的任务编排将由 AI 模型自动完成。

当然，MCP 的世界远不止于此，还包括更复杂的概念如资源 (Resources)、提示 (Prompts)、身份验证、流式 HTTP 传输等。 但今天，你已经迈出了至关重要的一步。

***

**参考资料**：

* [Model Context Protocol 官方文档](https://modelcontextprotocol.io/)
* [MCP TypeScript SDK (GitHub)](https://github.com/modelcontextprotocol/typescript-sdk)
* [VS Code 中使用 MCP 服务](https://code.visualstudio.com/docs/copilot/customization/mcp-servers)
