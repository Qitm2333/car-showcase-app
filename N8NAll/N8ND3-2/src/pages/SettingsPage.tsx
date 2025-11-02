import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveApiUrl, getCurrentApiUrl } from '@/config/api';
import UserHeader from '@/components/UserHeader';

export default function SettingsPage() {
  const navigate = useNavigate();
  const [webhookUrl, setWebhookUrl] = useState('');
  const [configSaved, setConfigSaved] = useState(false);

  useEffect(() => {
    setWebhookUrl(getCurrentApiUrl());
  }, []);

  const handleSaveConfig = () => {
    if (webhookUrl.trim()) {
      saveApiUrl(webhookUrl.trim());
      setConfigSaved(true);
      setTimeout(() => setConfigSaved(false), 3000);
    }
  };

  const handleReset = () => {
    const defaultUrl = 'https://your-n8n-instance.com/webhook/user-favorite';
    setWebhookUrl(defaultUrl);
    saveApiUrl(defaultUrl);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <UserHeader />
      
      <div className="min-h-screen p-6 pt-24">
        <div className="max-w-3xl mx-auto">
          {/* 标题 */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              ⚙️ 系统设置
            </h1>
            <p className="text-gray-600 text-lg">
              配置 N8N API 地址
            </p>
          </div>

          {/* 配置卡片 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-purple-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              🔗 API 配置
            </h2>

            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-3">
                N8N Webhook URL
              </label>
              <input
                type="text"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="https://your-n8n-instance.com/webhook/user-favorite"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all text-sm font-mono"
              />
              <p className="mt-2 text-sm text-gray-500">
                💡 从 N8N 的 "收藏入口" 节点复制 Production URL
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSaveConfig}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 font-semibold"
              >
                💾 保存配置
              </button>
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all font-semibold"
              >
                🔄 重置
              </button>
            </div>

            {configSaved && (
              <div className="mt-4 p-4 bg-green-100 border-2 border-green-300 rounded-xl text-green-700 text-center font-semibold animate-bounce">
                ✅ 配置已保存！刷新页面后生效
              </div>
            )}
          </div>

          {/* 说明卡片 */}
          <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              📚 配置说明
            </h3>
            <div className="space-y-3 text-gray-700">
              <p className="flex items-start gap-2">
                <span className="text-xl">1️⃣</span>
                <span>在 N8N 中找到 "收藏入口" Webhook 节点</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-xl">2️⃣</span>
                <span>复制 Production URL（类似 https://xxx.app.n8n.cloud/webhook/user-favorite）</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-xl">3️⃣</span>
                <span>粘贴到上面的输入框</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-xl">4️⃣</span>
                <span>点击"保存配置"</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-xl">5️⃣</span>
                <span>刷新页面，开始使用收藏功能</span>
              </p>
            </div>
          </div>

          {/* 测试按钮 */}
          <div className="mt-6 flex gap-3">
            <button
              onClick={() => navigate('/favorites')}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all font-semibold"
            >
              🎨 去收藏
            </button>
            <button
              onClick={() => navigate('/favorites/list')}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all font-semibold"
            >
              💖 我的收藏
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

