---
title: 一文读懂 RAG (检索增强生成)
createTime: 2025/11/19 10:30:14
permalink: /article/rdx1yx85/
tags:
  - AI
  - python
---

如果你和大模型聊过天（比如 GPT-4），你可能特别佩服它那种信手拈来的知识和妙语连珠的能力。但说实话，你可能也坑过——它会正儿八经地瞎扯（我们叫它“幻觉”），或压根不知道昨天发生了啥新闻。

这就像是你有个极其博学的“神经病最强大脑”，但他的记忆最后更新时间定格在好几年前。

<!-- more -->

那么问题来了，有没有办法让这颗脑袋不仅能查内存，还能实时联网查外部资料？特别是能访问我们自己的私人数据？

有没有这么一把钥匙？有，它就是 **RAG**，全名 **Retrieval-Augmented Generation**，翻译过来就是“检索增强生成”。

## 一、说人话，RAG 到底是啥？为啥这么重要？

你可以把 RAG 理解成给大模型配了个 “贴身外挂+图书馆管理员”：

> 它让 LLM（也就是那些大模型）不再只能靠自己的静态知识输出内容，而是允许它去一个“指定的知识库”里开卷考试！

比如你问：

```txt
“AI 最近出啥新鲜事了？”
```

普通 LLM 会说：

```txt
“抱歉啦，我学到的知识截止到 2024 年秋天，实在不清楚你讲的是不是今天的新闻。”
```

人家是真的不知道。

**RAG 的出现，就是来解决两个痛点：**

1. **知识会过期**：LLM 学的知识一旦训练完就“封印”了。
2. **你私人的东西它看不到**：公司内部文档、个人笔记它无从知晓。

而 RAG 是这么做的：

```txt
“你问，等一下，我去查手册。”
```

这就意味着你的 AI 不再只是个背书的学霸，而是一个可以现场翻资料的“活字典+智能分析师”。

## 二、RAG 的核心原理：三步走，不复杂

用一句话总结 RAG 就是：

:::tip 先查资料，再生成答案。
:::

整个流程拆开一看其实非常清晰：

### 🧾 第一步：索引阶段（Indexing）——先准备好你的资料库

这部分是在回答用户提问前就已经搞好的。

想象你要做个《哈利波特》问答机器人：

1. **加载文档**：把整本书或者网页资源读进来。
2. **切割文档**：太大了不好处理，要分成一段一段的“chunks”。
3. **向量化处理**：每段都被转换为数学向量（这就是所谓的 Embedding）。
4. **存进数据库**：用这些向量建立一张“知识地图”，保存到类似 FAISS、Chroma 这样的向量数据库中。

这步做完，你的“图书室 + 搜索引擎”就已经建好了。

### 🔍 第二步：检索阶段（Retrieval）——用户问问题时去快速查找

假设你现在问 AI：

```txt
“火焰杯大赛里魔法部派谁来看哈利？”
```

系统这时候会：

1. 把你这句话向量化；
2. 在刚才打造的那个“知识地图”中搜索最匹配的几个段落；
3. 把这些相关段落抓出来作为“参考资料”。

于是你在这一阶段已经拿到了和问题最贴切的内容。

### 💬 第三步：增强与生成阶段（Augmented Generation）——带着参考资料一起来生成结果

最后一步，才是真正的“创作”：

1. 把你原始问题和刚查到的数据打包成一段提示（Prompt）；
2. 交给大模型（如 GPT、Llama 等）进行“打分并整合生成”。

比如：

```bash
请根据以下内容做出解释：
【背景信息】
- 在火焰杯期间，魔法部派遣了一支强制执行队维持赛场秩序，由巴格曼担任总指挥。
【用户问题】
火焰杯比赛中魔法部支持了哪些措施？
```

最终输出就会告诉你：魔法部安排了强制执行队、任命巴格曼为负责人……

这就像是做了场高质量的“开卷考试”。

## 三、动手实战一下？教你怎么搭个 RAG 应用玩一玩

