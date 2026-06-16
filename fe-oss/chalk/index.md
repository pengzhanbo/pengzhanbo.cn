---
url: /fe-oss/chalk/index.md
---
::: center
![chalk](https://github.com/chalk/chalk/raw/main/media/logo.svg)
:::

&#x20;

## 概述

终端字符串样式设置正确。

**Chalk** 的体积更大，但这有其原因。

它提供了更友好的 API、完善的类型文档、支持数百万种颜色，并涵盖了小型替代方案无法处理的边界情况。
**Chalk** 成熟可靠，是为持久运行而构建的。

`Chalk` 被超过 **12 万个** 项目依赖，在你不知道如何选择时，使用它是不会错的。

## 安装

::: npm-to

```sh
npm install chalk
```

:::

## 使用

```ts
import chalk from 'chalk'

const log = console.log

// Combine styled and normal strings
log(`${chalk.blue('Hello')} World${chalk.red('!')}`)

// Compose multiple styles using the chainable API
log(chalk.blue.bgRed.bold('Hello world!'))

// Pass in multiple arguments
log(chalk.blue('Hello', 'World!', 'Foo', 'bar', 'biz', 'baz'))

// Nest styles
log(chalk.red('Hello', `${chalk.underline.bgBlue('world')}!`))

// Nest styles of the same type even (color, underline, background)
log(chalk.green(
  `I am a green line ${
    chalk.blue.underline.bold('with a blue substring')
  } that becomes green again!`
))

// ES2015 template literal
log(`
CPU: ${chalk.red('90%')}
RAM: ${chalk.green('40%')}
DISK: ${chalk.yellow('70%')}
`)

// Use RGB colors in terminal emulators that support it.
log(chalk.rgb(123, 45, 67).underline('Underlined reddish color'))
log(chalk.hex('#DEADED').bold('Bold gray!'))
```

![chalk](https://github.com/chalk/chalk/raw/main/media/screenshot.png)

## 文本颜色

* `black`
* `red`
* `green`
* `yellow`
* `blue`
* `magenta`
* `cyan`
* `white`
* `blackBright` (alias: `gray`, `grey`)
* `redBright`
* `greenBright`
* `yellowBright`
* `blueBright`
* `magentaBright`
* `cyanBright`
* `whiteBright`

## 背景颜色

* `bgBlack`
* `bgRed`
* `bgGreen`
* `bgYellow`
* `bgBlue`
* `bgMagenta`
* `bgCyan`
* `bgWhite`
* `bgBlackBright` (alias: `bgGray`, `bgGrey`)
* `bgRedBright`
* `bgGreenBright`
* `bgYellowBright`
* `bgBlueBright`
* `bgMagentaBright`
* `bgCyanBright`
* `bgWhiteBright`

## 文本修饰

* `reset` - 重置当前样式。
* `bold` - 将文本设置为粗体。
* `dim` - 降低文本不透明度（变暗）。
* `italic` - 将文本设置为斜体。*（支持不广泛）*
* `underline` - 在文本下方添加水平线（下划线）。*（支持不广泛）*
* `overline` - 在文本上方添加水平线（上划线）。*（支持不广泛）*
* `inverse` - 反转背景色与前景色。
* `hidden` - 打印文本但使其不可见（隐藏）。
* `strikethrough` - 在文本中央添加水平线（删除线）。*（支持不广泛）*
* `visible` - 仅当Chalk颜色级别大于零时显示文本。适用于纯装饰性内容。

## 256色与彩色支持

Chalk在兼容的终端应用中支持256色及[真彩色](https://github.com/termstandard/colors)（1600万色）。

色彩会从1600万种RGB值向下采样为终端模拟器支持的ANSI色彩格式（或通过指定Chalk选项如`{level: n}`实现）。例如，当Chalk配置为运行在级别1（基础色彩支持）时，会将RGB值#FF0000（红色）下采样为31（ANSI红色转义码）。

使用示例：

* `chalk.hex('#DEADED').underline('你好，世界！')`
* `chalk.rgb(15, 100, 204).inverse('你好！')`

背景色版本需添加`bg`前缀并首字母大写（例如前景色用`hex`，背景色则用`bgHex`）。

* `chalk.bgHex('#DEADED').underline('你好，世界！')`
* `chalk.bgRgb(15, 100, 204).inverse('你好！')`

可用色彩模型包括：

* [`rgb`](https://en.wikipedia.org/wiki/RGB_color_model) - 示例：`chalk.rgb(255, 136, 0).bold('橙色！')`
* [`hex`](https://en.wikipedia.org/wiki/Web_colors#Hex_triplet) - 示例：`chalk.hex('#FF8800').bold('橙色！')`
* [`ansi256`](https://en.wikipedia.org/wiki/ANSI_escape_code#8-bit) - 示例：`chalk.bgAnsi256(194)('蜜露色，大致如此')`
