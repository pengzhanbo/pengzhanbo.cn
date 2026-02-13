---
url: /fe-oss/picocolors/index.md
---
&#x20;

## 概述

`picocolors` 号称是 ==最小最快的 ANSI 终端色彩输出格式化库== 。

它可以帮助我们在控制台中进行日志格式化输出时，对文本进行彩色高亮。

## 安装

::: npm-to

```sh
npm install picocolors
```

:::

## 使用

在项目中导入 `picocolors`

```ts
import pc from 'picocolors'
```

然后使用它:

```ts
console.log(`I see a ${pc.red('red door')} and I want it painted ${pc.black('black')}`)
```

## 文本颜色

`black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`, `gray`

::: flex center

```ts
console.log(pc.black('black'))
console.log(pc.red('red'))
console.log(pc.green('green'))
console.log(pc.yellow('yellow'))
console.log(pc.blue('blue'))
console.log(pc.magenta('magenta'))
console.log(pc.cyan('cyan'))
console.log(pc.white('white'))
console.log(pc.gray('gray'))
```

![picocolors text colors](./assets/picocolors-1.png){.flex-img style="width:90px"}
:::

`blackBright`, `redBright`, `greenBright`, `yellowBright`, `blueBright`, `magentaBright`, `cyanBright`, `whiteBright`

::: flex center

```ts
console.log(pc.blackBright('black'))
console.log(pc.redBright('red'))
console.log(pc.greenBright('green'))
console.log(pc.yellowBright('yellow'))
console.log(pc.blueBright('blue'))
console.log(pc.magentaBright('magenta'))
console.log(pc.cyanBright('cyan'))
console.log(pc.whiteBright('white'))
```

![picocolors text colors](./assets/picocolors-2.png){.flex-img style="width:90px"}
:::

## 背景颜色

`bgBlack`, `bgRed`, `bgGreen`, `bgYellow`, `bgBlue`, `bgMagenta`, `bgCyan`, `bgWhite`

::: flex center

```ts
console.log(pc.bgBlack('black'))
console.log(pc.bgRed('red'))
console.log(pc.bgGreen('green'))
console.log(pc.bgYellow('yellow'))
console.log(pc.bgBlue('blue'))
console.log(pc.bgMagenta('magenta'))
console.log(pc.bgCyan('cyan'))
console.log(pc.bgWhite('white'))
```

![picocolors bg colors](./assets/picocolors-3.png){.flex-img style="width:90px"}
:::

`bgBlackBright`, `bgRedBright`, `bgGreenBright`, `bgYellowBright`, `bgBlueBright`, `bgMagentaBright`, `bgCyanBright`, `bgWhiteBright`

::: flex center

```ts
console.log(pc.bgBlackBright('black'))
console.log(pc.bgRedBright('red'))
console.log(pc.bgGreenBright('green'))
console.log(pc.bgYellowBright('yellow'))
console.log(pc.bgBlueBright('blue'))
console.log(pc.bgMagentaBright('magenta'))
console.log(pc.bgCyanBright('cyan'))
console.log(pc.bgWhiteBright('white'))
```

![picocolors bg colors](./assets/picocolors-4.png){.flex-img style="width:90px"}
:::

## 文本修饰

`dim`, `bold`, `hidden`, `italic`, `underline`, `strikethrough`, `reset`, `inverse`

::: flex center

```ts
console.log(pc.dim('dim'))
console.log(pc.bold('bold'))
console.log(pc.hidden('hidden'))
console.log(pc.italic('italic'))
console.log(pc.underline('underline'))
console.log(pc.strikethrough('strikethrough'))
console.log(pc.reset('reset'))
console.log(pc.inverse('inverse'))
```

![picocolors bg colors](./assets/picocolors-5.png){.flex-img style="width:110px"}
:::

## 组合使用

::: flex center

```ts
console.log(pc.red(pc.bold('red')))
console.log(pc.bgRed(pc.bold('red')))
console.log(pc.cyan(pc.underline('cyan')))
```

![picocolors bg colors](./assets/picocolors-6.png){.flex-img style="width:110px"}
:::