我们用 [LangChain](https://python.langchain.com/docs/get_started/introduction) 搭一个小型的“网页情报助手”。

### 🔧 准备工作——先安装工具

```bash
pip install langchain langchain-openai langchain-community faiss-cpu beautifulsoup4
```

几个组件它们分别干嘛你知道就行：

- LangChain：串联流程
- WebBaseLoader：抓网页 ↓ 页面 → 文本
- recursiveCharacterTextSplitter：自动分句+切块
- OpenAIEmbeddings + FAISS：生成 + 保存向量库
- ChatOpenAI：驱动聊天的 guy

然后设好 API KEY，通常这样：

```bash
export OPENAI_API_KEY='xxx'
```

### 🧾 Step 1：加载网页并切块

```python
from langchain_community.document_loaders import WebBaseLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

loader = WebBaseLoader("https://your-target-page.com")
docs = loader.load()

text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=0)
splits = text_splitter.split_documents(docs)
print(f"已切出 {len(splits)} 个小块。")
```

### 📦 Step 2：向量化存储

```python
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS

embedding = OpenAIEmbeddings()
vectorstore = FAISS.from_documents(documents=splits, embedding=embedding)
print("✅ 向量库创建成功")
```

### ⚡️ Step 3：构建问答链

```python
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain

llm = ChatOpenAI(model="gpt-3.5-turbo")
retriever = vectorstore.as_retriever()

prompt = ChatPromptTemplate.from_template("""
Answer the question using only the provided context:
<context>
{context}
</context>
Question: {input}
""")

document_chain = create_stuff_documents_chain(llm, prompt)
retrieval_chain = create_retrieval_chain(retriever, document_chain)

# 最后调用一下看看
response = retrieval_chain.invoke({"input": "What did the article say about RAG?"})
print("\n---Answer---\n", response["answer"])
```

这样你就做出了一个小小的基于实时网页内容的 QA bot！

## 四、RAG 的优势和小烦恼

### ✅ 它的好处太明显了

- **能防幻觉你知道吧？**
  答案基于真的信息，而不是大模型随便编。
- **旧数据也能“续命”**
  你不需要反复训练模型，只要更新外部数据库就行。
- **私密内容用得上**
  公司机密？内部 Wiki？它就只从这里头查，其他人谁也看不见。
- **成本可控**
  不用继续烧 GPU 微调模型，维护个知识库快多了。

### ⚠️ 当然也有挑战

- **查得准才是关键**
  查错了或者查不到，直接 GG。
- **多文档整合麻烦**
  文档彼此矛盾怎么办？AI 怎么知道谁说的是真的？
- **大库检索太慢？**
  如果文档有百万数量级，光查也要几秒……太影响体验。

## 五、未来：更高阶玩法在哪？

其实今天我们聊的算是“标准版 RAG”，现在已经有不少进化版本，比如：

| 类型                    | 核心升级点                                |
| ----------------------- | ----------------------------------------- |
| Hybrid RAG              | 结合关键词检索 + 语义相似度（提升查准率） |
| Query Rewriting/Routing | 先改写问题，再分发给不同类型的知识集合    |
| MemoRAG                 | 加上了长期记忆，记住以前对话中的信息      |
| GraphRAG                | 把知识结构图化处理，适合逻辑推理          |

::: tip 提一句
现在很多头部企业在搭建的所谓的 AI Agent 系统背后，基本都藏着一套定制化的 RAG 流程。你以为它秒回那么专业？它其实只是查书太快了 😄
:::

## 六、结语

总而言之，**RAG 是目前把 LLM 变得实际可落地的重要桥梁之一**。

它不仅让机器“看得见真实世界的数据”，还允许它在生成响应的过程中灵活调用它们——不再瞎猜，而是有理有据、即插即用。

未来不管你是做客服系统、法律助手、写作助理，还是你想训练自己专属的知识库，RAG 都是一个绕不开的技术选择。

**推荐你动手试试，别光看文章，代码敲起来才能掌握真本领～**

## 参考资料

- [LangChain 官网文档](https://python.langchain.com/docs/get_started/introduction)
- [FAISS 官网介绍](https://github.com/facebookresearch/faiss)
- [OpenAI API 文档](https://platform.openai.com/docs/introduction)
- [HuggingFace RAG 介绍](https://huggingface.co/docs/transformers/model_doc/rag)
- [原始论文：Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401)
