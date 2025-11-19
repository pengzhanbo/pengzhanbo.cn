---
title: 一文读懂 RAG (检索增强生成)
createTime: 2025/11/19 10:30:14
permalink: /article/rdx1yx85/
tags:
  - AI
  - python
---

想必你已经感受过 ChatGPT 等大语言模型（LLM）的威力，它们上知天文、下晓地理，还能写代码、做策划。但你可能也遇到过这样的窘境：

- 问它一个关于最新事件的问题，它却告诉你 "我的知识截止于 2023 年" 。
- 让它基于公司的内部文档回答问题，它却一本正经地开始 "胡说八道" （我们称之为 "幻觉" ）。

这些问题的根源在于，大模型虽然强大，但它们的知识是 "静态" 的，被固化在了训练数据中。那么，有没有办法让大模型既能利用其强大的推理和生成能力，又能随时获取和利用最新的、或者我们指定的私有知识呢？

答案是肯定的，这就是我们今天的主角 —— **检索增强生成（Retrieval-Augmented Generation，简称 RAG）**。

<!-- more -->

这篇文章会带你深入浅出地了解 RAG 是什么，它如何为 AI 插上 "实时" 和 "私有" 知识的翅膀，并手把手教你用 Python 和 OpenAI API 构建一个基于本地知识库的问答应用。

## 一、什么是 RAG？给大模型一本可以随时翻阅的 "开卷考试" 参考书

想象一下，你正在参加一场考试。一种方式是凭借你脑海里记住的所有知识（预训练模型）来回答问题。但如果考题非常新、非常专业，超出了你的知识范围，你可能会答不上来，或者只能凭感觉猜一个（模型幻觉）。

而 RAG，就像是监考老师给了你一本权威的参考书（外部知识库），允许你 **开卷考试**。当你遇到难题时，你可以先去书里查找最相关的章节和段落（检索），然后结合查到的信息和你自己的理解，组织成最终的答案（生成）。

:::tip
**RAG (Retrieval-Augmented Generation)** 是一种人工智能框架，它通过从外部知识源中检索信息，来增强大语言模型（LLM）生成回答的能力。 简单来说，它让 LLM 在回答问题前，先 "查资料"，然后再说话。
:::

### 为什么需要 RAG？大模型的 "记忆" 困境

传统的大模型面临几个核心挑战：

1. **知识过时**：LLM 的知识是静态的，来自于训练数据。对于训练截止日期之后的新知识，它们一无所知。
2. **出现幻觉**：当被问及不了解或不确定的信息时，LLM 可能会编造看似合理但实际上是错误的答案。
3. **缺乏专业领域知识**：对于非常专业或组织内部的私有知识（如公司内部文档、产品手册），通用大模型无法提供准确回答。
4. **成本高昂**：针对特定领域的知识去重新训练或微调一个大模型，需要巨大的计算资源和财力。

RAG 正是解决这些问题的有效且经济的方案。它将 LLM 的通用能力与特定的、动态的外部知识库结合起来，极大地提升了回答的准确性、时效性和可信度。

### RAG 的工作原理：两步走，轻松应对难题

RAG 的核心流程非常直观，主要分为两个阶段： **检索 (Retrieval)** 和 **生成 (Generation)**。

::: steps

- **用户提问** (Query)
- **第一阶段：检索 (Retrieval)**
  - 1. **向量化查询**: 将用户问题转换为向量。
  - 2. **相似度搜索**: 在向量数据库中搜索与问题向量最相似的文本块 (Chunks)。
  - 3. **提取相关信息**: 返回最相关的几个文本块作为 "上下文 (Context)"。
- **第二阶段：生成 (Generation)**
  - 4. **构建新提示**: 将原始问题和检索到的上下文 "打包" 成一个新的提示 (Prompt)。
  - 5. **请求 LLM**: 将新提示发送给大语言模型。
  - 6. **生成最终答案**: LLM 基于提供的上下文，生成精准、可信的回答。

