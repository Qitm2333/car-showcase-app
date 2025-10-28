import { Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import Login from "./pages/Login";
import CarShowcaseMain from "./pages/CarShowcaseMain";
import CarShowcaseDetail from "./pages/CarShowcaseDetail";
import FavoritesMain from "./pages/FavoritesMain";
import FavoritesDetail from "./pages/FavoritesDetail";
import AIAnalysis from "./pages/AIAnalysis";
import SearchResults from "./pages/SearchResults";

export default function App() {
  return (
    <UserProvider>
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
    </UserProvider>
  );
}





