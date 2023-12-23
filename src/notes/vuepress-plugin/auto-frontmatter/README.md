---
title: plugin-auto-frontmatter
author: 鹏展博
createTime: 2023/02/26 04:21:15
permalink: /note/vuepress-plugin/auto-frontmatter/
---

[![npm version](https://img.shields.io/npm/v/@vuepress-plume/plugin-auto-frontmatter?color=32A9C3&labelColor=1B3C4A&label=npm)](https://www.npmjs.com/package/@vuepress-plume/plugin-auto-frontmatter){style="margin-right:8px"}
[![npm beta download](https://img.shields.io/npm/dy/@vuepress-plume/vuepress-plugin-auto-frontmatter?color=32A9C3&labelColor=1B3C4A&label=beta%20downloads)](https://www.npmjs.com/package/@vuepress-plume/plugin-auto-frontmatter){style="margin-right:8px"}
[![npm download](https://img.shields.io/npm/dy/@vuepress-plume/plugin-auto-frontmatter?color=32A9C3&labelColor=1B3C4A&label=downloads)](https://www.npmjs.com/package/@vuepress-plume/plugin-auto-frontmatter){style="margin-right:8px"}
[![github source](https://img.shields.io/badge/source-a?logo=github&color=1B3C4A)](https://github.com/pengzhanbo/vuepress-theme-plume/tree/main/plugins/plugin-auto-frontmatter)



## 指南

通过自定义规则，为你的 vuepress 站点的 `markdown` 文件，自动生成 `frontmatter` 配置，并插入到文件内容头部。

## 安装

::: code-tabs
@tab  npm
``` sh
npm install @vuepress-plume/plugin-auto-frontmatter
```

@tab:active yarn
``` sh
yarn add @vuepress-plume/plugin-auto-frontmatter
```

@tab pnpm
``` sh
pnpm add @vuepress-plume/plugin-auto-frontmatter
```
:::

## 使用

```ts
// .vuepress/config.ts
import  { autoFrontmatterPlugin } from '@vuepress-plume/plugin-auto-frontmatter'
export default {
  //...
  plugins: [
    autoFrontmatterPlugin({
      formatter: {
        createTime(formatTime, file, matter) {
          if (formatTime) return formatTime
          return file.createTime
        }
      }
    })
  ]
  // ...
}
```

### Options

**Type:**  `{ include?: string | string[]; exclude?: string | string[]; formatter: Formatter }`

- `include`:  匹配字符串或数组，匹配需要自动生成 `frontmatter` 的 md文件。 默认预设为 `['**/*.md']`。
- `exclude`:  排除不需要的文件 默认预设为： `['!.vuepress/', '!node_modules/']`
- `formatter`: 配置`frontmatter`每个字段的生成规则。

```ts
interface MarkdownFile {
  filepath: string
  relativePath: string
  content: string
  createTime: Date
  stats: fs.Stats
}

interface FormatterFn<T = any, K = object> {
  (value: T, file: MarkdownFile, data: K): T
}

type FormatterObject<K = object, T = any> = Record<
  string,
  FormatterFn<T, K>
>

type FormatterArray = {
  include: string | string[]
  formatter: FormatterObject
}[]

type Formatter = FormatterObject | FormatterArray

/**
 * formatterObj 对象中的 key 即为 frontmatter 配置中的key
 * 其方法返回的值将作为 frontmatter[key] 的值
 * *.md
 * ---
 * createTime: 2022-03-26T11:46:50.000Z
 * ---
 */
const formatterObj: Formatter  = {
  createTime(formatTime, file, matter) {
    if (formatTime) return formatTime
    return file.createTime
  }
}

const formatterArr: Formatter = [
  {
    // 更精细化的匹配某个 md文件，支持glob 匹配字符串
    include: '**/{README,index}.md',
    // formatter 仅对 glob命中的文件有效
    formatter: {
      home(value, file, matter) {
        return value
      }
    },
    {
      // 通配，如果文件没有被其他精细glob命中，
      // 则使用 通配 formatter
      // 如果是数组，必须有且有一个 include 为 * 的 项
      include: '*',
      formatter: {
        title(title) {
          return title || '默认标题'
        }
      }
    }
  }
]

```


## 效果

```md
---
title: 默认标题
---
```
