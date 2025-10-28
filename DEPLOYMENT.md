# 🚀 前端部署指南

## 📋 部署选项

你的React前端应用需要部署到以下平台之一：

---

## ✅ 推荐：Vercel（最简单）

### 步骤1：准备项目

确保你的项目根目录有这些文件：
- `package.json`
- `vite.config.ts`
- `src/` 目录

### 步骤2：部署到Vercel

**方法A：通过Vercel CLI**

```bash
# 1. 安装Vercel CLI
npm install -g vercel

# 2. 登录Vercel
vercel login

# 3. 部署项目
vercel

# 4. 部署到生产环境
vercel --prod
```

**方法B：通过GitHub自动部署**

1. 将代码推送到GitHub
2. 访问 [vercel.com](https://vercel.com)
3. 点击 "Import Project"
4. 选择你的GitHub仓库
5. 点击 "Deploy"
6. 等待5分钟，完成！

### 步骤3：获取部署URL

部署完成后，你会得到一个URL，例如：
```
https://your-project-name.vercel.app
```

这个URL才是你可以直接打开看到界面的地址！

---

## 🔧 配置API地址

部署后，确保前端使用正确的N8N API地址：

**检查 `src/config/api.ts`：**
```typescript
export const API_BASE_URL = 'https://lynn-cafa-system.app.n8n.cloud/webhook-test';
```

---

## 🧪 测试流程

### 1️⃣ 测试后端API（N8N）

使用Postman或curl测试：
```bash
curl -X POST https://lynn-cafa-system.app.n8n.cloud/webhook-test/api/login \
  -H "Content-Type: application/json" \
  -d '{"inviteCode": "DEMO2024"}'
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

### 2️⃣ 测试前端应用

**本地测试：**
```bash
npm run dev
# 打开 http://localhost:3000
```

**线上测试：**
```
打开 https://your-project-name.vercel.app
```

### 3️⃣ 端到端测试

1. 打开前端URL（Vercel或本地）
2. 在登录页面输入邀请码：`DEMO2024`
3. 点击登录
4. 应该跳转到车型展示页面

---

## 🌐 完整架构

```
┌─────────────────────┐
│   用户浏览器          │
│                     │
│  https://your-app   │
│  .vercel.app        │
└──────────┬──────────┘
           │
           │ 输入邀请码
           │ 点击登录
           ↓
┌─────────────────────┐
│   前端 (React)       │
│  Vercel部署         │
│                     │
│  fetch(API_URL)     │
└──────────┬──────────┘
           │
           │ POST /api/login
           │ {"inviteCode": "DEMO2024"}
           ↓
┌─────────────────────┐
│   后端 (N8N)        │
│  lynn-cafa-system   │
│  .app.n8n.cloud     │
│                     │
│  验证邀请码          │
└──────────┬──────────┘
           │
           │ 返回 JSON
           ↓
┌─────────────────────┐
│  {"success": true}  │
│  {"userName": ".."}  │
└─────────────────────┘
```

---

## 📝 常见问题

### Q: 为什么不能直接打开N8N的webhook URL？

**A:** N8N的webhook是API接口，不是网页：
- ❌ 不会显示HTML页面
- ❌ 不能直接在浏览器看到界面
- ✅ 只返回JSON数据
- ✅ 需要通过前端应用调用

### Q: 本地开发时如何测试？

**A:** 两个窗口：
1. **终端1**: 运行前端 `npm run dev`
2. **终端2**: N8N在云端运行（无需本地）
3. 打开 `http://localhost:3000` 测试

### Q: CORS错误怎么办？

**A:** 确保N8N的Respond to Webhook节点包含：
```json
"responseHeaders": {
  "entries": [
    {
      "name": "Access-Control-Allow-Origin",
      "value": "*"
    }
  ]
}
```

---

## 🎯 现在该怎么做？

### 选项1：本地测试（推荐先这样）

```bash
# 在项目根目录
npm run dev

# 打开浏览器访问
# http://localhost:3000
```

### 选项2：部署到Vercel（获得公开URL）

```bash
npm install -g vercel
vercel login
vercel --prod
```

---

## ⚡ 快速验证清单

- [ ] ✅ N8N工作流已激活
- [ ] ✅ Google Sheet已配置
- [ ] ✅ 本地运行 `npm run dev` 成功
- [ ] ✅ 前端可以打开（localhost:3000）
- [ ] ✅ 登录功能正常
- [ ] 🚀 （可选）部署到Vercel

---

**记住：**
- **N8N** = 后端API（看不见的数据接口）
- **React应用** = 前端界面（用户看到的页面）
- 两者配合才能工作！

现在先运行 `npm run dev` 测试吧！

