import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';

/**
 * 🌐 语言选择器组件（带缩放提示）
 * 
 * 功能：
 * - 显示当前语言
 * - 支持切换语言（后期可扩展）
 * - 提示用户使用浏览器原生缩放
 * 
 * 配置说明：
 * - 目前为静态显示，后期可添加点击切换逻辑
 * - 可扩展为下拉菜单选择器
 */

interface LanguageSelectorProps {
  /** 当前语言 */
  currentLanguage?: "简体中文" | "English";
  /** 语言切换回调 */
  onLanguageChange?: (language: string) => void;
}

export interface LanguageSelectorRef {
  openScaleDialog: () => void;
}

const LanguageSelector = forwardRef<LanguageSelectorRef, LanguageSelectorProps>(({
  currentLanguage = "简体中文",
  onLanguageChange
}, ref) => {
  const [showScaleDialog, setShowScaleDialog] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);

  // 暴露方法给外部调用
  useImperativeHandle(ref, () => ({
    openScaleDialog: () => {
      console.log('🎯 外部调用：打开缩放提示弹窗');
      setShowScaleDialog(true);
    }
  }));

  // 清理旧的缩放设置，确保不再应用 CSS zoom
  useEffect(() => {
    document.body.style.zoom = '1';
    localStorage.removeItem('display-scale');
  }, []);

  const handleLanguageClick = () => {
    // TODO: 后期可添加语言切换逻辑
    console.log("🌐 点击切换语言");
    if (onLanguageChange) {
      const newLang = currentLanguage === "简体中文" ? "English" : "简体中文";
      onLanguageChange(newLang);
    }
  };

  const handleScaleHint = () => {
    console.log('打开缩放提示弹窗');
    setShowScaleDialog(true);
  };

  const handleCloseDialog = () => {
    if (dontShowAgain) {
      localStorage.setItem('scale-hint-shown', 'true');
      console.log('✅ 已保存：下次不再显示缩放提示');
    }
    // 🎬 触发关闭动画
    setIsClosing(true);
  };

  const handleAnimationEnd = () => {
    // 🎬 动画结束后真正关闭弹窗
    setShowScaleDialog(false);
    setIsClosing(false);
    setDontShowAgain(false); // 重置复选框
    
    // ✨ 高亮"缩放设置"按钮 1.5 秒
    setIsHighlighted(true);
    setTimeout(() => {
      setIsHighlighted(false);
    }, 1500);
  };

  return (
    <div className="absolute contents right-[64px] top-[54px]">
      {/* 缩放提示按钮 */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log('缩放按钮被点击');
          handleScaleHint();
        }}
        className={`absolute flex items-center justify-center font-['Inter:Regular',_sans-serif] right-[210px] top-[71px] translate-y-[-50%] cursor-pointer transition-all duration-300 hover:text-[#6062ef] z-10 ${
          isHighlighted 
            ? 'text-[#6062ef] scale-110' 
            : ''
        }`}
        style={{ 
          color: isHighlighted ? '#6062ef' : 'rgba(0, 0, 0, 0.3)',
          fontSize: '15px',
          height: '34px'
        }}
        title="点击查看界面缩放小贴士"
      >
        <span className="leading-normal">缩放设置</span>
      </button>

      {/* 语言选择器 */}
      <button 
        onClick={handleLanguageClick}
        className="absolute flex flex-col font-['Inter:Regular',_'Noto_Sans_SC:Bold',_'Noto_Sans_JP:Bold',_sans-serif] font-normal h-[34px] justify-center leading-[0] not-italic right-[64px] text-[15px] text-[rgba(0,0,0,0.26)] text-right top-[71px] translate-y-[-50%] w-[467px] cursor-default hover:opacity-80 transition-opacity"
        title="暂不可用"
      >
        <p className="leading-[normal]">
          <span>{currentLanguage === "简体中文" ? "English / " : ""}</span>
          <span className="font-['Inter:Bold',_'Noto_Sans_SC:Bold',_'Noto_Sans_JP:Bold',_sans-serif] font-bold not-italic text-[#6062ef]">
            {currentLanguage}
          </span>
        </p>
      </button>

      {/* 🎨 缩放提示弹窗 */}
      {showScaleDialog && (
        <>
          {/* 遮罩层 */}
          <div 
            className={`fixed inset-0 bg-black bg-opacity-30 z-[9998] transition-opacity duration-500 ${
              isClosing ? 'opacity-0' : 'animate-in fade-in duration-200'
            }`}
            onClick={() => !isClosing && setIsClosing(true)}
          />
          
          {/* 弹窗卡片 */}
          <div 
            className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] w-[540px] ${
              isClosing 
                ? 'scale-hint-fly-away' 
                : 'animate-in fade-in zoom-in-95 duration-200'
            }`}
            onAnimationEnd={(e) => {
              // 只在关闭动画结束时触发
              if (e.animationName === 'scale-hint-fly-away' && isClosing) {
                handleAnimationEnd();
              }
            }}
          >
            <div className="bg-white rounded-[28px] shadow-[0_24px_80px_rgba(96,98,239,0.2)] p-10">
              {/* 标题 */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#6062ef] to-[#8b8dff] mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">界面缩放小贴士</h3>
                <p className="text-[16px] text-gray-500">使用浏览器快捷键调整显示比例</p>
              </div>

              {/* 快捷键列表 */}
              <div className="space-y-3 mb-6">
                {/* 缩小 */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <span className="text-[17px] text-gray-700 font-medium">缩小界面</span>
                  <div className="flex items-center gap-2">
                    <kbd className="px-3 py-1.5 bg-white rounded-lg shadow-sm border border-gray-200 text-[15px] font-semibold text-gray-700">Cmd / Ctrl</kbd>
                    <span className="text-gray-400">+</span>
                    <kbd className="px-3 py-1.5 bg-white rounded-lg shadow-sm border border-gray-200 text-[15px] font-semibold text-gray-700">-</kbd>
                  </div>
                </div>

                {/* 放大 */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <span className="text-[17px] text-gray-700 font-medium">放大界面</span>
                  <div className="flex items-center gap-2">
                    <kbd className="px-3 py-1.5 bg-white rounded-lg shadow-sm border border-gray-200 text-[15px] font-semibold text-gray-700">Cmd / Ctrl</kbd>
                    <span className="text-gray-400">+</span>
                    <kbd className="px-3 py-1.5 bg-white rounded-lg shadow-sm border border-gray-200 text-[15px] font-semibold text-gray-700">+</kbd>
                  </div>
                </div>

                {/* 重置 */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <span className="text-[17px] text-gray-700 font-medium">恢复 100%</span>
                  <div className="flex items-center gap-2">
                    <kbd className="px-3 py-1.5 bg-white rounded-lg shadow-sm border border-gray-200 text-[15px] font-semibold text-gray-700">Cmd / Ctrl</kbd>
                    <span className="text-gray-400">+</span>
                    <kbd className="px-3 py-1.5 bg-white rounded-lg shadow-sm border border-gray-200 text-[15px] font-semibold text-gray-700">0</kbd>
                  </div>
                </div>
              </div>

              {/* 系统提示 */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-center gap-6 text-[15px]">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                    <span className="text-gray-600">Mac 请使用 <span className="font-semibold text-gray-800">Cmd</span></span>
                  </div>
                  <div className="w-px h-5 bg-gray-300"></div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                    <span className="text-gray-600">Win / Linux 请使用 <span className="font-semibold text-gray-800">Ctrl</span></span>
                  </div>
                </div>
              </div>

              {/* 推荐提示 */}
              <div className="bg-gradient-to-r from-[#fef3c7] to-[#fde68a] rounded-xl p-5 mb-6">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <svg className="w-6 h-6 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-[17px] font-semibold text-amber-900 mb-1">推荐缩放至 75%</p>
                    <p className="text-[15px] text-amber-800">可获得最舒适的浏览体验</p>
                  </div>
                </div>
              </div>

              {/* 复选框 */}
              <label className="flex items-center gap-2 mb-4 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={dontShowAgain}
                  onChange={(e) => setDontShowAgain(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-[#6062ef] focus:ring-[#6062ef] focus:ring-2 cursor-pointer"
                />
                <span className="text-[15px] text-gray-600 group-hover:text-gray-800 transition-colors select-none">
                  下次不再显示
                </span>
              </label>

              {/* 底部按钮 */}
              <button
                onClick={handleCloseDialog}
                className="w-full bg-gradient-to-r from-[#6062ef] to-[#7b7ff5] text-white py-4 rounded-xl text-[17px] font-semibold hover:shadow-lg transition-all duration-200 active:scale-[0.98]"
              >
                知道了
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
});

LanguageSelector.displayName = 'LanguageSelector';

export default LanguageSelector;

