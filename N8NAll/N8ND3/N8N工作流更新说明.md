# 🔧 N8N 工作流更新说明

## 目标
让 `car-detail-complete` workflow 支持通过 `carID` 查询车辆详情

---

## 📝 需要修改的节点

### **节点：解析参数2**

**当前代码：**
```javascript
// 解析请求参数
const input = $input.item.json.body || $input.item.json;
const carName = (input.carName || '').trim();

if (!carName) {
  return {
    json: {
      success: false,
      error: '请提供汽车名称'
    }
  };
}

console.log('查询汽车:', carName);

return { 
  json: { 
    carName: carName
  } 
};
```

**修改后代码：**
```javascript
// 解析请求参数 - 支持 carID 和 carName
const input = $input.item.json.body || $input.item.json;

// 优先使用 carID
const carID = input.carID;
const carName = (input.carName || '').trim();

// 验证至少提供了一个参数
if (!carID && !carName) {
  return {
    json: {
      success: false,
      error: '请提供 carID 或 carName'
    }
  };
}

// 如果有 carID，记录日志
if (carID) {
  console.log('通过 carID 查询:', carID);
} else {
  console.log('通过 carName 查询:', carName);
}

return { 
  json: { 
    carID: carID,
    carName: carName
  } 
};
```

---

### **节点：读取GoogleSheet2**

**保持不变**，继续读取所有数据。

---

### **节点：处理所有逻辑2**

**需要修改开头部分**，增加通过 carID 查找的逻辑。

**修改位置：** 在原有代码的开头增加以下逻辑

```javascript
// 处理所有数据并返回结果
const inputParams = $('解析参数2').item.json;
const targetCarID = inputParams.carID;
const targetCarName = inputParams.carName;
const allData = $input.all();

console.log('===== 开始处理 =====');
console.log('输入参数 - carID:', targetCarID);
console.log('输入参数 - carName:', targetCarName);
console.log('总数据量:', allData.length);

// 标准化函数：去掉空格、短横线、下划线
function normalize(str) {
  if (!str) return '';
  return str.toLowerCase()
    .split(' ').join('')
    .split('-').join('')
    .split('_').join('');
}

let carData = [];
let matchType = '';
let actualCarName = '';

// ========== 优先级1: 通过 carID 精确匹配 ==========
if (targetCarID) {
  console.log('尝试通过 carID 匹配:', targetCarID);
  
  carData = allData.filter(item => {
    return Number(item.json.carID) === Number(targetCarID);
  });
  
  if (carData.length > 0) {
    matchType = 'carID精确匹配';
    actualCarName = carData[0].json.carName;
    console.log('✅ carID匹配成功:', actualCarName);
  } else {
    console.log('❌ carID匹配失败，没有找到 carID =', targetCarID);
  }
}

// ========== 优先级2: 如果 carID 失败，尝试 carName 匹配 ==========
if (carData.length === 0 && targetCarName) {
  const normalizedTarget = normalize(targetCarName);
  console.log('通过 carName 匹配:', targetCarName);
  console.log('标准化搜索词:', normalizedTarget);
  
  // 第一级：精确匹配
  carData = allData.filter(item => {
    const dbCarName = item.json.carName || '';
    const normalizedDb = normalize(dbCarName);
    return normalizedDb === normalizedTarget;
  });

  if (carData.length > 0) {
    matchType = 'carName精确匹配';
    actualCarName = carData[0].json.carName;
  } else {
    // 第二级：包含匹配
    console.log('精确匹配失败，尝试包含匹配...');
    
    carData = allData.filter(item => {
      const dbCarName = item.json.carName || '';
      const normalizedDb = normalize(dbCarName);
      
      if (normalizedDb.indexOf(normalizedTarget) !== -1) {
        const lengthDiff = normalizedDb.length - normalizedTarget.length;
        if (lengthDiff >= 0 && lengthDiff <= 10) {
          return true;
        }
      }
      
      if (normalizedTarget.indexOf(normalizedDb) !== -1) {
        const lengthRatio = normalizedDb.length / normalizedTarget.length;
        if (lengthRatio >= 0.7) {
          return true;
        }
      }
      
      return false;
    });
    
    if (carData.length > 0) {
      matchType = 'carName包含匹配';
      actualCarName = carData[0].json.carName;
    }
  }

  // 第三级：关键词匹配
  if (carData.length === 0) {
    console.log('包含匹配失败，尝试关键词匹配...');
    
    const keywords = normalizedTarget.split(/[^a-z0-9\u4e00-\u9fa5]+/).filter(k => k.length > 1);
    
    carData = allData.filter(item => {
      const dbCarName = item.json.carName || '';
      const normalizedDb = normalize(dbCarName);
      return keywords.every(keyword => normalizedDb.indexOf(keyword) !== -1);
    });
    
    if (carData.length > 0) {
      matchType = 'carName关键词匹配';
      actualCarName = carData[0].json.carName;
    }
  }
}

console.log('匹配类型:', matchType);
console.log('匹配结果:', carData.length, '条');

if (carData.length === 0) {
  console.log('未找到匹配');
  console.log('carID:', targetCarID);
  console.log('carName:', targetCarName);
  return {
    json: {
      success: false,
      error: '未找到车型: ' + (targetCarID || targetCarName)
    }
  };
}

console.log('实际车名:', actualCarName);

// ========== 后续代码保持不变 ==========
// 2. 提取基本信息
const baseInfo = carData[0].json;
const carName = baseInfo.carName;
// ... 其余代码不变 ...
```

---

## ✅ 修改后的效果

### **请求示例1：通过 carID 查询**
```json
POST https://n8n.seanhe.tech/webhook/car-detail-complete
{
  "carID": 5964
}
```

**返回：** 比亚迪-秦PLUS 的完整详情

---

### **请求示例2：通过 carName 查询（备用）**
```json
POST https://n8n.seanhe.tech/webhook/car-detail-complete
{
  "carName": "比亚迪海豹"
}
```

**返回：** 比亚迪海豹 的完整详情

---

### **请求示例3：同时提供（优先 carID）**
```json
POST https://n8n.seanhe.tech/webhook/car-detail-complete
{
  "carID": 5964,
  "carName": "比亚迪海豹"
}
```

**返回：** 优先使用 carID=5964 查询，返回比亚迪-秦PLUS

---

## 🧪 测试步骤

1. **在 N8N 中打开工作流**
2. **编辑 "解析参数2" 节点**，替换代码
3. **编辑 "处理所有逻辑2" 节点**，在开头插入新代码
4. **保存并激活工作流**
5. **测试请求**：
   - 使用 HTML 测试页面
   - 或直接用 Postman/curl 测试
6. **检查控制台日志**，确认匹配类型

---

## 📌 注意事项

1. **carID 是数字**，请确保 Google Sheet 中 carID 列的数据类型正确
2. **carName 可能包含品牌前缀**（如 "比亚迪-海豹"），匹配逻辑已考虑这一点
3. **如果 carID 和 carName 都提供**，优先使用 carID（更精确）
4. **错误处理**：如果都找不到，返回 `success: false` 和错误信息

---

## 🔗 前端调用示例

```typescript
// 通过 carID 查询（推荐）
const detail = await fetchCarDetail({ carID: 5964 });

// 通过 carName 查询（备用）
const detail = await fetchCarDetail({ carName: "比亚迪海豹" });
```

