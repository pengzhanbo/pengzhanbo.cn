---
title: 从零开始实现最小化的 AI Agent
createTime: 2025/11/02 11:49:34
permalink: /article/ag2zktg5/
tags:
  - AI
  - agent
  - python
---

在人工智能飞速发展的今天，==AI Agent=={.info} 的概念越来越火热，它不再是简单的问答机器人，而是能够自主感知环境、独立思考、并采取行动以达成目标的智能实体。想象一下一个能帮你管理日常事务、自动处理邮件，甚至帮你写代码的“数字助理”，这就是 AI Agent 的魅力所在。

但对于许多开发者来说，AI Agent 似乎是一个复杂且遥不可及的系统。别担心！本文将带你从零开始，手把手实现一个**最小化的 AI Agent**，揭开其神秘面纱。

<!-- more -->

:::tip 为什么从最小化 Agent 开始？
最小化 Agent 旨在通过最精简的代码和最核心的组件，让你快速理解 AI Agent 的基本工作原理和构建逻辑，避免一开始就被复杂的框架和概念劝退。当我们掌握了其核心，再扩展到更复杂的应用场景就会得心应手。
:::

## 1. AI Agent 到底是什么？

要实现一个最小化的 AI Agent，我们首先需要理解它的核心要素。简单来说，一个 ==AI Agent=={.info} 是一个能够：

1. **感知 (Perception)**：从环境中获取信息。
2. **规划 (Planning)**：根据感知到的信息和目标，制定行动策略。
3. **行动 (Action)**：执行规划中的步骤，与环境交互。
4. **记忆 (Memory)**：存储和回忆过去的经验，从而学习和改进。
5. **反思 (Reflection)**：审视和修正自己生成的输出，以优化性能。

这些能力相互协同，构成了一个 AI Agent 的完整闭环。

而我们今天要构建的“最小化” Agent，将主要聚焦于 **感知、规划、行动** 这三大核心能力，并辅以简单的**记忆**机制。

## 2. 最小化 Agent 的核心组件

要构建一个最小化的 AI Agent，我们离不开以下核心组件：

### 2.1. 大语言模型 (LLM) — Agent 的“大脑”

LLM 是 AI Agent 的核心计算引擎，扮演着“大脑”的角色。 它们经过海量数据训练，能够理解和生成文本，并从中进行推理。 就像我们人类思考问题一样，LLM 负责理解我们的指令、分析问题、并生成解决问题的步骤。

LLM 的主流架构主要有三种类型：仅编码器 (Encoder-only)、仅解码器 (Decoder-only) 和编码器-解码器 (Encoder-Decoder)，它们大多基于 ==Transformer 架构=={.info}。

### 2.2. 工具 (Tools) — Agent 的“双手”

大语言模型虽然强大，但它们的知识通常截止于训练数据，并且无法直接与外部世界互动，比如查询实时信息、执行代码或者调用 API。 这时候就需要“工具”登场了！

工具是赋予 Agent 与外部环境交互能力的接口，就像我们的双手一样。通过工具，Agent 可以完成很多 LLM 本身无法完成的任务，比如：

- **网络搜索**：获取实时信息或最新数据。
- **计算器**：进行精确的数学计算。
- **代码解释器**：执行代码并获取结果。
- **API 调用**：与各种外部服务（如天气预报、数据库等）进行交互。

### 2.3. 记忆 (Memory) — Agent 的“经验”

没有记忆的 Agent 将是“健忘”的，每次交互都像是第一次，无法从过去的经验中学习。记忆机制允许 Agent 存储和回忆信息，从而在不同会话中变得更加个性化和智能。

记忆通常分为：

- **短期记忆 (Short-Term Memory, STM)**：用于维持单个交互中的上下文，例如当前会话的最近几次对话。
- **长期记忆 (Long-Term Memory, LTM)**：用于存储跨会话、跨任务的知识，通常通过数据库或向量嵌入实现。

在最小化实现中，我们可以从简单的短期记忆开始，例如维护一个固定长度的对话历史。

### 2.4. 规划 (Planning) — Agent 的“思维过程”

规划是 Agent 决定下一步行动的关键，它涉及将复杂任务分解为更小的步骤，并按计划执行。

