import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Component02GbzLayout from "@/imports/inspiration-detail/02车型展示子层级GbzLayout";
import LeftNavOverlay from "@/components/LeftNavOverlay";
import { fetchCarDetail, CarDetailData } from "@/services/carDetailService";
import { useVisitHistory } from "@/contexts/VisitHistoryContext";

export default function CarShowcaseDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>(); // 🚗 从 URL 获取 carID
  const { addToHistory, loadFromCache, clearHistory } = useVisitHistory();
  
  // 🔄 状态管理
  const [carDetail, setCarDetail] = useState<CarDetailData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 📡 获取车辆详情数据
  useEffect(() => {
    const loadCarDetail = async () => {
      if (!id) {
        setError('缺少车辆ID');
        setIsLoading(false);
        return;
      }

      const carID = Number(id);
      
      // 🔍 检查是否从主页进入（新访问）
      const isFromMain = location.state?.fromMain === true;
      
      if (isFromMain) {
        console.log('🏠 从主页进入，清空历史记录');
        clearHistory(); // ✅ 清空历史和缓存
      } else {
        console.log('🔗 从详情页内部导航，保留历史');
      }
      
      console.log('🚗 加载车辆详情页，carID:', carID, '从主页:', isFromMain);

      // 🔍 先尝试从缓存加载（仅当不是从主页进入时）
      if (!isFromMain) {
        const cachedData = loadFromCache(carID);
        if (cachedData) {
          console.log('✅ 从缓存加载:', cachedData.carName);
          setCarDetail(cachedData);
          setIsLoading(false);
          setError(null);
          // 📚 添加到访问历史（即使从缓存加载）
          addToHistory(carID, cachedData.carName, cachedData);
          return;
        }
      }

      // 📡 从 API 加载
      console.log('📡 从 API 加载...');
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchCarDetail({ carID: id });
        console.log('✅ 车辆详情加载成功:', data.carName);
        setCarDetail(data);
        
        // 📚 添加到访问历史
        addToHistory(carID, data.carName, data);
      } catch (err) {
        console.error('❌ 加载失败:', err);
        setError(err instanceof Error ? err.message : '加载失败');
      } finally {
        setIsLoading(false);
      }
    };

    loadCarDetail();
    // ✅ 依赖 id 和 location.key，确保每次导航都触发
    // location.key 在每次导航时都会变化，避免同一个 id 时不刷新
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, location.key]);

  const handleBackClick = () => {
    // 🔙 返回到 car-showcase 主页
    navigate('/car-showcase');
  };

  // 🔄 加载状态 - 优化：先显示页面框架，内容区域显示加载
  if (isLoading) {
    return (
      <div className="min-h-screen w-full relative bg-white overflow-x-hidden">
        <Component02GbzLayout 
          onBackClick={handleBackClick}
          carDetail={null}
          isLoading={true}
          loadingCarID={id}
        />
        <LeftNavOverlay />
      </div>
    );
  }

  // ❌ 错误状态
  if (error || !carDetail) {
    return (
      <div className="min-h-screen w-full relative bg-white overflow-x-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center max-w-md px-4">
            <div className="text-[60px] mb-4">😕</div>
            <h2 className="text-[28px] font-bold text-gray-800 mb-3">加载失败</h2>
            <p className="text-[16px] text-gray-600 mb-6">
              {error || '未找到车辆信息'}
            </p>
            <button
              onClick={handleBackClick}
              className="px-8 py-3 bg-[#6062ef] text-white rounded-full font-medium hover:bg-[#5052d3] transition-all"
            >
              返回上一页
            </button>
          </div>
        </div>
        <LeftNavOverlay />
      </div>
    );
  }

  // ✅ 正常显示
  return (
    <div className="min-h-screen w-full relative overflow-x-hidden">
      <Component02GbzLayout 
        onBackClick={handleBackClick}
        carDetail={carDetail}
      />
      <LeftNavOverlay />
    </div>
  );
}





