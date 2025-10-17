---
url: /article/y2lpax2i/index.md
---
在现代 Web 应用中，身份验证是保障应用安全的核心环节。JSON Web Token（JWT）作为一种轻量级、自包含的身份验证方案，因其简洁性和易用性在前端开发中广受欢迎。本文将从前端开发者的角度，深入探讨 JWT 的工作原理、实现方式以及最佳实践。

## 什么是 JWT？

JWT（JSON Web Token）是一个开放标准（RFC 7519），用于在各方之间安全地传输信息作为 JSON 对象。这些信息可以被验证和信任，因为它们是数字签名的。

### JWT 的结构

一个典型的 JWT 由三部分组成，用点号分隔：

```
Header.Payload.Signature
```

让我们通过代码示例详细了解每个部分：

```javascript
// 一个实际的 JWT 示例
const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
```

::: code-tabs
@tab Header

```json
// Header 解码后
{
  "alg": "HS256", // 签名算法
  "typ": "JWT" // token 类型
}
```

@tab Payload

```json
// Payload 解码后
{
  "sub": "1234567890", // 用户标识
  "name": "John Doe", // 用户信息
  "iat": 1516239022 // 签发时间
}
```

@tab Signature

```javascript
// Signature 生成方式
HMACSHA256(
  `${base64UrlEncode(header)}.${base64UrlEncode(payload)}`,
  secret
)
```

:::

## JWT 在前端的工作流程

JWT 身份验证的典型流程如下：

:::steps

1. **用户登录** - 用户提交凭据到认证服务器
2. **服务器验证** - 服务器验证凭据并生成 JWT
3. **返回 Token** - 服务器将 JWT 返回给客户端
4. **存储 Token** - 前端安全地存储 JWT
5. **发送请求** - 前端在后续请求中包含 JWT
6. **服务器验证** - 服务器验证 JWT 并返回数据

:::

### 前端实现示例

让我们看看如何在前端应用中实现 JWT 认证：

```javascript title="authService.js"
class AuthService {
  constructor() {
    this.token = localStorage.getItem('jwt_token')
  }

  // 登录方法
  async login(credentials) {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        throw new Error('登录失败')
      }

      const { token, user } = await response.json()
      this.setToken(token)
      return user
    }
    catch (error) {
      console.error('登录错误:', error)
      throw error
    }
  }

  // 设置 token
  setToken(token) {
    this.token = token
    localStorage.setItem('jwt_token', token)
  }

  // 获取 token
  getToken() {
    return this.token
  }

  // 验证 token 是否有效
  isTokenValid() {
    if (!this.token)
      return false

    try {
      const payload = JSON.parse(atob(this.token.split('.')[1]))
      const currentTime = Date.now() / 1000
      return payload.exp > currentTime
    }
    catch {
      return false
    }
  }

  // 登出
  logout() {
    this.token = null
    localStorage.removeItem('jwt_token')
  }
}
```

## JWT 存储策略

选择合适的 JWT 存储方式对应用安全至关重要：

### 1. LocalStorage（简单但不安全）

```javascript
// 存储
localStorage.setItem('jwt_token', 'your_token')

// 读取
const token = localStorage.getItem('jwt_token')
```

:::warning 安全风险
LocalStorage 容易受到 XSS 攻击，攻击者可以通过注入的脚本直接读取 token。
:::

### 2. HttpOnly Cookies（推荐）

```javascript
// 登录请求
async function login(credentials) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    credentials: 'include', // 重要：包含 cookies
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
  return response.json()
}

// 自动发送请求（cookie 会自动包含）
async function fetchUserData() {
  const response = await fetch('/api/user', {
    credentials: 'include',
  })
  return response.json()
}
```

### 3. 内存存储（高安全要求）

```javascript
class SecureAuthService {
  constructor() {
    this.token = null
  }

  // 只在内存中保存 token
  setToken(token) {
    this.token = token
  }

  // 页面刷新时重新登录
  async ensureAuthenticated() {
    if (!this.token) {
      // 重定向到登录页或静默刷新
      await this.silentRefresh()
    }
  }
}
```

## 自动 token 刷新机制

为了避免用户频繁重新登录，实现自动 token 刷新：

```javascript title="tokenRefresh.js"
class TokenRefreshService {
  constructor(authService) {
    this.authService = authService
    this.refreshTimeout = null
  }

  // 安排 token 刷新
  scheduleRefresh() {
    if (!this.authService.isTokenValid()) {
      return
    }

    const payload = this.authService.getTokenPayload()
    const expiresIn = payload.exp * 1000 - Date.now()
    const refreshTime = expiresIn - (5 * 60 * 1000) // 提前 5 分钟刷新

    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout)
    }

    this.refreshTimeout = setTimeout(() => {
      this.refreshToken()
    }, Math.max(0, refreshTime))
  }

  // 刷新 token
  async refreshToken() {
    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include',
      })

      if (response.ok) {
        const { token } = await response.json()
        this.authService.setToken(token)
        this.scheduleRefresh() // 重新安排下一次刷新
      }
      else {
        this.authService.logout()
        window.location.href = '/login'
      }
    }
    catch (error) {
      console.error('Token 刷新失败:', error)
      this.authService.logout()
    }
  }
}
```