:::

这个过程就像我们写论文：先去图书馆或数据库（知识库）找相关的文献资料（检索），然后把这些资料和我们的论点结合起来，最终写成一篇有理有据的文章（生成）。

### RAG vs. 微调 (Fine-tuning)：开卷考试 vs. 题海战术

提到让模型学习新知识，很多人会想到 **微调 (Fine-tuning)**。RAG 和微调是两种不同的增强模型能力的方法，各有千秋。

| 特性 | 检索增强生成 (RAG) | 微调 (Fine-tuning) |
| :--- | :--- | :--- |
| **核心思想** | ==为模型提供外部知识=={.info}，让其 "开卷" 回答。 | ==调整模型内部参数=={.info}，让其学习特定领域的 "语感" 或行为模式。 |
| **知识更新** | 简单，只需更新外部知识库即可，成本低，==实时性强=={.success}。 | 复杂，需要重新准备数据集并训练模型，成本高，==知识是静态的=={.warning}。 |
| **解决幻觉** | 效果显著，因为回答基于明确的外部文本，==可溯源=={.success}。 | 效果有限，更侧重于风格和模式的学习，而非事实记忆。 |
| **适用场景** | 知识密集型任务，如客服问答、文档检索、需要最新信息的场景。 | 学习特定风格、语气或执行特定任务，如代码生成、文本分类。 |
| **形象比喻** | **开卷考试** | **题海战术** |

:::important 总结
RAG 和微调并非互斥，它们可以结合使用。 例如，你可以先微调一个模型使其更适应某个专业领域的术语和问答风格，然后再用 RAG 技术为其接入实时更新的知识库，从而达到最佳效果。
:::

## 二、实战：用 Python 和 OpenAI 打造你的本地知识库问答机器人

理论说完了，我们来点实际的。接下来，我们将一步步用 Python 构建一个简单的 RAG 应用。这个应用可以读取一个本地的文本文件（比如你的笔记、项目文档），然后让你通过提问的方式来查询里面的内容。

### 准备工作：安装必要的库

首先，我们需要安装几个核心的 Python 库。这里我们选用 `LangChain` 框架来简化开发流程，它为构建 LLM 应用提供了强大的工具集。

- `openai`: 用于调用 OpenAI 的 API。
- `langchain`: 核心框架。
- `tiktoken`: 用于文本分词。
- `faiss-cpu`: 一个高效的向量相似度搜索库 (这里用 CPU 版本演示)。
- `langchain_community`: LangChain 的社区组件。
- `langchain_openai`: LangChain 与 OpenAI 集成的特定库。

```bash
pip install openai langchain tiktoken faiss-cpu langchain_community langchain_openai python-dotenv
```

同时，你需要在你的项目根目录下创建一个 `.env` 文件，用来存放你的 OpenAI API 密钥：

:::file-tree

- your_project
  - ++ .env
  - ++ main.py
  - ++ my_knowledge.txt

:::

在 `.env` 文件中写入：

```env title=".env"
OPENAI_API_KEY="sk-..."
```

### 核心流程拆解：三步构建 RAG 应用

我们的 RAG 应用将严格按照前面介绍的原理来实现。

:::steps

- **加载与分割 (Load & Split)**
   我们将加载本地的 `my_knowledge.txt` 文件，并将其切割成更小的、语义完整的文本块 (Chunks)。这样做有助于提高检索的精确度。

- **存储与向量化 (Store & Embed)**
   使用 OpenAI 的 `embeddings` 模型将每个文本块转换成一个数学向量。然后，将这些向量存储在一个向量数据库 (Vector Store) 中，我们这里用 `FAISS`。

- **检索与生成 (Retrieve & Generate)**
   接收用户问题，将其向量化，然后在向量数据库中检索最相似的文本块。最后，将问题和检索到的文本块一起发送给 OpenAI 的语言模型，生成最终答案。

