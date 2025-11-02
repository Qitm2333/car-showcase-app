// API 配置文件

// 从 localStorage 读取配置，如果没有则使用默认值
function getApiUrl(): string {
  const savedUrl = localStorage.getItem('n8n_webhook_url');
  return savedUrl || 'https://your-n8n-instance.com/webhook/user-favorite';
}

export const API_CONFIG = {
  get USER_FAVORITE_API() {
    return getApiUrl();
  }
};

// 保存 API URL 到 localStorage
export function saveApiUrl(url: string): void {
  localStorage.setItem('n8n_webhook_url', url);
}

// 获取当前配置的 API URL
export function getCurrentApiUrl(): string {
  return getApiUrl();
}

// 测试用邀请码（兼容旧代码）
export const TEST_INVITE_CODE = 'DEMO2024';

