import React, { useState } from 'react';
import { useFolderCache } from '@/contexts/FolderCacheContext';
import { useUser } from '@/contexts/UserContext';
import { createFolder } from '@/services/favoriteService';
import FavoriteIcon from './FavoriteIcon';

interface SelectFolderDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFolder: (folderID: string) => void;
}

export default function SelectFolderDialog({ isOpen, onClose, onSelectFolder }: SelectFolderDialogProps) {
  const { inviteCode } = useUser();
  const { folders, addFolderOptimistically, replaceFolderID, removeFolderOptimistically } = useFolderCache();
  const [showCreateNew, setShowCreateNew] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('folder');
  const [isCreating, setIsCreating] = useState(false);

  if (!isOpen) return null;

  // 🆕 快速创建新收藏夹
  const handleQuickCreate = async () => {
    if (!newFolderName.trim()) {
      alert('请输入收藏夹名称');
      return;
    }

    const folderName = newFolderName.trim();
    const folderIcon = selectedIcon;

    // 🚀 生成临时 ID
    const tempFolderID = 'temp_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    
    // 🚀 立即添加到前端
    const tempFolder = {
      folderID: tempFolderID,
      folderName: folderName,
      folderIcon: folderIcon,
      createdAt: new Date().toISOString(),
    };
    
    addFolderOptimistically(tempFolder);
    
    // 🚀 重置创建表单
    setShowCreateNew(false);
    setNewFolderName('');
    setSelectedIcon('folder');
    
    // 🔄 后台创建
    setIsCreating(true);
    
    try {
      const result = await createFolder({
        inviteCode,
        folderName,
        folderIcon,
      });

      if (result.success && result.folder) {
        replaceFolderID(tempFolderID, result.folder);
        // 🎯 创建成功后，自动选择这个新收藏夹并收藏
        onSelectFolder(result.folder.folderID);
        onClose();
      } else {
        removeFolderOptimistically(tempFolderID);
        alert('创建失败：' + result.message);
      }
    } catch (error) {
      console.error('❌ 创建收藏夹失败:', error);
      removeFolderOptimistically(tempFolderID);
      alert('创建失败：网络错误');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-[20px] p-8 w-[500px] max-h-[80vh] overflow-y-auto shadow-2xl transform transition-all duration-200 scale-100 opacity-100"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-[24px] font-bold mb-6 text-[#272727]">选择收藏夹</h2>
        
        {!showCreateNew ? (
          <>
            {/* 📂 收藏夹列表 */}
            <div className="space-y-2 mb-6 max-h-[400px] overflow-y-auto">
              {folders.length === 0 ? (
                <p className="text-center text-[#999] py-8">暂无收藏夹</p>
              ) : (
                folders.map((folder) => (
                  <button
                    key={folder.folderID}
                    onClick={() => {
                      onSelectFolder(folder.folderID);
                      onClose();
                    }}
                    className="w-full flex items-center gap-4 p-4 rounded-[12px] border border-[#e0e0e0] hover:border-[#6062ef] hover:bg-[#f5f5ff] transition-all text-left"
                  >
                    <div className="w-[40px] h-[40px] rounded-[10px] bg-[#f5f5ff] flex items-center justify-center text-[#6062ef]">
                      <FavoriteIcon name={folder.folderIcon || 'folder'} size={24} />
                    </div>
                    <div className="flex-1">
                      <div className="text-[16px] font-medium text-[#272727]">{folder.folderName}</div>
                    </div>
                  </button>
                ))
              )}
            </div>

            {/* ➕ 新建收藏夹按钮 */}
            <button
              onClick={() => setShowCreateNew(true)}
              className="w-full py-3 border-2 border-dashed border-[#d0d0d0] rounded-[12px] text-[#999] hover:border-[#6062ef] hover:text-[#6062ef] transition-all flex items-center justify-center gap-2"
            >
              <span className="text-[20px]">+</span>
              <span>新建收藏夹</span>
            </button>

            {/* 🚫 取消按钮 */}
            <div className="flex justify-end mt-6">
              <button
                onClick={onClose}
                className="px-6 py-3 text-[16px] text-[#5d5d5d] hover:bg-[#f5f5f5] rounded-[12px] transition-colors"
              >
                取消
              </button>
            </div>
          </>
        ) : (
          <>
            {/* 🆕 创建新收藏夹表单 */}
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
                onClick={() => {
                  setShowCreateNew(false);
                  setNewFolderName('');
                  setSelectedIcon('folder');
                }}
                disabled={isCreating}
                className="px-6 py-3 text-[16px] text-[#5d5d5d] hover:bg-[#f5f5f5] rounded-[12px] transition-colors"
              >
                返回
              </button>
              <button
                onClick={handleQuickCreate}
                disabled={isCreating}
                className="px-8 py-3 text-[16px] bg-[#6062ef] text-white rounded-[12px] hover:bg-[#5053d5] transition-colors disabled:opacity-50"
              >
                {isCreating ? '创建中...' : '创建并收藏'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

