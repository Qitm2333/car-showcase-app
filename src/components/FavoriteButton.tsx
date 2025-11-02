import React, { useState, useEffect, useRef } from 'react';
import { useUser } from '@/contexts/UserContext';
import { useFolderCache } from '@/contexts/FolderCacheContext';
import { addToFavorite, createFolder, getFolderList } from '@/services/favoriteService';
import FavoriteIcon from './FavoriteIcon';

interface FavoriteButtonProps {
  carID: string;
  carName: string;
  imageURL: string;
  category?: string;
  viewType?: string;
  className?: string;
}

export default function FavoriteButton({ 
  carID, 
  carName, 
  imageURL, 
  category = 'car-showcase', 
  viewType = 'default',
  className = ''
}: FavoriteButtonProps) {
  const { inviteCode } = useUser();
  const { folders, addFolderOptimistically, replaceFolderID, removeFolderOptimistically, refreshAll } = useFolderCache();
  const [isFavorited, setIsFavorited] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('folder');
  const [isAdding, setIsAdding] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  // 🔍 检查是否已收藏（新的key格式，避免旧数据干扰）
  useEffect(() => {
    const favoriteKey = `fav_v2_${inviteCode}_${carID}_${imageURL}`;
    const cached = localStorage.getItem(favoriteKey);
    setIsFavorited(cached === 'true');
  }, [inviteCode, carID, imageURL]);

  // 🖱️ hover时显示下拉菜单（已收藏也可以触发，方便多收藏）
  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    // 检查是否移动到dropdown
    const relatedTarget = e.relatedTarget as HTMLElement;
    if (dropdownRef.current?.contains(relatedTarget) || buttonRef.current?.contains(relatedTarget)) {
      return;
    }
    setShowDropdown(false);
    setShowCreateForm(false);
  };

  // 📂 选择收藏夹并添加（乐观更新）
  const handleSelectFolder = async (folderID: string) => {
    // 🚀 立即更新UI显示为已收藏（乐观更新）
    setIsFavorited(true);
    const favoriteKey = `fav_v2_${inviteCode}_${carID}_${imageURL}`;
    localStorage.setItem(favoriteKey, 'true');
    
    // 关闭下拉菜单
    setShowDropdown(false);
    
    console.log('🚀 乐观更新：立即显示为已收藏');
    
    // 🔄 后台静默添加
    setIsAdding(true);
    
    try {
      const result = await addToFavorite({
        inviteCode,
        folderID,
        carID,
        carName,
        imageURL,
        category,
        viewType,
      });

      if (result.success) {
        console.log('✅ 后台收藏成功');
      } else {
        // ❌ 失败：回滚UI
        console.error('❌ 收藏失败:', result.message);
        setIsFavorited(false);
        localStorage.removeItem(favoriteKey);
        alert('收藏失败：' + result.message);
      }
    } catch (error) {
      // ❌ 失败：回滚UI
      console.error('❌ 收藏失败:', error);
      setIsFavorited(false);
      localStorage.removeItem(favoriteKey);
      alert('收藏失败：网络错误');
    } finally {
      setIsAdding(false);
    }
  };

  // 🆕 快速创建收藏夹并收藏
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
    
    // 🚀 立即显示为已收藏
    setIsFavorited(true);
    const favoriteKey = `fav_v2_${inviteCode}_${carID}_${imageURL}`;
    localStorage.setItem(favoriteKey, 'true');
    
    // 关闭下拉菜单
    setShowDropdown(false);
    setShowCreateForm(false);
    setNewFolderName('');
    setSelectedIcon('folder');
    
    console.log('🚀 乐观更新：创建收藏夹并收藏');
    
    // 🔄 后台创建并收藏
    setIsAdding(true);
    
    try {
      // 先创建收藏夹
      const createResult = await createFolder({
        inviteCode,
        folderName,
        folderIcon,
      });

      if (createResult.success && createResult.folder) {
        const realFolderID = createResult.folder.folderID;
        replaceFolderID(tempFolderID, createResult.folder);
        
        // 再添加到收藏
        const addResult = await addToFavorite({
          inviteCode,
          folderID: realFolderID,
          carID,
          carName,
          imageURL,
          category,
          viewType,
        });

        if (addResult.success) {
          console.log('✅ 创建收藏夹并收藏成功');
        } else {
          // 收藏失败，但收藏夹已创建，只回滚收藏状态
          console.error('❌ 收藏失败:', addResult.message);
          setIsFavorited(false);
          localStorage.removeItem(favoriteKey);
          alert('收藏夹创建成功，但收藏失败：' + addResult.message);
        }
      } else if (createResult.success && !createResult.folder) {
        // 🔄 创建成功但没返回 folderID，等待 800ms 后直接从 N8N 获取列表
        console.warn('⚠️ 收藏夹创建成功但未返回folderID，尝试重新获取...');
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // 直接调用 API 获取最新的收藏夹列表
        const listResult = await getFolderList(inviteCode);
        
        if (listResult.success && listResult.folders.length > 0) {
          // 从返回的列表中查找新创建的收藏夹（按名称匹配）
          const newFolder = listResult.folders.find(f => f.folderName === folderName);
          
          if (newFolder) {
            replaceFolderID(tempFolderID, newFolder);
            
            // 同步更新 Context 缓存
            await refreshAll();
            
            // 添加到收藏
            const addResult = await addToFavorite({
              inviteCode,
              folderID: newFolder.folderID,
              carID,
              carName,
              imageURL,
              category,
              viewType,
            });

            if (addResult.success) {
              console.log('✅ 创建收藏夹并收藏成功（通过重新获取）');
            } else {
              console.error('❌ 收藏失败:', addResult.message);
              setIsFavorited(false);
              localStorage.removeItem(favoriteKey);
              alert('收藏夹创建成功，但收藏失败：' + addResult.message);
            }
          } else {
            // 找不到新创建的收藏夹，尝试再等一会儿
            console.error('❌ 第一次未找到新收藏夹，尝试再次获取...');
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const retryResult = await getFolderList(inviteCode);
            const retryFolder = retryResult.success 
              ? retryResult.folders.find(f => f.folderName === folderName)
              : null;
            
            if (retryFolder) {
              replaceFolderID(tempFolderID, retryFolder);
              await refreshAll();
              
              const addResult = await addToFavorite({
                inviteCode,
                folderID: retryFolder.folderID,
                carID,
                carName,
                imageURL,
                category,
                viewType,
              });

              if (addResult.success) {
                console.log('✅ 创建收藏夹并收藏成功（重试成功）');
              } else {
                console.error('❌ 收藏失败:', addResult.message);
                setIsFavorited(false);
                localStorage.removeItem(favoriteKey);
                alert('收藏夹创建成功，但收藏失败：' + addResult.message);
              }
            } else {
              removeFolderOptimistically(tempFolderID);
              setIsFavorited(false);
              localStorage.removeItem(favoriteKey);
              alert('收藏夹创建成功，但无法获取收藏夹信息，请刷新页面后重试');
            }
          }
        } else {
          removeFolderOptimistically(tempFolderID);
          setIsFavorited(false);
          localStorage.removeItem(favoriteKey);
          alert('收藏夹创建成功，但无法获取收藏夹列表，请刷新页面后重试');
        }
      } else {
        // 创建失败，回滚所有
        console.error('❌ 创建收藏夹失败:', createResult.message);
        removeFolderOptimistically(tempFolderID);
        setIsFavorited(false);
        localStorage.removeItem(favoriteKey);
        alert('创建收藏夹失败：' + createResult.message);
      }
    } catch (error) {
      console.error('❌ 创建收藏夹失败:', error);
      removeFolderOptimistically(tempFolderID);
      setIsFavorited(false);
      localStorage.removeItem(favoriteKey);
      alert('创建失败：网络错误');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div 
      ref={buttonRef}
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ zIndex: 10000 }}
    >
      {/* ⭐ 收藏按钮 */}
      <button
        className={`w-[36px] h-[36px] rounded-full flex items-center justify-center transition-all relative ${
          isFavorited
            ? 'bg-[#6062ef] text-white opacity-100 shadow-lg' 
            : 'bg-white/90 backdrop-blur-sm text-[#5d5d5d] opacity-0 group-hover:opacity-100 hover:bg-white hover:text-[#6062ef]' 
        } ${className}`}
        title={isFavorited ? '已收藏 - 再次收藏到其他文件夹' : '添加到收藏夹'}
        onClick={(e) => e.stopPropagation()}
        style={{ zIndex: 10001 }}
      >
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill={isFavorited ? 'currentColor' : 'none'}
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      </button>

      {/* 📂 下拉菜单（整合按钮和列表） */}
      {showDropdown && (
        <div 
          ref={dropdownRef}
          className="absolute right-0 top-0 w-[160px] bg-white rounded-[14px] border border-[#e0e0e0] overflow-hidden animate-dropdown-in"
          style={{ 
            zIndex: 10002,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.03)',
            pointerEvents: 'auto'
          }}
          onClick={(e) => e.stopPropagation()}
          onMouseEnter={handleMouseEnter}
        >
          {/* 顶部按钮区域（集成到卡片内） */}
          <div className="flex items-center px-2.5 py-2.5 border-b border-[#f0f0f0] bg-gradient-to-b from-[#fafafa] to-white rounded-t-[14px]">
            <div className={`w-[24px] h-[24px] rounded-full flex items-center justify-center flex-shrink-0 ${
              isFavorited ? 'bg-[#6062ef] text-white' : 'bg-[#f5f5f5] text-[#6062ef]'
            }`}>
              <svg 
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill={isFavorited ? 'currentColor' : 'none'}
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </div>
            <div className="text-[12px] font-medium text-[#272727] ml-2">
              {isFavorited ? '已收藏' : '收藏到'}
            </div>
          </div>

          {/* 收藏夹列表或创建表单 */}
          <div>
            {!showCreateForm ? (
              <>
                {/* 收藏夹列表（最多显示4个，超过滚动） */}
                <div className="max-h-[168px] overflow-y-auto py-1">
                  {folders.length === 0 ? (
                    <div className="px-2.5 py-3 text-center text-[#999] text-[11px]">暂无收藏夹</div>
                  ) : (
                    folders.map((folder) => (
                      <button
                        key={folder.folderID}
                        onClick={() => handleSelectFolder(folder.folderID)}
                        className="w-full flex items-center px-2.5 py-1.5 hover:bg-[#f5f5ff] transition-colors text-left"
                      >
                        <div className="w-[24px] h-[24px] rounded-[6px] bg-[#f5f5ff] flex items-center justify-center text-[#6062ef] flex-shrink-0">
                          <FavoriteIcon name={folder.folderIcon || 'folder'} size={13} />
                        </div>
                        <div className="text-[11px] font-medium text-[#272727] truncate ml-2">
                          {folder.folderName}
                        </div>
                      </button>
                    ))
                  )}
                </div>
                
                {/* 分隔线 */}
                <div className="border-t border-[#e8e8e8]"></div>
                
                {/* 新建收藏夹按钮（左对齐，与列表对齐） */}
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="w-full flex items-center px-2.5 py-2 hover:bg-[#f5f5f5] transition-colors text-left rounded-b-[14px]"
                >
                  <div className="w-[24px] h-[24px] flex items-center justify-center flex-shrink-0">
                    <span className="text-[16px] text-[#6062ef] font-light">+</span>
                  </div>
                  <div className="text-[11px] font-medium text-[#6062ef] ml-2">
                    新建收藏夹
                  </div>
                </button>
              </>
            ) : (
              <>
                {/* 创建收藏夹表单 */}
                <div className="p-2.5 rounded-b-[14px]">
                  <div className="text-[11px] font-medium text-[#272727] mb-2">新建收藏夹</div>
                  
                  <input
                    type="text"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    placeholder="输入名称"
                    className="w-full px-2 py-1.5 border border-[#e0e0e0] rounded-[6px] text-[11px] focus:outline-none focus:border-[#6062ef] mb-2"
                    maxLength={20}
                    autoFocus
                    onClick={(e) => e.stopPropagation()}
                  />

                  {/* 图标选择 */}
                  <div className="flex gap-1.5 flex-wrap mb-2">
                    {['folder', 'star', 'heart', 'car', 'fire', 'lightbulb', 'camera', 'target'].map((icon) => (
                      <button
                        key={icon}
                        onClick={() => setSelectedIcon(icon)}
                        className={`w-[24px] h-[24px] rounded-[6px] flex items-center justify-center transition-all ${
                          selectedIcon === icon 
                            ? 'bg-[#6062ef] text-white' 
                            : 'bg-[#f5f5f5] text-[#5d5d5d] hover:bg-[#e8e8e8]'
                        }`}
                      >
                        <FavoriteIcon name={icon} size={12} />
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-1.5">
                    <button
                      onClick={() => {
                        setShowCreateForm(false);
                        setNewFolderName('');
                        setSelectedIcon('folder');
                      }}
                      className="flex-1 px-2 py-1.5 text-[11px] text-[#5d5d5d] hover:bg-[#f5f5f5] rounded-[6px] transition-colors"
                    >
                      取消
                    </button>
                    <button
                      onClick={handleQuickCreate}
                      disabled={isAdding || !newFolderName.trim()}
                      className="flex-1 px-2 py-1.5 text-[11px] bg-[#6062ef] text-white rounded-[6px] hover:bg-[#5053d5] transition-colors disabled:opacity-50"
                    >
                      {isAdding ? '创建中...' : '创建'}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

