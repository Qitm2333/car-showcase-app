/**
 * 🌐 API配置文件
 * 
 * 管理所有后端API端点
 * 支持通过 localStorage 动态配置
 */

// N8N后端基础URL
export const API_BASE_URL = 'https://lynn-cafa-system.app.n8n.cloud/webhook-test';

// 从 localStorage 加载保存的配置
function loadWebhookConfig() {
  const saved = localStorage.getItem('webhook_config');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (error) {
      console.error('加载 webhook 配置失败:', error);
      return {};
    }
  }
  return {};
}

// 默认配置
const DEFAULT_ENDPOINTS = {
  // 🔐 用户认证
  LOGIN: `${API_BASE_URL}/api/login`,
  // 🚗 车型筛选
  CAR_FILTER: `${API_BASE_URL}/car-image-filter`,
  // 🔍 车型直接搜索
  CAR_SEARCH: `${API_BASE_URL}/get-all-car-images`,
  // 🚗 车辆详情页（完整详情 + AI分析 + 相关车型）
  CAR_DETAIL: 'https://lynn-cafa-system.app.n8n.cloud/webhook-test/car-detail-complete',
  
  // ⭐ 收藏夹管理（统一入口）
  USER_FAVORITE: 'https://your-n8n-url/webhook/user-favorite',
  
  // 🤖 智能整理
  SMART_ORGANIZE: 'https://lynn-cafa-system.app.n8n.cloud/webhook/smart-organize-to-folder',
};

// API端点配置（支持动态更新）
export const API_ENDPOINTS = {
  ...DEFAULT_ENDPOINTS,
  ...loadWebhookConfig(),
};

// 请求配置
export const REQUEST_CONFIG = {
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10秒超时
};

// API辅助函数
export const apiRequest = async <T = any>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...REQUEST_CONFIG.headers,
        ...options.headers,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API请求错误:', error);
    throw error;
  }
};

// 🤖 智能整理 API
export function getSmartOrganizeEndpoint(): string {
  const saved = localStorage.getItem('SMART_ORGANIZE_API');
  return saved || API_ENDPOINTS.SMART_ORGANIZE;
}

