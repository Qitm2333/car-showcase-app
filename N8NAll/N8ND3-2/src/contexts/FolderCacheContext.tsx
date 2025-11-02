import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getFolderList, getFavoriteList, FavoriteFolder } from '@/services/favoriteService';
import { useUser } from './UserContext';

interface FolderCacheContextType {
  folders: FavoriteFolder[];
  favoriteCounts: Record<string, number>;
  isLoading: boolean;
  error: string;
  refreshFolders: () => Promise<void>;
  refreshCounts: () => Promise<void>;
  refreshAll: () => Promise<void>;
  incrementFolderCount: (folderID: string) => void;  // 🆕 本地增加计数
  decrementFolderCount: (folderID: string) => void;  // 🆕 本地减少计数
}

const FolderCacheContext = createContext<FolderCacheContextType | undefined>(undefined);

export function FolderCacheProvider({ children }: { children: ReactNode }) {
  const { inviteCode } = useUser();
  const [folders, setFolders] = useState<FavoriteFolder[]>([]);
  const [favoriteCounts, setFavoriteCounts] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);
  const [hasTriedLoad, setHasTriedLoad] = useState(false); // 🆕 防止重复加载

  // 从 localStorage 加载缓存
  useEffect(() => {
    if (!inviteCode) return;
    
    // 🔄 重置状态（当用户切换时）
    setHasTriedLoad(false);
    setIsInitialized(false);
    
    const cacheKey = `folder_cache_${inviteCode}`;
    const cached = localStorage.getItem(cacheKey);
    
    console.log('🔍 检查缓存，userID:', inviteCode);
    
    if (cached) {
      try {
        const data = JSON.parse(cached);
        console.log('📦 从缓存加载文件夹数据:', data);
        
        if (data.folders && data.folders.length > 0) {
          // 有有效的缓存数据
          setFolders(data.folders || []);
          setFavoriteCounts(data.counts || {});
          setIsInitialized(true);
          setHasTriedLoad(true);
          console.log('✅ 缓存加载成功，共', data.folders.length, '个文件夹');
        } else {
          // 缓存是空的，需要从 API 加载
          console.log('⚠️ 缓存为空，将从 API 加载');
        }
      } catch (error) {
        console.error('❌ 缓存解析失败:', error);
        localStorage.removeItem(cacheKey);
      }
    } else {
      console.log('💡 无缓存，将从 API 加载');
    }
  }, [inviteCode]);

  // 首次加载或刷新文件夹列表
  const refreshFolders = async () => {
    if (!inviteCode) return;
    
    console.log('🔄 刷新文件夹列表...');
    setIsLoading(true);
    setError('');

    try {
      const result = await getFolderList(inviteCode);
      console.log('✅ 文件夹列表更新:', result);

      if (result.success) {
        setFolders(result.folders || []);
        
        // 保存到 localStorage
        const cacheKey = `folder_cache_${inviteCode}`;
        const cached = JSON.parse(localStorage.getItem(cacheKey) || '{}');
        cached.folders = result.folders || [];
        localStorage.setItem(cacheKey, JSON.stringify(cached));
        
        setError('');
      } else {
        setError('加载文件夹失败');
      }
    } catch (error) {
      console.error('刷新文件夹列表失败:', error);
      setError('网络错误');
    } finally {
      setIsLoading(false);
      setIsInitialized(true);
    }
  };

  // 刷新收藏数量统计
  const refreshCounts = async () => {
    if (!inviteCode) return;

    console.log('🔄 刷新收藏数量统计...');

    try {
      const result = await getFavoriteList(inviteCode);
      console.log('✅ 收藏统计更新:', result);

      if (result.success && Array.isArray(result.favorites)) {
        const counts: Record<string, number> = {};
        result.favorites.forEach((fav) => {
          const fid = fav.folderID;
          if (fid) {
            counts[fid] = (counts[fid] || 0) + 1;
          }
        });
        setFavoriteCounts(counts);

        // 保存到 localStorage
        const cacheKey = `folder_cache_${inviteCode}`;
        const cached = JSON.parse(localStorage.getItem(cacheKey) || '{}');
        cached.counts = counts;
        localStorage.setItem(cacheKey, JSON.stringify(cached));
      }
    } catch (error) {
      console.error('刷新收藏统计失败:', error);
    }
  };

  // 刷新所有数据
  const refreshAll = async () => {
    await Promise.all([refreshFolders(), refreshCounts()]);
  };

  // 🆕 本地增加文件夹计数（乐观更新）
  const incrementFolderCount = (folderID: string) => {
    if (!folderID) return;
    
    setFavoriteCounts((prev) => {
      const newCounts = { ...prev };
      newCounts[folderID] = (newCounts[folderID] || 0) + 1;
      console.log(`📈 ${folderID} 计数 +1 → ${newCounts[folderID]}`);
      
      // 更新 localStorage
      if (inviteCode) {
        const cacheKey = `folder_cache_${inviteCode}`;
        const cached = JSON.parse(localStorage.getItem(cacheKey) || '{}');
        cached.counts = newCounts;
        localStorage.setItem(cacheKey, JSON.stringify(cached));
      }
      
      return newCounts;
    });
  };

  // 🆕 本地减少文件夹计数（乐观更新）
  const decrementFolderCount = (folderID: string) => {
    if (!folderID) return;
    
    setFavoriteCounts((prev) => {
      const newCounts = { ...prev };
      newCounts[folderID] = Math.max(0, (newCounts[folderID] || 0) - 1);
      console.log(`📉 ${folderID} 计数 -1 → ${newCounts[folderID]}`);
      
      // 更新 localStorage
      if (inviteCode) {
        const cacheKey = `folder_cache_${inviteCode}`;
        const cached = JSON.parse(localStorage.getItem(cacheKey) || '{}');
        cached.counts = newCounts;
        localStorage.setItem(cacheKey, JSON.stringify(cached));
      }
      
      return newCounts;
    });
  };

  // 自动初始化：如果没有缓存，自动加载
  useEffect(() => {
    if (inviteCode && !isInitialized && !hasTriedLoad && !isLoading) {
      console.log('🚀 首次加载，从 API 获取数据');
      setHasTriedLoad(true);
      refreshAll();
    }
  }, [inviteCode, isInitialized, hasTriedLoad, isLoading]);

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
      }}
    >
      {children}
    </FolderCacheContext.Provider>
  );
}

export function useFolderCache() {
  const context = useContext(FolderCacheContext);
  if (!context) {
    throw new Error('useFolderCache must be used within FolderCacheProvider');
  }
  return context;
}

