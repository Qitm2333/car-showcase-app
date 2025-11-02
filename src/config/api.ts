/**
 * 🌐 API配置文件
 * 
 * 管理所有后端API端点
 * 支持通过 localStorage 动态配置
 */

// 使用 Vercel Function 代理，解决 CORS 问题
const USE_PROXY = true; // 设置为 true 使用代理
const PROXY_BASE_URL = '/api/proxy';

// N8N后端基础URL（直连，仅在不使用代理时使用）
const N8N_BASE_URL = 'https://lynn-cafa-system.app.n8n.cloud/webhook-test';

// 构建代理URL的辅助函数
function buildProxyUrl(path: string): string {
  if (!USE_PROXY) {
    return `https://lynn-cafa-system.app.n8n.cloud${path}`;
  }
  // 使用代理：/api/proxy?path=/webhook-test/api/login
  return `${PROXY_BASE_URL}?path=${encodeURIComponent(path)}`;
}

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
  LOGIN: buildProxyUrl('/webhook-test/api/login'),
  // 🚗 车型筛选
  CAR_FILTER: buildProxyUrl('/webhook-test/car-image-filter'),
  // 🔍 车型直接搜索
  CAR_SEARCH: buildProxyUrl('/webhook-test/get-all-car-images'),
  // 🚗 车辆详情页（完整详情 + AI分析 + 相关车型）
  CAR_DETAIL: buildProxyUrl('/webhook-test/car-detail-complete'),
  
  // ⭐ 收藏夹管理（统一入口）
  USER_FAVORITE: buildProxyUrl('/webhook/user-favorite'),
  
  // 🤖 智能整理
  SMART_ORGANIZE: buildProxyUrl('/webhook/smart-organize-to-folder'),
  
  // 🤖 AI分析
  AI_ANALYSIS: buildProxyUrl('/webhook/ai-analysis'),
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

