---
url: /article/or9sfaj3/index.md
---
## 前言

早上 10 点，当你准备正式开始今天的开发任务时，发现隔壁的前端同学悠闲的看着屏幕，AI 正在输出着代码，
他看了几眼觉得不错便接受了这份代码，于是你也开始让你的 AI 工具帮你写代码。

::: tip 以下示例来自于 [Trae](https://www.trae.ai/) 生成的结果
:::

你不假思索的告诉 AI ：

```txt
帮我用 Vue 写一个登录页面
```

于是，AI 框框一顿输出：

::: code-tabs

@tab AI Chat

```txt :collapsed-lines

我将创建一个登录页面，首先查看项目结构和依赖。
...

让我查看路由配置文件，以便添加登录页面路由。
...

创建登录页面组件，包含用户名和密码输入框以及登录按钮。
...

添加登录页面路由配置。
...

启动开发服务器以预览登录页面。
...

为用户打开登录页面预览。
...

预览

我已经完成了登录页面的创建，主要完成了以下工作：

1. 创建了登录页面组件 <mcfile name="Login.vue" path="/my-vue-app/src/views/Login.vue"></mcfile>，包含：
   - 用户名和密码输入框
   - 登录按钮
   - 美观的页面样式
   - 基础的登录逻辑

2. 在路由配置 <mcfile name="router.ts" path="/my-vue-app/src/router.ts"></mcfile> 中添加了登录页面路由

3. 启动了开发服务器，你可以通过访问 http://localhost:5174/login 来预览登录页面

登录页面已经具备基本的UI和交互功能，你可以进一步根据需求添加：
- 实际的登录接口调用
- 表单验证
- 记住密码功能
- 更多的样式定制

```

@tab Login.vue

```vue :collapsed-lines
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')

function handleLogin() {
  // 这里添加登录逻辑
  if (username.value && password.value) {
    // 模拟登录成功
    router.push('/')
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-box">
      <h2>登录</h2>
      <div class="form-item">
        <input
          v-model="username"
          type="text"
          placeholder="请输入用户名"
        >
      </div>
      <div class="form-item">
        <input
          v-model="password"
          type="password"
          placeholder="请输入密码"
        >
      </div>
      <button
        class="login-button"
        @click="handleLogin"
      >
        登录
      </button>
    </div>
  </div>
</template>

<style scoped>
/** ... */
</style>
```

:::

emmmm，是有个页面了，但是不对，你发现 用户名和密码没有进行校验，于是你告诉 AI：

```txt
对用户名和密码进行校验
```

于是，AI 又框框一顿输出:

::: code-tabs

@tab AI Chat

```txt :collapsed-lines
查看登录页面组件代码，以添加表单验证功能。
...

添加用户名和密码的验证逻辑，包括长度限制和错误提示。
...

我已经为登录表单添加了验证功能，主要包括以下内容：

1. 用户名验证：
   - 不能为空
   - 长度至少3个字符
   - 失去焦点时触发验证

2. 密码验证：
   - 不能为空
   - 长度至少6个字符
   - 失去焦点时触发验证

3. 错误提示：
   - 添加了错误信息显示样式
   - 错误信息显示在输入框下方
   - 使用红色文字突出显示

4. 登录验证：
   - 点击登录按钮时会验证所有字段
   - 只有当所有验证通过后才会执行登录操作

现在你可以在登录页面测试这些验证功能：
1. 尝试输入短于3个字符的用户名
2. 尝试输入短于6个字符的密码
3. 不输入任何内容直接点击登录按钮
```

@tab Login.vue

```vue :collapsed-lines
<script setup lang="ts">
import { ref } from 'vue'

const usernameError = ref('') // [!code ++]
const passwordError = ref('') // [!code ++]

function validateUsername() { // [!code ++:12]
  if (!username.value) {
    usernameError.value = '请输入用户名'
    return false
  }
  if (username.value.length < 3) {
    usernameError.value = '用户名至少3个字符'
    return false
  }
  usernameError.value = ''
  return true
}

function validatePassword() { // [!code ++:12]
  if (!password.value) {
    passwordError.value = '请输入密码'
    return false
  }
  if (password.value.length < 6) {
    passwordError.value = '密码至少6个字符'
    return false
  }
  passwordError.value = ''
  return true
}

function handleLogin() {
  const isUsernameValid = validateUsername() // [!code ++:4]
  const isPasswordValid = validatePassword()

  if (isUsernameValid && isPasswordValid) {
    // 模拟登录成功
    router.push('/')
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-box">
      <h2>登录</h2>
      <div class="form-item">
        <input
          v-model="username"
          type="text"
          placeholder="请输入用户名"
          @blur="validateUsername"
        >
        <div v-if="usernameError" class="error-message">
          {{ usernameError }}
        </div>
      </div>
      <div class="form-item">
        <input
          v-model="password"
          type="password"
          placeholder="请输入密码"
          @blur="validatePassword"
        >
        <div v-if="passwordError" class="error-message">
          {{ passwordError }}
        </div>
      </div>
      <button
        class="login-button"
        @click="handleLogin"
      >
        登录
      </button>
    </div>
  </div>
</template>

<style scoped>
.error-message { /* [!code ++:5] */
  color: #f56c6c;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}
</style>
```

:::

你心想，还是不对，需要对密码进行格式校验，限制必须包含数字，字母，特殊字符，于是你又告诉 AI：

```txt
对密码进行格式校验，限制必须包含数字，字母，特殊字符
```

于是，AI 又框框一顿输出:

::: code-tabs

@tab AI Chat

```txt :collapsed-lines
添加密码格式校验规则，要求包含数字、字母和特殊字符。
...

我已经添加了密码格式的校验规则，具体包括：

1. 密码格式要求：
   - 必须包含数字（0-9）
   - 必须包含字母（a-z或A-Z）
   - 必须包含特殊字符（!@#$%^&*(),.?":{}|<>中的任意字符）
   - 保留原有的长度至少6个字符的要求

2. 校验逻辑：
   - 使用正则表达式分别检测数字、字母和特殊字符
   - 如果缺少任意一种字符类型，显示错误提示
   - 所有条件满足后才能通过验证

3. 错误提示：
   - 当密码格式不符合要求时，会显示"密码必须包含数字、字母和特殊字符"
   - 错误提示会显示在密码输入框下方

现在你可以测试以下场景：
1. 只输入数字（不通过）
2. 只输入字母和数字（不通过）
3. 输入包含数字、字母和特殊字符的密码（通过）
```

@tab Login.vue

```vue :collapsed-lines
<script setup lang="ts">
// ...
function validatePassword() {
  if (!password.value) {
    passwordError.value = '请输入密码'
    return false
  }
  if (password.value.length < 6) {
    passwordError.value = '密码至少6个字符'
    return false
  }
  const hasNumber = /\d/.test(password.value)
  const hasLetter = /[a-zA-Z]/.test(password.value)
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password.value)

  if (!hasNumber || !hasLetter || !hasSpecial) {
    passwordError.value = '密码必须包含数字、字母和特殊字符'
    return false
  }

  passwordError.value = ''
  return true
}
// ...
</script>

<template>
  <div class="login-container">
    <!-- ... -->
  </div>
</template>

<style scoped>
/* ... */
</style>
```

:::

你觉得还行，但是样式不对，而且还没有对接后端，于是你又告诉 AI ...

你陷入与 AI 的一轮轮对话中...

你不停的重复审查着 AI 的代码...

随着对话内容越来越多，AI 开始忘了你最开始的需求...

你又重新告诉 AI ...

时间不知不觉就到中午了...

你发现，怎么比自己写还花时间 ！

## 不要让 AI 自由发挥

发现了吗，从第一句 `“帮我用 Vue 写一个登录页面”` 开始，AI 都是在自由发挥。

它并不清楚你具体想要的是什么，但是 AI 不会拒绝你，它按照它的 “经验”，猜你想要的可能是这样的。
但你觉得这不是你要的，于是你又一遍遍的片面的补充你的需求，AI 也只能一遍遍的片面的输出代码。

这就像是，你遇到了一个外行，一来就告诉你，“尽快给我做一个登录页” 。一听到这话，你的第一想法是什么？

开始干活？还是火气很大？

登录页？什么登录页？要干什么？没需求文档吗？没设计稿吗？有 API 接口吗？

你开始和这个外行不停的聊具体的需求内容，他甚至可能都不知道他自己想要的是什么，于是你可能直接拒绝。

但 AI 不会拒绝你，你要什么，它就给你什么，它开始自由发挥，即使是胡编乱造。

所以，我们要 **避免让 AI 自由发挥**。你的需求越明确，AI 就越知道它应该怎么做。

## 写个需求文档

作为一个开发人员，我们希望有一个明确的需求文档，不用和产品经理反反复复的交流，不用和其他人争论需求模糊的地方，
可以专注于写代码，对于 AI 而言同样也是如此。当你跟 AI 对话时，你不应该只把自己当做技术开发，还要代入产品经理
的角色，你希望产品经理给你一份什么样的需求文档，你也应该准备一份相同的需求文档给 AI。

::: info 那么如何写一份 AI 能理解的需求文档？
:::

对于这个问题，当然是先问下 AI 啦：

::: chat title="DeepSeek"
{.}
在前端开发中使用 AI 帮助生成相关的代码时，prompt 应该如何编写？

{deepseek}
在前端开发中使用 AI 生成代码时，**清晰、具体、结构化**的 prompt 是关键。以下是编写高效 prompt 的方法和示例：

***

**Prompt 设计原则**:

1. **明确技术栈**
   指定框架（React/Vue/Angular）、语言（TS/JS）、UI 库（Tailwind/MUI/AntD）。
   > ❌ 模糊：*"生成一个按钮"*
   > ✅ 明确：*"用 React + TypeScript + Tailwind CSS 创建一个带悬停动画的蓝色按钮"*

2. **描述功能细节**
   包含交互逻辑、状态处理、API 集成等关键行为。
   > ✅ 示例：
   > \_"创建一个计数器组件：
   >
   > * 显示当前数字，初始值为 0
   > * 有 '+' 和 '-' 按钮，点击后数字增减
   > * 当数字为 0 时，'-' 按钮禁用（灰色）"\_

3. **定义样式要求**
   指定布局、响应式规则、动效等。
   > ✅ 示例：
   > \_"使用 Flexbox 实现响应式导航栏：
   >
   > * 移动端：汉堡菜单（点击展开）
   > * 桌面端：水平排列
   > * 悬停时链接变蓝色，带 300ms 过渡效果"\_

4. **提供输入/输出示例（可选但推荐）**
   帮助 AI 理解数据结构。
   > ✅ 示例：
   > *"根据以下数据生成商品卡片组件：
   > 输入数据格式：{ id: number, name: string, price: number }
   > 输出：卡片包含商品名、价格，并添加 '加入购物车' 按钮"*

5. **约束条件**
   明确禁止或限制项（如性能要求、兼容性）。
   > ✅ 示例：
   > *"避免使用任何第三方库，仅用原生 JavaScript 实现轮播图，支持触摸滑动"*

***

**二、Prompt 模板**:

```markdown
### 技术栈
[框架/库]，[语言]，[样式方案]

### 功能需求
1. 核心功能描述...
2. 交互逻辑（如点击/输入事件）...
3. 状态管理要求...

### 样式要求
- 布局方式...
- 响应式规则...
- 动画/过渡效果...

### 其他约束
- 输入数据格式示例: { key: type }
- 浏览器兼容性...
- 禁止使用...
```

***

**三、实战示例**:

案例 1：API 数据表格

```markdown
### 技术栈
React + TypeScript + Ant Design

### 功能需求
1. 从 API 端点 `https://api.example.com/users` 获取用户数据
2. 显示表格列：ID、姓名、邮箱、注册日期
3. 添加搜索框（按姓名过滤）
4. 分页控制（每页 10 条）

### 样式要求
- 表格行在悬停时高亮显示浅蓝色
- 搜索框位于表格右上角

### 其他约束
- 使用 Axios 请求数据
- 处理加载状态（显示 Loading 动画）
- 处理错误状态（显示错误信息）
```

案例 2：动画交互组件

```markdown
### 技术栈
Vue 3 + CSS Modules

### 功能需求
1. 折叠面板组件（Accordion）
2. 点击标题展开/收起内容区域
3. 展开时内容下滑动画（300ms 缓动效果）

### 样式要求
- 标题背景色：#f5f5f5，悬停时变为 #e0e0e0
- 内容区域内边距：16px
- 移动端适配（宽度 < 768px 时字体缩小）

### 其他约束
- 使用 Vue 的 Transition 实现动画
- 禁止使用任何外部 UI 库
```

***

**四、优化技巧**:

1. **迭代优化**：
   首先生成基础代码，再通过追加 prompt 改进：
   > *"为上述表格添加排序功能（点击表头按字母排序）"*

2. **错误处理**：
   若 AI 输出不符合预期，明确指出问题：
   > ❌ *"代码有错"*
   > ✅ *"提交按钮未做表单验证，请添加邮箱格式校验（正则表达式）"*

3. **要求伪代码**：
   复杂逻辑可先要求设计思路：
   > *"请先提供伪代码：如何用 Redux 管理购物车状态？"*

4. **拆分任务**：
   大型功能拆解为子组件：
   > 先生成 *"Header 组件"* → 再生成 *"侧边栏组件"* → 最后集成

***

**五、避免的常见错误**:

1. **过于宽泛**
   ❌ *"做一个电商网站"*
   ✅ *"生成商品详情页的图片轮播组件"*

2. **忽略边界条件**
   ❌ *"实现登录表单"*
   ✅ *"登录表单需包含：邮箱验证、密码强度提示、错误处理（API 返回 401 时显示错误信息）"*

3. **技术栈冲突**
   ❌ *"用 jQuery 和 React 一起实现..."*
   ✅ 明确技术组合是否合理

***

**最终建议**：将 AI 视为高级协作者，用写「需求文档」的思维编写 prompt。清晰的 prompt 不仅能提升代码质量，还能减少返工迭代次数。
:::

这很清晰，我们按照这份建议，采用它的模板写一份需求文档：

```md
### 技术栈
Vue3 + @vueuse/core + element-plus

### 功能需求
- 登录页面
- 使用 邮箱/手机号码 + 密码 登录
- 校验 邮箱 / 手机号码 格式
- 校验 密码：
  - 长度大于等于 6 小于等于 16
  - 密码由 大小写字母、数字、特殊符号 组成
  - 必须包含 大写字母
  - 根据密码强度显示不同的提示信息
  - 密码强度：弱，中，强
- 在失去焦点时校验，并在错误时显示错误信息，当用户重新输入时，清空错误信息
- 点击登录按钮时，调用 `/api/login` 接口，成功后跳转到首页

### 样式要求
- 不需要进行移动端适配
- 采用左右布局，右侧为登录表单，左侧为背景大图，在中间垂直居中
- 表单内容区域内边距 16px
- 在合适的地方添加过渡动画
```

来看看 AI 输出了什么：

::: code-tabs

@tab AI Chat

```txt :collapsed-lines
让我们先查看项目结构和相关文件，以确定需要创建和修改的内容。

filePath: /src/main.ts
/src/router.ts
/package.json

需要安装 element-plus 和 @vueuse/core 依赖，让我们先查看它们的最新版本和安装方式。
...

首先安装所需的依赖包：element-plus、@vueuse/core 以及自动导入插件。
...

让我们查看 vite.config.ts 文件，以配置 Element Plus 和自动导入插件。
...

配置 vite.config.ts，添加 Element Plus 的自动导入插件。
...

让我们查看 App.vue 和 router.ts 文件，以添加登录页面路由和修改布局。
...

创建登录页面组件，实现登录表单和布局。
...

更新路由配置，添加登录页面路由并设置为默认路由。
...

更新 App.vue，优化布局和样式。
...

让我们打开预览页面查看登录界面效果。

预览

已完成登录页面的开发，主要实现了以下功能：

1. 页面布局
- 采用左右布局设计，左侧为带动画效果的 Logo 展示区
- 右侧为登录表单区域，整体采用卡片式设计
- 添加了页面切换和表单交互动画

2. 登录表单功能
- 支持邮箱/手机号码 + 密码登录
- 实现了完整的表单验证：
  - 邮箱/手机号码格式验证
  - 密码复杂度验证（长度、大小写字母、数字、特殊符号）
  - 密码强度实时显示（弱、中、强）
- 添加了输入框清空功能和密码显示/隐藏功能

3. 路由配置
- 添加了登录页面路由
- 实现了路由守卫，未登录状态自动跳转到登录页

4. 样式优化
- 统一的颜色主题
- 响应式输入框动画
- 页面过渡动画
- 左侧 Logo 悬浮动画

现在可以通过访问 `/login` 路径查看登录页面，表单验证功能已经完整实现，可以直接使用。后续可以根据实际需求接入真实的登录接口。
...

已修复登录页面的问题：

1. 修复了 `ElMessage` 未导入的错误
- 从 `element-plus` 中导入了 `ElMessage` 组件
- 由于使用了自动导入插件，其他 Element Plus 组件（如 `el-form`、`el-input` 等）会自动导入

登录页面现在可以正常工作，包含以下功能：

1. 表单验证
- 邮箱/手机号码格式验证
- 密码复杂度验证
- 实时密码强度显示

2. 用户体验
- 表单项动画效果
- 错误提示信息
- 登录成功提示

3. 页面布局
- 左右分栏设计
- Logo 动画效果
- 响应式交互

可以通过访问 `/login` 路径使用登录功能。
```

@tab Login.vue

```vue :collapsed-lines
<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  account: '',
  password: ''
})

