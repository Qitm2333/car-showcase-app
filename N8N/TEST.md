# 🧪 N8N登录API测试指南

## 🎯 你的API地址

```
https://lynn-cafa-system.app.n8n.cloud/webhook-test/api/login
```

---

## 📋 快速测试步骤

### 方法1：使用浏览器开发者工具（最简单）

1. **打开浏览器控制台**
   - 按 `F12` 打开开发者工具
   - 切换到 "Console（控制台）" 标签

2. **粘贴并运行以下代码**

```javascript
// 测试登录API
fetch('https://lynn-cafa-system.app.n8n.cloud/webhook-test/api/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    inviteCode: 'DEMO2024'
  })
})
.then(response => response.json())
.then(data => {
  console.log('✅ 登录成功！', data);
  console.log('用户名:', data.data?.userName);
  console.log('邀请码:', data.data?.inviteCode);
})
.catch(error => {
  console.error('❌ 登录失败！', error);
});
```

3. **查看结果**
   - 如果成功，会显示绿色的 "✅ 登录成功！"
   - 如果失败，会显示红色的 "❌ 登录失败！"

---

### 方法2：使用Postman（推荐用于正式测试）

1. **打开Postman**
   - 如果没有安装，访问 https://www.postman.com/downloads/

2. **创建新请求**
   - 点击 "New" → "HTTP Request"

3. **配置请求**
   - **Method（方法）**: `POST`
   - **URL**: `https://lynn-cafa-system.app.n8n.cloud/webhook-test/api/login`
   - **Headers（请求头）**:
     ```
     Content-Type: application/json
     ```
   - **Body（请求体）**: 选择 "raw" + "JSON"，粘贴：
     ```json
     {
       "inviteCode": "DEMO2024"
     }
     ```

4. **点击 "Send" 发送请求**

5. **查看响应**
   - 成功响应 (200):
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

### 方法3：使用curl命令（命令行）

**Windows PowerShell:**
```powershell
Invoke-RestMethod -Uri 'https://lynn-cafa-system.app.n8n.cloud/webhook-test/api/login' -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"inviteCode":"DEMO2024"}'
```

**Mac/Linux Terminal:**
```bash
curl -X POST https://lynn-cafa-system.app.n8n.cloud/webhook-test/api/login \
  -H "Content-Type: application/json" \
  -d '{"inviteCode": "DEMO2024"}'
```

**Windows CMD:**
```cmd
curl -X POST https://lynn-cafa-system.app.n8n.cloud/webhook-test/api/login -H "Content-Type: application/json" -d "{\"inviteCode\": \"DEMO2024\"}"
```

---

### 方法4：在线API测试工具

访问 **Hoppscotch** (免费在线工具): https://hoppscotch.io/

1. **设置请求**
   - Method: `POST`
   - URL: `https://lynn-cafa-system.app.n8n.cloud/webhook-test/api/login`

2. **添加Header**
   - Key: `Content-Type`
   - Value: `application/json`

3. **设置Body**
   - 选择 "Content Type" → "application/json"
   - 输入:
     ```json
     {
       "inviteCode": "DEMO2024"
     }
     ```

4. **点击 "Send"**

---

## 🧪 测试用例

### ✅ 有效的邀请码（应该返回成功）

| 邀请码 | 预期用户名 | 描述 |
|--------|----------|------|
| `DEMO2024` | Young | 演示账号 |
| `TESLA001` | ElonFan | 特斯拉用户 |
| `BYD2024` | 王先生 | 比亚迪用户 |
| `GEELY888` | 李女士 | 吉利用户 |
| `NIO2025` | 蔚来用户 | 蔚来用户 |
| `XPENG01` | 小鹏车主 | 小鹏用户 |
| `LI2024` | 理想L9车主 | 理想用户 |
| `AITO999` | 问界用户 | 问界用户 |
| `TEST001` | 测试用户1 | 测试账号1 |
| `TEST002` | 测试用户2 | 测试账号2 |

### ❌ 无效的邀请码（应该返回失败）

| 邀请码 | 预期结果 |
|--------|---------|
| `INVALID` | 401错误：邀请码无效 |
| `WRONG123` | 401错误：邀请码无效 |
| `（空值）` | 401错误：邀请码无效 |

---

## 📊 预期响应格式

### ✅ 成功响应 (HTTP 200)

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

### ❌ 失败响应 (HTTP 401)

```json
{
  "success": false,
  "message": "邀请码无效或账户已被禁用",
  "data": {
    "inviteCode": "INVALID"
  },
  "timestamp": "2024-01-28T12:00:00.000Z"
}
```

### ⚠️ 错误响应 (HTTP 500)

```json
{
  "success": false,
  "message": "系统错误：无法获取用户数据",
  "timestamp": "2024-01-28T12:00:00.000Z"
}
```

---

## 🔧 故障排查

### 问题1：无法连接到服务器

**可能原因：**
- N8N工作流未激活
- Webhook URL错误
- 网络连接问题

**解决方案：**
1. 登录N8N，检查工作流是否 "Active"
2. 确认Webhook URL是否正确
3. 检查网络连接

---

### 问题2：返回404错误

**可能原因：**
- Webhook路径配置错误

**解决方案：**
1. 在N8N中检查Webhook节点的path设置
2. 确认路径为：`api/login`
3. 完整URL应为：`https://lynn-cafa-system.app.n8n.cloud/webhook-test/api/login`

---

### 问题3：返回500错误

**可能原因：**
- Google Sheet无法访问
- CSV解析错误
- 工作流节点配置错误

**解决方案：**
1. 检查Google Sheet权限（确保"任何人可查看"）
2. 确认Google Sheet URL正确
3. 在N8N中手动测试每个节点

---

### 问题4：CORS跨域错误

**可能原因：**
- 前端域名未在CORS中配置

**解决方案：**
1. 在N8N的 "Respond to Webhook" 节点中
2. 确认Response Headers包含：
   ```
   Access-Control-Allow-Origin: *
   ```

---

## 🚀 下一步

测试成功后，你可以：

1. **集成到前端**
   - 使用我创建的 `src/config/api.ts` 配置文件
   - 在登录页面调用API

2. **添加更多用户**
   - 在Google Sheet中添加新的邀请码
   - 立即生效，无需重启

3. **开发其他功能**
   - 车型数据API
   - 收藏夹API
   - AI分析API

---

## 💡 快速复制命令

**浏览器控制台测试：**
```javascript
fetch('https://lynn-cafa-system.app.n8n.cloud/webhook-test/api/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({inviteCode:'DEMO2024'})}).then(r=>r.json()).then(d=>console.log('结果:',d))
```

**PowerShell测试：**
```powershell
Invoke-RestMethod -Uri 'https://lynn-cafa-system.app.n8n.cloud/webhook-test/api/login' -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"inviteCode":"DEMO2024"}'
```

---

**祝测试顺利！** 🎉

如有问题，请检查：
- ✅ N8N工作流是否已激活
- ✅ Google Sheet权限是否正确
- ✅ URL是否完全正确
- ✅ 请求格式是否正确