常用的规划模式包括：

- **子目标分解 (Sub-goal Decomposition)**：将复杂任务拆解成一系列可管理、可执行的子任务。
- **反思与改进 (Reflection & Refinement)**：Agent 审视自身输出，并根据反馈进行修正。

## 3. 架构设计与技术选型

为了实现最小化的 Agent，我们将采用如下架构并选择相应的技术栈：

:::file-tree

- project_root
  - chat_agent.py
  - tools.py
  - README.md
  - requirements.txt

:::

### 3.1. 技术选型

- **核心语言**：Python (易学易用，生态丰富)
- **LLM 交互**：OpenAI API (或其他兼容 OpenAI 接口的 LLM, 如 Google Gemini / 千帆大模型)
- **Agent 框架**：本次我们将“手搓”核心逻辑，不依赖大型框架，以便深入理解原理。但实际开发中，LangChain 等框架能极大简化开发。
- **记忆**：一个简单的列表来存储对话历史。

### 3.2. 工作原理流程

我们的最小 Agent 将遵循一个基于 ==ReAct (Reasoning and Acting)=={.info} 模式的简化 Agentic Workflow：

1. **用户输入**：Agent 接收用户的问题。
2. **思考 (Reasoning)**：LLM 根据用户输入和工具描述，判断是否需要调用工具。
3. **行动 (Action)**：如果需要，调用相应的工具，并获取结果。
4. **观察 (Observation)**：Agent 获取工具返回的结果。
5. **循环**：将观察结果再次输入 LLM，重复“思考-行动-观察”循环，直到任务完成或 LLM 认为可以直接回答。

## 4. 动手实现最小 Agent

接下来，我们开始编码实现。

### 4.1. 环境准备

:::steps

- **创建项目目录和虚拟环境**

  ```bash
  mkdir mini-ai-agent
  cd mini-ai-agent
  python -m venv .venv
  source .venv/bin/activate # macOS/Linux
  # .venv\Scripts\activate # Windows
  ```

- **安装必要的库**

  ```bash
  pip install openai python-dotenv
  ```

- **配置 API 密钥**
  在项目根目录创建 `.env` 文件，并添加你的 OpenAI API 密钥：

  ```ini
  OPENAI_API_KEY="你的OpenAI API Key"
  ```

  如果你使用其他兼容 OpenAI API 的服务 (如千帆大模型)，请根据其文档配置 `OPENAI_API_BASE`。

:::

### 4.2. 定义工具 (tools.py)

首先，我们需要定义 Agent 可以使用的工具。这里我们简单实现一个“计算器”和一个“获取当前时间”的工具。

```python title="tools.py"
import datetime

class Tools:
    def calculator(self, expression: str) -> str:
        """
        用于执行数学计算，例如：计算 '1 + 1'，'Math.sqrt(9)'。
        请将数学表达式作为字符串传入。
        """
        try:
            # 这是一个简化的实现，实际应用中需要更安全的沙箱环境来执行代码
            result = eval(expression)
            return str(result)
        except Exception as e:
            return f"计算出错: {e}"

    def get_current_time(self) -> str:
        """
        获取当前的日期和时间。
        """
        return datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

# 可以将所有工具作为字典导出，方便 Agent 调用
AVAILABLE_TOOLS = {
    "calculator": Tools().calculator,
    "get_current_time": Tools().get_current_time,
}

# 为 LLM 提供工具的描述（Function Calling 格式）
TOOL_SCHEMA = [
    {
        "type": "function",
        "function": {
            "name": "calculator",
            "description": "用于执行数学计算，例如：计算 '1 + 1'，'Math.sqrt(9)'。请将数学表达式作为字符串传入。",
            "parameters": {
                "type": "object",
                "properties": {
                    "expression": {
                        "type": "string",
                        "description": "要计算的数学表达式",
                    },
                },
                "required": ["expression"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "get_current_time",
            "description": "获取当前的日期和时间。",
            "parameters": {
                "type": "object",
                "properties": {},
            },
        },
    },
]
```