const rules = {
  account: [
    { required: true, message: '请输入邮箱/手机号码', trigger: 'blur' },
    {
      validator: (_rule: any, value: string, callback: Function) => {
        const emailRegex = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/
        const phoneRegex = /^1[3-9]\d{9}$/
        if (!emailRegex.test(value) && !phoneRegex.test(value)) {
          callback(new Error('请输入正确的邮箱或手机号码'))
        }
        else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 16, message: '密码长度在 6 到 16 个字符之间', trigger: 'blur' },
    {
      validator: (_rule: any, value: string, callback: Function) => {
        const hasUpperCase = /[A-Z]/.test(value)
        const hasLowerCase = /[a-z]/.test(value)
        const hasNumber = /\d/.test(value)
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value)

        if (!hasUpperCase) {
          callback(new Error('密码必须包含大写字母'))
          return
        }

        let strength = 0
        if (hasUpperCase)
          strength++
        if (hasLowerCase)
          strength++
        if (hasNumber)
          strength++
        if (hasSpecial)
          strength++

        passwordStrength.value = strength
        callback()
      },
      trigger: 'blur'
    }
  ]
}

const formRef = ref()
const passwordStrength = ref(0)

const strengthText = computed(() => {
  switch (passwordStrength.value) {
    case 1:
      return { text: '弱', color: '#F56C6C' }
    case 2:
      return { text: '中', color: '#E6A23C' }
    case 3:
    case 4:
      return { text: '强', color: '#67C23A' }
    default:
      return { text: '', color: '' }
  }
})

