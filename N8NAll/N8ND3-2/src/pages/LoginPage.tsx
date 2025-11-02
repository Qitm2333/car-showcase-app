import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser, USERS } from '@/contexts/UserContext';
import { saveApiUrl, getCurrentApiUrl } from '@/config/api';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useUser();
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [configSaved, setConfigSaved] = useState(false);

  useEffect(() => {
    setWebhookUrl(getCurrentApiUrl());
  }, []);

  const handleLogin = () => {
    if (selectedUser) {
      setIsAnimating(true);
      login(selectedUser);
      
      // 延迟跳转，让动画播放
      setTimeout(() => {
        navigate('/favorites');
      }, 600);
    }
  };

  const handleUserSelect = (userId: string) => {
    setSelectedUser(userId);
    // 自动登录
    setTimeout(() => {
      setIsAnimating(true);
      login(userId);
      setTimeout(() => {
        navigate('/favorites');
      }, 600);
    }, 200);
  };

  const handleSaveConfig = () => {
    if (webhookUrl.trim()) {
      saveApiUrl(webhookUrl.trim());
      setConfigSaved(true);
      setTimeout(() => setConfigSaved(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center p-6">
      <div className={`bg-white rounded-3xl shadow-2xl max-w-4xl w-full p-8 transform transition-all duration-500 ${
        isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
      }`}>
        {/* 配置区域 */}
        <div className="mb-6">
          <button
            onClick={() => setShowConfig(!showConfig)}
            className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl hover:from-blue-100 hover:to-purple-100 transition-all"
          >
            <span className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              ⚙️ API 配置
            </span>
            <span className="text-2xl">{showConfig ? '▼' : '▶'}</span>
          </button>
          
          {showConfig && (
            <div className="mt-4 p-6 bg-gray-50 rounded-xl border-2 border-gray-200">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                N8N Webhook URL：
              </label>
              <input
                type="text"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="https://your-n8n-instance.com/webhook/user-favorite"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all mb-3"
              />
              <button
                onClick={handleSaveConfig}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 font-semibold"
              >
                💾 保存配置
              </button>
              {configSaved && (
                <div className="mt-3 p-3 bg-green-100 border-2 border-green-300 rounded-xl text-green-700 text-center font-semibold">
                  ✅ 配置已保存！
                </div>
              )}
              <p className="mt-3 text-sm text-gray-500">
                💡 提示：从 N8N 的 "收藏入口" 节点复制 Production URL
              </p>
            </div>
          )}
        </div>

        {/* 标题 */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4 animate-bounce">🚗</div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-2">
            收藏夹系统
          </h1>
          <p className="text-gray-500 text-lg">选择你的账户开始使用</p>
        </div>

        {/* 用户选择 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {Object.entries(USERS).map(([id, user]) => (
            <button
              key={id}
              onClick={() => handleUserSelect(id)}
              className={`p-6 rounded-2xl border-3 transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                selectedUser === id
                  ? 'border-purple-500 bg-purple-50 shadow-lg scale-105'
                  : 'border-gray-200 hover:border-purple-300 bg-white'
              }`}
            >
              <div className="text-center">
                <div className="text-5xl mb-3 transform transition-transform group-hover:scale-110">
                  {user.avatar}
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  {id} - {user.name}
                </div>
                <div className="text-sm text-gray-500 mb-2">{user.role}</div>
                <div className="text-xs font-mono bg-gray-100 text-gray-600 px-3 py-1 rounded-full inline-block">
                  {user.inviteCode}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* 快速输入 */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
          <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
            <span>⌨️</span>
            快速登录
          </h3>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-gray-600">输入账户编号：</span>
            <input
              type="text"
              value={selectedUser}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '' || (value >= '1' && value <= '5')) {
                  setSelectedUser(value);
                }
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && selectedUser) {
                  handleLogin();
                }
              }}
              placeholder="1-5"
              className="w-20 px-4 py-2 text-2xl font-bold text-center border-2 border-purple-300 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all"
              autoFocus
            />
            <button
              onClick={handleLogin}
              disabled={!selectedUser}
              className={`px-6 py-2 rounded-xl font-bold text-white transition-all transform ${
                selectedUser
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 hover:scale-105 shadow-lg'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              登录 →
            </button>
          </div>
          <div className="text-sm text-gray-500">
            💡 提示：直接点击用户卡片或输入 1-5 后按回车登录
          </div>
        </div>

        {/* 说明 */}
        <div className="mt-6 text-center text-gray-400 text-sm">
          <p>🔐 本地测试账户 - 无需密码</p>
          <p className="mt-1">每个账户拥有独立的收藏数据</p>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-bounce {
          animation: bounce 2s infinite;
        }
      `}</style>
    </div>
  );
}