:::tip 关于 `eval()` 的安全提示
在 `calculator` 工具中使用了 `eval()` 函数，这在生产环境中是非常危险的，因为它允许执行任意代码。本例仅为教学目的而简化。在实际项目中，应使用更安全的数学表达式解析库或沙箱环境。
:::

### 4.3. 实现 Agent 核心逻辑 (chat_agent.py)

```python title="chat_agent.py"
import os
import json
from openai import OpenAI
from dotenv import load_dotenv
from tools import AVAILABLE_TOOLS, TOOL_SCHEMA

# 加载环境变量
load_dotenv()

class MiniAIAgent:
    def __init__(self, api_key: str):
        self.client = OpenAI(api_key=api_key)
        self.conversation_history = [] # 简化记忆：存储对话历史

    def add_message(self, role: str, content: str):
        """将消息添加到对话历史中"""
        self.conversation_history.append({"role": role, "content": content})
        # 保持对话历史在一个合理长度，防止超出LLM上下文窗口
        if len(self.conversation_history) > 10:
            self.conversation_history = self.conversation_history[-10:]

    def run(self, user_query: str):
        """
        Agent 的主运行逻辑，感知、规划、行动循环
        """
        self.add_message("user", user_query)
        print(f"用户: {user_query}")

        while True:
            # 1. 思考 (Reasoning) - 调用 LLM 决定下一步行动
            response = self.client.chat.completions.create(
                model="gpt-3.5-turbo", # 你也可以尝试 gpt-4 或其他支持 Function Calling 的模型
                messages=self.conversation_history,
                tools=TOOL_SCHEMA,
                tool_choice="auto", # 允许 LLM 自主选择是否调用工具
            )

            response_message = response.choices[0].message
            self.add_message(response_message.role, response_message.content if response_message.content else "")

            # 2. 检查 LLM 是否决定调用工具
            tool_calls = response_message.tool_calls
            if tool_calls:
                # 3. 行动 (Action) - 执行工具调用
                for tool_call in tool_calls:
                    function_name = tool_call.function.name
                    function_args = json.loads(tool_call.function.arguments)

                    if function_name in AVAILABLE_TOOLS:
                        print(f"Agent 调用工具: {function_name}，参数: {function_args}")
                        tool_output = AVAILABLE_TOOLS[function_name](**function_args)
                        print(f"工具 {function_name} 返回: {tool_output}")

                        # 将工具输出添加到对话历史，作为 LLM 的新的"观察"
                        self.add_message(
                            "tool",
                            json.dumps(
                                {
                                    "tool_call_id": tool_call.id,
                                    "output": tool_output
                                }
                            )
                        )
                    else:
                        print(f"Agent 尝试调用未知工具: {function_name}")
                        self.add_message(
                            "tool",
                            json.dumps(
                                {
                                    "tool_call_id": tool_call.id,
                                    "output": f"错误: 未知工具 {function_name}"
                                }
                            )
                        )
                # LLM 在获取工具结果后，会再次思考，因此继续循环
                continue
            else:
                # LLM 没有调用工具，直接返回内容，结束循环
                print(f"Agent: {response_message.content}")
                break

if __name__ == "__main__":
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        print("请在 .env 文件中设置 OPENAI_API_KEY。")
        exit(1)

    agent = MiniAIAgent(api_key=api_key)

    # 运行示例
    print("--- Mini AI Agent 启动！输入'exit'或'退出'结束对话 ---")
    while True:
        try:
            user_input = input("你: ")
            if user_input.lower() in ["exit", "退出"]:
                print("Agent 停止。")
                break
            agent.run(user_input)
            print("-" * 30)
        except Exception as e:
            print(f"运行出错: {e}")
            break
```

### 4.4. 代码解释

:::steps

- **`MiniAIAgent` 类**：
  - `__init__`：初始化 OpenAI 客户端，并创建一个 `conversation_history` 列表作为 Agent 的短期记忆。
  - `add_message`：负责将用户和助手的消息添加到 `conversation_history` 中。
    这里我们限制了历史记录的长度（-10: 保持在10条），防止超出 LLM 的上下文窗口。
    实际生产中，会涉及更复杂的 ==记忆管理策略=={.info}，例如结合摘要或 ==向量数据库=={.info} 实现长期记忆。