const loading = ref(false)

async function handleLogin() {
  if (!formRef.value)
    return

  try {
    await formRef.value.validate()
    loading.value = true

    // 模拟登录请求
    await new Promise(resolve => setTimeout(resolve, 1000))

    // 实际项目中这里应该调用真实的登录接口
    // const res = await fetch('/api/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(form.value)
    // })
    // const data = await res.json()

    ElMessage.success('登录成功')
    router.push('/')
  }
  catch (error) {
    console.error('登录失败:', error)
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-content">
      <div class="login-banner">
        <img src="@/assets/vue.svg" alt="banner">
      </div>
      <div class="login-form">
        <h2>欢迎登录</h2>
        <el-form
          ref="formRef"
          :model="form"
          :rules="rules"
          label-position="top"
          @keyup.enter="handleLogin"
        >
          <el-form-item label="账号" prop="account">
            <el-input
              v-model="form.account"
              placeholder="请输入邮箱/手机号码"
              clearable
            />
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input
              v-model="form.password"
              type="password"
              placeholder="请输入密码"
              show-password
              clearable
            />
            <div v-if="strengthText.text" class="password-strength">
              密码强度：
              <span :style="{ color: strengthText.color }">
                {{ strengthText.text }}
              </span>
            </div>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              :loading="loading"
              class="login-button"
              @click="handleLogin"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f7fa;
}

.login-content {
  display: flex;
  width: 900px;
  height: 500px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.login-banner {
  flex: 1;
  background-color: #409eff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-banner img {
  width: 200px;
  height: 200px;
  animation: float 3s ease-in-out infinite;
}

.login-form {
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
}

.login-form h2 {
  text-align: center;
  margin-bottom: 24px;
  color: #303133;
}

.login-button {
  width: 100%;
  margin-top: 16px;
}

.password-strength {
  font-size: 12px;
  margin-top: 4px;
  color: #606266;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

/* 过渡动画 */
.el-form-item {
  transition: all 0.3s ease-in-out;
}

.el-input {
  transition: all 0.3s ease-in-out;
}

.el-input:focus-within {
  transform: translateY(-2px);
}
</style>
```

:::

预览：

![how to write a good ai prompt](/images/ai/how-prompt-1.png)

![how to write a good ai prompt](/images/ai/how-prompt-2.png)

看起来不错，基本实现了我们所描述的功能。

正如前面所说，越明确的需求文档，AI 生成的结果就越符合预期。
可以总结下来，编写需求文档，我们应该注意以下几点：

* **明确的技术栈**： 告诉 AI 它能使用的技术栈，划定好范围。
* **功能清单**： 列出你的需求，并描述清楚细节
* **布局和交互**：描述清楚页面布局，每个区域的内容以及排版，最好具体到像素级。
* **边界限制**：告诉 AI 只应该做什么，或者不要去处理哪些内容，或者不要做什么。

## 追加改进

事实上上面生成的代码依然存在不少问题：

* API 接口并没有实现接入
* 需要补充 忘记密码 的跳转链接
* 登录的图形验证码校验
* 密码的强中弱应该的输入过程中实时提示
* ...

为什么 API 接口的接入被注释了？因为 AI 并不知道 接口 应该如何传递参数，也不知道接口返回的数据格式是什么。

我们继续告诉 AI 需求改进的内容：

```txt
- 登录接口为 `/api/login`
  - 请求方法为 POST
  - 入参为 `username` 、 `password`、 `captcha`
  - 响应体格式为 `{ message: string, code: number }`，`code` 为 0 表示成功，为 1 表示失败，`message` 为失败原因
- 需要补充 忘记密码 的跳转链接，路径为 `/forget-password`
- 登录的图形验证码校验
  - 图形验证码的接口为 `/api/captcha`，请求方法为 GET，响应体格式为 `{ code: string, image: string }`，`code` 为图形验证码的 id，`image` 为图形验证码的 base64 编码
- 密码的强中弱应该的输入过程中实时提示
  - 使用三个格子的信号灯作为提示，一个格式时为弱，两个为中，三个为强，并显示为对应的颜色
  - 切换时使用动画
```

AI 会根据这些需求改进，然后再次生成代码：

::: code-tabs

@tab AI Chat

```txt :collapsed-lines
让我们查看登录页面组件，以添加图形验证码、密码强度实时提示和忘记密码链接功能。
...

更新登录页面组件，添加图形验证码、密码强度实时提示和忘记密码链接。
...

修复登录成功消息重复显示的问题。
...

添加验证码相关的表单验证规则，并在组件挂载时获取验证码。
...

让我们查看更新后的登录页面效果。

预览

已完成所有功能的开发和优化，主要更新包括：

1. 登录功能增强
- 添加图形验证码功能
  - 自动获取验证码
  - 点击图片可刷新验证码
  - 验证码校验规则
- 优化密码强度提示
  - 使用三格信号灯样式
  - 实时显示密码强度（弱、中、强）
  - 添加渐变动画效果
- 完善表单验证
  - 邮箱/手机号格式验证
  - 密码复杂度验证
  - 验证码必填验证

2. 新增忘记密码功能
- 创建忘记密码页面
- 邮箱验证码登录
- 倒计时重发验证码
- 表单验证和错误提示
- 优雅的过渡动画

3. 接口对接
- 登录接口（/api/login）
  - 用户名、密码、验证码校验
  - 登录状态保存
  - 成功/失败提示
- 验证码接口（/api/captcha）
  - 自动获取和刷新
  - base64 图片显示

4. 用户体验优化
- 添加路由跳转动画
- 优化表单交互动画
- 统一的错误提示
- 友好的加载状态
- 键盘回车提交支持

现在可以通过访问以下路径使用相关功能：
- 登录页面：`/login`
- 忘记密码：`/forget-password`

```

@tab Login.vue

```vue :collapsed-lines
<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  username: '',
  password: '',
  captcha: ''
})

// 获取验证码
const captchaCode = ref('')
const captchaImage = ref('')

async function refreshCaptcha() {
  try {
    const res = await fetch('/api/captcha')
    const data = await res.json()
    captchaCode.value = data.code
    captchaImage.value = data.image
  }
  catch (error) {
    console.error('获取验证码失败:', error)
  }
}

// 监听密码变化实时更新强度
function updatePasswordStrength(value: string) {
  const hasUpperCase = /[A-Z]/.test(value)
  const hasLowerCase = /[a-z]/.test(value)
  const hasNumber = /\d/.test(value)
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value)

  let strength = 0
  if (hasUpperCase)
    strength++
  if (hasLowerCase)
    strength++
  if (hasNumber)
    strength++
  if (hasSpecial)
    strength++

  passwordStrength.value = strength
}

