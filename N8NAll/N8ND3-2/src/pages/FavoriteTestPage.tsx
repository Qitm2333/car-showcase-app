import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addToFavorite, FavoriteFolder } from '@/services/favoriteService';
import { useUser } from '@/contexts/UserContext';
import { useFolderCache } from '@/contexts/FolderCacheContext';
import UserHeader from '@/components/UserHeader';

// 超级丰富的测试数据 - 各种车型场景
const TEST_CARS = [
  // 外观系列
  { id: 1, name: '🚗 智己L6', emoji: '🌟', category: '外观', viewType: '正45°', color: 'from-blue-400 to-blue-600' },
  { id: 2, name: '🏎️ 小米SU7', emoji: '⚡', category: '外观', viewType: '侧面', color: 'from-orange-400 to-orange-600' },
  { id: 3, name: '🚙 理想L9', emoji: '👑', category: '外观', viewType: '正面', color: 'from-green-400 to-green-600' },
  { id: 4, name: '🛻 问界M9', emoji: '💎', category: '外观', viewType: '背面', color: 'from-purple-400 to-purple-600' },
  { id: 5, name: '🚐 极氪009', emoji: '🎯', category: '外观', viewType: '全景', color: 'from-pink-400 to-pink-600' },
  
  // 内饰系列
  { id: 6, name: '🪑 宝马iX', emoji: '🎨', category: '内饰', viewType: '中控台', color: 'from-indigo-400 to-indigo-600' },
  { id: 7, name: '🎛️ 奔驰EQS', emoji: '✨', category: '内饰', viewType: '仪表盘', color: 'from-cyan-400 to-cyan-600' },
  { id: 8, name: '🛋️ 蔚来ET7', emoji: '🌈', category: '内饰', viewType: '座椅', color: 'from-teal-400 to-teal-600' },
  { id: 9, name: '📱 极氪001', emoji: '🎪', category: '内饰', viewType: '车机', color: 'from-rose-400 to-rose-600' },
  { id: 10, name: '🎵 比亚迪汉', emoji: '🎭', category: '内饰', viewType: '音响', color: 'from-amber-400 to-amber-600' },
  
  // 细节系列
  { id: 11, name: '💡 奥迪Q4', emoji: '🔆', category: '细节', viewType: '大灯', color: 'from-yellow-400 to-yellow-600' },
  { id: 12, name: '⚙️ 特斯拉Model S', emoji: '🔧', category: '细节', viewType: '轮毂', color: 'from-lime-400 to-lime-600' },
  { id: 13, name: '🚪 保时捷Taycan', emoji: '🎁', category: '细节', viewType: '车门', color: 'from-emerald-400 to-emerald-600' },
  { id: 14, name: '🪟 沃尔沃EX90', emoji: '🌠', category: '细节', viewType: '天窗', color: 'from-sky-400 to-sky-600' },
  { id: 15, name: '🔌 Polestar 2', emoji: '⚡', category: '细节', viewType: '充电口', color: 'from-violet-400 to-violet-600' },
  
  // SUV系列
  { id: 16, name: '🏔️ 坦克300', emoji: '🦾', category: 'SUV', viewType: '越野', color: 'from-stone-400 to-stone-600' },
  { id: 17, name: '🌲 路虎卫士', emoji: '🏕️', category: 'SUV', viewType: '野外', color: 'from-green-600 to-green-800' },
  { id: 18, name: '🗻 吉普牧马人', emoji: '🚵', category: 'SUV', viewType: '山地', color: 'from-orange-600 to-orange-800' },
  { id: 19, name: '🏖️ 丰田普拉多', emoji: '🏝️', category: 'SUV', viewType: '沙滩', color: 'from-cyan-600 to-cyan-800' },
  { id: 20, name: '❄️ 日产途乐', emoji: '⛷️', category: 'SUV', viewType: '雪地', color: 'from-blue-600 to-blue-800' },
  
  // 运动系列
  { id: 21, name: '🏁 法拉利SF90', emoji: '🔥', category: '运动', viewType: '赛道', color: 'from-red-500 to-red-700' },
  { id: 22, name: '💨 兰博基尼Huracán', emoji: '⚡', category: '运动', viewType: '起步', color: 'from-yellow-500 to-yellow-700' },
  { id: 23, name: '🌪️ 迈凯伦720S', emoji: '💫', category: '运动', viewType: '飘移', color: 'from-orange-500 to-orange-700' },
  { id: 24, name: '🎯 保时捷911', emoji: '🎪', category: '运动', viewType: '弯道', color: 'from-gray-500 to-gray-700' },
];

