/**
 * 🔍 筛选结果展示组件
 * 
 * 根据N8N API返回的筛选结果动态显示车型卡片
 * 保持原有的绝对定位布局风格
 */

import { N8NCarResult } from "@/services/carFilterService";
import FavoriteButton from "./FavoriteButton";

interface FilteredCarGridProps {
  cars: N8NCarResult[];
  onCarClick?: (carId: number | string) => void; // ✅ 支持数字或字符串类型的carID
}

// 车卡片位置配置 - 按列定义（每行4列）
const COLUMN_POSITIONS = [
  // 第1列
  { left: "2.19%", right: "75.25%", nameRight: "86.42%", typeRight: "75.25%", typeLeft: "13.3%" },
  // 第2列
  { left: "26.52%", right: "50.85%", nameRight: "62.09%", typeRight: "50.92%", typeLeft: "37.69%" },
  // 第3列  
  { left: "50.85%", right: "26.52%", nameRight: "37.69%", typeRight: "26.59%", typeLeft: "62.02%" },
  // 第4列
  { left: "75.25%", right: "2.19%", nameRight: "13.37%", typeRight: "2.19%", typeLeft: "86.42%" },
];

// 行位置配置
const ROW_POSITIONS = [
  // 第1行
  { top: "2.21%", bottom: "72.99%", nameTop: "27.83%", nameBottom: "67.9%" },
  // 第2行
  { top: "34.86%", bottom: "40.34%", nameTop: "60.49%", nameBottom: "35.24%" },
  // 第3行
  { top: "67.9%", bottom: "7.3%", nameTop: "93.52%", nameBottom: "2.21%" },
];

// 根据索引计算位置
const getCardPosition = (index: number) => {
  const row = Math.floor(index / 4);
  const col = index % 4;
  
  const rowPos = ROW_POSITIONS[row % 3]; // 每3行一个周期
  const colPos = COLUMN_POSITIONS[col];
  
  return {
    inset: `${rowPos.top} ${colPos.right} ${rowPos.bottom} ${colPos.left}`,
    nameInset: `${rowPos.nameTop} ${colPos.nameRight} ${rowPos.nameBottom} ${colPos.left}`,
    typeInset: `${rowPos.nameTop} ${colPos.typeRight} ${rowPos.nameBottom} ${colPos.typeLeft}`,
  };
};

export default function FilteredCarGrid({ cars, onCarClick }: FilteredCarGridProps) {
  // 计算总页数（每页12张）和新的容器高度比例
  const totalPages = Math.ceil(cars.length / 12);
  const baseHeight = 725.766;
  const totalHeight = totalPages * baseHeight;

  // 将百分比inset转换为新容器下的百分比
  const convertInset = (insetStr: string, pageIndex: number): string => {
    const parts = insetStr.split(' ');
    const top = parseFloat(parts[0]);
    const right = parts[1];
    const bottom = parseFloat(parts[2]);
    const left = parts[3];

    // 计算在新容器中的百分比位置
    // 原top百分比对应的实际位置 + 页面偏移
    const newTop = (top * baseHeight / 100 + pageIndex * baseHeight) / totalHeight * 100;
    const newBottom = 100 - newTop - ((100 - top - bottom) * baseHeight / 100) / totalHeight * 100;

    return `${newTop.toFixed(4)}% ${right} ${newBottom.toFixed(4)}% ${left}`;
  };

  // 回到顶部功能
  const scrollToTop = () => {
    const mainContent = document.querySelector('[data-name="02车型展示-Resahpe-GBZ-layout"]');
    if (mainContent) {
      mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* 单个大容器，高度根据卡片数量扩展 */}
      <div 
        className="absolute left-[291px] overflow-clip right-[23px] top-[440px]"
        style={{ 
          aspectRatio: `1414 / ${totalHeight}`
        }}
        data-name="筛选结果展示"
      >
        {cars.map((car, index) => {
          const positionIndex = index % 12;
          const pageIndex = Math.floor(index / 12);
          const position = getCardPosition(positionIndex);

          return (
            <div key={index} className="absolute contents">
              {/* 卡片背景 + 图片 - 合并为一层（移除overflow-hidden让下拉菜单显示） */}
              <div 
                className="absolute bg-[#f4f4f4] rounded-[18px] cursor-pointer hover:bg-gray-100 transition-colors group"
                style={{ inset: convertInset(position.inset, pageIndex) }}
                onClick={() => onCarClick?.(car.carID)}
              >
                {/* 图片容器 - 应用overflow-hidden来裁切图片 */}
                <div className="absolute inset-0 rounded-[18px] overflow-hidden">
                  <img 
                    alt={car.carName} 
                    className="w-full h-full object-cover pointer-events-none" 
                    src={car.imageURL}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
                
                {/* 收藏按钮 - 右上角 */}
                <div className="absolute right-[8px] top-[8px] z-10">
                  <FavoriteButton
                    carID={String(car.carID)}
                    carName={car.carName}
                    imageURL={car.imageURL}
                    category="car-showcase"
                    viewType={car.viewType || 'default'}
                  />
                </div>
                
                {/* 边框 */}
                <div aria-hidden="true" className="absolute border border-[#d8d8d8] border-solid inset-0 pointer-events-none rounded-[18px]" />
              </div>

              {/* 车型名称 */}
              <div 
                className="absolute flex flex-col font-['Inter:Bold',_sans-serif] font-bold justify-center leading-[0] not-italic text-[#202020] text-[18px]"
                style={{ inset: convertInset(position.nameInset, pageIndex) }}
              >
                <p className="leading-[normal]">{car.carName}</p>
              </div>

              {/* 车型类型 */}
              <div 
                className="absolute flex flex-col font-['Inter:Bold',_sans-serif] font-bold justify-center leading-[0] not-italic text-[18px] text-[rgba(32,32,32,0.3)] text-right"
                style={{ inset: convertInset(position.typeInset, pageIndex) }}
              >
                <p className="leading-[normal]">{car.vehicleClass || car.viewType || 'SUV'}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 回到顶部按钮 */}
      {cars.length > 12 && (
        <button
          onClick={scrollToTop}
          className="fixed right-8 bottom-8 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 z-50"
          style={{ backgroundColor: '#c9c9fc' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#b8b8fa'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#c9c9fc'}
          aria-label="回到顶部"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 10l7-7m0 0l7 7m-7-7v18" 
            />
          </svg>
        </button>
      )}
    </>
  );
}