// 组件挂载时获取验证码
onMounted(() => {
  refreshCaptcha()
})

const rules = {
  username: [
    { required: true, message: '请输入邮箱/手机号码', trigger: 'blur' },
    {
      validator: (_rule: any, value: string, callback: Function) => {
        const emailRegex = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/
        const phoneRegex = /^1[3-9]\d{9}$/
        if (!emailRegex.test(value) && !phoneRegex.test(value)) {
          callback(new Error('请输入正确的邮箱或手机号码'))
        }
        else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 16, message: '密码长度在 6 到 16 个字符之间', trigger: 'blur' },
    {
      validator: (_rule: any, value: string, callback: Function) => {
        const hasUpperCase = /[A-Z]/.test(value)
        const hasLowerCase = /[a-z]/.test(value)
        const hasNumber = /\d/.test(value)
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value)

        if (!hasUpperCase) {
          callback(new Error('密码必须包含大写字母'))
          return
        }

        let strength = 0
        if (hasUpperCase)
          strength++
        if (hasLowerCase)
          strength++
        if (hasNumber)
          strength++
        if (hasSpecial)
          strength++

        passwordStrength.value = strength
        callback()
      },
      trigger: 'blur'
    }
  ],
  captcha: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { min: 4, max: 4, message: '验证码长度为4位', trigger: 'blur' }
  ]
}