:::

### 第一步：加载和分割你的知识文档

首先，我们创建一个 `my_knowledge.txt` 文件，写入一些内容作为我们的本地知识库。

```text title="my_knowledge.txt"
RAG，全称是检索增强生成（Retrieval-Augmented Generation），是一种能让大语言模型（LLM）引用外部知识库来生成回答的技术。
它的核心思想分为两个步骤：检索（Retrieval）和生成（Generation）。
在检索阶段，系统会根据用户的问题，从知识库中找到最相关的文本片段。
在生成阶段，LLM会结合原始问题和检索到的文本片段，生成一个内容丰富且准确的回答。
与微调（Fine-tuning）相比，RAG在处理需要实时更新知识或事实性很强的任务时，更具优势和成本效益。
```

现在，我们用 Python 代码来加载并分割它。

```python title="main.py"
import os
from dotenv import load_dotenv
from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import CharacterTextSplitter

# 加载 .env 文件中的环境变量
load_dotenv()

# 1. 加载文档
loader = TextLoader("./my_knowledge.txt", encoding="utf-8")
documents = loader.load()

# 2. 切分文档
text_splitter = CharacterTextSplitter(
    separator="\n",  # 按换行符分割
    chunk_size=200,     # 每个 chunk 的最大长度
    chunk_overlap=50,   # chunk 之间的重叠长度
    length_function=len,
)
docs = text_splitter.split_documents(documents)

# 打印查看切分效果
print(f"文档被切分成了 {len(docs)} 个部分。")
for i, doc in enumerate(docs):
    print(f"--- Part {i+1} ---")
    print(doc.page_content)
    print("\n")
```

:::info 提示
**为什么需要分割文档？**
LLM 的上下文窗口是有限的，一次性提交整个长文档既低效又可能超出限制。将文档切分成小块，可以让我们在检索时只找出与问题最相关的几个片段，实现 "精准投喂"。 `chunk_overlap` 参数让文本块之间有一定的重叠，有助于保留上下文的连续性。
:::

### 第二步：文本向量化与存储 (关键一步)

这一步是 RAG 的魔法核心。我们要把文本块变成计算机能理解和比较的 "数字指纹" —— 也就是向量。

我们将使用 OpenAI 提供的 `text-embedding-3-small` 模型来生成向量，并使用 `FAISS` 这个库在内存中创建一个简单的向量数据库。

```python title="(续) main.py"
# ... 接上一段代码
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS

# 3. 文本向量化与存储
# 初始化 OpenAI 的 embedding 模型
embeddings_model = OpenAIEmbeddings()

# 使用 FAISS 从文档和 embedding 模型创建向量数据库
# 这一步会调用 embedding 模型将所有文本块转换为向量，并存入 FAISS 中
print("正在创建向量数据库...")
db = FAISS.from_documents(docs, embeddings_model)
print("向量数据库创建完成！")

# 将数据库保存到本地，方便下次直接加载
db.save_local("faiss_index")
```

运行后，你会看到项目目录下多了一个 `faiss_index` 文件夹，这就是我们本地的向量知识库。下次运行时，就可以直接加载，无需重新计算向量。

### 第三步：检索与生成，让 AI "有据可依"

万事俱备，只欠东风。现在我们可以开始提问了！

我们将创建一个完整的问答链 (Chain)，它会自动完成 "检索 -> 构建 Prompt -> 请求 LLM" 的全过程。

