import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Component03FavoritesGbzLayout from "@/imports/favorites-main/03收藏夹页面GbzLayout";
import LeftNavOverlay from "@/components/LeftNavOverlay";
import { useFolderCache } from "@/contexts/FolderCacheContext";
import { useUser } from "@/contexts/UserContext";
import { createFolder, deleteFolder } from "@/services/favoriteService";
import FavoriteIcon from "@/components/FavoriteIcon";

export default function FavoritesMain() {
  const navigate = useNavigate();
  const { inviteCode } = useUser();
  const { 
    folders, 
    favoriteCounts, 
    isLoading, 
    refreshAll, 
    addFolderOptimistically, 
    removeFolderOptimistically,
    replaceFolderID 
  } = useFolderCache();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('folder'); // 改为图标名称
  const [isCreating, setIsCreating] = useState(false);

  // 🗂️ 点击收藏夹卡片，跳转到详情页
  const handleFolderClick = (folderID: string) => {
    console.log('🗂️ 点击收藏夹:', folderID);
    navigate(`/favorites/${folderID}`);
  };

  // ➕ 点击创建收藏夹按钮
  const handleCreateClick = () => {
    setShowCreateDialog(true);
  };

  // ✅ 确认创建收藏夹（真正的乐观更新）
  const handleConfirmCreate = async () => {
    if (!newFolderName.trim()) {
      alert('请输入收藏夹名称');
      return;
    }

    const folderName = newFolderName.trim();
    const folderIcon = selectedIcon;

    // 🚀 生成临时 ID（前端临时使用）
    const tempFolderID = 'temp_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    
    // 🚀 立即添加到前端显示（乐观更新）
    const tempFolder = {
      folderID: tempFolderID,
      folderName: folderName,
      folderIcon: folderIcon,
      createdAt: new Date().toISOString(),
    };
    
    addFolderOptimistically(tempFolder);
    console.log('🚀 已立即添加到前端:', tempFolder);

    // 🚀 立即关闭弹窗，重置状态
    setShowCreateDialog(false);
    setNewFolderName('');
    setSelectedIcon('📁');
    
    // 🔄 后台静默创建
    setIsCreating(true);
    console.log('📝 后台开始创建收藏夹...');
    
    try {
      const result = await createFolder({
        inviteCode,
        folderName,
        folderIcon,
      });

      console.log('📦 创建收藏夹 API 返回:', result);
      console.log('📦 success:', result.success);
      console.log('📦 folder:', result.folder);
      console.log('📦 message:', result.message);

      if (result.success) {
        if (result.folder) {
          console.log('✅ 后台创建成功，替换为真实ID:', result.folder);
          // ✅ 成功：用真实ID替换临时ID，保持前端显示不变
          replaceFolderID(tempFolderID, result.folder);
        } else {
          console.warn('⚠️ 创建成功但没有返回 folder 对象，保留临时ID');
          // 成功但没有返回 folder，保留临时显示
        }
      } else {
        // ❌ 失败：移除临时数据，显示错误
        console.error('❌ 创建失败:', result.message);
        removeFolderOptimistically(tempFolderID);
        alert('创建失败：' + result.message);
      }
    } catch (error) {
      // ❌ 失败：移除临时数据，显示错误
      console.error('❌ 创建收藏夹失败:', error);
      removeFolderOptimistically(tempFolderID);
      alert('创建失败：网络错误');
    } finally {
      setIsCreating(false);
    }
  };

  // ❌ 取消创建
  const handleCancelCreate = () => {
    setShowCreateDialog(false);
    setNewFolderName('');
    setSelectedIcon('folder'); // 改为图标名称
  };

  // 🗑️ 删除收藏夹
  const handleDeleteFolder = async (folderID: string) => {
    console.log('🗑️ 开始删除收藏夹:', folderID);
    
    // 🚀 乐观更新：立即从前端移除
    removeFolderOptimistically(folderID);
    
    // 🔄 后台静默删除
    try {
      const result = await deleteFolder(inviteCode, folderID);
      
      if (result.success) {
        console.log('✅ 删除成功');
        // 成功：不需要任何操作，前端已经移除了
      } else {
        // ❌ 失败：恢复显示（重新刷新数据）
        console.error('❌ 删除失败:', result.message);
        await refreshAll();
        alert('删除失败：' + result.message);
      }
    } catch (error) {
      // ❌ 失败：恢复显示
      console.error('❌ 删除收藏夹失败:', error);
      await refreshAll();
      alert('删除失败：网络错误');
    }
  };

  // 🎨 将 folders 转换为 GbzLayout 组件需要的格式
  const formattedFolders = folders.map(folder => ({
    id: folder.folderID,
    name: folder.folderName,
    count: favoriteCounts[folder.folderID] || 0,
    icon: folder.folderIcon || 'folder', // 使用图标名称而不是emoji
    coverImage: folder.coverImage, // 🆕 封面图
  }));

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden">
      <Component03FavoritesGbzLayout 
        folders={formattedFolders}
        isLoading={isLoading}
        onFavoriteClick={handleFolderClick}
        onDeleteFolder={handleDeleteFolder}
        onCreateClick={handleCreateClick}
      />
      <LeftNavOverlay />

      {/* 🆕 创建收藏夹弹窗（带平滑过渡） */}
      {showCreateDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-200">
          <div className="bg-white rounded-[20px] p-8 w-[500px] shadow-2xl transform transition-all duration-200 scale-100 opacity-100">
            <h2 className="text-[24px] font-bold mb-6 text-[#272727]">创建新收藏夹</h2>
            
            <div className="mb-6">
              <label className="block text-[15px] text-[#5d5d5d] mb-2">收藏夹名称</label>
              <input
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                placeholder="请输入收藏夹名称"
                className="w-full px-4 py-3 border border-[#e0e0e0] rounded-[12px] text-[16px] focus:outline-none focus:border-[#6062ef]"
                maxLength={20}
                autoFocus
              />
            </div>

            <div className="mb-8">
              <label className="block text-[15px] text-[#5d5d5d] mb-3">选择图标</label>
              <div className="flex gap-3 flex-wrap">
                {[
                  { id: 'folder', label: '文件夹' },
                  { id: 'star', label: '星标' },
                  { id: 'heart', label: '喜爱' },
                  { id: 'car', label: '汽车' },
                  { id: 'fire', label: '热门' },
                  { id: 'lightbulb', label: '灵感' },
                  { id: 'camera', label: '摄影' },
                  { id: 'target', label: '目标' }
                ].map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => setSelectedIcon(id)}
                    title={label}
                    className={`w-[60px] h-[60px] rounded-[12px] flex items-center justify-center transition-all ${
                      selectedIcon === id 
                        ? 'bg-[#6062ef] border-2 border-[#6062ef] text-white shadow-lg' 
                        : 'bg-white border-2 border-[#e0e0e0] text-[#5d5d5d] hover:border-[#6062ef] hover:text-[#6062ef]'
                    }`}
                  >
                    <FavoriteIcon name={id} size={28} />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={handleCancelCreate}
                disabled={isCreating}
                className="px-6 py-3 text-[16px] text-[#5d5d5d] hover:bg-[#f5f5f5] rounded-[12px] transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleConfirmCreate}
                disabled={isCreating}
                className="px-8 py-3 text-[16px] bg-[#6062ef] text-white rounded-[12px] hover:bg-[#5053d5] transition-colors disabled:opacity-50"
              >
                {isCreating ? '创建中...' : '确认创建'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}





