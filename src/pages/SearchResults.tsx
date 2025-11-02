/**
 * 🔍 搜索结果页面
 * 
 * 功能：
 * - 显示用户搜索的内容
 * - 调用N8N搜索API获取车型图片
 * - 基于car-showcase详情页的布局结构
 * - 标题部分显示搜索关键词
 * - 返回按钮返回上一页
 * 
 * 路由：/search?q=搜索内容
 */

import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import LeftNavOverlay from "@/components/LeftNavOverlay";
import SearchBar from "@/components/SearchBar";
import LanguageSelector from "@/components/LanguageSelector";
import CarShowcaseSidebar from "@/imports/inspiration-main/左侧组件-15-767";
import SearchResultGrid from "@/components/SearchResultGrid";
import { searchCarImages, N8NSearchResult } from "@/services/carSearchService";

export default function SearchResults() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // 获取搜索关键词和来源页面
  const searchQuery = searchParams.get("q") || "";
  const from = (searchParams.get("from") || "car-showcase") as "car-showcase" | "favorites" | "ai-analysis";

  // 搜索状态
  const [searchResult, setSearchResult] = useState<N8NSearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // 执行搜索
  useEffect(() => {
    if (searchQuery.trim()) {
      performSearch(searchQuery);
    }
  }, [searchQuery]);

  const performSearch = async (query: string) => {
    setIsLoading(true);
    setHasSearched(true);
    
    try {
      console.log('🔍 开始搜索:', query);
      const result = await searchCarImages(query);
      setSearchResult(result);
      
      if (result.success) {
        console.log('✅ 搜索成功:', result.totalImages, '张图片');
      } else {
        console.warn('⚠️ 搜索失败:', result.error);
      }
    } catch (error) {
      console.error('❌ 搜索异常:', error);
      setSearchResult({
        success: false,
        error: '搜索服务异常',
        message: '无法完成搜索，请稍后重试'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackClick = () => {
    navigate(-1); // 返回上一页
  };

  const handleImageClick = (imageUrl: string) => {
    // 打开图片大图
    window.open(imageUrl, '_blank');
  };

  // Category筛选状态
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  // 获取所有category
  const allCategories = searchResult?.images 
    ? Array.from(new Set(searchResult.images.map(img => img.category)))
    : [];
  
  // 根据选中的category筛选图片
  const filteredImages = searchResult?.images?.filter(img => 
    selectedCategories.length === 0 || selectedCategories.includes(img.category)
  ) || [];
  
  // 切换category选择
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="min-h-screen w-full relative bg-white overflow-x-hidden">
      {/* 背景 */}
      <div className="fixed h-[2174px] right-[-425px] top-[-232px] w-[1881px] pointer-events-none z-0" data-name="背景">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1881 2174">
          <g id="背景">
            <g id="Rectangle 32"></g>
            <foreignObject height="593.6" width="622.6" x="115.7" y="-6.3">
              <div style={{ backdropFilter: "blur(2px)", clipPath: "url(#bgblur_0_1_597_clip_path)", height: "100%", width: "100%" }} xmlns="http://www.w3.org/1999/xhtml" />
            </foreignObject>
            <ellipse cx="427" cy="290.5" data-figma-bg-blur-radius="4" fill="url(#paint0_radial_1_597)" fillOpacity="0.49" id="Ellipse 52" opacity="0.2" rx="305" ry="290.5" />
            <circle cx="1151.5" cy="1444.5" fill="url(#paint1_radial_1_597)" fillOpacity="0.38" id="Ellipse 51" opacity="0.2" r="729.5" />
          </g>
          <defs>
            <clipPath id="bgblur_0_1_597_clip_path" transform="translate(-115.7 6.3)">
              <ellipse cx="427" cy="290.5" rx="305" ry="290.5" />
            </clipPath>
            <radialGradient cx="0" cy="0" gradientTransform="translate(427 290.5) rotate(90) scale(290.5 305)" gradientUnits="userSpaceOnUse" id="paint0_radial_1_597" r="1">
              <stop stopColor="#7E8BFF" />
              <stop offset="1" stopColor="white" />
            </radialGradient>
            <radialGradient cx="0" cy="0" gradientTransform="translate(1151.5 1444.5) rotate(90) scale(729.5)" gradientUnits="userSpaceOnUse" id="paint1_radial_1_597" r="1">
              <stop stopColor="#7E98FF" />
              <stop offset="1" stopColor="white" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* 左侧导航栏 */}
      <div className="fixed left-0 top-0 h-screen z-50">
        <CarShowcaseSidebar />
      </div>

      {/* 搜索栏 */}
      <div className="absolute contents left-[322px] top-[47px]">
        <SearchBar placeholder={searchQuery || "继续搜索..."} from={from} />
        <LanguageSelector />
      </div>

      {/* 返回按钮 - 参考 favorites-detail 的样式 */}
      <div 
        className="absolute left-[322px] top-[114px] cursor-pointer hover:opacity-70 transition-opacity flex items-center gap-2"
        onClick={handleBackClick}
        data-name="Back组件"
      >
        {/* 返回箭头图标 */}
        <div className="w-[24px] h-[24px] flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="#8f9090" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        {/* Back文字 */}
        <span className="font-['Inter:Bold',_sans-serif] font-bold text-[20px] text-[#8f9090]">
          Back
        </span>
      </div>

      {/* 搜索标题 - 增大间距 */}
      <div className="absolute left-[322px] top-[170px]">
        <h2 className="text-[30px] font-bold text-black">
          搜索: <span className="text-[#6062ef]">{searchQuery}</span>
        </h2>
      </div>

      {/* Category筛选器 - 增大间距和优化布局 */}
      {allCategories.length > 0 && (
        <div className="absolute left-[322px] top-[230px] flex gap-3 items-center">
          <span className="text-[16px] text-gray-600 font-medium">分类:</span>
          <div className="flex gap-3 flex-wrap">
            {allCategories.map(category => (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className={`px-5 py-2 rounded-full text-[15px] font-medium transition-all ${
                  selectedCategories.length === 0 || selectedCategories.includes(category)
                    ? 'bg-[#6062ef] text-white shadow-sm'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
            {selectedCategories.length > 0 && (
              <button
                onClick={() => setSelectedCategories([])}
                className="px-5 py-2 rounded-full text-[15px] font-medium bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                全部
              </button>
            )}
          </div>
        </div>
      )}

      {/* 搜索结果统计 - 增大间距 */}
      {!isLoading && hasSearched && searchResult?.success && (
        <div className="absolute left-[322px] top-[290px] text-gray-600">
          <p className="text-[15px]">
            共找到 <span className="font-bold text-[#6062ef]">{searchResult.totalImages}</span> 张图片
            {selectedCategories.length > 0 && (
              <span className="ml-2">
                （当前显示: <span className="font-bold text-[#6062ef]">{filteredImages.length}</span> 张）
              </span>
            )}
          </p>
        </div>
      )}

      {/* 搜索结果状态 - 调整位置 */}
      {isLoading && (
        <div className="absolute left-[291px] right-[23px] top-[340px] h-[400px] flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#6062ef]"></div>
            <p className="mt-4 text-[18px] text-gray-600">正在搜索 "{searchQuery}"...</p>
          </div>
        </div>
      )}

      {!isLoading && hasSearched && searchResult && !searchResult.success && (
        <div className="absolute left-[291px] right-[23px] top-[340px] h-[400px] flex items-center justify-center">
          <div className="text-center">
            <p className="text-[24px] text-gray-400">未找到符合条件的内容</p>
            <p className="text-[16px] text-gray-300 mt-4">{searchResult.message || '请尝试其他搜索关键词'}</p>
          </div>
        </div>
      )}

      {/* 搜索结果网格 */}
      {!isLoading && hasSearched && searchResult?.success && filteredImages && filteredImages.length > 0 && (
        <SearchResultGrid 
          images={filteredImages}
          carName={searchResult.carName || searchQuery}
          carID={searchResult.carId}
          onImageClick={handleImageClick}
        />
      )}

      {/* 筛选后无结果 */}
      {!isLoading && hasSearched && searchResult?.success && filteredImages && filteredImages.length === 0 && selectedCategories.length > 0 && (
        <div className="absolute left-[291px] right-[23px] top-[340px] h-[400px] flex items-center justify-center">
          <div className="text-center">
            <p className="text-[24px] text-gray-400">当前分类下没有图片</p>
            <p className="text-[16px] text-gray-300 mt-4">请尝试选择其他分类或查看全部</p>
          </div>
        </div>
      )}

      <LeftNavOverlay />
    </div>
  );
}