const formRef = ref()
const passwordStrength = ref(0)

const strengthText = computed(() => {
  switch (passwordStrength.value) {
    case 1:
      return { text: '弱', color: '#F56C6C' }
    case 2:
      return { text: '中', color: '#E6A23C' }
    case 3:
    case 4:
      return { text: '强', color: '#67C23A' }
    default:
      return { text: '', color: '' }
  }
})

const loading = ref(false)

async function handleLogin() {
  if (!formRef.value)
    return

  try {
    await formRef.value.validate()
    loading.value = true

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form.value,
        code: captchaCode.value
      })
    })
    const data = await res.json()

    if (data.code === 0) {
      ElMessage.success('登录成功')
      localStorage.setItem('isLoggedIn', 'true')
      router.push('/')
    }
    else {
      ElMessage.error(data.message)
      refreshCaptcha()
    }
    router.push('/')
  }
  catch (error) {
    console.error('登录失败:', error)
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-content">
      <div class="login-banner">
        <img src="@/assets/vue.svg" alt="banner">
      </div>
      <div class="login-form">
        <h2>欢迎登录</h2>
        <el-form
          ref="formRef"
          :model="form"
          :rules="rules"
          label-position="top"
          @keyup.enter="handleLogin"
        >
          <el-form-item label="账号" prop="username">
            <el-input
              v-model="form.username"
              placeholder="请输入邮箱/手机号码"
              clearable
              @keyup.enter="handleLogin"
            />
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input
              v-model="form.password"
              type="password"
              placeholder="请输入密码"
              show-password
              clearable
              @input="updatePasswordStrength"
              @keyup.enter="handleLogin"
            />
            <div class="password-strength-indicator">
              <div
                v-for="n in 3"
                :key="n"
                class="strength-bar"
                :class="{
                  active: passwordStrength >= n,
                  weak: passwordStrength === 1 && n === 1,
                  medium: passwordStrength === 2 && n <= 2,
                  strong: passwordStrength >= 3 && n <= 3,
                }"
              />
              <span v-if="strengthText.text" :style="{ color: strengthText.color }">
                {{ strengthText.text }}
              </span>
            </div>
          </el-form-item>

          <el-form-item label="验证码" prop="captcha">
            <div class="captcha-container">
              <el-input
                v-model="form.captcha"
                placeholder="请输入验证码"
                @keyup.enter="handleLogin"
              />
              <img
                v-if="captchaImage"
                :src="captchaImage"
                class="captcha-image"
                alt="验证码"
                @click="refreshCaptcha"
              >
            </div>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              :loading="loading"
              class="login-button"
              @click="handleLogin"
            >
              登录
            </el-button>
            <div class="form-footer">
              <router-link to="/forget-password" class="forget-password">
                忘记密码？
              </router-link>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f7fa;
}

