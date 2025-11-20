---
title: 一文读懂 RAG (检索增强生成)
createTime: 2025/11/19 10:30:14
permalink: /article/rdx1yx85/
tags:
  - AI
  - python
---

如果你和大型语言模型（LLM）打过交道，比如 GPT-4，你大概率会惊叹于它那天马行空的创造力和对答如流的本领。但你可能也踩过它的“坑”：比如它会一本正经地胡说八道（我们称之为“幻觉”），或者对昨天刚发生的新闻一无所知。

这就像你拥有一个博学但记忆停留在几年前的“最强大脑”。那么，有没有办法让这个大脑实时更新知识，并且能查阅我们自己的私有资料呢？

答案是肯定的，而 RAG 就是那把关键的钥匙。

<!-- more -->

## RAG 是什么？为什么它如此重要？

**RAG**，全称 **Retrieval-Augmented Generation**，中文直译就是“检索增强生成”。用大白话讲，它是一种能让大型语言模型（LLM）在生成回答前，先去外部知识库里“翻书”的技术。

::: info 想象一下这个场景
你问一个普通的 LLM：“马斯克昨天又发布了什么新东西？”

它可能会抱歉地告诉你：“我的知识截止于 2023 年，无法提供最新的信息。”
:::

这就是 LLM 的两大固有缺陷：

- **知识陈旧**：LLM 的知识被“冻结”在训练数据的时间点。
- **内容不可控**：它无法访问你的私有数据，比如公司的内部文档、你的个人笔记等。

RAG 的出现，就是为了解决这些问题。它像一个外挂的知识库，让 LLM 在回答问题时，能够“开卷考试”。 LLM 不再仅仅依赖于自己脑海里固有的、可能已经过时的知识，而是先从一个指定的信息源（比如公司的产品文档、最新的网络文章、你的个人知识库）中检索相关信息，然后将这些信息和用户的问题一起，作为参考材料，生成一个更准确、更具时效性的回答。

:::tip RAG 的核心思想
一句话总结：==通过“检索”外部知识来“增强”模型的“生成”能力==。这不仅大大减少了模型“胡说八道”的概率，还让它能基于特定领域的私有数据提供服务，极大地拓宽了 LLM 的应用场景。
:::

## RAG 的工作原理：三步走战略

RAG 的流程听起来可能有点复杂，但其实核心逻辑非常清晰，可以概括为三个主要阶段：**检索（Retrieval）**、**增强（Augmentation）** 和 **生成（Generation）**。

让我们用一个简单的例子来拆解这个过程：假设我们要构建一个能回答“《三体》这本书讲了什么？”的智能问答机器人，而我们的知识库就是《三体》这本小说的电子版。

:::steps

- **第一步：索引 (Indexing) - 准备知识库**

  这一步是预处理阶段，目的是让机器能够理解并快速查询我们的知识库。

  1. **加载数据 (Loading)**：首先，程序会读取《三体》的文本文件。
  2. **分割文档 (Splitting)**：直接把整本书丢给模型太长了，效率也低。所以我们会把书的内容切分成一个个更小的段落或章节，我们称之为“文本块 (Chunks)”。
  3. **向量化 (Embedding)**：这是最关键的一步。计算机会使用一个“嵌入模型” (Embedding Model) 将每个文本块转换成一串数字，也就是“向量”。这些向量可以被认为是文本块在多维空间中的“坐标”，语义相近的文本块，它们的向量坐标也更接近。
  4. **存入向量数据库 (Storing)**：最后，我们将所有文本块及其对应的向量存储到一个专门的数据库里，这个数据库被称为“向量数据库” (Vector Database)，比如 Faiss、ChromaDB 等。它能进行超快速的向量相似度搜索。

  现在，我们的知识库已经准备就绪，随时可以被检索了！

- **第二步：检索 (Retrieval) - 查找相关信息**

  当用户提出问题时，比如“三体人为什么要入侵地球？”，检索阶段就开始了。

  1. **用户问题向量化**：系统会用同一个嵌入模型，将用户的问题也转换成一个向量。
  2. **相似度搜索**：然后，系统拿着这个“问题向量”去向量数据库里进行搜索，找出与它“距离”最近、最相似的几个文本块向量。这些文本块就是与问题最相关的内容，比如小说中描述三体文明生存危机和地球探测计划的段落。

- **第三步：增强与生成 (Augmented Generation) - 整合信息并回答**

  这是最后一步，我们将利用检索到的信息来生成最终答案。

  1. **构建提示 (Prompting)**：系统会将用户原始的问题和上一步检索到的相关文本块，一起打包成一个更丰富的提示 (Prompt)。这个提示可能长这样：

     ```bash
     "请基于以下背景信息回答问题：

     **背景信息**：
     - [《三体》中关于三体行星恶劣环境的描述段落...]
     - [《三体》中关于“红岸计划”向宇宙广播的段落...]

     **问题**：三体人为什么要入侵地球？"
     ```

  2. **生成答案**：最后，这个包含了丰富上下文的提示被发送给 LLM。LLM 会像一个开卷考试的学生，参考这些“背景信息”，从而生成一个精准且有据可查的回答，比如：“三体人入侵地球是因为他们的母星在一个不稳定的三体系统中，面临着毁灭的威胁，而地球是一个理想的新家园。”

:::

通过这个流程，RAG 成功地让 LLM 利用外部知识，给出了一个高质量的答案。

## 动手实践：用 LangChain 搭建你的第一个 RAG 应用

理论讲完了，是时候上代码了！我们将使用当下最火的 LLM 应用开发框架 `LangChain` 来快速实现一个简单的 RAG 应用。

