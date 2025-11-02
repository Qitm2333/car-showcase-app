# 🔧 修复N8N Webhook错误

## 🎯 错误信息
```
Webhook node not correctly configured
Set the "Respond" parameter to "Using Respond to Webhook Node"
```

## ✅ 快速修复步骤

### 步骤1：打开Webhook节点

1. 在N8N中打开你的工作流
2. 点击第一个节点：**"Webhook - 接收登录请求"**

### 步骤2：修改Respond设置

在右侧配置面板中：

1. 找到 **"Respond"** 选项
2. 当前可能是：`"On Received"` 或其他
3. **改为：** `"Using 'Respond to Webhook' Node"`

### 步骤3：确认CORS配置

在每个 **"Respond to Webhook"** 节点中，确保Headers包含：

```json
{
  "entries": [
    {
      "name": "Content-Type",
      "value": "application/json"
    },
    {
      "name": "Access-Control-Allow-Origin",
      "value": "*"
    },
    {
      "name": "Access-Control-Allow-Methods",
      "value": "POST, OPTIONS"
    },
    {
      "name": "Access-Control-Allow-Headers",
      "value": "Content-Type"
    }
  ]
}
```

### 步骤4：保存并测试

1. 点击 **"Save"** 保存
2. 确认工作流是 **"Active"**
3. 测试登录功能

---

## 📸 配置截图指南

### Webhook节点配置应该是：

```
Webhook节点
├─ Path: api/login
├─ HTTP Method: POST
└─ Respond: "Using 'Respond to Webhook' Node" ✅ (重要！)
```

### 工作流结构：

```
Webhook
  ↓
获取Google Sheet数据
  ↓
解析CSV
  ↓
验证邀请码 (Filter)
  ├─ 成功 → Code节点 → Respond to Webhook (200)
  └─ 失败 → Code节点 → Respond to Webhook (401)
```

---

## 🧪 测试方法

### 方法1：在N8N中测试

1. 点击Webhook节点
2. 点击 **"Listen for Test Event"**
3. 在浏览器打开登录页面
4. 输入邀请码测试
5. 回到N8N查看是否收到请求

### 方法2：使用Postman测试

```bash
POST https://lynn-cafa-system.app.n8n.cloud/webhook-test/api/login
Content-Type: application/json

{
  "inviteCode": "DEMO2024"
}
```

预期返回：
```json
{
  "success": true,
  "message": "登录成功",
  "data": {
    "inviteCode": "DEMO2024",
    "userName": "Young"
  }
}
```

---

## ❌ 常见错误

### 错误1：Workflow could not be started

**原因：** Respond模式设置错误

**解决：** 
- Webhook节点的Respond设置为 `"Using 'Respond to Webhook' Node"`

### 错误2：CORS错误

**原因：** 缺少CORS headers

**解决：**
- 在所有Respond to Webhook节点添加CORS headers（见上面配置）

### 错误3：404 Not Found

**原因：** 
- 工作流未激活
- Path配置错误

**解决：**
- 确认工作流是Active
- 确认Path是 `api/login`

---

## 🎯 完整配置检查清单

- [ ] Webhook节点的Respond设置为 `"Using Respond to Webhook Node"`
- [ ] 有"返回成功响应"节点 (Respond to Webhook)
- [ ] 有"返回失败响应"节点 (Respond to Webhook)
- [ ] 所有Respond节点都有CORS headers
- [ ] Google Sheet URL已配置
- [ ] 工作流状态是 "Active"

---

## 💡 如果还是不行

### 选项1：重新导入工作流

1. 删除现有工作流
2. 使用 `01-login-FIXED.json` 重新导入
3. 配置Google Sheet URL
4. 激活工作流

### 选项2：手动检查每个节点

按顺序检查：
1. Webhook → Respond模式
2. HTTP Request → Google Sheet URL
3. Code → 解析逻辑
4. Filter → 验证条件
5. Respond to Webhook → CORS headers

---

**修复后记得测试！** 🚀