.login-content {
  display: flex;
  width: 900px;
  height: 500px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.login-banner {
  flex: 1;
  background-color: #409eff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-banner img {
  width: 200px;
  height: 200px;
  animation: float 3s ease-in-out infinite;
}

.login-form {
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
}

.login-form h2 {
  text-align: center;
  margin-bottom: 24px;
  color: #303133;
}

.login-button {
  width: 100%;
  margin-top: 16px;
}

.password-strength-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
}

.strength-bar {
  flex: 1;
  width: 32px;
  height: 4px;
  background-color: #e4e7ed;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.strength-bar.active {
  background-color: #67C23A;
}

.strength-bar.weak {
  background-color: #F56C6C;
}

.strength-bar.medium {
  background-color: #E6A23C;
}

.strength-bar.strong {
  background-color: #67C23A;
}

.captcha-container {
  display: flex;
  gap: 12px;
}

.captcha-image {
  height: 32px;
  border-radius: 4px;
  cursor: pointer;
}

.form-footer {
  margin-top: 16px;
  text-align: right;
}

.forget-password {
  color: var(--el-color-primary);
  text-decoration: none;
  font-size: 14px;
}

.forget-password:hover {
  color: var(--el-color-primary-light-3);
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

/* 过渡动画 */
.el-form-item {
  transition: all 0.3s ease-in-out;
}

.el-input {
  transition: all 0.3s ease-in-out;
}

.el-input:focus-within {
  transform: translateY(-2px);
}
</style>
```

:::

效果：

![how-to-write-good-ai-prompt-3](/images/ai/how-prompt-3.png)

喔，又发现了新的问题，密码强度提示应该在密码大于 6 位数之后再提示。先记录下来，验证其他流程，
再统一追加改进。

还有别忘了 `Login.vue` 随着修改，体积已经相对较大，太多功能耦合在一起，需要告诉 AI 进行拆分。

```txt
- 密码强度提示应该在密码大于 6 位数之后再开始提示
- 对 Login.vue 进行合理的拆分
```

AI：

```txt
...
```

最终，我们得到了以下的产物：

::: code-tabs

@tab Login.vue

```vue :collapsed-lines
<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import CaptchaInput from '@/components/CaptchaInput.vue'
import PasswordStrength from '@/components/PasswordStrength.vue'
import { calculatePasswordStrength, loginRules } from '@/utils/validation'

const router = useRouter()

const form = ref({
  username: '',
  password: '',
  captcha: ''
})

const formRef = ref()
const loading = ref(false)
const passwordStrength = ref(0)
const captchaCode = ref('')

function updatePasswordStrength(value: string) {
  passwordStrength.value = calculatePasswordStrength(value)
}

function handleCaptchaRefresh(code: string) {
  captchaCode.value = code
}

async function handleLogin() {
  if (!formRef.value)
    return

  try {
    await formRef.value.validate()
    loading.value = true

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form.value,
        code: captchaCode.value
      })
    })
    const data = await res.json()

    if (data.code === 0) {
      ElMessage.success('登录成功')
      localStorage.setItem('isLoggedIn', 'true')
      router.push('/')
    }
    else {
      ElMessage.error(data.message)
    }
  }
  catch (error) {
    console.error('登录失败:', error)
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-content">
      <div class="login-banner">
        <img src="@/assets/vue.svg" alt="banner">
      </div>
      <div class="login-form">
        <h2>欢迎登录</h2>
        <el-form
          ref="formRef"
          :model="form"
          :rules="loginRules"
          label-position="top"
          @keyup.enter="handleLogin"
        >
          <el-form-item label="账号" prop="username">
            <el-input
              v-model="form.username"
              placeholder="请输入邮箱/手机号码"
              clearable
              @keyup.enter="handleLogin"
            />
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input
              v-model="form.password"
              type="password"
              placeholder="请输入密码"
              show-password
              clearable
              @input="updatePasswordStrength"
              @keyup.enter="handleLogin"
            />
            <PasswordStrength :strength="passwordStrength" :password="form.password" />
          </el-form-item>

          <el-form-item label="验证码" prop="captcha">
            <CaptchaInput
              v-model="form.captcha"
              @refresh="handleCaptchaRefresh"
              @enter="handleLogin"
            />
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              :loading="loading"
              class="login-button"
              @click="handleLogin"
            >
              登录
            </el-button>
            <div class="form-footer">
              <router-link to="/forget-password" class="forget-password">
                忘记密码？
              </router-link>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f7fa;
}