### 准备工作

首先，你需要安装几个必要的 Python 库。

```bash title="安装依赖"
pip install langchain langchain-openai langchain-community faiss-cpu beautifulsoup4
```

- `langchain`: 核心框架。
- `langchain-openai`: 用于调用 OpenAI 模型的集成。
- `langchain-community`: 社区提供的各种集成工具。
- `faiss-cpu`: Facebook 开源的向量检索引擎，用于本地创建向量数据库。
- `beautifulsoup4`: 用于解析网页内容。

同时，你需要一个 OpenAI 的 API 密钥，并设置为环境变量 `OPENAI_API_KEY`。

### 第一步：加载和分割文档

我们以一篇介绍 LangChain 的网络文章为例，作为我们的外部知识库。

```python title="rag_demo.py"
import os
from langchain_community.document_loaders import WebBaseLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

# 1. 加载文档
# 我们用 WebBaseLoader 从一个网页加载数据
loader = WebBaseLoader("https://lilianweng.github.io/posts/2023-06-23-agent/")
docs = loader.load()

# 2. 分割文档
# 将文档分割成更小的块，便于后续处理
text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=0)
splits = text_splitter.split_documents(docs)

print(f"文档已被分割成 {len(splits)} 个块。")
```

这段代码会抓取指定网页的内容，并使用 `RecursiveCharacterTextSplitter` 将其分割成最大 500 个字符的文本块。

### 第二步：创建向量存储

接下来，我们需要将这些文本块进行向量化，并存入向量数据库中。这里我们使用 OpenAI 的嵌入模型和 FAISS 向量存储。

```python title="(续) rag_demo.py"
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS

# 3. 创建向量存储
# 使用 OpenAI 的嵌入模型将文本块转换为向量，并用 FAISS 存储
vectorstore = FAISS.from_documents(documents=splits, embedding=OpenAIEmbeddings())

print("向量存储创建成功！")
```

`FAISS.from_documents` 会自动为我们处理好文本向量化和存储的整个过程。

### 第三步：检索与生成

万事俱备，只欠东风。现在我们可以创建一个完整的 RAG 链 (Chain)，它会把检索和生成两个步骤串联起来。

```python title="(续) rag_demo.py"
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from langchain.chains import create_retrieval_chain

# 4. 创建 RAG 链
llm = ChatOpenAI(model="gpt-3.5-turbo")

# 创建一个检索器，它能从向量存储中检索文档
retriever = vectorstore.as_retriever()

# 定义一个提示模板，告诉模型如何利用上下文回答问题
prompt = ChatPromptTemplate.from_template("""Answer the following question based only on the provided context:

<context>
{context}
</context>

Question: {input}""")

# 创建一个处理文档的链，它会把检索到的文档内容塞进提示中
document_chain = create_stuff_documents_chain(llm, prompt)

# 创建检索链，它会将用户问题先传给检索器，再将问题和检索结果一起传给 document_chain
retrieval_chain = create_retrieval_chain(retriever, document_chain)

# 5. 调用 RAG 链
question = "What are the components of an LLM-powered autonomous agent system?"
response = retrieval_chain.invoke({"input": question})

print("\n--- 回答 ---")
print(response["answer"])
```

运行这段代码，你会看到 RAG 应用是如何根据我们提供的网页内容，精准地回答关于“LLM 驱动的自主代理系统有哪些组件”这个问题的。它不会依赖 GPT 模型自身可能不完整或过时的知识，而是严格基于你提供的那篇文章！

## RAG 的优势和挑战

**优势**：

- **提升准确性和时效性**：==答案有据可查==，直接来源于指定数据源，大大减少了幻觉。
- **降低成本**：相比于微调 (Fine-tuning) 整个大模型，维护一个外部知识库的成本要低得多，更新也更灵活。
- **增强透明度和可信度**：RAG 可以引用其答案的来源，让用户可以验证信息的准确性，这对于企业级应用至关重要。
- **实现数据私有化**：可以轻松连接到企业内部的私有数据库，构建专属的智能问答系统。

**挑战**：

- **检索质量是关键**：如果第一步“检索”就没找到相关或准确的信息，那么生成的答案质量也无从谈起。这需要高质量的文档分割和嵌入策略。
- **“大海捞针”问题**：当知识库非常庞大时，如何快速且准确地捞出最相关的信息，对检索算法提出了更高的要求。
- **整合的复杂性**：如何将检索到的多个文档片段有效地整合进提示中，并让 LLM 很好地理解和利用，也是一个需要不断优化的环节。

## 总结与未来展望

RAG 已经成为构建强大、可靠的生成式 AI 应用的事实标准。它巧妙地将信息检索和自然语言生成结合起来，==既利用了 LLM 强大的推理和语言能力，又通过外部知识库弥补了其知识局限==，堪称 LLM 的“黄金搭档”。

从简单的文档问答，到复杂的客户服务机器人、企业知识管理平台，RAG 正在赋能越来越多的应用场景。未来，我们期待看到更先进的 RAG 架构，例如能处理更复杂查询的混合检索、能自我优化的自适应 RAG 等。

希望这篇文章能帮你敲开 RAG 的大门。赶紧动手试试，为你自己的项目也装上一个强大的“外挂知识库”吧！

## 参考

- [LangChain 官方文档](https://python.langchain.com/docs/get_started/introduction)
- [OpenAI API 文档](https://platform.openai.com/docs/introduction)
- [FAISS: A library for efficient similarity search](https://github.com/facebookresearch/faiss)
- [Hugging Face 关于 RAG 的介绍](https://huggingface.co/docs/transformers/model_doc/rag)
- [原始论文：Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401)
