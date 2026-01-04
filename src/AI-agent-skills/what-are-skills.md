---
title: 什么是 Skills ?
createTime: 2026/01/04 16:35:38
permalink: /ai-agent-skills/what-are-skills/
copyright:
  creation: translate
  author:
    name: Anthropic
    url: https://anthropic.com/
  license: CC0
  source: https://agentskills.io/what-are-skills
---

Agent Skills 是一种轻量级、开放的格式，用于通过专业知识和工作流扩展AI智能体的能力。

Skills 的核心是一个包含 `SKILL.md` 文件的文件夹。
该文件包含元数据（至少包含 `name` 和 `description`）以及指导智能体执行特定任务的指令。
Skills 还可以捆绑脚本、模板和参考资料。

:::file-tree

- my-skill
  - SKILL.md     # 必需：说明 + 元数据
  - scripts/     # 可选：可执行代码
  - references/  # 可选：文档
  - assets/      # 可选：模板、资源

:::

## Skills 如何运作 {#how-skills-work}

技能采用 **渐进式披露** 来高效管理上下文：

1. **发现**：启动时，智能体仅加载每个可用技能的名称和描述，仅够判断何时可能相关。
2. **激活**：当任务与技能描述匹配时，智能体会将完整的SKILL.md指令读入上下文。
3. **执行**：智能体遵循指令，根据需要选择性加载引用文件或执行捆绑代码。

这种方法既保持了智能体的快速响应，又使其能按需获取更多上下文。

## SKILL.md 文件 {#skill-md-file}

每个 Skills 都始于一个包含 YAML frontmatter 和 Markdown 内容的 `SKILL.md` 文件：

```md title="SKILL.md"
---
name: pdf-processing
description: 从PDF文件中提取文本和表格，填写表单，合并文档。
---

# PDF处理

## 何时使用此 skill
当用户需要处理PDF文件时使用此 skill...

## 如何提取文本
1. 使用 pdfplumber 进行文本提取...

## 如何填写表格
...
```

在 `SKILL.md` 文件顶部必须包含以下 frontmatter：

- `name`：简短标识符
- `description`：使用此 Skill 的时机

Markdown 正文包含实际说明内容，对结构和内容没有特定限制。

这种简单格式具有若干关键优势：

- **自文档化**：Skill 作者或用户通过阅读 `SKILL.md` 即可理解其功能，便于 Skills 审计与改进。

- **可扩展性**：Skill 复杂度可涵盖从纯文本说明到可执行代码、资源文件和模板。

- **便携性**：Skills 仅由文件构成，便于编辑、版本管理和共享。

## 后续步骤 {#next-steps}

:::card-grid

<LinkCard title="规范说明" href="./specification.md" icon="flowbite:file-code-outline">

`Skill.md` 文件的完整格式规范。

</LinkCard>

<LinkCard title="集成 Skills" href="./integrate.md" icon="uil:setting">
为您的智能体或工具添加 Skills 支持。
</LinkCard>

:::

:::card-grid

<LinkCard title="Skills 示例" href="https://github.com/anthropics/skills" icon="mingcute:code-fill">
在 github 上浏览 Skills 示例。
</LinkCard>

<LinkCard title="阅读创作最佳实践" href="https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices" icon="mi:book">
编写高效 Skills。
</LinkCard>

<LinkCard title="参考库" href="https://github.com/agentskills/agentskills/tree/main/skills-ref" icon="icon-park-outline:tool">

验证 Skills 并生成 Prompt XML。

</LinkCard>

:::
