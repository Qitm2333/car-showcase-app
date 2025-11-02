# 📮 使用Postman测试N8N API

## 🎯 为什么需要Postman？

N8N的webhook是**API接口**，不是网页：
- ❌ 不能在浏览器直接打开看到界面
- ✅ 需要发送POST请求才能测试
- ✅ Postman是测试API的最佳工具

---

## 📥 下载Postman

访问: https://www.postman.com/downloads/

或使用在线版本: https://www.postman.com/

---

## 🧪 测试步骤（超详细）

### 步骤1：创建新请求

1. 打开Postman
2. 点击左上角 **"New"** → **"HTTP Request"**
3. 或直接点击 **"+"** 标签

### 步骤2：设置请求类型

在请求栏左侧的下拉菜单中，选择 **POST**

### 步骤3：输入URL

在URL框中粘贴：
```
https://lynn-cafa-system.app.n8n.cloud/webhook-test/api/login
```

### 步骤4：设置Headers（请求头）

1. 点击 **"Headers"** 标签
2. 添加以下内容：

| Key | Value |
|-----|-------|
| `Content-Type` | `application/json` |

### 步骤5：设置Body（请求体）

1. 点击 **"Body"** 标签
2. 选择 **"raw"**
3. 右侧下拉菜单选择 **"JSON"**
4. 在文本框中输入：

```json
{
  "inviteCode": "DEMO2024"
}
```

### 步骤6：发送请求

点击右上角蓝色的 **"Send"** 按钮

### 步骤7：查看响应

在下方的响应区域，你应该看到：

**✅ 成功响应（Status: 200 OK）**
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

---

## 🎨 截图示例

你的Postman应该看起来像这样：

```
┌─────────────────────────────────────────┐
│ POST │ https://lynn-cafa-system.app... │ [Send]
├─────────────────────────────────────────┤
│ Params  Headers  Body  Pre-request  Tests
│                        └─ [raw] [JSON]
│
│  {
│    "inviteCode": "DEMO2024"
│  }
│
├─────────────────────────────────────────┤
│ Response: 200 OK                        │
│                                         │
│  {
│    "success": true,
│    "message": "登录成功",
│    ...
│  }
└─────────────────────────────────────────┘
```

---

## 🧪 测试更多邀请码

### 测试用例1：有效的邀请码

**请求：**
```json
{
  "inviteCode": "TESLA001"
}
```

**预期响应：**
```json
{
  "success": true,
  "data": {
    "userName": "ElonFan"
  }
}
```

### 测试用例2：无效的邀请码

**请求：**
```json
{
  "inviteCode": "INVALID"
}
```

**预期响应：**
```json
{
  "success": false,
  "message": "邀请码无效或账户已被禁用"
}
```

---

## 📋 所有可测试的邀请码

| 邀请码 | 用户名 | 应该返回 |
|--------|--------|---------|
| `DEMO2024` | Young | ✅ 成功 |
| `TESLA001` | ElonFan | ✅ 成功 |
| `BYD2024` | 王先生 | ✅ 成功 |
| `GEELY888` | 李女士 | ✅ 成功 |
| `NIO2025` | 蔚来用户 | ✅ 成功 |
| `XPENG01` | 小鹏车主 | ✅ 成功 |
| `LI2024` | 理想L9车主 | ✅ 成功 |
| `AITO999` | 问界用户 | ✅ 成功 |
| `TEST001` | 测试用户1 | ✅ 成功 |
| `TEST002` | 测试用户2 | ✅ 成功 |
| `WRONG` | - | ❌ 失败 |
| `INVALID` | - | ❌ 失败 |

---

## 🔧 故障排查

### ❌ 错误1：Could not send request

**原因：** URL错误或N8N未激活

**解决：**
1. 检查URL是否完全正确
2. 登录N8N确认工作流是"Active"

### ❌ 错误2：404 Not Found

**原因：** Webhook路径错误

**解决：**
1. 检查N8N中的Webhook节点
2. 确认path设置为：`api/login`

### ❌ 错误3：500 Internal Server Error

**原因：** Google Sheet无法访问

**解决：**
1. 检查Google Sheet权限
2. 确认Sheet URL正确
3. 在N8N中测试每个节点

---

## 💡 保存请求以便重复使用

1. 点击右上角 **"Save"**
2. 命名为："登录API - DEMO2024"
3. 选择或创建Collection
4. 点击 **"Save"**

现在你可以随时重新运行这个测试！

---

## 🚀 测试成功后

确认N8N API工作正常后，你就可以：

1. **在前端中使用这个API**
   ```typescript
   const response = await fetch('https://lynn-cafa-system.app.n8n.cloud/webhook-test/api/login', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ inviteCode: 'DEMO2024' })
   });
   ```

2. **部署前端应用**
   - 使用Vercel或Netlify
   - 获得公开访问的URL

3. **端到端测试**
   - 在前端页面输入邀请码
   - 验证登录流程

---

## 📞 需要帮助？

如果Postman测试失败，请检查：

- ✅ N8N工作流是否激活
- ✅ Google Sheet是否配置正确
- ✅ URL是否完全匹配
- ✅ Headers是否包含Content-Type
- ✅ Body格式是否为JSON

**测试愉快！** 🎉

