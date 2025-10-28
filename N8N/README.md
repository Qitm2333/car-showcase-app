# 🚀 N8N 后端服务配置指南

## 📋 目录结构

```
n8n/
├── workflows/           # N8N工作流配置
│   └── 01-login.json   # 登录验证工作流
├── data/               # 数据文件
│   └── users.csv       # 用户数据（邀请码验证）
└── README.md           # 本文档
```

---

## 🔐 01. 登录验证系统

### 功能说明
- **邀请码验证**：用户通过邀请码登录
- **Google Sheet集成**：用户数据存储在Google Sheet中
- **状态管理**：支持用户状态（active/inactive）
- **CORS支持**：允许前端跨域访问

### 🎯 部署步骤

#### 步骤1：准备Google Sheet

1. **创建Google Sheet**
   - 访问 [Google Sheets](https://sheets.google.com)
   - 创建新的电子表格
   - 将 `data/users.csv` 的内容复制到Sheet中

2. **表格结构**
   ```
   列A: inviteCode    - 邀请码（唯一标识）
   列B: userName      - 用户名
   列C: email         - 邮箱
   列D: status        - 状态（active/inactive）
   列E: createdAt     - 创建日期
   列F: lastLoginAt   - 最后登录日期
   ```

3. **设置共享权限**
   - 点击右上角"共享"
   - 设置为"任何拥有链接的人都可以查看"
   - 复制分享链接

4. **获取导出URL**
   ```
   原始链接格式：
   https://docs.google.com/spreadsheets/d/SHEET_ID/edit#gid=0
   
   导出CSV格式：
   https://docs.google.com/spreadsheets/d/SHEET_ID/export?format=csv
   ```

#### 步骤2：导入N8N工作流

1. **登录N8N**
   - 访问你的N8N实例

2. **创建新工作流**
   - 点击左上角 "+" 创建新工作流
   - 命名为 "🔐 用户登录验证"

3. **导入配置**
   - 点击右上角菜单（三个点）
   - 选择 "Import from JSON"
   - 粘贴 `workflows/01-login.json` 的内容
   - 点击 "Import"

4. **配置Google Sheet URL**
   - 找到节点 "获取用户数据（Google Sheet）"
   - 将URL替换为你的Google Sheet导出URL
   ```json
   "url": "https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/export?format=csv"
   ```

5. **激活工作流**
   - 点击右上角 "Inactive" 切换为 "Active"
   - 你的Webhook URL：`https://lynn-cafa-system.app.n8n.cloud/webhook-test/api/login`

#### 步骤3：前端集成

在你的React应用中更新API地址：

```typescript
// src/config/api.ts
export const API_BASE_URL = 'https://lynn-cafa-system.app.n8n.cloud/webhook-test';

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/api/login`,
  // 后续添加其他端点
};
```

更新登录逻辑：

```typescript
// src/pages/Login.tsx
const handleLogin = async () => {
  try {
    const response = await fetch('https://lynn-cafa-system.app.n8n.cloud/webhook-test/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inviteCode: inviteCode
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      // 登录成功
      setInviteCode(data.data.inviteCode);
      setUserName(data.data.userName);
      navigate('/car-showcase');
    } else {
      // 登录失败
      setError(data.message);
    }
  } catch (error) {
    console.error('登录错误:', error);
    setError('网络错误，请稍后重试');
  }
};
```

---

## 📊 数据格式说明

### 请求格式

**POST** `/api/login`

```json
{
  "inviteCode": "DEMO2024"
}
```

### 响应格式

**成功响应 (200)**
```json
{
  "success": true,
  "message": "登录成功",
  "data": {
    "inviteCode": "DEMO2024",
    "userName": "Young",
    "email": "young@example.com",
    "lastLoginAt": "2024-01-28"
  },
  "timestamp": "2024-01-28T12:00:00.000Z"
}
```

**失败响应 (401)**
```json
{
  "success": false,
  "message": "邀请码无效或账户已被禁用",
  "data": {
    "inviteCode": "INVALID001"
  },
  "timestamp": "2024-01-28T12:00:00.000Z"
}
```

**错误响应 (500)**
```json
{
  "success": false,
  "message": "系统错误：无法获取用户数据",
  "timestamp": "2024-01-28T12:00:00.000Z"
}
```

---

## 🧪 测试

### 使用Postman/curl测试

```bash
curl -X POST https://lynn-cafa-system.app.n8n.cloud/webhook-test/api/login \
  -H "Content-Type: application/json" \
  -d '{"inviteCode": "DEMO2024"}'
