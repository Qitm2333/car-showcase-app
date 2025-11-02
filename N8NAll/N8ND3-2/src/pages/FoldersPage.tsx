import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { useFolderCache } from '@/contexts/FolderCacheContext';
import {
  createFolder,
  deleteFolder,
  FavoriteFolder,
} from '@/services/favoriteService';
import UserHeader from '@/components/UserHeader';

// 预设的 emoji 图标
const PRESET_ICONS = [
  '📁', '💖', '⭐', '🚗', '⚡', '🌟', '📌', '🎯',
  '🔥', '💎', '🎨', '🌈', '🎪', '🎭', '🎬', '🎸',
  '🏆', '🎁', '🎀', '🎊', '🎉', '🎈', '🎓', '🎯',
];

export default function FoldersPage() {
  const navigate = useNavigate();
  const { user, inviteCode } = useUser();
  
  // 🚀 使用缓存数据
  const { 
    folders, 
    favoriteCounts, 
    isLoading, 
    error: cacheError,
    refreshAll 
  } = useFolderCache();
  
  const [error, setError] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('📁');
  const [isCreating, setIsCreating] = useState(false);


  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) {
      alert('请输入收藏夹名称');
      return;
    }

    setIsCreating(true);
    try {
      console.log('开始创建收藏夹:', {
        userID: inviteCode,
        folderName: newFolderName.trim(),
        folderIcon: selectedIcon,
      });

      const result = await createFolder({
        userID: inviteCode,
        folderName: newFolderName.trim(),
        folderIcon: selectedIcon,
      });

      console.log('创建收藏夹返回结果:', result);

      if (result.success) {
        // 关闭对话框
        setShowCreateDialog(false);
        setNewFolderName('');
        setSelectedIcon('📁');
        
        console.log('✅ 收藏夹创建成功，刷新缓存');
        
        // 🚀 刷新缓存数据
        await refreshAll();
      } else {
        console.error('创建失败（success=false）:', result.message);
        alert('创建失败：' + (result.message || '未知错误'));
      }
    } catch (error) {
      console.error('创建收藏夹异常:', error);
      alert('创建失败：网络错误或服务异常');
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteFolder = async (folderID: string, folderName: string) => {
    if (!confirm(`确定要删除收藏夹"${folderName}"吗？该文件夹内的收藏不会被删除。`)) {
      return;
    }

    try {
      const result = await deleteFolder(inviteCode, folderID);
      if (result.success) {
        console.log('✅ 收藏夹删除成功，刷新缓存');
        // 🚀 刷新缓存数据
        await refreshAll();
      } else {
        alert('删除失败：' + result.message);
      }
    } catch (error) {
      alert('删除失败');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <UserHeader />

      <div className="min-h-screen p-6 pt-24">
        <div className="max-w-7xl mx-auto">
          {/* 标题 */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              📂 收藏夹管理
            </h1>
            <p className="text-gray-600 text-lg">
              {user?.name} 的收藏夹 - 共 {folders.length} 个文件夹
              {Object.keys(favoriteCounts).length > 0 && (
                <span className="ml-2 text-purple-600 font-semibold">
                  · {Object.values(favoriteCounts).reduce((sum, count) => sum + count, 0)} 张收藏
                </span>
              )}
            </p>
          </div>

          {/* 创建按钮 */}
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setShowCreateDialog(true)}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 font-semibold shadow-lg flex items-center gap-2"
            >
              ➕ 创建新收藏夹
            </button>
          </div>

          {isLoading && <div className="text-center text-gray-500 text-lg">加载中...</div>}
          {(error || cacheError) && <div className="text-center text-red-500 text-lg">{error || cacheError}</div>}

          {!isLoading && !error && !cacheError && folders.length === 0 && (
            <div className="text-center text-gray-500 text-lg mt-10">
              暂无收藏夹。快来创建一个吧！
            </div>
          )}

          {/* 收藏夹列表 */}
          {!isLoading && !error && !cacheError && folders.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {folders.map((folder) => (
                <div
                  key={folder.folderID}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-purple-300 transform hover:-translate-y-1 cursor-pointer"
                  onClick={() =>
                    navigate('/favorites/list', { state: { folderID: folder.folderID } })
                  }
                >
                  {/* 删除按钮 */}
                  <div className="relative p-6">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteFolder(folder.folderID, folder.folderName);
                      }}
                      className="absolute top-3 right-3 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-all transform hover:scale-110 opacity-0 group-hover:opacity-100 text-sm"
                      title="删除收藏夹"
                    >
                      🗑️
                    </button>

                    {/* 图标 */}
                    <div className="text-6xl mb-4 text-center">{folder.folderIcon}</div>

                    {/* 名称 */}
                    <h3 className="font-bold text-gray-800 text-xl mb-2 text-center truncate">
                      {folder.folderName}
                    </h3>

                    {/* 收藏数量 */}
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full">
                        <span className="text-purple-700 font-semibold text-sm">
                          📸 {favoriteCounts[folder.folderID] || 0} 张
                        </span>
                      </div>
                    </div>

                    {/* 创建时间 */}
                    <p className="text-gray-400 text-sm text-center">
                      {new Date(folder.createTime).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 创建收藏夹对话框 */}
      {showCreateDialog && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowCreateDialog(false)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              创建新收藏夹
            </h2>

            {/* 收藏夹名称 */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                收藏夹名称
              </label>
              <input
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                placeholder="例如：我的最爱、豪华车系"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all"
                maxLength={20}
              />
            </div>

            {/* 选择图标 */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-3">
                选择图标
              </label>
              <div className="grid grid-cols-8 gap-2">
                {PRESET_ICONS.map((icon) => (
                  <button
                    key={icon}
                    onClick={() => setSelectedIcon(icon)}
                    className={`text-3xl p-3 rounded-xl transition-all transform hover:scale-110 ${
                      selectedIcon === icon
                        ? 'bg-purple-500 shadow-lg ring-4 ring-purple-200'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* 按钮 */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowCreateDialog(false)}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all font-semibold"
                disabled={isCreating}
              >
                取消
              </button>
              <button
                onClick={handleCreateFolder}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all font-semibold disabled:opacity-50"
                disabled={isCreating}
              >
                {isCreating ? '创建中...' : '创建'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

