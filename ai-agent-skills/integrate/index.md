---
url: /ai-agent-skills/integrate/index.md
---
**将 Skills 集成到你的 智能体 中**。

如何为您的智能体或工具添加 Agent Skills 支持。

本指南说明如何为 AI智能体或开发工具添加 Skills 支持。

## 集成方法 {#integration-approaches}

集成技能的两种主要方法：

**基于文件系统的智能体** 在计算机环境（bash/unix）中运行，代表 Skills 最全面的选项。
当模型发出如 `cat /path/to/my-skill/SKILL.md` 的 Shell 命令时，Skills 即被激活。
捆绑资源通过 Shell 命令访问。

**基于工具的智能体** 无需专用计算机环境即可运行。
它们通过实现工具来允许模型触发 Skills 并访问捆绑资源。具体工具的实现由开发者决定。

## 概述 {#overview}

支持 Skills 的智能体需要：

* **发现** 配置目录中的 Skills
* **加载元数据**（名称和描述）于启动时
* **匹配** 用户任务至相关 Skills
* **激活** Skills：通过加载完整指令
* **执行** 脚本并按需访问资源

## Skills 发现 {#skill-discovery}

技能是包含 `SKILL.md` 文件的文件夹。您的智能体应扫描配置目录以发现有效 Skills 。

## 加载元数据 {#loading-metadata}

启动时仅解析每个 `SKILL.md` 文件的 frontmatter

### 解析 frontmatter {#parsing-frontmatter}

```
function parseMetadata(skillPath):
    content = readFile(skillPath + "/SKILL.md")
    frontmatter = extractYAMLFrontmatter(content)

    return {
        name: frontmatter.name,
        description: frontmatter.description,
        path: skillPath
    }
```

### 注入上下文 {#injecting-context}

在系统提示中包含 Skill 元数据，以便模型了解可用的 Skills 。

遵循您所在平台关于系统提示更新的指导。例如，对于 Claude 模型，推荐使用 XML 格式：

```xml
<available_skills>
  <skill>
    <name>pdf-processing</name>
    <description>Extracts text and tables from PDF files, fills forms, merges documents.</description>
    <location>/path/to/skills/pdf-processing/SKILL.md</location>
  </skill>
  <skill>
    <name>data-analysis</name>
    <description>Analyzes datasets, generates charts, and creates summary reports.</description>
    <location>/path/to/skills/data-analysis/SKILL.md</location>
  </skill>
</available_skills>
```

对于基于文件系统的智能体，需包含 location 字段并指定 `SKILL.md` 文件的绝对路径。
基于工具的智能体则可省略此位置信息。

保持元数据简洁。每个技能添加到上下文中的内容应控制在约50-100个 tokens

## 安全注意事项 {security-considerations}

脚本执行会引入安全风险。需考虑：

* **沙箱隔离**：在隔离环境中运行脚本

* **白名单机制**: 仅运行来自可信技能的脚本

* **确认**: 在执行可能危险的操作前询问用户

* **日志记录**: 记录所有脚本执行情况以供审计

## 参考实现 {#reference-implementation}

[skills-ref](https://github.com/agentskills/agentskills/tree/main/skills-ref) 库提供了用于处理 Skills 的 Python 实用工具和命令行界面。

例如：

**验证 Skills 目录**：

```sh
skills-ref validate <path>
```

**为智能体提示生成 `<available_skills>` XML**：

```sh
skills-ref to-prompt <path>...
```

以库源代码作为参考实现。
