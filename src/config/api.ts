/**
 * 🌐 API配置文件
 * 
 * 管理所有后端API端点
 */

// N8N后端基础URL
export const API_BASE_URL = 'https://lynn-cafa-system.app.n8n.cloud/webhook-test';

// API端点配置
export const API_ENDPOINTS = {
  // 🔐 用户认证
  LOGIN: `${API_BASE_URL}/api/login`,
  
  // 🚗 车型数据（待实现）
  // CARS: `${API_BASE_URL}/api/cars`,
  
  // ⭐ 收藏夹管理（待实现）
  // FAVORITES: `${API_BASE_URL}/api/favorites`,
  
  // 💡 灵感管理（待实现）
  // INSPIRATIONS: `${API_BASE_URL}/api/inspirations`,
  
  // 🤖 AI分析（待实现）
  // AI_ANALYSIS: `${API_BASE_URL}/api/ai-analysis`,
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

