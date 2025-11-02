import { useState, useEffect } from 'react';
import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { useFolderCache } from '@/contexts/FolderCacheContext';
import { 
  getFavoriteList, 
  getFolderList,
  deleteFavorite, 
  FavoriteItem, 
  FavoriteFolder 
} from '@/services/favoriteService';
import UserHeader from '@/components/UserHeader';

export default function FavoritesListPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, inviteCode } = useUser();
  const { incrementFolderCount, decrementFolderCount } = useFolderCache(); // 🆕 用于乐观更新和回滚
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [currentFolder, setCurrentFolder] = useState<FavoriteFolder | null>(null);
  const [allFolders, setAllFolders] = useState<FavoriteFolder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  
  // 从路由状态中获取 folderID
  const folderID = location.state?.folderID;

  useEffect(() => {
    if (inviteCode) {
      loadData();
    }
  }, [inviteCode, folderID]);

  const loadData = async () => {
    if (!inviteCode) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      console.log('开始加载数据，folderID:', folderID);
      
      // 先加载收藏列表
      const favoritesResult = await getFavoriteList(inviteCode, folderID);
      console.log('收藏列表结果:', favoritesResult);
      
      if (favoritesResult.success) {
        setFavorites(favoritesResult.favorites || []);
      } else {
        setError('加载收藏失败');
        setIsLoading(false);
        return;
      }

      // 再加载文件夹列表
      const foldersResult = await getFolderList(inviteCode);
      console.log('文件夹列表结果:', foldersResult);
      
      if (foldersResult.success) {
        setAllFolders(foldersResult.folders || []);
        // 如果指定了 folderID，找到对应的文件夹信息
        if (folderID) {
          const folder = (foldersResult.folders || []).find(f => f.folderID === folderID);
          setCurrentFolder(folder || null);
        } else {
          setCurrentFolder(null);
        }
      }
    } catch (error) {
      console.error('加载数据失败:', error);
      setError('网络错误，请刷新重试');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (favoriteID: string) => {
    if (!confirm('确定要取消收藏吗？')) return;
    
    // 🎯 1. 找到要删除的收藏项（用于备份和恢复）
    const favoriteToDelete = favorites.find(f => f.favoriteID === favoriteID);
    if (!favoriteToDelete) {
      alert('未找到该收藏项');
      return;
    }
    
    // 🎯 2. 立即从列表移除（乐观更新）
    const newFavorites = favorites.filter(f => f.favoriteID !== favoriteID);
    setFavorites(newFavorites);
    
    // 🎯 3. 立即更新计数 -1
    if (favoriteToDelete.folderID) {
      decrementFolderCount(favoriteToDelete.folderID);
    }
    
    console.log(`🗑️ 正在删除收藏 ${favoriteID}...`);
    
    // 🎯 4. 后台调用 API（异步）
    try {
      const result = await deleteFavorite(inviteCode, favoriteID);
      
      if (result.success) {
        // ✅ API 成功，保持当前状态
        console.log('✅ 删除成功，已同步到服务器');
      } else {
        // ❌ API 返回失败，回滚 UI 更新
        console.error('❌ 删除失败（API返回失败）:', result.message);
        setFavorites(prev => [...prev, favoriteToDelete]); // 恢复到列表
        if (favoriteToDelete.folderID) {
          incrementFolderCount(favoriteToDelete.folderID); // 恢复计数
        }
        alert('取消失败：' + result.message);
      }
    } catch (error) {
      // ❌ 网络错误，回滚 UI 更新
      console.error('❌ 删除失败（网络错误）:', error);
      setFavorites(prev => [...prev, favoriteToDelete]); // 恢复到列表
      if (favoriteToDelete.folderID) {
        incrementFolderCount(favoriteToDelete.folderID); // 恢复计数
      }
      alert('取消失败：网络错误');
    }
  };

  // 按文件夹分组收藏（安全处理）
  const favoritesByFolder = React.useMemo(() => {
    if (!Array.isArray(favorites) || favorites.length === 0) {
      return {};
    }
    return favorites.reduce((acc, fav) => {
      if (!fav) return acc;
      // 🎯 直接使用 folderID 进行分组
      const fid = fav.folderID || 'no_folder';
      if (!acc[fid]) {
        acc[fid] = [];
      }
      acc[fid].push(fav);
      return acc;
    }, {} as Record<string, FavoriteItem[]>);
  }, [favorites]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <UserHeader />
      
      <div className="min-h-screen p-6 pt-24">
        <div className="max-w-7xl mx-auto">
          {/* 面包屑导航 */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <button
                onClick={() => navigate('/folders')}
                className="hover:text-purple-600 transition-colors"
              >
                📂 收藏夹
              </button>
              <span>→</span>
              {currentFolder ? (
                <>
                  <span className="text-purple-600 font-semibold">
                    {currentFolder.folderIcon} {currentFolder.folderName}
                  </span>
                </>
              ) : (
                <span className="text-purple-600 font-semibold">所有收藏</span>
              )}
            </div>
          </div>

          {/* 标题 */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              {currentFolder ? (
                <>
                  {currentFolder.folderIcon} {currentFolder.folderName}
                </>
              ) : (
                '💖 我的收藏'
              )}
            </h1>
            <p className="text-gray-600 text-lg">
              {user?.name} 的专属收藏空间
            </p>
          </div>

          {/* 加载状态 */}
          {isLoading && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4 animate-bounce">⏳</div>
              <p className="text-gray-500 text-xl">加载中...</p>
            </div>
          )}

          {/* 错误提示 */}
          {error && (
            <div className="max-w-md mx-auto p-6 bg-red-100 border-2 border-red-300 rounded-2xl text-center">
              <div className="text-4xl mb-3">❌</div>
              <p className="text-red-700 font-semibold">{error}</p>
              <button
                onClick={loadFavorites}
                className="mt-4 px-6 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all"
              >
                重试
              </button>
            </div>
          )}

          {/* 空状态 */}
          {!isLoading && !error && favorites.length === 0 && (
            <div className="text-center py-20">
              <div className="text-8xl mb-6">📭</div>
              <h3 className="text-3xl font-bold text-gray-700 mb-4">
                {currentFolder ? `"${currentFolder.folderName}" 还是空的` : '还没有收藏'}
              </h3>
              <p className="text-gray-500 mb-6">
                {currentFolder ? '快去添加一些收藏到这个文件夹吧！' : '快去收藏你喜欢的车型吧！'}
              </p>
              <div className="flex gap-3 justify-center">
                {currentFolder && (
                  <button
                    onClick={() => navigate('/favorites/list')}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-semibold"
                  >
                    ← 返回所有收藏
                  </button>
                )}
                <button
                  onClick={() => navigate('/favorites')}
                  className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 font-semibold text-lg"
                >
                  去收藏 →
                </button>
              </div>
            </div>
          )}

          {/* 收藏列表 */}
          {!isLoading && !error && favorites.length > 0 && (
            <>
              <div className="mb-6 flex items-center justify-between">
                <p className="text-gray-600 text-lg">
                  共 <span className="font-bold text-purple-600">{favorites.length}</span> 个收藏
                </p>
                <div className="flex gap-3">
                  {currentFolder && (
                    <button
                      onClick={() => navigate('/favorites/list')}
                      className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-all"
                    >
                      查看所有
                    </button>
                  )}
                  <button
                    onClick={() => navigate('/favorites')}
                    className="px-4 py-2 bg-purple-100 text-purple-600 rounded-xl hover:bg-purple-200 transition-all"
                  >
                    继续收藏 →
                  </button>
                </div>
              </div>

              {/* 如果没有指定文件夹且有多个文件夹，按文件夹分组显示 */}
              {!currentFolder && Array.isArray(allFolders) && allFolders.length > 0 && Object.keys(favoritesByFolder).length > 0 ? (
                <div className="space-y-8">
                  {/* 按文件夹分组显示所有收藏（包括默认收藏夹） */}
                  {Array.isArray(allFolders) && allFolders.map((folder) => {
                    if (!folder || !folder.folderID) return null;
                    const folderFavorites = favoritesByFolder[folder.folderID] || [];
                    if (folderFavorites.length === 0) return null;
                    
                    return (
                      <div key={folder.folderID}>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                          {folder.folderIcon} {folder.folderName}
                          <span className="text-sm text-gray-500 font-normal">
                            ({folderFavorites.length})
                          </span>
                          <button
                            onClick={() => navigate('/favorites/list', { state: { folderID: folder.folderID } })}
                            className="ml-auto text-sm text-purple-600 hover:text-purple-700 font-normal"
                          >
                            查看全部 →
                          </button>
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                          {folderFavorites.map((item) => (
                            <FavoriteCard key={item.favoriteID} item={item} onDelete={handleDelete} />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                  
                  {/* 显示没有文件夹的收藏（如果有的话） */}
                  {favoritesByFolder['no_folder']?.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        📁 未分类收藏
                        <span className="text-sm text-gray-500 font-normal">
                          ({favoritesByFolder['no_folder'].length})
                        </span>
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {favoritesByFolder['no_folder'].map((item) => (
                          <FavoriteCard key={item.favoriteID} item={item} onDelete={handleDelete} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {favorites.map((item) => (
                    <FavoriteCard key={item.favoriteID} item={item} onDelete={handleDelete} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// 收藏卡片组件
function FavoriteCard({ item, onDelete }: { item: FavoriteItem; onDelete: (id: string) => void }) {
  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-purple-300 transform hover:-translate-y-1">
      {/* 删除按钮 */}
      <div className="relative">
        <button
          onClick={() => onDelete(item.favoriteID)}
          className="absolute top-3 right-3 z-10 w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-all transform hover:scale-110 shadow-lg opacity-0 group-hover:opacity-100"
          title="取消收藏"
        >
          🗑️
        </button>
        
        {/* 图片 */}
        <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 relative overflow-hidden">
          <img
            src={item.imageURL}
            alt={item.carName}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23f0f0f0" width="100" height="100"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3E🚗%3C/text%3E%3C/svg%3E';
            }}
          />
        </div>
      </div>

      {/* 信息 */}
      <div className="p-4">
        <h3 className="font-bold text-gray-800 text-lg mb-2 truncate">
          {item.carName}
        </h3>
        <div className="flex items-center justify-between text-sm">
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-semibold text-xs">
            ID: {item.carID}
          </span>
          <span className="text-gray-400 text-xs">
            {new Date(item.favoriteTime).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}