interface FavoriteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (folderID: string | undefined) => void;
  onNavigateToFolders: () => void;
  folders: FavoriteFolder[];
  favoriteCounts: Record<string, number>;
  isLoading: boolean;
}

function FavoriteDialog({ isOpen, onClose, onSelect, onNavigateToFolders, folders, favoriteCounts, isLoading }: FavoriteDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scale-in">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <span className="text-3xl">💝</span>
            选择收藏夹
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-all"
          >
            ✕
          </button>
        </div>
        
        {isLoading ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2 animate-spin">⏳</div>
            <p>加载收藏夹中...</p>
          </div>
        ) : folders.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">📂</div>
            <p className="text-gray-600 mb-4">还没有收藏夹</p>
            <p className="text-gray-500 text-sm mb-4">请先去创建一个收藏夹吧！</p>
            <button
              onClick={onNavigateToFolders}
              className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all font-semibold"
            >
              📂 去创建收藏夹
            </button>
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {/* 显示所有文件夹（包括默认收藏夹，直接从 API 加载） */}
            {folders.map((folder) => (
              <button
                key={folder.folderID}
                onClick={() => onSelect(folder.folderID)}
                className="w-full p-4 rounded-xl border-2 border-gray-200 hover:border-purple-400 hover:bg-purple-50 transition-all text-left flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl group-hover:scale-110 transition-transform">
                    {folder.folderIcon}
                  </span>
                  <span className="font-semibold text-gray-700 group-hover:text-purple-600">
                    {folder.folderName}
                  </span>
                </div>
                <span className="text-sm text-gray-400 group-hover:text-purple-500">
                  {favoriteCounts[folder.folderID] || 0} 项
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function FavoriteTestPage() {
  const navigate = useNavigate();
  const { user, inviteCode } = useUser();
  const [selectedCar, setSelectedCar] = useState<typeof TEST_CARS[0] | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  
  // 🚀 使用缓存数据（不再需要 useEffect 加载）
  const { 
    folders, 
    favoriteCounts, 
    isLoading: isLoadingFolders, 
    incrementFolderCount,
    decrementFolderCount,  // 🆕 用于回滚操作
    refreshCounts 
  } = useFolderCache();

  const handleFavoriteClick = (car: typeof TEST_CARS[0]) => {
    setSelectedCar(car);
    setShowDialog(true);
  };

  const handleFolderSelect = async (folderID: string | undefined) => {
    if (!selectedCar || !folderID) return;

    // 🎯 1. 立即关闭对话框
    setShowDialog(false);

    // 🎯 2. 立即更新 UI（乐观更新）
    const folderName = folders.find(f => f.folderID === folderID)?.folderName || '收藏夹';
    const carID = selectedCar.id;
    
    // 立即标记为已收藏
    setFavorites(prev => new Set([...prev, carID]));
    
    // 立即更新计数
    incrementFolderCount(folderID);
    
    // 立即显示成功提示
    setMessage({ type: 'success', text: `✅ ${selectedCar.emoji} 正在添加到「${folderName}」...` });

    // 🎯 3. 后台调用 API（异步）
    try {
      const result = await addToFavorite({
        userID: inviteCode,
        carID: String(carID),
        carName: selectedCar.name,
        imageURL: `https://example.com/car-${carID}.jpg`,
        folderID: folderID,
      });

      if (result.success) {
        // ✅ API 成功，更新提示文字
        setMessage({ type: 'success', text: `✅ ${selectedCar.emoji} 已成功添加到「${folderName}」！` });
        console.log('✅ 收藏成功，已同步到服务器');
        
        // 🔄 2秒后在后台同步真实数据（确保一致性）
        setTimeout(() => {
          refreshCounts();
        }, 2000);
      } else {
        // ❌ API 返回失败，回滚 UI 更新
        console.error('❌ 收藏失败（API返回失败）:', result.message);
        setFavorites(prev => {
          const newSet = new Set(prev);
          newSet.delete(carID);
          return newSet;
        });
        decrementFolderCount(folderID); // 回滚计数
        setMessage({ type: 'error', text: `❌ 收藏失败：${result.message}` });
      }
    } catch (error) {
      // ❌ 网络错误，回滚 UI 更新
      console.error('❌ 收藏失败（网络错误）:', error);
      setFavorites(prev => {
        const newSet = new Set(prev);
        newSet.delete(carID);
        return newSet;
      });
      decrementFolderCount(folderID); // 回滚计数
      setMessage({ type: 'error', text: '❌ 网络错误，请检查 N8N 配置' });
    }

    // 🎯 4. 3秒后清除提示
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <UserHeader />
      
      <div className="min-h-screen p-6 pt-24">
      {/* 顶部标题 */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="text-center mb-6">
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            🎉 欢迎，{user?.name}！🎉
          </h1>
          <p className="text-gray-600 text-lg mb-3">
            点击卡片右上角的 <span className="text-red-500">❤️</span> 按钮即可收藏到你的专属文件夹
          </p>
          {folders.length > 0 && (
            <p className="text-purple-600 text-sm font-semibold">
              📂 你有 {folders.length} 个自定义收藏夹可以选择！
            </p>
          )}
        </div>

        {/* 提示信息 */}
        {message && (
          <div className={`max-w-md mx-auto p-4 rounded-xl mb-6 text-center font-semibold text-lg animate-bounce ${
            message.type === 'success' 
              ? 'bg-green-100 text-green-700 border-2 border-green-300' 
              : 'bg-red-100 text-red-700 border-2 border-red-300'
          }`}>
            {message.text}
          </div>
        )}
      </div>

      {/* 卡片网格 */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {TEST_CARS.map((car) => (
          <div
            key={car.id}
            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-purple-300 transform hover:-translate-y-1"
          >
            {/* 收藏按钮 */}
            <button
              onClick={() => handleFavoriteClick(car)}
              className={`absolute top-3 right-3 z-10 w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all transform hover:scale-125 ${
                favorites.has(car.id)
                  ? 'bg-red-500 text-white shadow-lg'
                  : 'bg-white/90 hover:bg-red-500 hover:text-white shadow-md'
              }`}
            >
              {favorites.has(car.id) ? '💖' : '🤍'}
            </button>

            {/* 卡片内容 */}
            <div className={`bg-gradient-to-br ${car.color} p-8 text-white`}>
              <div className="text-center">
                <div className="text-7xl mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-transform">
                  {car.emoji}
                </div>
                <div className="text-2xl font-bold mb-2">{car.name}</div>
              </div>
            </div>

            <div className="p-4 bg-white">
              <div className="flex items-center justify-between text-sm">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-semibold">
                  📂 {car.category}
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-semibold">
                  📐 {car.viewType}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 收藏夹选择对话框 */}
      <FavoriteDialog
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
        onSelect={handleFolderSelect}
        onNavigateToFolders={() => {
          setShowDialog(false);
          navigate('/folders');
        }}
        folders={folders}
        favoriteCounts={favoriteCounts}
        isLoading={isLoadingFolders}
      />

      {/* 底部说明 */}
      <div className="max-w-4xl mx-auto mt-12 p-6 bg-white rounded-2xl shadow-lg border-2 border-purple-200">
        <h3 className="text-2xl font-bold mb-4 text-center text-purple-600">
          🔧 配置说明
        </h3>
        <div className="space-y-3 text-gray-700">
          <p className="flex items-start gap-2">
            <span className="text-xl">1️⃣</span>
            <span>在 Google Sheets 创建 <code className="px-2 py-1 bg-gray-100 rounded">CarFavoritesSystem</code> 表格</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-xl">2️⃣</span>
            <span>在 N8N 中配置 4 个工作流（获取列表、获取详情、添加收藏、创建文件夹）</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-xl">3️⃣</span>
            <span>更新 <code className="px-2 py-1 bg-gray-100 rounded">src/config/api.ts</code> 中的 Webhook URL</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-xl">4️⃣</span>
            <span>点击 ❤️ 按钮测试收藏功能，数据会存储到 Google Sheets</span>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
      `}</style>
      </div>
    </div>
  );
}