.login-content {
  display: flex;
  width: 900px;
  height: 500px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.login-banner {
  flex: 1;
  background-color: #409eff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-banner img {
  width: 200px;
  height: 200px;
  animation: float 3s ease-in-out infinite;
}

.login-form {
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
}

.login-form h2 {
  text-align: center;
  margin-bottom: 24px;
  color: #303133;
}

.login-button {
  width: 100%;
  margin-top: 16px;
}

.form-footer {
  margin-top: 16px;
  text-align: right;
}

.forget-password {
  color: var(--el-color-primary);
  text-decoration: none;
  font-size: 14px;
}

.forget-password:hover {
  color: var(--el-color-primary-light-3);
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

/* 过渡动画 */
.el-form-item {
  transition: all 0.3s ease-in-out;
}

.el-input {
  transition: all 0.3s ease-in-out;
}

.el-input:focus-within {
  transform: translateY(-2px);
}
</style>
```

@tab CaptchaInput.vue

```vue :collapsed-lines
<script setup lang="ts">
import { onMounted, ref } from 'vue'

defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'refresh': [code: string]
  'enter': []
}>()

const captchaCode = ref('')
const captchaImage = ref('')

async function refreshCaptcha() {
  try {
    const res = await fetch('/api/captcha')
    const data = await res.json()
    captchaCode.value = data.code
    captchaImage.value = data.image
    emit('refresh', data.code)
  }
  catch (error) {
    console.error('获取验证码失败:', error)
  }
}

onMounted(() => {
  refreshCaptcha()
})
</script>

<template>
  <div class="captcha-container">
    <el-input
      :model-value="modelValue"
      placeholder="请输入验证码"
      @update:model-value="(newValue: string) => emit('update:modelValue', newValue)"
      @keyup.enter="$emit('enter')"
    />
    <img
      v-if="captchaImage"
      :src="captchaImage"
      class="captcha-image"
      alt="验证码"
      @click="refreshCaptcha"
    >
  </div>
</template>

<style scoped>
.captcha-container {
  display: flex;
  gap: 12px;
}

.captcha-image {
  height: 32px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
```

@tab PasswordStrength.vue

```vue :collapsed-lines
<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  strength: number
  password: string
}>()

const showStrength = computed(() => props.password.length >= 6)

const strengthText = computed(() => {
  switch (props.strength) {
    case 1:
      return { text: '弱', color: '#F56C6C' }
    case 2:
      return { text: '中', color: '#E6A23C' }
    case 3:
    case 4:
      return { text: '强', color: '#67C23A' }
    default:
      return { text: '', color: '' }
  }
})
</script>

<template>
  <div v-if="showStrength" class="password-strength-indicator">
    <div
      v-for="n in 3"
      :key="n"
      class="strength-bar"
      :class="{
        active: strength >= n,
        weak: strength === 1 && n === 1,
        medium: strength === 2 && n <= 2,
        strong: strength >= 3 && n <= 3,
      }"
    />
    <span v-if="strengthText.text" :style="{ color: strengthText.color }">
      {{ strengthText.text }}
    </span>
  </div>
