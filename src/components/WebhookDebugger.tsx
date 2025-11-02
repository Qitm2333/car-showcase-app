import { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '@/config/api';
import { useUser } from '@/contexts/UserContext';

/**
 * 🛠️ Webhook 调试器
 * 
 * 功能：
 * - 悬浮在页面右下角
 * - 配置所有 webhook URL
 * - 显示和调试当前用户信息
 * - 保存到 localStorage
 * - 页面刷新后自动加载
 */

interface WebhookConfig {
  LOGIN: string;
  CAR_FILTER: string;
  CAR_SEARCH: string;
  CAR_DETAIL: string;
  USER_FAVORITE: string; // 收藏夹统一 API
  AI_ANALYSIS: string; // ⭐ AI分析统一 API
  SMART_ORGANIZE: string; // 🤖 智能整理 API
}

const STORAGE_KEY = 'webhook_config';
const USER_DEBUG_KEY = 'debug_user_info'; // 🆕 调试用户信息

// 默认配置（从 api.ts 读取）
const DEFAULT_CONFIG: WebhookConfig = {
  LOGIN: API_ENDPOINTS.LOGIN,
  CAR_FILTER: API_ENDPOINTS.CAR_FILTER,
  CAR_SEARCH: API_ENDPOINTS.CAR_SEARCH,
  CAR_DETAIL: API_ENDPOINTS.CAR_DETAIL,
  USER_FAVORITE: 'https://your-n8n-url/webhook/user-favorite', // 待配置
  AI_ANALYSIS: 'https://lynn-cafa-system.app.n8n.cloud/webhook/ai-analysis', // ⭐ AI分析
  SMART_ORGANIZE: 'https://lynn-cafa-system.app.n8n.cloud/webhook/smart-organize-to-folder', // 🤖 智能整理
};

export default function WebhookDebugger() {
  const { inviteCode, setInviteCode, userName, setUserName } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<WebhookConfig>(DEFAULT_CONFIG);
  const [copied, setCopied] = useState(false);
  
  // 🆕 调试用户信息
  const [debugInviteCode, setDebugInviteCode] = useState('');
  const [debugUserName, setDebugUserName] = useState('');
  const [activeTab, setActiveTab] = useState<'webhooks' | 'user'>('webhooks');

  // 从 localStorage 加载配置
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setConfig({ ...DEFAULT_CONFIG, ...parsed });
      } catch (error) {
        console.error('加载 webhook 配置失败:', error);
      }
    }

    // 🆕 加载调试用户信息
    const savedUser = localStorage.getItem(USER_DEBUG_KEY);
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setDebugInviteCode(parsed.inviteCode || '');
        setDebugUserName(parsed.userName || '');
        // 如果当前 context 中没有用户信息，则使用调试信息
        if (!inviteCode && parsed.inviteCode) {
          setInviteCode(parsed.inviteCode);
          setUserName(parsed.userName || 'Young');
        }
      } catch (error) {
        console.error('加载用户调试信息失败:', error);
      }
    }
  }, []);

  // 同步当前用户信息到调试状态
  useEffect(() => {
    if (inviteCode) {
      setDebugInviteCode(inviteCode);
      setDebugUserName(userName);
    }
  }, [inviteCode, userName]);

  // 保存配置到 localStorage 和全局
  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    
    // 🔥 动态更新 API_ENDPOINTS（重要！）
    Object.assign(API_ENDPOINTS, {
      LOGIN: config.LOGIN,
      CAR_FILTER: config.CAR_FILTER,
      CAR_SEARCH: config.CAR_SEARCH,
      CAR_DETAIL: config.CAR_DETAIL,
    });

    // 保存收藏夹 API
    localStorage.setItem('USER_FAVORITE_API', config.USER_FAVORITE);
    
    // ⭐ 保存AI分析 API
    localStorage.setItem('n8n_ai_analysis_endpoint', config.AI_ANALYSIS);
    
    // 🤖 保存智能整理 API
    localStorage.setItem('SMART_ORGANIZE_API', config.SMART_ORGANIZE);
    
    alert('✅ 配置已保存！刷新页面后生效。');
  };

  // 重置为默认配置
  const handleReset = () => {
    if (confirm('确定要重置为默认配置吗？')) {
      setConfig(DEFAULT_CONFIG);
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem('USER_FAVORITE_API');
      alert('✅ 已重置为默认配置！');
    }
  };

  // 复制配置（JSON 格式）
  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 更新单个字段
  const handleChange = (key: keyof WebhookConfig, value: string) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  // 🆕 保存用户信息
  const handleSaveUser = () => {
    const userInfo = {
      inviteCode: debugInviteCode,
      userName: debugUserName,
    };
    localStorage.setItem(USER_DEBUG_KEY, JSON.stringify(userInfo));
    
    // 更新到 Context
    setInviteCode(debugInviteCode);
    setUserName(debugUserName);
    
    alert('✅ 用户信息已保存！');
  };

  // 🆕 清除用户信息
  const handleClearUser = () => {
    if (confirm('确定要清除当前用户信息吗？')) {
      setDebugInviteCode('');
      setDebugUserName('');
      setInviteCode('');
      setUserName('Young');
      localStorage.removeItem(USER_DEBUG_KEY);
      alert('✅ 用户信息已清除！');
    }
  };

  return (
    <>
      {/* 悬浮按钮 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[9999] w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110 flex items-center justify-center"
        title="Webhook 调试器"
      >
        <span className="text-2xl">🛠️</span>
      </button>

      {/* 配置面板 */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[9998] flex items-center justify-center p-4">
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 标题栏 */}
            <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-1">🛠️ 调试配置面板</h2>
                  <p className="text-purple-100 text-sm">配置 Webhook 端点 & 用户信息</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all"
                >
                  <span className="text-2xl">×</span>
                </button>
              </div>
              
              {/* Tab 切换 */}
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('webhooks')}
                  className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all ${
                    activeTab === 'webhooks'
                      ? 'bg-white text-purple-600'
                      : 'bg-white bg-opacity-20 hover:bg-opacity-30 text-white'
                  }`}
                >
                  🌐 Webhook 配置
                </button>
                <button
                  onClick={() => setActiveTab('user')}
                  className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all ${
                    activeTab === 'user'
                      ? 'bg-white text-purple-600'
                      : 'bg-white bg-opacity-20 hover:bg-opacity-30 text-white'
                  }`}
                >
                  👤 用户信息 {!inviteCode && <span className="ml-1 text-red-300">⚠️</span>}
                </button>
              </div>
            </div>

            {/* 配置表单 - Webhooks Tab */}
            {activeTab === 'webhooks' && (
              <div className="p-6 space-y-5">
                {/* 登录 API */}
                <ConfigField
                  label="🔐 登录 API"
                  description="用户登录验证"
                  value={config.LOGIN}
                  onChange={(v) => handleChange('LOGIN', v)}
                  placeholder="https://your-n8n-url/webhook/login"
                />

                {/* 筛选 API */}
                <ConfigField
                  label="🚗 筛选 API"
                  description="车型图片筛选"
                  value={config.CAR_FILTER}
                  onChange={(v) => handleChange('CAR_FILTER', v)}
                  placeholder="https://your-n8n-url/webhook/car-image-filter"
                />

                {/* 搜索 API */}
                <ConfigField
                  label="🔍 搜索 API"
                  description="车型搜索"
                  value={config.CAR_SEARCH}
                  onChange={(v) => handleChange('CAR_SEARCH', v)}
                  placeholder="https://your-n8n-url/webhook/get-all-car-images"
                />

                {/* 详情 API */}
                <ConfigField
                  label="📄 详情 API"
                  description="车辆详细信息"
                  value={config.CAR_DETAIL}
                  onChange={(v) => handleChange('CAR_DETAIL', v)}
                  placeholder="https://your-n8n-url/webhook/car-detail-complete"
                />

                {/* 收藏夹 API */}
                <ConfigField
                  label="⭐ 收藏夹 API"
                  description="收藏夹管理（统一接口）"
                  value={config.USER_FAVORITE}
                  onChange={(v) => handleChange('USER_FAVORITE', v)}
                  placeholder="https://your-n8n-url/webhook/user-favorite"
                  highlight
                />

                {/* ⭐ AI分析 API */}
                <ConfigField
                  label="🤖 AI分析 API"
                  description="AI对话分析与报告生成（统一接口）"
                  value={config.AI_ANALYSIS}
                  onChange={(v) => handleChange('AI_ANALYSIS', v)}
                  placeholder="https://lynn-cafa-system.app.n8n.cloud/webhook/ai-analysis"
                  highlight
                />

                {/* 🤖 智能整理 API */}
                <ConfigField
                  label="🧠 智能整理 API"
                  description="智能收集车型图片到收藏夹"
                  value={config.SMART_ORGANIZE}
                  onChange={(v) => handleChange('SMART_ORGANIZE', v)}
                  placeholder="https://lynn-cafa-system.app.n8n.cloud/webhook/smart-organize-to-folder"
                  highlight
                />
              </div>
            )}

            {/* 用户信息 Tab */}
            {activeTab === 'user' && (
              <div className="p-6 space-y-5">
                {/* 当前状态显示 */}
                <div className={`p-4 rounded-xl border-2 ${inviteCode ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-gray-800">📊 当前状态</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${inviteCode ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                      {inviteCode ? '✅ 已登录' : '⚠️ 未登录'}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">邀请码（userID）：</span>
                      <span className={`font-mono font-bold ${inviteCode ? 'text-green-700' : 'text-red-500'}`}>
                        {inviteCode || '（空）'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">用户名：</span>
                      <span className="font-bold text-gray-800">{userName}</span>
                    </div>
                  </div>
                </div>

                {/* 调试设置 */}
                <div className="p-4 rounded-xl border-2 border-purple-300 bg-purple-50">
                  <h3 className="text-sm font-bold text-gray-800 mb-3">🔧 调试设置</h3>
                  <p className="text-xs text-gray-600 mb-4">
                    💡 手动设置用户信息，用于测试收藏夹等需要登录的功能
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">邀请码（inviteCode）</label>
                      <input
                        type="text"
                        value={debugInviteCode}
                        onChange={(e) => setDebugInviteCode(e.target.value)}
                        placeholder="例如：ABC123"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">用户名（userName）</label>
                      <input
                        type="text"
                        value={debugUserName}
                        onChange={(e) => setDebugUserName(e.target.value)}
                        placeholder="例如：张三"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* 使用说明 */}
                <div className="p-4 rounded-xl bg-blue-50 border-2 border-blue-200">
                  <h3 className="text-sm font-bold text-blue-900 mb-2">📖 使用说明</h3>
                  <ul className="text-xs text-blue-800 space-y-1 list-disc list-inside">
                    <li>邀请码是 N8N 接口的 <code className="bg-blue-100 px-1 rounded">userID</code> 参数</li>
                    <li>正常情况下需要通过登录页面输入邀请码</li>
                    <li>此处可手动设置，方便测试收藏夹等功能</li>
                    <li>设置后会保存到 localStorage，刷新页面仍有效</li>
                  </ul>
                </div>
              </div>
            )}

            {/* 底部按钮 */}
            <div className="sticky bottom-0 bg-gray-50 p-6 rounded-b-2xl border-t border-gray-200">
              {activeTab === 'webhooks' && (
                <>
                  <div className="flex gap-3">
                    <button
                      onClick={handleCopy}
                      className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all font-semibold"
                    >
                      {copied ? '✅ 已复制' : '📋 复制配置'}
                    </button>
                    <button
                      onClick={handleReset}
                      className="flex-1 px-4 py-3 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-all font-semibold"
                    >
                      🔄 重置
                    </button>
                    <button
                      onClick={handleSave}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all font-semibold shadow-lg"
                    >
                      💾 保存配置
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 text-center mt-3">
                    💡 配置保存到浏览器 localStorage，刷新页面后自动加载
                  </p>
                </>
              )}

              {activeTab === 'user' && (
                <>
                  <div className="flex gap-3">
                    <button
                      onClick={handleClearUser}
                      className="flex-1 px-4 py-3 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-all font-semibold"
                    >
                      🗑️ 清除信息
                    </button>
                    <button
                      onClick={handleSaveUser}
                      disabled={!debugInviteCode.trim()}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      💾 保存用户信息
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 text-center mt-3">
                    💡 用户信息保存后，可直接使用收藏夹等功能
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// 配置字段组件
interface ConfigFieldProps {
  label: string;
  description: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  highlight?: boolean;
}

function ConfigField({ label, description, value, onChange, placeholder, highlight }: ConfigFieldProps) {
  return (
    <div className={`p-4 rounded-xl border-2 ${highlight ? 'border-purple-300 bg-purple-50' : 'border-gray-200 bg-gray-50'}`}>
      <div className="mb-2">
        <label className="block text-sm font-bold text-gray-800 mb-1">{label}</label>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-sm"
      />
    </div>
  );
}

