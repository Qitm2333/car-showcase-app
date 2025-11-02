import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Component04FavoritesDetailGbzLayout from "@/imports/favorites-detail/04收藏夹详情页面GbzLayout";
import LeftNavOverlay from "@/components/LeftNavOverlay";
import { useUser } from "@/contexts/UserContext";
import { useFolderCache } from "@/contexts/FolderCacheContext";
import { useAIAnalysis } from "@/contexts/AIAnalysisContext";
import { getFavoriteList, deleteFavorite, FavoriteItem } from "@/services/favoriteService";
import { smartOrganize } from "@/services/smartOrganizeService";

export default function FavoritesDetail() {
  const navigate = useNavigate();
  const { id: folderID } = useParams<{ id: string }>();
  const { inviteCode } = useUser();
  const { folders } = useFolderCache();
  const { setCurrentTags, startNewDialogue } = useAIAnalysis();
  
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // 🤖 智能整理相关状态
  const [showSmartOrganizeDialog, setShowSmartOrganizeDialog] = useState(false);
  const [carNamesInput, setCarNamesInput] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterViewType, setFilterViewType] = useState('all');
  const [isOrganizing, setIsOrganizing] = useState(false);
  
  // ✅ 成功提示卡片状态
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [organizeResult, setOrganizeResult] = useState<{
    totalImages: number;
    carSummary: Record<string, number>;
  } | null>(null);
  
  // 从folders列表中获取当前文件夹名称
  const currentFolder = folders.find(f => f.folderID === folderID);
  const folderName = currentFolder?.folderName || '我的收藏';

  // 🔄 获取收藏列表
  useEffect(() => {
    if (!inviteCode || !folderID) return;

    const fetchFavorites = async () => {
      setIsLoading(true);
      try {
        const result = await getFavoriteList(inviteCode, folderID);
        if (result.success) {
          setFavorites(result.favorites);
          console.log('✅ 获取到收藏列表:', result.favorites);
        } else {
          console.error('❌ 获取收藏列表失败:', result.message);
        }
      } catch (error) {
        console.error('❌ 获取收藏列表异常:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, [inviteCode, folderID]);

  const handleBackClick = () => {
    navigate('/favorites');
  };

  // 🗑️ 删除收藏
  const handleDeleteFavorite = async (itemID: string) => {
    console.log('🗑️ 开始删除收藏:', itemID);
    
    // 🚀 乐观更新：立即从前端移除
    setFavorites(prev => prev.filter(item => item.itemID !== itemID));
    
    // 🔄 后台静默删除
    try {
      const result = await deleteFavorite(inviteCode, itemID);
      
      if (result.success) {
        console.log('✅ 删除成功');
      } else {
        console.error('❌ 删除失败:', result.message);
        // ❌ 失败：重新获取数据恢复显示
        const refreshResult = await getFavoriteList(inviteCode, folderID!);
        if (refreshResult.success) {
          setFavorites(refreshResult.favorites);
        }
        alert('删除失败：' + result.message);
      }
    } catch (error) {
      console.error('❌ 删除收藏失败:', error);
      // ❌ 失败：重新获取数据恢复显示
      const refreshResult = await getFavoriteList(inviteCode, folderID!);
      if (refreshResult.success) {
        setFavorites(refreshResult.favorites);
      }
      alert('删除失败：网络错误');
    }
  };

  // 🖼️ 点击图片查看详情（可选）
  const handleImageClick = (carID: number) => {
    console.log('点击图片，carID:', carID);
    // TODO: 跳转到车型详情页
    // navigate(`/car-showcase/detail/${carID}`);
  };

  // 🤖 点击AI分析按钮
  const handleAIAnalysisClick = () => {
    console.log('🤖 [AI分析] 点击AI分析按钮，当前收藏夹:', folderName);
    
    // 1. 开始新对话（清空历史消息）
    startNewDialogue();
    
    // 2. 设置当前收藏夹名称为tag
    setCurrentTags([folderName]);
    console.log('  ✅ 已设置tag:', [folderName]);
    
    // 3. 跳转到AI分析页面
    navigate('/ai-analysis');
  };

  // 🤖 点击智能整理按钮
  const handleQuickOrganizeClick = () => {
    console.log('🤖 [智能整理] 打开对话框');
    setShowSmartOrganizeDialog(true);
    setCarNamesInput('');
    setFilterCategory('all');
    setFilterViewType('all');
  };

  // 🤖 确认智能整理
  const handleConfirmOrganize = async () => {
    if (!carNamesInput.trim()) {
      alert('请输入车型名称');
      return;
    }

    const carNames = carNamesInput
      .split(/[,，、]/)
      .map(name => name.trim())
      .filter(name => name);

    if (carNames.length === 0) {
      alert('请输入至少一个车型名称');
      return;
    }

    if (carNames.length > 5) {
      alert('最多支持5个车型，请减少车型数量');
      return;
    }

    console.log('🤖 [智能整理] 开始整理:', { carNames, filterCategory, filterViewType });

    setIsOrganizing(true);
    setShowSmartOrganizeDialog(false);

    try {
      const result = await smartOrganize({
        userID: inviteCode,
        folderID: folderID!,
        carNames: carNames,
        filterCategory: filterCategory,
        filterViewType: filterViewType
      });

      if (result.success) {
        console.log('✅ [智能整理] 成功:', result);
        console.log('📊 详细数据:', {
          totalImages: result.totalImages,
          savedImages: result.savedImages,
          carSummary: result.carSummary,
          apiResponse: result.apiResponse
        });
        
        // 保存结果并显示成功卡片
        setOrganizeResult({
          totalImages: result.totalImages || 0,
          carSummary: result.carSummary || {}
        });
        setShowSuccessDialog(true);
        
        // 刷新收藏列表
        const refreshResult = await getFavoriteList(inviteCode, folderID!);
        if (refreshResult.success) {
          setFavorites(refreshResult.favorites);
        }
      } else {
        console.error('❌ [智能整理] 失败:', result);
        alert(`整理失败：${result.error || result.message || '未知错误'}`);
      }
    } catch (error) {
      console.error('❌ [智能整理] 异常:', error);
      alert('整理失败：网络错误或服务异常');
    } finally {
      setIsOrganizing(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden">
      <Component04FavoritesDetailGbzLayout 
        folderName={folderName}
        favorites={favorites}
        isLoading={isLoading || isOrganizing}
        onBackClick={handleBackClick}
        onDeleteFavorite={handleDeleteFavorite}
        onImageClick={handleImageClick}
        onAIAnalysisClick={handleAIAnalysisClick}
        onQuickOrganizeClick={handleQuickOrganizeClick}
      />
      <LeftNavOverlay />

      {/* 🤖 智能整理对话框 */}
      {showSmartOrganizeDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-200">
          <div className="bg-white rounded-[20px] p-8 w-[540px] shadow-2xl transform transition-all duration-200 scale-100 opacity-100">
            <h2 className="text-[24px] font-bold mb-6 text-[#272727]">智能整理车型图片</h2>
            
            {/* 车型名称输入 */}
            <div className="mb-6">
              <label className="block text-[15px] text-[#5d5d5d] mb-2">
                车型名称 <span className="text-[#6062ef]">*</span>
              </label>
              <input
                type="text"
                value={carNamesInput}
                onChange={(e) => setCarNamesInput(e.target.value)}
                placeholder="例如：问界M7, 理想L9, 小鹏G9（最多5个，用逗号分隔）"
                className="w-full px-4 py-3 border border-[#e0e0e0] rounded-[12px] text-[16px] focus:outline-none focus:border-[#6062ef]"
                autoFocus
              />
              <p className="text-[13px] text-[#999] mt-2">支持多个车型，用逗号、顿号或分号分隔</p>
            </div>

            {/* 图片分类筛选 */}
            <div className="mb-6">
              <label className="block text-[15px] text-[#5d5d5d] mb-3">图片分类</label>
              <div className="flex gap-3">
                {[
                  { value: 'all', label: '全部' },
                  { value: '外观', label: '外观' },
                  { value: '内饰', label: '内饰' },
                  { value: '座椅', label: '座椅' }
                ].map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => setFilterCategory(value)}
                    className={`flex-1 py-2.5 rounded-[10px] text-[15px] font-medium transition-all ${
                      filterCategory === value
                        ? 'bg-[#6062ef] text-white shadow-md'
                        : 'bg-[#f5f5f5] text-[#5d5d5d] hover:bg-[#ebebeb]'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* 视角类型筛选 */}
            <div className="mb-8">
              <label className="block text-[15px] text-[#5d5d5d] mb-3">视角类型</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'all', label: '全部视角' },
                  { value: 'view45', label: '前45度' },
                  { value: 'viewFront', label: '正面' },
                  { value: 'view-45', label: '后45度' },
                  { value: 'viewSide', label: '侧面' },
                  { value: 'viewCNSL', label: '中控台' }
                ].map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => setFilterViewType(value)}
                    className={`py-2.5 rounded-[10px] text-[14px] font-medium transition-all ${
                      filterViewType === value
                        ? 'bg-[#6062ef] text-white shadow-md'
                        : 'bg-[#f5f5f5] text-[#5d5d5d] hover:bg-[#ebebeb]'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowSmartOrganizeDialog(false)}
                className="px-6 py-3 rounded-[12px] text-[16px] font-medium text-[#5d5d5d] bg-[#f5f5f5] hover:bg-[#ebebeb] transition-all"
              >
                取消
              </button>
              <button
                onClick={handleConfirmOrganize}
                className="relative px-6 py-3 rounded-[12px] text-[16px] font-bold text-white overflow-hidden group transition-all shadow-md hover:shadow-xl"
              >
                {/* 默认背景 - 紫色渐变 */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#6062ef] to-[#7b7ff5] rounded-[12px] transition-opacity duration-500 group-hover:opacity-0"></div>
                
                {/* Hover背景 - 彩虹流光（双层叠加） */}
                <div className="absolute inset-0 rounded-[12px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {/* 底层：主流光 */}
                  <div 
                    className="absolute inset-0 rounded-[12px]"
                    style={{
                      background: 'linear-gradient(90deg, #ff5a8f 0%, #ff5a8f 10%, #b84ff5 20%, #3dcbff 30%, #5ce89a 40%, #ffc13a 50%, #ff85ef 60%, #ff5a8f 70%, #b84ff5 80%, #3dcbff 90%, #ff5a8f 100%)',
                      backgroundSize: '200% 100%',
                      animation: 'rainbow-flow-smooth 6s linear infinite'
                    }}
                  ></div>
                  
                  {/* 顶层：模糊光晕 */}
                  <div 
                    className="absolute inset-[-4px]"
                    style={{
                      background: 'linear-gradient(90deg, #ff5a8f, #b84ff5, #3dcbff, #5ce89a, #ffc13a, #ff85ef, #ff5a8f)',
                      backgroundSize: '200% 100%',
                      animation: 'rainbow-flow-smooth 6s linear infinite',
                      filter: 'blur(8px)',
                      opacity: 0.6
                    }}
                  ></div>
                </div>
                
                {/* 文字内容 */}
                <span className="relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">开始整理</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🔄 智能整理加载中遮罩 */}
      {isOrganizing && (
        <div className="fixed inset-0 bg-black/60 flex flex-col items-center justify-center z-50">
          <div className="bg-white rounded-[20px] p-10 shadow-2xl text-center">
            <div className="w-16 h-16 border-4 border-[#6062ef] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-[20px] font-bold text-[#272727] mb-2">智能整理中...</h3>
            <p className="text-[15px] text-[#5d5d5d]">正在为您收集车型图片，请稍候</p>
          </div>
        </div>
      )}

      {/* ✅ 智能整理成功提示卡片 */}
      {showSuccessDialog && organizeResult && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-200">
          <div className="bg-white rounded-[20px] p-8 w-[480px] shadow-2xl transform transition-all duration-200 scale-100 opacity-100">
            {/* 成功图标 */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#5ce89a] to-[#3dcbff] rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <h2 className="text-[24px] font-bold mb-3 text-[#272727] text-center">整理成功！</h2>
            
            <p className="text-[16px] text-[#5d5d5d] text-center mb-6">
              共收集 <span className="text-[#6062ef] font-bold text-[20px]">{organizeResult.totalImages}</span> 张图片
            </p>

            {/* 车型统计 */}
            {Object.keys(organizeResult.carSummary).length > 0 && (
              <div className="bg-[#f5f4ff] rounded-[12px] p-4 mb-6">
                {Object.entries(organizeResult.carSummary).map(([carName, count]) => (
                  <div key={carName} className="flex justify-between items-center py-2">
                    <span className="text-[15px] text-[#272727] font-medium">{carName}</span>
                    <span className="text-[15px] text-[#6062ef] font-bold">{count}张</span>
                  </div>
                ))}
              </div>
            )}

            {/* 确定按钮 */}
            <button
              onClick={() => setShowSuccessDialog(false)}
              className="w-full py-3 bg-gradient-to-r from-[#6062ef] to-[#7b7ff5] text-white text-[16px] font-bold rounded-[12px] hover:shadow-lg transition-all duration-200"
            >
              确定
            </button>
          </div>
        </div>
      )}
    </div>
  );
}