- **`run` 方法**：这是 Agent 的核心控制循环。
  - 它首先将用户输入添加到对话历史。
  - 然后进入 `while True` 循环，模拟 Agent 的思考-行动过程。
  - **思考**：通过 `self.client.chat.completions.create` 方法调用 LLM，并将 `TOOL_SCHEMA` 作为 `tools` 参数传递。这告诉 LLM 我们有哪些工具可用，并让它自行决定是否使用。
  - **获取 LLM 响应**：`response.choices[0].message` 包含了 LLM 的回复。重要的部分在于 `response_message.tool_calls`。如果 LLM 决定调用工具，这个字段会包含工具调用的信息。
  - **判断并行动**：
    - 如果 `tool_calls` 存在，说明 LLM 决定调用工具。Agent 会解析工具名称和参数，并在 `AVAILABLE_TOOLS` 字典中查找并执行相应的 Python 函数。
    - 工具执行的结果会被再次格式化为 `role="tool"` 的消息，重新添加到 `conversation_history` 中，作为 LLM 的“观察结果”，然后循环继续，让 LLM 根据工具结果进行下一步思考。
    - 如果 `tool_calls` 为空，说明 LLM 已经得到了最终答案，直接将其内容打印出来，并结束循环。

:::

### 4.5. 运行 Agent

在项目根目录运行 `chat_agent.py`：

```bash
python chat_agent.py
```

你将看到类似以下的交互：

::: code-tabs
@tab 终端输出 (Sample)

```bash
--- Mini AI Agent 启动！输入'exit'或'退出'结束对话 ---
你: 今天深圳的天气怎么样？
Agent: 我无法直接获取实时天气信息。但我可以帮你查找。
Agent 调用工具: get_current_time，参数: {}
工具 get_current_time 返回: 2025-11-15 21:55:30
Agent: 很抱歉，我目前无法获取您提问的实时天气信息。
------------------------------
你: 计算 123 * 45
Agent 调用工具: calculator，参数: {'expression': '123 * 45'}
工具 calculator 返回: 5535
Agent: 123 乘以 45 的结果是 5535。
------------------------------
你: 给我讲个笑话
Agent: 一个程序员去算命，算命的说：“你会在35岁遇到一个重要的转折点，你的命运将发生翻天覆地的变化。” 程序员问：“是会升职加薪吗？” 算命的说：“不，你会在那一年学会使用 Vim。”
------------------------------
你: 退出
Agent 停止。
```

@tab Python (chat_agent.py)

```python
# （与上方代码块相同，省略重复内容）
import os
import json
from openai import OpenAI
from dotenv import load_dotenv
from tools import AVAILABLE_TOOLS, TOOL_SCHEMA

load_dotenv()

class MiniAIAgent:
    def __init__(self, api_key: str):
        self.client = OpenAI(api_key=api_key)
        self.conversation_history = []

    def add_message(self, role: str, content: str):
        self.conversation_history.append({"role": role, "content": content})
        if len(self.conversation_history) > 10:
            self.conversation_history = self.conversation_history[-10:]

    def run(self, user_query: str):
        self.add_message("user", user_query)
        print(f"用户: {user_query}")

        while True:
            response = self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=self.conversation_history,
                tools=TOOL_SCHEMA,
                tool_choice="auto",
            )

            response_message = response.choices[0].message
            self.add_message(response_message.role, response_message.content if response_message.content else "")

            tool_calls = response_message.tool_calls
            if tool_calls:
                for tool_call in tool_calls:
                    function_name = tool_call.function.name
                    function_args = json.loads(tool_call.function.arguments)

                    if function_name in AVAILABLE_TOOLS:
                        print(f"Agent 调用工具: {function_name}，参数: {function_args}")
                        tool_output = AVAILABLE_TOOLS[function_name](**function_args)
                        print(f"工具 {function_name} 返回: {tool_output}")

                        self.add_message(
                            "tool",
                            json.dumps(
                                {
                                    "tool_call_id": tool_call.id,
                                    "output": tool_output
                                }
                            )
                        )
                    else:
                        print(f"Agent 尝试调用未知工具: {function_name}")
                        self.add_message(
                            "tool",
                            json.dumps(
                                {
                                    "tool_call_id": tool_call.id,
                                    "output": f"错误: 未知工具 {function_name}"
                                }
                            )
                        )
                continue
            else:
                print(f"Agent: {response_message.content}")
                break

if __name__ == "__main__":
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        print("请在 .env 文件中设置 OPENAI_API_KEY。")
        exit(1)

    agent = MiniAIAgent(api_key=api_key)

    print("--- Mini AI Agent 启动！输入'exit'或'退出'结束对话 ---")
    while True:
        try:
            user_input = input("你: ")
            if user_input.lower() in ["exit", "退出"]:
                print("Agent 停止。")
                break
            agent.run(user_input)
            print("-" * 30)
        except Exception as e:
            print(f"运行出错: {e}")
            break
```

