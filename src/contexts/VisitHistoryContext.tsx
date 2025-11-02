import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import type { CarDetailData } from "@/services/carDetailService";

// 访问历史项
interface VisitHistoryItem {
  carID: number;
  carName: string;
  data: CarDetailData;
  timestamp: number;
}

// Context 类型
interface VisitHistoryContextType {
  history: VisitHistoryItem[];
  cache: Record<number, CarDetailData>;
  addToHistory: (carID: number, carName: string, data: CarDetailData) => void;
  loadFromCache: (carID: number) => CarDetailData | null;
  clearHistory: () => void;
  navigateToHistoryItem: (index: number) => void;
}

const VisitHistoryContext = createContext<VisitHistoryContextType | undefined>(undefined);

export function VisitHistoryProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<VisitHistoryItem[]>([]);
  const [cache, setCache] = useState<Record<number, CarDetailData>>({});

  // 🔄 添加到访问历史
  const addToHistory = useCallback((carID: number, carName: string, data: CarDetailData) => {
    console.log('📚 添加到访问历史:', carName, 'carID:', carID);
    
    // 保存到缓存
    setCache(prev => ({
      ...prev,
      [carID]: data
    }));

    setHistory(prev => {
      // 如果当前车型已经在历史中，移除它之后的所有记录
      const existingIndex = prev.findIndex(item => item.carID === carID);
      if (existingIndex !== -1) {
        return prev.slice(0, existingIndex + 1);
      }
      
      // 添加新记录
      const newHistory = [
        ...prev,
        {
          carID,
          carName,
          data,
          timestamp: Date.now()
        }
      ];
      
      // 限制历史记录数量（最多10个）
      return newHistory.slice(-10);
    });
  }, []);

  // 📦 从缓存加载
  const loadFromCache = useCallback((carID: number): CarDetailData | null => {
    const cached = cache[carID];
    if (cached) {
      console.log('✅ 缓存命中:', cached.carName);
      return cached;
    }
    console.log('❌ 缓存未命中');
    return null;
  }, [cache]);

  // 🗑️ 清空历史
  const clearHistory = useCallback(() => {
    console.log('🗑️ 清空历史和缓存');
    setHistory([]);
    setCache({});
  }, []);

  // 🔙 导航到历史项（裁剪历史）
  const navigateToHistoryItem = useCallback((index: number) => {
    console.log('🔙 导航到历史项，索引:', index);
    setHistory(prev => prev.slice(0, index + 1));
  }, []);

  return (
    <VisitHistoryContext.Provider
      value={{
        history,
        cache,
        addToHistory,
        loadFromCache,
        clearHistory,
        navigateToHistoryItem
      }}
    >
      {children}
    </VisitHistoryContext.Provider>
  );
}

export function useVisitHistory() {
  const context = useContext(VisitHistoryContext);
  if (context === undefined) {
    throw new Error('useVisitHistory must be used within a VisitHistoryProvider');
  }
  return context;
}

