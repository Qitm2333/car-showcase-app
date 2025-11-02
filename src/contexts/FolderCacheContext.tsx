/**
 * 📦 收藏夹缓存上下文
 * 
 * 提供全局的收藏夹数据缓存和乐观更新
 * 避免重复请求，提升用户体验
 */

import { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from 'react';
import { getFolderList, getFavoriteList, FavoriteFolder, createFolder } from '@/services/favoriteService';
import { useUser } from './UserContext';

interface FolderCacheContextType {
  /** 收藏夹列表 */
  folders: FavoriteFolder[];
  /** 每个收藏夹的收藏数量 */
  favoriteCounts: Record<string, number>;
  /** 是否正在加载 */
  isLoading: boolean;
  /** 错误信息 */
  error: string;
  /** 刷新收藏夹列表 */
  refreshFolders: () => Promise<void>;
  /** 刷新收藏数量 */
  refreshCounts: () => Promise<void>;
  /** 刷新所有数据 */
  refreshAll: () => Promise<void>;
  /** 乐观更新：增加某个收藏夹的计数 */
  incrementFolderCount: (folderID: string) => void;
  /** 乐观更新：减少某个收藏夹的计数 */
  decrementFolderCount: (folderID: string) => void;
  /** 🚀 乐观更新：立即添加收藏夹到前端 */
  addFolderOptimistically: (folder: FavoriteFolder) => void;
  /** ❌ 乐观更新：移除失败的收藏夹 */
  removeFolderOptimistically: (folderID: string) => void;
  /** 🔄 乐观更新：替换临时ID为真实ID */
  replaceFolderID: (tempID: string, realFolder: FavoriteFolder) => void;
}

const FolderCacheContext = createContext<FolderCacheContextType | undefined>(undefined);

const CACHE_DURATION = 5 * 60 * 1000; // 5分钟缓存有效期

export function FolderCacheProvider({ children }: { children: ReactNode }) {
  const { inviteCode } = useUser();
  const [folders, setFolders] = useState<FavoriteFolder[]>([]);
  const [favoriteCounts, setFavoriteCounts] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // 🔒 防止重复调用的标志
  const isInitializedRef = useRef(false);
  const isRefreshingRef = useRef(false);
  const lastRefreshTimeRef = useRef(0); // 上次刷新时间，用于防抖
  const prevInviteCodeRef = useRef<string>(''); // 记录上一次的 inviteCode

  // 🔑 动态缓存 key（每个用户独立缓存）
  const CACHE_KEY_FOLDERS = `favorite_folders_cache_${inviteCode}`;
  const CACHE_KEY_COUNTS = `favorite_counts_cache_${inviteCode}`;

  // ========== 缓存辅助函数 ==========
  
  /** 从 localStorage 加载缓存 */
  const loadCache = (key: string) => {
    try {
      const cached = localStorage.getItem(key);
      if (!cached) return null;
      
      const { data, timestamp } = JSON.parse(cached);
      const now = Date.now();
      
      // 检查缓存是否过期
      if (now - timestamp > CACHE_DURATION) {
        localStorage.removeItem(key);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error('加载缓存失败:', error);
      return null;
    }
  };

  /** 保存到 localStorage */
  const saveCache = (key: string, data: any) => {
    try {
      localStorage.setItem(
        key,
        JSON.stringify({
          data,
          timestamp: Date.now(),
        })
      );
    } catch (error) {
      console.error('保存缓存失败:', error);
    }
  };

  // ========== 数据刷新函数 ==========

  /** 刷新收藏夹列表 */
  const refreshFolders = useCallback(async () => {
    if (!inviteCode || isRefreshingRef.current) return;

    console.log('🔄 refreshFolders 开始，inviteCode:', inviteCode);
    
    isRefreshingRef.current = true;
    setIsLoading(true);
    setError('');

    try {
      const result = await getFolderList(inviteCode);
      console.log('📦 getFolderList 返回:', result);
      
      if (result.success) {
        console.log('✅ 获取收藏夹成功，数量:', result.folders.length);
        
        // 🎯 如果用户没有任何收藏夹，自动创建默认收藏夹
        if (result.folders.length === 0) {
          const initKey = `default_folder_created_${inviteCode}`;
          const hasCreatedDefault = localStorage.getItem(initKey);
          
          console.log('📁 检测到用户无收藏夹');
          console.log('🔍 检查标记 key:', initKey);
          console.log('🔍 hasCreatedDefault:', hasCreatedDefault);
          
          if (!hasCreatedDefault) {
            console.log('📁 开始自动创建默认收藏夹，参数:', {
              inviteCode,
              folderName: '默认收藏',
              folderIcon: 'folder',
            });
            
            try {
              const createResult = await createFolder({
                inviteCode,
                folderName: '默认收藏',
                folderIcon: 'folder',
              });
              
              console.log('📦 createFolder API 返回:', createResult);
              
              if (createResult.success && createResult.folder) {
                console.log('✅ 默认收藏夹创建成功:', createResult.folder);
                // 标记已创建，避免重复
                localStorage.setItem(initKey, 'true');
                console.log('💾 已设置标记:', initKey);
                // 更新 folders 状态
                setFolders([createResult.folder]);
                saveCache(CACHE_KEY_FOLDERS, [createResult.folder]);
                console.log('📊 已更新前端 folders 状态');
              } else {
                console.warn('⚠️ 默认收藏夹创建失败，但不影响使用');
                console.warn('⚠️ createResult.success:', createResult.success);
                console.warn('⚠️ createResult.folder:', createResult.folder);
                console.warn('⚠️ createResult.message:', createResult.message);
                setFolders(result.folders);
                saveCache(CACHE_KEY_FOLDERS, result.folders);
              }
            } catch (createErr) {
              console.error('❌ 自动创建默认收藏夹异常:', createErr);
              // 失败也不影响，用户可以手动创建
              setFolders(result.folders);
              saveCache(CACHE_KEY_FOLDERS, result.folders);
            }
          } else {
            // 已经创建过，但列表为空（可能被删除了）
            setFolders(result.folders);
            saveCache(CACHE_KEY_FOLDERS, result.folders);
          }
        } else {
          // 有收藏夹，正常显示
          setFolders(result.folders);
          saveCache(CACHE_KEY_FOLDERS, result.folders);
        }
      } else {
        setError(result.message || '获取收藏夹列表失败');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '网络错误');
      console.error('刷新收藏夹失败:', err);
    } finally {
      setIsLoading(false);
      isRefreshingRef.current = false;
    }
  }, [inviteCode]);

  /** 刷新收藏数量（内部版本，接受 folders 参数） */
  const refreshCountsInternal = useCallback(async (currentFolders: FavoriteFolder[]) => {
    if (!inviteCode || currentFolders.length === 0) return;

    // 🚫 防抖：距离上次刷新不到2秒，跳过
    const now = Date.now();
    if (now - lastRefreshTimeRef.current < 2000) {
      console.log('⏸️ 距离上次刷新太近，跳过');
      return;
    }
    lastRefreshTimeRef.current = now;

    // 🚫 过滤掉临时ID（乐观更新的临时收藏夹）
    const realFolders = currentFolders.filter(f => !f.folderID.startsWith('temp_'));
    
    if (realFolders.length === 0) {
      console.log('⏸️ 只有临时收藏夹，跳过数量刷新');
      return;
    }

    try {
      const result = await getFavoriteList(inviteCode); // 获取所有收藏
      
      if (result.success) {
        // 统计每个收藏夹的数量（只统计真实收藏夹）
        const counts: Record<string, number> = {};
        const coverImages: Record<string, string> = {}; // 🆕 存储每个收藏夹的封面图
        
        realFolders.forEach(folder => {
          counts[folder.folderID] = 0;
        });
        
        result.favorites.forEach(item => {
          if (counts[item.folderID] !== undefined) {
            counts[item.folderID]++;
            // 🖼️ 如果该收藏夹还没有封面图，使用第一张图片
            if (!coverImages[item.folderID] && item.imageURL) {
              coverImages[item.folderID] = item.imageURL;
            }
          }
        });
        
        // ✅ 合并临时收藏夹的数量（保持0）
        currentFolders.forEach(folder => {
          if (folder.folderID.startsWith('temp_')) {
            counts[folder.folderID] = 0;
          }
        });
        
        // 🆕 更新 folders 的封面图
        const updatedFolders = currentFolders.map(folder => ({
          ...folder,
          coverImage: coverImages[folder.folderID] || folder.coverImage
        }));
        
        setFolders(updatedFolders);
        setFavoriteCounts(counts);
        saveCache(CACHE_KEY_FOLDERS, updatedFolders);
        saveCache(CACHE_KEY_COUNTS, counts);
      }
    } catch (err) {
      console.error('刷新收藏数量失败:', err);
    }
  }, [inviteCode]);

  /** 刷新收藏数量（外部版本，使用当前 folders state） */
  const refreshCounts = useCallback(async () => {
    await refreshCountsInternal(folders);
  }, [folders, refreshCountsInternal]);

  /** 刷新所有数据 */
  const refreshAll = useCallback(async () => {
    if (isRefreshingRef.current) {
      console.log('⏸️ 刷新被跳过：正在刷新中');
      return;
    }
    
    console.log('🔄 开始刷新收藏夹数据...');
    isRefreshingRef.current = true;
    setIsLoading(true);
    setError('');

    try {
      const result = await getFolderList(inviteCode);
      console.log('📦 收藏夹数据返回:', result);
      
      if (result.success) {
        // 🎯 如果用户没有任何收藏夹，自动创建默认收藏夹
        if (result.folders.length === 0) {
          const initKey = `default_folder_created_${inviteCode}`;
          const hasCreatedDefault = localStorage.getItem(initKey);
          
          console.log('📁 检测到用户无收藏夹');
          console.log('🔍 检查标记 key:', initKey);
          console.log('🔍 hasCreatedDefault:', hasCreatedDefault);
          
          if (!hasCreatedDefault) {
            console.log('📁 开始自动创建默认收藏夹');
            
            try {
              const createResult = await createFolder({
                inviteCode,
                folderName: '默认收藏',
                folderIcon: 'folder',
              });
              
              console.log('📦 createFolder API 返回:', createResult);
              
              if (createResult.success && createResult.folder) {
                console.log('✅ 默认收藏夹创建成功:', createResult.folder);
                localStorage.setItem(initKey, 'true');
                setFolders([createResult.folder]);
                saveCache(CACHE_KEY_FOLDERS, [createResult.folder]);
              } else {
                console.warn('⚠️ 默认收藏夹创建失败:', createResult);
                setFolders(result.folders);
                saveCache(CACHE_KEY_FOLDERS, result.folders);
              }
            } catch (createErr) {
              console.error('❌ 自动创建默认收藏夹异常:', createErr);
              setFolders(result.folders);
              saveCache(CACHE_KEY_FOLDERS, result.folders);
            }
          } else {
            setFolders(result.folders);
            saveCache(CACHE_KEY_FOLDERS, result.folders);
          }
        } else {
          // ✅ 有收藏夹，正常更新
          setFolders(result.folders);
          saveCache(CACHE_KEY_FOLDERS, result.folders);
          console.log('✅ 收藏夹列表已更新:', result.folders.length, '个');
          
          // 刷新数量
          await refreshCountsInternal(result.folders);
          console.log('✅ 收藏数量已刷新');
        }
      } else {
        setError(result.message || '获取收藏夹列表失败');
        console.error('❌ 获取收藏夹失败:', result.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '网络错误');
      console.error('❌ 刷新所有数据失败:', err);
    } finally {
      setIsLoading(false);
      isRefreshingRef.current = false;
      console.log('🏁 刷新完成');
    }
  }, [inviteCode, refreshCountsInternal]);

  // ========== 乐观更新 ==========

  /** 增加某个收藏夹的计数（乐观更新） */
  const incrementFolderCount = useCallback((folderID: string) => {
    setFavoriteCounts(prev => ({
      ...prev,
      [folderID]: (prev[folderID] || 0) + 1,
    }));
  }, []);

  /** 减少某个收藏夹的计数（乐观更新） */
  const decrementFolderCount = useCallback((folderID: string) => {
    setFavoriteCounts(prev => ({
      ...prev,
      [folderID]: Math.max(0, (prev[folderID] || 0) - 1),
    }));
  }, []);

  /** 🚀 立即添加收藏夹到前端（乐观更新） */
  const addFolderOptimistically = useCallback((folder: FavoriteFolder) => {
    console.log('🚀 乐观添加收藏夹:', folder);
    setFolders(prev => [...prev, folder]); // 添加到最后面
    setFavoriteCounts(prev => ({
      ...prev,
      [folder.folderID]: 0, // 新建收藏夹默认0个收藏
    }));
  }, []);

  /** ❌ 移除失败的收藏夹（乐观更新回滚） */
  const removeFolderOptimistically = useCallback((folderID: string) => {
    console.log('❌ 移除失败的收藏夹:', folderID);
    setFolders(prev => prev.filter(f => f.folderID !== folderID));
    setFavoriteCounts(prev => {
      const newCounts = { ...prev };
      delete newCounts[folderID];
      return newCounts;
    });
  }, []);

  /** 🔄 替换临时ID为真实ID（乐观更新成功后同步） */
  const replaceFolderID = useCallback((tempID: string, realFolder: FavoriteFolder) => {
    console.log('🔄 替换临时ID为真实ID:', tempID, '→', realFolder.folderID);
    setFolders(prev => 
      prev.map(f => f.folderID === tempID ? realFolder : f)
    );
    setFavoriteCounts(prev => {
      const newCounts = { ...prev };
      // 将临时ID的计数转移到真实ID
      if (newCounts[tempID] !== undefined) {
        newCounts[realFolder.folderID] = newCounts[tempID];
        delete newCounts[tempID];
      } else {
        newCounts[realFolder.folderID] = 0;
      }
      return newCounts;
    });
  }, []);

  // ========== 初始化加载 ==========

  useEffect(() => {
    // 🔄 检测 inviteCode 是否变化
    if (prevInviteCodeRef.current !== inviteCode) {
      console.log('🔄 inviteCode 变化:', prevInviteCodeRef.current, '→', inviteCode);
      console.log('🔑 新的缓存 key 前缀:', `favorite_folders_cache_${inviteCode}`);
      prevInviteCodeRef.current = inviteCode;
      isInitializedRef.current = false; // 重置初始化标志
      isRefreshingRef.current = false; // 重置刷新标志
      
      // 清空当前状态，防止显示旧用户数据
      setFolders([]);
      setFavoriteCounts({});
      console.log('🗑️ 已清空旧用户的收藏夹状态');
    }

    if (!inviteCode) {
      // 如果 inviteCode 为空，重置状态
      console.log('🔄 inviteCode 为空，重置收藏夹状态');
      isInitializedRef.current = false;
      setFolders([]);
      setFavoriteCounts({});
      return;
    }

    if (isInitializedRef.current) {
      console.log('⏸️ 已初始化，跳过重复加载');
      return;
    }

    console.log('🚀 FolderCacheContext 初始化，inviteCode:', inviteCode);
    console.log('🔑 使用缓存 key:', CACHE_KEY_FOLDERS, CACHE_KEY_COUNTS);
    
    // 标记为已初始化，防止重复执行
    isInitializedRef.current = true;

    // 先尝试从缓存加载
    const cachedFolders = loadCache(CACHE_KEY_FOLDERS);
    const cachedCounts = loadCache(CACHE_KEY_COUNTS);

    if (cachedFolders) {
      console.log('📦 从缓存加载收藏夹:', cachedFolders);
      setFolders(cachedFolders);
    } else {
      console.log('📦 缓存为空，等待 API 数据');
    }
    if (cachedCounts) {
      console.log('📊 从缓存加载数量:', cachedCounts);
      setFavoriteCounts(cachedCounts);
    } else {
      console.log('📊 数量缓存为空');
    }

    // 然后在后台刷新（只刷新一次）
    console.log('🔄 开始后台刷新收藏夹数据...');
    refreshAll();
  }, [inviteCode, refreshAll, CACHE_KEY_FOLDERS, CACHE_KEY_COUNTS]);

  // 当 folders 变化时，自动刷新 counts（但只在有 folders 且已初始化的情况下）
  useEffect(() => {
    if (!isInitializedRef.current || !inviteCode || folders.length === 0) return;
    
    // 🚫 如果所有收藏夹都是临时的（乐观更新），跳过刷新
    const hasRealFolders = folders.some(f => !f.folderID.startsWith('temp_'));
    if (!hasRealFolders) {
      console.log('⏸️ 所有收藏夹都是临时的，跳过自动刷新');
      return;
    }
    
    // 延迟执行，避免在 refreshAll 刚完成时重复触发
    const timer = setTimeout(() => {
      refreshCountsInternal(folders);
    }, 500); // 增加延迟到500ms，避免频繁请求

    return () => clearTimeout(timer);
  }, [folders.length, inviteCode, refreshCountsInternal]);
  
  // 🔄 当用户切换账号时，重置初始化标志
  useEffect(() => {
    if (!inviteCode) {
      isInitializedRef.current = false;
      isRefreshingRef.current = false;
    }
  }, [inviteCode]);

  return (
    <FolderCacheContext.Provider
      value={{
        folders,
        favoriteCounts,
        isLoading,
        error,
        refreshFolders,
        refreshCounts,
        refreshAll,
        incrementFolderCount,
        decrementFolderCount,
        addFolderOptimistically,
        removeFolderOptimistically,
        replaceFolderID,
      }}
    >
      {children}
    </FolderCacheContext.Provider>
  );
}

/**
 * 使用收藏夹缓存的 Hook
 */
export function useFolderCache() {
  const context = useContext(FolderCacheContext);
  if (!context) {
    throw new Error('useFolderCache must be used within FolderCacheProvider');
  }
  return context;
}

