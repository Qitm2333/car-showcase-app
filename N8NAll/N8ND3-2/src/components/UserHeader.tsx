import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';

export default function UserHeader() {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* 左侧：用户信息 */}
        <div className="flex items-center gap-4">
          <div className="text-4xl">{user.avatar}</div>
          <div>
            <div className="font-bold text-gray-800 text-lg flex items-center gap-2">
              {user.name}
              <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">
                {user.role}
              </span>
            </div>
            <div className="text-sm text-gray-500 font-mono">
              {user.inviteCode}
            </div>
          </div>
        </div>

        {/* 右侧：操作按钮 */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/favorites')}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 font-semibold flex items-center gap-2"
          >
            🎨 去收藏
          </button>
          <button
            onClick={() => navigate('/folders')}
            className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl hover:from-green-600 hover:to-teal-600 transition-all transform hover:scale-105 font-semibold flex items-center gap-2"
          >
            📂 收藏夹
          </button>
          <button
            onClick={() => navigate('/settings')}
            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105 font-semibold flex items-center gap-2"
          >
            ⚙️ 设置
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all transform hover:scale-105 font-semibold flex items-center gap-2"
          >
            🚪 退出
          </button>
        </div>
      </div>
    </div>
  );
}