```

### 测试用例

| 邀请码 | 预期结果 | 用户名 |
|--------|---------|--------|
| DEMO2024 | ✅ 成功 | Young |
| TESLA001 | ✅ 成功 | ElonFan |
| BYD2024 | ✅ 成功 | 王先生 |
| INVALID | ❌ 失败 | - |

---

## 🔧 工作流节点说明

### 1️⃣ Webhook - 接收登录请求
- **类型**：Webhook触发器
- **方法**：POST
- **路径**：`/api/login`
- **作用**：接收前端发送的登录请求

### 2️⃣ 获取用户数据（Google Sheet）
- **类型**：HTTP Request
- **作用**：从Google Sheet获取用户CSV数据

### 3️⃣ 解析CSV数据
- **类型**：Code节点
- **作用**：将CSV字符串转换为JSON数组

### 4️⃣ 验证邀请码
- **类型**：Filter节点
- **条件**：
  - 邀请码匹配
  - 状态为active

### 5️⃣ ✅ 登录成功
- **类型**：Code节点
- **作用**：构建成功响应数据

### 6️⃣ ❌ 登录失败
- **类型**：Code节点
- **作用**：构建失败响应数据

### 7️⃣ ⚠️ 错误处理
- **类型**：Code节点
- **作用**：处理系统错误

---

## 📝 用户管理

### 添加新用户

直接在Google Sheet中添加新行：
```
inviteCode,userName,email,status,createdAt,lastLoginAt
NEW2024,新用户,new@example.com,active,2024-01-28,
```

### 禁用用户

将status列改为`inactive`：
```
DEMO2024,Young,young@example.com,inactive,2024-01-01,2024-01-15
```

### 批量导入

使用Google Sheet的导入功能批量导入CSV数据。

---

## 🎨 后续功能规划

### 即将实现的工作流

1. **02-车型数据获取**
   - 端点：`/api/cars`
   - 功能：获取车型列表
   - 支持筛选和搜索

2. **03-收藏夹管理**
   - 端点：`/api/favorites`
   - 功能：增删改查收藏夹

3. **04-灵感管理**
   - 端点：`/api/inspirations`
   - 功能：保存和管理灵感

4. **05-AI分析**
   - 端点：`/api/ai-analysis`
   - 功能：AI辅助分析

---

## ⚡ 性能优化建议

1. **缓存用户数据**
   - 使用N8N的Global Variables缓存用户数据
   - 减少Google Sheet请求次数

2. **批量操作**
   - 合并多个小请求为批量请求
   - 提高响应速度

3. **错误重试**
   - 添加错误重试机制
   - 提高系统稳定性

---

## 🔒 安全建议

1. **HTTPS**
   - 确保N8N实例使用HTTPS
   - 保护数据传输安全

2. **访问控制**
   - 限制Webhook访问频率
   - 防止恶意攻击

3. **数据加密**
   - 考虑对敏感数据加密存储
   - 使用环境变量存储密钥

---

## 📞 支持

如有问题，请检查：
1. ✅ Google Sheet权限是否正确
2. ✅ N8N工作流是否激活
3. ✅ Webhook URL是否正确
4. ✅ CORS配置是否正确

---

**版本**: 1.0.0  
**更新日期**: 2024-01-28  
**维护者**: 项目团队

