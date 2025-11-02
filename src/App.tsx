import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import { VisitHistoryProvider } from "./contexts/VisitHistoryContext";
import { FolderCacheProvider } from "./contexts/FolderCacheContext";
import { AIAnalysisProvider } from "./contexts/AIAnalysisContext";
import { DebugProvider, useDebug } from "./contexts/DebugContext";
import Login from "./pages/Login";
import CarShowcaseMain from "./pages/CarShowcaseMain";
import CarShowcaseDetail from "./pages/CarShowcaseDetail";
import FavoritesMain from "./pages/FavoritesMain";
import FavoritesDetail from "./pages/FavoritesDetail";
import AIAnalysis from "./pages/AIAnalysis";
import SearchResults from "./pages/SearchResults";
import WebhookDebugger from "./components/WebhookDebugger";

function AppContent() {
  const { showDebugger } = useDebug();

  return (
    <>
      <Routes>
        <Route index element={<Navigate to="/login" replace />} />
        <Route path="login" element={<Login />} />
        <Route path="car-showcase" element={<CarShowcaseMain />} />
        <Route path="car-showcase/:id" element={<CarShowcaseDetail />} />
        <Route path="favorites" element={<FavoritesMain />} />
        <Route path="favorites/:id" element={<FavoritesDetail />} />
        <Route path="ai-analysis" element={<AIAnalysis />} />
        {/* 🔍 搜索结果页面路由 */}
        <Route path="search" element={<SearchResults />} />
      </Routes>
      
      {/* 🛠️ Webhook 调试器 - 连续点击3次 Quality logo 才显示 */}
      {showDebugger && <WebhookDebugger />}
    </>
  );
}

export default function App() {
  // 🧹 清理旧版本的收藏缓存（仅执行一次）
  useEffect(() => {
    const cleanupKey = 'favorites_cleanup_v2_done';
    if (!localStorage.getItem(cleanupKey)) {
      console.log('🧹 清理旧版本收藏数据...');
      let cleanedCount = 0;
      const keysToRemove: string[] = [];
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('favorite_') && !key.startsWith('fav_v2_')) {
          keysToRemove.push(key);
        }
      }
      
      keysToRemove.forEach(key => {
        localStorage.removeItem(key);
        cleanedCount++;
      });
      
      if (cleanedCount > 0) {
        console.log(`✅ 清理完成！共删除 ${cleanedCount} 条旧数据`);
      }
      
      localStorage.setItem(cleanupKey, 'true');
    }
  }, []);

  return (
    <UserProvider>
      <VisitHistoryProvider>
        <FolderCacheProvider>
          <AIAnalysisProvider>
            <DebugProvider>
              <AppContent />
            </DebugProvider>
          </AIAnalysisProvider>
        </FolderCacheProvider>
      </VisitHistoryProvider>
    </UserProvider>
  );
}





