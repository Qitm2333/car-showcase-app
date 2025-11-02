import { useEffect } from "react";

interface ImageViewerProps {
  isOpen: boolean;
  imageUrl: string;
  onClose: () => void;
  onPrevious?: () => void;  // ✅ 上一张
  onNext?: () => void;      // ✅ 下一张
  currentIndex?: number;    // ✅ 当前索引
  totalCount?: number;      // ✅ 总数
}

export default function ImageViewer({ 
  isOpen, 
  imageUrl, 
  onClose, 
  onPrevious, 
  onNext,
  currentIndex = 0,
  totalCount = 0
}: ImageViewerProps) {
  // 🔒 键盘事件处理
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && onPrevious) {
        onPrevious();
      } else if (e.key === 'ArrowRight' && onNext) {
        onNext();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // 禁止页面滚动
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose, onPrevious, onNext]);

  if (!isOpen) return null;

  const hasPrevious = onPrevious && currentIndex > 0;
  const hasNext = onNext && currentIndex < totalCount - 1;

  return (
    <div 
      className="fixed inset-0 bg-black/75 z-[9999] flex items-center justify-center backdrop-blur-sm"
      onClick={onClose}
      data-name="图片查看器"
    >
      {/* 关闭按钮 */}
      <button 
        className="absolute top-5 right-8 text-white text-[40px] leading-none cursor-pointer hover:opacity-70 transition-opacity z-10"
        onClick={onClose}
        aria-label="关闭"
      >
        &times;
      </button>

      {/* 上一张按钮 */}
      {hasPrevious && (
        <button
          className="absolute left-8 top-1/2 -translate-y-1/2 w-[50px] h-[50px] bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white text-[28px] cursor-pointer transition-all z-10"
          onClick={(e) => {
            e.stopPropagation();
            onPrevious();
          }}
          aria-label="上一张"
        >
          ‹
        </button>
      )}

      {/* 下一张按钮 */}
      {hasNext && (
        <button
          className="absolute right-8 top-1/2 -translate-y-1/2 w-[50px] h-[50px] bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white text-[28px] cursor-pointer transition-all z-10"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="下一张"
        >
          ›
        </button>
      )}

      {/* 图片内容 */}
      <img 
        className="max-w-[85%] max-h-[85%] object-contain"
        src={imageUrl}
        alt="查看图片"
        referrerPolicy="no-referrer"
        crossOrigin="anonymous"
        onClick={(e) => e.stopPropagation()} // 阻止点击图片时关闭
      />

      {/* 图片序号和提示 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        {totalCount > 0 && (
          <div className="text-white text-[16px] font-medium">
            {currentIndex + 1} / {totalCount}
          </div>
        )}
        <div className="text-white/60 text-[13px]">
          点击背景或按 ESC 键关闭 {hasNext || hasPrevious ? '• 左右方向键切换' : ''}
        </div>
      </div>
    </div>
  );
}

