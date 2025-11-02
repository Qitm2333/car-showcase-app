import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Component02ResahpeGbzLayout from "@/imports/inspiration-main/02车型展示ResahpeGbzLayout-1-1077";
import LeftNavOverlay from "@/components/LeftNavOverlay";
import { fetchFilteredCars, FilterParams, N8NCarResult } from "@/services/carFilterService";

// ⭐ 模块级变量：跨组件挂载周期保持状态
let hasEverInitialized = false;
// ⭐ 保存上次的筛选结果（避免重新渲染时丢失）
let cachedFilteredCars: N8NCarResult[] = [];
let cachedHasSearched = false;

export default function CarShowcaseMain() {
  const navigate = useNavigate();
  const [filteredCars, setFilteredCars] = useState<N8NCarResult[]>(cachedFilteredCars);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(cachedHasSearched); // 🔍 标记是否已执行过搜索
  
  // ⭐ 组件挂载时恢复缓存的筛选结果
  useEffect(() => {
    console.log('🔄 组件挂载，hasEverInitialized:', hasEverInitialized);
    console.log('📦 恢复缓存的筛选结果:', cachedFilteredCars.length, '条');
  }, []);

  const handleCarClick = (carId: string | number) => {
    console.log('🚗 点击车卡片，carID:', carId);
    // ✅ 从主页进入，标记为新访问（会清空历史记录）
    navigate(`/car-showcase/${carId}`, { state: { fromMain: true } });
  };

  // 处理筛选条件变化
  const handleFilterChange = useCallback(async (filters: {
    keyword?: string;
    brands: string[];
    models: string[];
    views: string[];
    parts: string[];
    times: string[];
  }, isInitialMount = false) => {
    console.log('🔍 筛选条件变化:', filters, '是否初始化:', isInitialMount, '曾经初始化过:', hasEverInitialized);

    // ⭐ 如果是初始化请求，且之前已经初始化过（说明是重新进入页面），跳过执行
    if (isInitialMount && hasEverInitialized) {
      console.log('⏭️ 之前已初始化过，跳过本次初始化筛选');
      return;
    }
    
    // ⭐ 如果是初始化请求，且是第一次，标记为已初始化
    if (isInitialMount && !hasEverInitialized) {
      hasEverInitialized = true;
      console.log('✅ 首次初始化，标记为已初始化，继续执行筛选');
    }

    // 构建N8N API参数（传递关键词、品牌、车型、视角）
    const apiFilters: FilterParams = {
      keyword: filters.keyword?.trim(), // 🏷️ 标签输入作为关键词
      brands: filters.brands,
      models: filters.models,
      views: filters.views
      // N8N当前不支持parts和times，暂时不传
    };

    // 如果所有筛选条件都为空，清空筛选结果（显示默认数据）
    const hasFilters = (apiFilters.keyword && apiFilters.keyword.length > 0) || 
                       (apiFilters.brands && apiFilters.brands.length > 0) ||
                       (apiFilters.models && apiFilters.models.length > 0) ||
                       (apiFilters.views && apiFilters.views.length > 0);

    if (!hasFilters) {
      console.log('⚪ 无筛选条件，显示默认内容');
      setFilteredCars([]);
      setHasSearched(false); // 重置搜索状态
      // ⭐ 更新缓存
      cachedFilteredCars = [];
      cachedHasSearched = false;
      return;
    }

    console.log('📤 发送筛选请求:', apiFilters);

    // 调用N8N API
    setIsLoading(true);
    setHasSearched(true); // 标记已执行搜索
    cachedHasSearched = true; // ⭐ 更新缓存
    try {
      const response = await fetchFilteredCars(apiFilters);
      
      if (response.success && response.count > 0) {
        console.log(`✅ 获取到 ${response.count} 条筛选结果`);
        setFilteredCars(response.results);
        cachedFilteredCars = response.results; // ⭐ 更新缓存
      } else {
        console.log('⚠️ 未找到匹配结果');
        setFilteredCars([]); // 空结果，但hasSearched=true，会显示"未找到"提示
        cachedFilteredCars = []; // ⭐ 更新缓存
      }
    } catch (error) {
      console.error('❌ 筛选失败:', error);
      setFilteredCars([]);
      cachedFilteredCars = []; // ⭐ 更新缓存
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden">
      <Component02ResahpeGbzLayout 
        onCarClick={handleCarClick} 
        onFilterChange={handleFilterChange}
        filteredCars={filteredCars}
        isLoading={isLoading}
        hasSearched={hasSearched}
      />
      <LeftNavOverlay />
    </div>
  );
}





