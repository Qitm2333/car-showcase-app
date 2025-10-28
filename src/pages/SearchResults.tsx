/**
 * 🔍 搜索结果页面
 * 
 * 功能：
 * - 显示用户搜索的内容
 * - 基于car-showcase详情页的布局结构
 * - 标题部分显示搜索关键词
 * - 返回按钮返回上一页
 * 
 * 路由：/search?q=搜索内容
 */

import { useNavigate, useSearchParams } from "react-router-dom";
import LeftNavOverlay from "@/components/LeftNavOverlay";
import SearchResultsLayout from "@/imports/search-results/SearchResultsLayout";

export default function SearchResults() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // 获取搜索关键词和来源页面
  const searchQuery = searchParams.get("q") || "";
  const from = (searchParams.get("from") || "car-showcase") as "car-showcase" | "favorites" | "ai-analysis";

  const handleBackClick = () => {
    navigate(-1); // 返回上一页
  };

  return (
    <div className="min-h-screen w-full overflow-x-auto relative">
      <SearchResultsLayout 
        onBackClick={handleBackClick}
        searchQuery={searchQuery}
        from={from}
      />
      <LeftNavOverlay />
    </div>
  );
}