</template>

<style scoped>
.password-strength-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
}

.strength-bar {
  flex: 1;
  width: 32px;
  height: 4px;
  background-color: #e4e7ed;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.strength-bar.active {
  background-color: #67C23A;
}

.strength-bar.weak {
  background-color: #F56C6C;
}

.strength-bar.medium {
  background-color: #E6A23C;
}

.strength-bar.strong {
  background-color: #67C23A;
}
</style>
```

@tab utils/validation.ts

```ts :collapsed-lines
// 密码强度计算
export function calculatePasswordStrength(password: string): number {
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  let strength = 0
  if (hasUpperCase)
    strength++
  if (hasLowerCase)
    strength++
  if (hasNumber)
    strength++
  if (hasSpecial)
    strength++

  return strength
}

// 表单验证规则
export const loginRules = {
  username: [
    { required: true, message: '请输入邮箱/手机号码', trigger: 'blur' },
    {
      validator: (_rule: any, value: string, callback: Function) => {
        const emailRegex = /^[\w-]+([\.[\w-]+)*@[\w-]+([\.[\w-]+)+$/
        const phoneRegex = /^1[3-9]\d{9}$/
        if (!emailRegex.test(value) && !phoneRegex.test(value)) {
          callback(new Error('请输入正确的邮箱或手机号码'))
        }
        else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 16, message: '密码长度在 6 到 16 个字符之间', trigger: 'blur' },
    {
      validator: (_rule: any, value: string, callback: Function) => {
        const hasUpperCase = /[A-Z]/.test(value)
        if (!hasUpperCase) {
          callback(new Error('密码必须包含大写字母'))
          return
        }
        callback()
      },
      trigger: 'blur'
    }
  ],
  captcha: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { min: 4, max: 4, message: '验证码长度为4位', trigger: 'blur' }
  ]
}
```

:::

在这次的 登录页的开发过程中，我们向 AI 进行了三轮对话：

* 第一次提出了明确的需求文档；
* 对生成的代码进行审查，验证 UI 和交互，进行第一次的追加改进；
* 对改进结果继续审查，进行第二次追加改进。
* 对结果继续审查，基本满足预期的诉求。

我并不是在说只能进行三轮对话。每一轮对话都是有成本的，你需要对每次生成的内容进行审查和验证，这是时间成本，
AI 需求重新查看文件并进行追加修改，这也是时间成本。

因此，每次追加改进应先整理好新的需求文档，避免发现一个就告诉 AI 修改一个。

## 总结

* **明确的技术栈**： 告诉 AI 它能使用的技术栈，划定好范围。
* **功能清单**： 列出你的需求，并描述清楚细节。
* **布局和交互**：描述清楚页面布局，每个区域的内容以及排版，最好具体到像素级。
* **边界限制**：告诉 AI 只应该做什么，或者不要去处理哪些内容，或者不要做什么。
* **追加改进**：每次改进都应该是一个新的完整的需求文档。

不妨实施这个需求文档模板：

```md
### 技术栈
- ...

### 功能清单
- 功能 1
- 功能 2
- ...

### 布局和交互
- ...

### 边界限制
- ...

### 注意事项
- ...
```