```python title="(完整代码) main.py"
import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import CharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate

# 加载 .env 文件中的环境变量
load_dotenv()

# --- 持久化与加载 ---
# 检查索引是否已存在
if os.path.exists("faiss_index"):
    print("正在从本地加载向量数据库...")
    db = FAISS.load_local("faiss_index", OpenAIEmbeddings(), allow_dangerous_deserialization=True)
else:
    print("未找到本地索引，正在创建新的数据库...")
    # 1. 加载文档
    loader = TextLoader("./my_knowledge.txt", encoding="utf-8")
    documents = loader.load()

    # 2. 切分文档
    text_splitter = CharacterTextSplitter(chunk_size=200, chunk_overlap=50)
    docs = text_splitter.split_documents(documents)

    # 3. 文本向量化与存储
    embeddings_model = OpenAIEmbeddings()
    db = FAISS.from_documents(docs, embeddings_model)
    db.save_local("faiss_index")

# --- RAG 核心流程 ---
# 4. 创建检索器
retriever = db.as_retriever()

# 5. 初始化 LLM
llm = ChatOpenAI(model="gpt-3.5-turbo")

# 6. 创建 Prompt 模板
prompt = ChatPromptTemplate.from_template("""
请只根据以下上下文来回答问题:

<context>
{context}
</context>

问题: {input}
""")

# 7. 创建文档处理链 (将检索到的文档组合成上下文)
document_chain = create_stuff_documents_chain(llm, prompt)

# 8. 创建检索链 (将检索器和文档处理链结合)
retrieval_chain = create_retrieval_chain(retriever, document_chain)

# --- 开始提问 ---
print("\n知识库已就绪，请输入你的问题：")
question = "RAG 的核心思想是什么？"
response = retrieval_chain.invoke({"input": question})

print("="*30)
print(f"问题: {question}")
print(f"回答: {response['answer']}")

# 我们可以查看检索到的上下文内容
print("\n--- 检索到的上下文 ---")
for i, doc in enumerate(response["context"]):
    print(f"Context {i+1}:")
    print(doc.page_content)
print("="*30)

question = "RAG 和微调有什么不同？"
response = retrieval_chain.invoke({"input": question})
print(f"问题: {question}")
print(f"回答: {response['answer']}")

question = "今天天气怎么样?"
response = retrieval_chain.invoke({"input": question})
print(f"问题: {question}")
print(f"回答: {response['answer']}")
```

**运行结果分析：**
当你运行这段代码时，会看到：

1. 对于 "RAG 的核心思想是什么？" 这个问题，模型会准确地回答出 "检索和生成" 两个步骤，因为它在知识库中找到了直接相关的原文。
2. 对于 "RAG 和微调有什么不同？"，模型也会基于知识库内容进行归纳总结，给出精准答案。
3. 对于 "今天天气怎么样？" 这个问题，由于我们的知识库里没有相关信息，Prompt 模板又限制了模型 "只根据上下文来回答"，所以模型会很诚实地告诉你它不知道，**有效避免了幻觉**。

## 三、总结与展望

通过本文，我们了解了 RAG 技术的强大之处。它像一个外挂的 "知识大脑"，让大语言模型能够突破自身训练数据的限制，接入动态、私有的信息源，从而生成更准确、更可信、更有价值的内容。

我们不仅理解了其 "检索+生成" 的核心原理，还动手实践了一个简单的本地知识库问答机器人。这只是 RAG 应用的冰山一角，你可以将知识源替换为 PDF、网页、数据库等任何内容，赋能各种应用场景，例如：

- **智能企业客服**：基于产品手册和常见问题文档，提供 7x24 小时的精准客户支持。
- **个人知识助手**：整理你的所有笔记和资料，让你通过对话就能快速找到所需信息。
- **专业领域研究**：接入最新的行业报告和论文数据库，成为你的科研助理。

当然，一个生产级的 RAG 系统还需要考虑更多细节，比如文档块的最佳切分策略、更先进的检索算法、对检索结果进行重排（Re-ranking）等。

## 参考

- [LangChain 官方文档](https://python.langchain.com/docs/get_started/introduction)
- [OpenAI API 文档](https://platform.openai.com/docs/introduction)
- [FAISS: A library for efficient similarity search](https://github.com/facebookresearch/faiss)