:::

通过上述交互，你可以观察到 Agent 是如何“思考”并决定调用工具的。
当它收到“计算 123 * 45”时，它能识别出这是一个计算任务，并调用 `calculator` 工具。
当它处理“今天深圳的天气怎么样？”时，由于**只提供了获取当前时间的工具，而没有提供天气查询工具**，LLM 可能会尝试调用 `get_current_time`，但最终也会发现无法直接满足用户需求而进行解释。
这体现了 Agent 在 **感知局限性** 后，依然尝试运用已有工具或解释自身能力的“智能”行为。

## 5. 进阶的方向

现在你已经成功实现了一个最小化的 AI Agent，但这只是冰山一角。要构建更强大、更实用的 Agent，可以从以下几个方向继续深入：

- **更复杂的工具集成**：集成更多实用工具，如搜索引擎（结合 ==检索增强生成 RAG=={.info}）、文件读写、图像处理 API 等。
- **完善记忆系统**：
  - **上下文管理**：使用摘要技术减少历史记录，保持关键信息。
  - **长期记忆**：引入向量数据库，将过去的对话或知识嵌入存储，并在需要时进行检索。 这也是 ==RAG (Retrieval Augmented Generation)=={.info} 技术的核心，通过外部知识库增强 LLM 的回答能力。
  - **不同类型的记忆**：概念上，记忆还有情景记忆（特定事件）、语义记忆（通用知识）和程序记忆（如何执行任务）。
- **高级规划能力**：
  - **Chain-of-Thought (CoT)**：让 LLM 输出思考过程，提高可解释性。
  - **Tree-of-Thought (ToT)**：探索多条思考路径，进行剪枝和优化。
  - **ReAct 模式**：我们当前实现的简化 Agent 就基于此模式，其通过语言模型设计行动，并实现连续的思考和行动。
  - **反思 (Reflection)**：让 Agent 能够审视自己的决策和结果，并从中学习和改进。
- **多智能体协作 (Multi-Agent Collaboration)**：构建多个 Agent，每个 Agent 承担不同的角色，协同完成复杂任务。
- **Prompt Engineering**：优化给 LLM 的指令和提示词，以获得更准确、更符合预期的输出。 ==Prompt Engineering=={.info} 是一门艺术和科学，通过精心设计提示词，可以显著提升 LLM 的性能。

## 6. 总结

通过本文，我们从零开始，==“手搓”了一个最小化的 AI Agent=={.success}。
我们理解了 AI Agent 的核心组成部分：LLM 作为大脑，工具作为手，以及简单的记忆和规划机制。
虽然这个 Agent 很小，但它的核心逻辑—— **感知 (用户输入) -> 思考 (LLM 推理) -> 行动 (工具调用) -> 观察 (工具结果) -> 反思 (LLM 根据结果更新思考)** ——完美地展现了一个智能体的工作原理。

希望这个最小化的实现能为你打开 AI Agent 世界的大门，激励你进一步探索这个充满无限可能的前沿领域！

## 7. 延伸学习资源

- **LangChain 官方文档**：一个流行的 Agent 构建框架，提供了丰富的工具和组件。
- **OpenAI Function Calling 文档**：了解 LLM 如何有效调用外部函数。
- **Prompt Engineering Guide**：学习如何更好地设计提示词以提升 LLM 表现。
- **《LLM Powered Autonomous Agents》 by Lilian Weng (OpenAI)**：深入理解 LLM 驱动的自主 Agent 设计框架。
