/**
 * 🔍 搜索结果网格组件
 * 
 * 功能：
 * - 显示搜索到的车型图片
 * - 使用与FilteredCarGrid相同的12卡片布局
 * - 支持点击图片查看大图
 */

import React from 'react';
import { SearchImageResult } from '@/services/carSearchService';
import FavoriteButton from './FavoriteButton';

interface SearchResultGridProps {
  images: SearchImageResult[];
  carName: string;
  carID?: string;
  onImageClick?: (imageUrl: string) => void;
}

// 12张卡片的位置配置（和FilteredCarGrid保持一致）
const CARD_POSITIONS = [
  // 第一行 (4张)
  { inset: "2.21% 75.25% 72.99% 2.19%", imgInset: "4.27% 75.81% 74.92% 2.83%", titleInset: "27.83% 86.42% 67.9% 2.19%" },
  { inset: "2.21% 50.85% 72.99% 26.52%", imgInset: "4.27% 52.12% 73.55% 27.09%", titleInset: "27.83% 62.09% 67.9% 26.52%" },
  { inset: "2.21% 26.52% 72.99% 50.85%", imgInset: "4.27% 27.72% 73.55% 51.48%", titleInset: "27.83% 37.69% 67.9% 50.85%" },
  { inset: "2.21% 2.19% 72.99% 75.25%", imgInset: "4.27% 3.4% 73.55% 75.81%", titleInset: "27.83% 13.37% 67.9% 75.25%" },
  
  // 第二行 (4张)
  { inset: "34.86% 75.25% 40.34% 2.19%", imgInset: "34.86% 76.45% 41.99% 2.79%", titleInset: "60.49% 86.42% 35.24% 2.19%" },
  { inset: "34.86% 50.85% 40.34% 26.52%", imgInset: "34.86% 51.8% 41.99% 27.44%", titleInset: "60.49% 62.09% 35.24% 26.52%" },
  { inset: "34.86% 26.52% 40.34% 50.85%", imgInset: "34.86% 27.33% 41.99% 51.91%", titleInset: "60.49% 37.69% 35.24% 50.85%" },
  { inset: "34.86% 2.19% 40.34% 75.25%", imgInset: "34.86% 3% 41.99% 76.24%", titleInset: "60.49% 13.37% 35.24% 75.25%" },
  
  // 第三行 (4张)
  { inset: "67.9% 75.25% 7.3% 2.19%", imgInset: "67.9% 76.45% 8.95% 2.79%", titleInset: "93.52% 86.42% 2.21% 2.19%" },
  { inset: "67.9% 50.85% 7.3% 26.52%", imgInset: "67.9% 51.8% 8.95% 27.44%", titleInset: "93.52% 62.09% 2.21% 26.52%" },
  { inset: "67.9% 26.52% 7.3% 50.85%", imgInset: "69.14% 27.79% 10.2% 52.19%", titleInset: "93.52% 37.69% 2.21% 50.85%" },
  { inset: "67.9% 2.19% 7.3% 75.25%", imgInset: "68.72% 2.93% 8.12% 76.31%", titleInset: "93.52% 13.37% 2.21% 75.25%" },
];

export default function SearchResultGrid({ images, carName, carID, onImageClick }: SearchResultGridProps) {
  // 计算总页数和容器高度
  const totalPages = Math.ceil(images.length / 12);
  const baseHeight = 725.766;
  const totalHeight = totalPages * baseHeight;

  // 将百分比inset转换为新容器下的百分比
  const convertInset = (insetStr: string, pageIndex: number): string => {
    const parts = insetStr.split(' ');
    const top = parseFloat(parts[0]);
    const right = parts[1];
    const bottom = parseFloat(parts[2]);
    const left = parts[3];

    const newTop = (top * baseHeight / 100 + pageIndex * baseHeight) / totalHeight * 100;
    const newBottom = 100 - newTop - ((100 - top - bottom) * baseHeight / 100) / totalHeight * 100;

    return `${newTop.toFixed(4)}% ${right} ${newBottom.toFixed(4)}% ${left}`;
  };

  // 回到顶部功能
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (images.length === 0) {
    return (
      <div className="absolute left-[322px] right-[23px] top-[440px] h-[400px] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[24px] text-gray-400">未找到图片</p>
          <p className="text-[16px] text-gray-300 mt-4">请尝试其他搜索关键词</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div 
        className="absolute left-[291px] overflow-clip right-[23px] top-[340px]"
        style={{ 
          aspectRatio: `1414 / ${totalHeight}`
        }}
        data-name="搜索结果展示"
      >
        {images.map((image, index) => {
          const positionIndex = index % 12;
          const pageIndex = Math.floor(index / 12);
          const position = CARD_POSITIONS[positionIndex];
          if (!position) return null;

          return (
            <div key={index} className="absolute contents">
              {/* 卡片背景 + 图片 - 合并为一层（移除overflow-hidden让下拉菜单显示） */}
              <div 
                className="absolute bg-[#f4f4f4] rounded-[18px] cursor-pointer hover:bg-gray-100 transition-colors group"
                style={{ inset: convertInset(position.inset, pageIndex) }}
                onClick={() => onImageClick?.(image.url)}
              >
                {/* 图片容器 - 应用overflow-hidden来裁切图片 */}
                <div className="absolute inset-0 rounded-[18px] overflow-hidden">
                  <img 
                    alt={`${carName} - ${image.category}`}
                    className="w-full h-full object-cover pointer-events-none" 
                    src={image.url}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
                
                {/* 收藏按钮 - 右上角 */}
                {carID && (
                  <div className="absolute right-[8px] top-[8px] z-10">
                    <FavoriteButton
                      carID={carID}
                      carName={carName}
                      imageURL={image.url}
                      category="search"
                      viewType={image.category}
                    />
                  </div>
                )}
                
                {/* 边框 */}
                <div aria-hidden="true" className="absolute border border-[#d8d8d8] border-solid inset-0 pointer-events-none rounded-[18px]" />
              </div>

              {/* 图片分类标签 */}
              <div 
                className="absolute flex flex-col font-['Inter:Bold',_sans-serif] font-bold justify-center leading-[0] not-italic text-[#202020] text-[14px]"
                style={{ inset: convertInset(position.titleInset, pageIndex) }}
              >
                <p className="leading-[normal]">{image.category}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 回到顶部按钮 */}
      {images.length > 12 && (
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

