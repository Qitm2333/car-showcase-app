# 🔄 更新部署指南

## ✅ 已完成的修改

我已经将前端连接到N8N后端API了！

### 修改的文件：

1. **`src/pages/Login.tsx`**
   - ✅ 导入API配置
   - ✅ 改用N8N API验证邀请码
   - ✅ 添加loading状态
   - ✅ 改进错误处理
   - ✅ 显示用户名

2. **`src/contexts/UserContext.tsx`**
   - ✅ 添加setUserName功能
   - ✅ 独立管理用户名状态

---

## 🚀 现在需要重新部署

### 方法1：推送到GitHub（推荐 - 自动部署）

在VS Code终端输入：

```bash
# 1. 添加修改的文件
git add .

# 2. 提交修改
git commit -m "连接N8N后端API"

# 3. 推送到GitHub
git push
```

**推送后：**
- ✅ Vercel会自动检测到代码更新
- ✅ 自动重新部署（3-5分钟）
- ✅ 部署完成后刷新你的网站

---

### 方法2：本地测试（先测试再部署）

```bash
# 本地运行
npm run dev

# 打开 http://localhost:3000/login
# 测试登录功能
```

**测试用例：**
- 输入邀请码：`DEMO2024`
- 应该显示："验证中..."
- 然后跳转到车型展示页面
- 用户名应该显示为："Young"

---

## 🧪 可用的测试邀请码

现在可以使用这些邀请码（来自N8N的Google Sheet）：

| 邀请码 | 用户名 |
|--------|--------|
| `DEMO2024` | Young |
| `TESLA001` | ElonFan |
| `BYD2024` | 王先生 |
| `GEELY888` | 李女士 |
| `NIO2025` | 蔚来用户 |
| `XPENG01` | 小鹏车主 |
| `LI2024` | 理想L9车主 |
| `AITO999` | 问界用户 |
| `TEST001` | 测试用户1 |
| `TEST002` | 测试用户2 |

**旧的邀请码（DQ666等）不再有效！**

---

## 📊 工作流程

```
用户输入邀请码
    ↓
前端发送POST请求到N8N
    ↓
https://lynn-cafa-system.app.n8n.cloud/webhook-test/api/login
    ↓
N8N验证邀请码（Google Sheet）
    ↓
返回用户信息 {success, userName, email}
    ↓
前端保存用户信息并跳转
```

---

## 🎯 部署后测试清单

部署完成后，访问你的Vercel URL，测试：

- [ ] 打开登录页面
- [ ] 输入 `DEMO2024`
- [ ] 点击"进入"按钮
- [ ] 应该看到"验证中..."
- [ ] 成功跳转到车型展示页面
- [ ] 左上角应该显示用户名"Young"
- [ ] 尝试无效邀请码如`INVALID`
- [ ] 应该显示错误："邀请码无效或账户已被禁用"

---

## ⚠️ 如果登录失败

### 检查清单：

1. **N8N工作流是否激活？**
   - 登录 https://lynn-cafa-system.app.n8n.cloud
   - 确认工作流状态为"Active"

2. **Google Sheet是否可访问？**
   - 确认权限设置为"任何人可查看"
   - 确认Sheet包含用户数据

3. **API地址是否正确？**
   - 检查 `src/config/api.ts`
   - 应该是：`https://lynn-cafa-system.app.n8n.cloud/webhook-test`

4. **CORS是否配置？**
   - N8N的Respond to Webhook节点
   - 应该包含：`Access-Control-Allow-Origin: *`

---

## 🔧 故障排查

### 错误：网络错误

**原因：** 
- N8N工作流未激活
- 网络连接问题
- CORS配置错误

**解决：**
1. 打开浏览器开发者工具（F12）
2. 切换到Console标签
3. 查看详细错误信息
4. 检查Network标签看到API请求状态

### 错误：邀请码无效

**原因：**
- 邀请码不在Google Sheet中
- 邀请码状态不是"active"

**解决：**
1. 检查Google Sheet
2. 确认邀请码拼写正确
3. 确认status列是"active"

---

## 🎉 成功标志

当你看到：
- ✅ 输入`DEMO2024`能成功登录
- ✅ 跳转到车型展示页面
- ✅ 左上角显示"Young"
- ✅ 无效邀请码显示错误提示

**恭喜！前后端完全打通了！** 🚀

---

## 📝 快速命令

```bash
# 重新部署到Vercel
git add .
git commit -m "连接N8N后端API"
git push
```

等待3-5分钟后刷新网站测试！

