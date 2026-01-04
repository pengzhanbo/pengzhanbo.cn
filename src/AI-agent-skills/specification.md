---
title: 规范说明
createTime: 2026/01/04 16:36:15
permalink: /ai-agent-skills/specification/
outline: [2, 4]
copyright:
  creation: translate
  author:
    name: Anthropic
    url: https://anthropic.com/
  license: CC0
  source: https://agentskills.io/specification
---

Agent Skills 的完整格式规范。

本文档定义了 Agent Skills 的格式。

## 目录结构 {#directory-structure}

Skill 是一个至少包含 `SKILL.md` 文件的目录：

:::file-tree

- skill-name
  - SKILL.md  # 必须

:::

::: tip 您可以选择性地包含 [额外目录](#optional-directories)，例如 `scripts/`、`references/` 和 `assets/`，以支持您的 Skill 。
:::

## SKILL.md 格式 {#skill-md-format}

`SKILL.md` 文件必须包含 YAML frontmatter，后跟 Markdown 内容。

### frontmatter (必须) {#frontmatter-required}

```md title="SKILL.md"
---
name: skill-name
description: 此 Skill 的功能描述及适用场景说明。
---
```

可选字段包括：

```md title="SKILL.md"
---
name: pdf-processing
description: 从PDF文件中提取文本和表格，填写表单，合并文档。
license: Apache-2.0
metadata:
  author: example-org
  version: "1.0"
---
```

|      字段       | 必填  | 描述                                                                 |
| :-------------: | :---: | :------------------------------------------------------------------- |
|     `name`      |  是   | 最多64个字符。仅允许小写字母、数字和连字符。不能以连字符开头或结尾。 |
|  `description`  |  是   | 最多1024个字符。非空。描述该 Skill 的功能及适用场景。                |
|    `license`    |  否   | 许可证名称或引用的捆绑许可证文件。                                   |
| `compatibility` |  否   | 最多500个字符。说明环境要求（目标产品、系统包、网络访问权限等）。    |
|   `metadata`    |  否   | 用于附加元数据的任意键值映射。                                       |
| `allowed-tools` |  否   | Skill 可使用的预批准工具列表（空格分隔）。（实验性功能）             |

#### `name` 字段 {#name-field}

必需的 `name` 字段：

- 长度必须为 **1-64** 个字符
- 只能包含 Unicode 小写字母数字字符和连字符（`a-z` 和 `-`）
- 不能以 `-` 开头或结尾
- 不能包含连续连字符（`--`）
- 必须与父目录名称匹配

有效示例：

```yaml
name: pdf-processing
```

```yaml
name: data-analysis
```

```yaml
name: code-review
```

无效示例：

```yaml
name: PDF-Processing # 不允许使用大写字母 [!code error]
```

```yaml
name: -pdf # 不能以连字符开头 [!code error]
```

```yaml
name: pdf--processing # 不允许使用连续连字符 [!code error]
```

#### `description` 字段 {#description-field}

必需的 `description` 字段：

- 长度须为 **1-1024** 个字符
- 应同时描述 Skill 的功能及适用场景
- 应包含帮助智能体识别相关任务的关键词

优秀示例：

```yaml
description: 从PDF文件中提取文本和表格，填写PDF表单，并合并多个PDF文件。适用于处理PDF文档或当用户提及PDF、表单或文档提取时。
```

```yaml
description: Extracts text and tables from PDF files, fills PDF forms, and merges multiple PDFs. Use when working with PDF documents or when the user mentions PDFs, forms, or document extraction.
```

反面示例

```yaml
description: Helps with PDFs.
```

#### `license` 字段 {#license-field}

可选的 `license` 字段：

- 指定应用于 Skill 的许可证
- 建议保持简短（可以是许可证名称或捆绑许可证文件的名称）

示例:

```yaml
license: Proprietary. LICENSE.txt has complete terms
```

#### `compatibility` 字段 {#compatibility-field}

可选的 `compatibility` 字段：

- 若提供，长度须为 **1-500** 个字符
- 仅当 Skill 有特定环境要求时才应包含此字段
- 可注明目标产品、所需系统包、网络访问需求等

示例:

```yaml
compatibility: Designed for Claude Code (or similar products)
```

```yaml
compatibility: Requires git, docker, jq, and access to the internet
```

::: info 大多数 Skills 无需 `compatibility` 字段
:::

#### `metadata` 字段 {#metadata-field}

可选的 `metadata` 字段：

- 从字符串键到字符串值的映射
- 客户端可用此字段存储 Agent Skills 规范未定义的其他属性
- 建议使用相对唯一的键名以避免意外冲突

示例:

```yaml
metadata:
  author: example-org
  version: '1.0'
```

#### `allowed-tools` 字段 {#allowed-tools-field}

可选的 `allowed-tools` 字段:

- 以空格分隔的预批准运行工具列表
- 实验性功能。不同 Agent 实现对该字段的支持可能有所差异

示例:

```yaml
allowed-tools: Bash(git:*) Bash(jq:*) Read
```

### 正文内容 {#body-content}

frontmatter 之后的 Markdown 正文包含 Skill 说明。格式无限制。
撰写任何有助于智能体有效执行任务的内容即可。

推荐章节：

- 分步操作指南
- 输入与输出示例
- 常见边界情况

请注意，一旦决定激活某个 Skill，Agent 将完整加载此文件。
建议将较长的 `SKILL.md` 内容拆分为引用文件。

## 可选目录 {#optional-directories}

### scripts/

包含 Agents 可执行的代码。脚本应满足：

- 保持内容自包含或明确记录依赖关系
- 提供有用的错误提示信息
- 优雅处理边界情况

支持的语言取决于 Agent 的具体实现。常见选项包括 Python、Bash 和 JavaScript。

### references/

包含 Agent 在需要时可以阅读的额外文档：

- **REFERENCE.md** - 详细技术参考
- **FORMS.md** - 表单模板或结构化数据格式
- 领域特定文件（**finance.md**、**legal.md** 等）

保持单个[参考文件](#file-references) 内容聚焦。Agent 按需加载这些文件，较小的文件意味着更少占用上下文。

### assets/

包含静态资源：

- 模板（文档模板、配置模板）
- 图像（图表、示例）
- 数据文件（查找表、模式）

## 渐进式披露 {#progressive-disclosure}

Skills 应结构化以便高效利用上下文：

- **元数据 Metadata**（约100个tokens）：`name` 和 `description` 字段在启动时为所有技能加载
- **使用说明 Instructions**（建议少于5000 tokens）：完整的 `SKILL.md` 内容在技能激活时加载
- **资源**（按需）：文件（例如位于 `scripts/`、`references/` 或 `assets/` 中的文件）仅在需要时加载

主 `SKILL.md` 文件应保持在500行以内。将详细参考资料移至单独文件。

## 文件引用 {#file-references}

在 Skills 中引用其他文件时，请使用相对于技能根目录的相对路径：

```md title="SKILL.md"
See [the reference guide](references/REFERENCE.md) for details.

Run the extraction script:
scripts/extract.py
```

文件引用应保持在 `SKILL.md` 下一级深度。避免深层嵌套的引用链。

## 验证 {#validation}

使用 [skills-ref](https://github.com/agentskills/agentskills/tree/main/skills-ref) 验证您的 Skills：

```sh
skills-ref validate ./my-skill
```

此操作会检查您的 `SKILL.md` frontmatter 是否有效并遵循所有命名约定。