## 请求拦截器实现

为了自动在请求中添加 JWT，我们可以实现请求拦截器：

```javascript title="apiClient.js"
class ApiClient {
  constructor(authService) {
    this.authService = authService
    this.baseURL = process.env.REACT_APP_API_URL
  }

  // 通用请求方法
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    // 自动添加认证头
    if (this.authService.isTokenValid()) {
      config.headers.Authorization = `Bearer ${this.authService.getToken()}`
    }

    try {
      const response = await fetch(url, config)

      // 处理 401 未授权响应
      if (response.status === 401) {
        await this.handleUnauthorized()
        return this.request(endpoint, options) // 重试请求
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    }
    catch (error) {
      console.error('API 请求错误:', error)
      throw error
    }
  }

  // 处理未授权情况
  async handleUnauthorized() {
    try {
      await this.authService.refreshToken()
    }
    catch {
      this.authService.logout()
      window.location.href = '/login'
    }
  }

  // 便捷方法
  get(endpoint) {
    return this.request(endpoint)
  }

  post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    })
  }
}
```

## React 集成示例

在 React 应用中集成 JWT 认证：

```jsx title="AuthProvider.jsx"
import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthService, TokenRefreshService } from './services'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const authService = new AuthService()
  const tokenRefreshService = new TokenRefreshService(authService)

  useEffect(() => {
    initializeAuth()
  }, [])

  async function initializeAuth() {
    if (authService.isTokenValid()) {
      try {
        const userData = await fetchUserData()
        setUser(userData)
        tokenRefreshService.scheduleRefresh()
      }
      catch (error) {
        await authService.logout()
      }
    }
    setLoading(false)
  }

  const login = async (credentials) => {
    const userData = await authService.login(credentials)
    setUser(userData)
    tokenRefreshService.scheduleRefresh()
    return userData
  }

  const logout = () => {
    authService.logout()
    setUser(null)
  }

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    loading,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth 必须在 AuthProvider 内使用')
  }
  return context
}
```

## 安全最佳实践

:::important JWT 安全要点

* \==始终使用 HTTPS=={.success} 传输 JWT
* \==设置合理的过期时间=={.info}（通常 15-30 分钟）
* \==使用强密钥=={.warning} 进行签名
* \==实现安全的 token 刷新机制=={.important}
* \==防范 CSRF 攻击=={.caution}（使用 SameSite cookies）
* \==定期轮换签名密钥=={.warning}
  :::

### 额外的安全措施

```javascript
// 添加额外的安全头
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('X-XSS-Protection', '1; mode=block')
  next()
})

// 速率限制防止暴力攻击
const rateLimit = require('express-rate-limit')
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 分钟
  max: 5, // 最多 5 次登录尝试
  message: '尝试次数过多，请稍后重试'
})
app.use('/api/auth/login', authLimiter)
```

## 常见问题与解决方案

### 1. Token 被盗用

:::caution 解决方案

* 实现 token 撤销列表
* 使用短期 token 配合刷新机制
* 监控异常访问模式
  :::

### 2. 跨域问题

```javascript
// CORS 配置
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true, // 允许发送 cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}))
```

### 3. 移动端兼容性

```javascript
// 响应式认证处理
function getStorageMethod() {
  if (typeof window === 'undefined')
    return 'memory'
  if (window.cordova || window.Capacitor)
    return 'secureStorage'
  return 'httpOnly'
}
```

## 总结

JWT 为前端应用提供了简洁高效的身份验证方案，但正确实现需要考虑多个安全因素。关键要点包括：

* **选择合适的存储策略**：根据安全需求选择 HttpOnly Cookies 或内存存储
* **实现自动刷新机制**：提升用户体验同时保持安全性
* **遵循安全最佳实践**：HTTPS、合理过期时间、密钥管理等
* **错误处理**：完善的未授权处理和用户重定向

通过本文的介绍，你应该能够在前端应用中正确、安全地实现 JWT 身份验证。记住，安全是一个持续的过程，需要定期审查和更新你的实现。

## 参考

* [JWT 官方文档](https://jwt.io/)
* [OWASP 认证指南](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
* [RFC 7519 - JSON Web Token](https://tools.ietf.org/html/rfc7519)
