import { useState, useRef, useEffect } from "react";
import svgPaths from "./svg-x05th6vacp";

// 筛选数据列表 - 便于维护
const BRAND_OPTIONS = ['比亚迪', '腾势', '问界', '理想', '小鹏', '蔚来'];
const MODEL_OPTIONS = ['SUV', 'Sedan', 'MPV', 'OffRoad', '小型车', '其他'];
const VIEW_OPTIONS = ['正侧图', '正45°', '侧45°', '前脸', '门板', 'IP', 'CNSL', '座椅'];
const PART_OPTIONS = ['大灯', '尾灯', '后视镜', '扶手', '方向盘', '音响罩', '遮阳板'];
const TIME_OPTIONS = ['2025', '2024', '2023', '2022', '2021', '2020', '其他'];

// ⭐ 模块级变量：缓存右侧筛选器的状态（跨组件挂载周期保持）
let cachedSelectedBrand: string | null = null;
let cachedSelectedModel: string | null = null;
let cachedSelectedView: string | null = '正45°'; // 默认值
let cachedSelectedPart: string | null = null;
let cachedSelectedTime: string | null = null;

// ⭐ 模块级变量：缓存标签状态
let cachedLabels: Array<{ id: string; text: string; visible: boolean }> = [];

function Group() {
  return (
    <div className="h-[11px] relative shrink-0 w-[15.206px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 11">
        <g id="Group 7">
          <path d={svgPaths.p118b0200} id="Vector 103" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="5" />
        </g>
      </svg>
    </div>
  );
}

// 品牌筛选组件（支持下拉菜单）
function Component({ selectedBrand, onBrandChange, isOpen, onToggle }: {
  selectedBrand: string | null;
  onBrandChange: (brand: string | null) => void;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  return (
    <div className="absolute left-[688px] top-0" data-name="品牌筛选" ref={dropdownRef}>
      <div 
        className={`box-border content-stretch flex h-[42px] items-center px-[5px] py-[6px] rounded-[81px] w-[122.127px] cursor-pointer transition-colors ${
          selectedBrand ? 'bg-[#dbdbff]' : 'bg-[rgba(241,221,255,0)]'
        }`}
        onClick={onToggle}
      >
        <div aria-hidden="true" className="absolute border-[0.5px] border-black border-solid inset-0 pointer-events-none rounded-[81px]" />
        <div className="flex flex-col font-['Inter:Regular',_'Noto_Sans_JP:Regular',_sans-serif] font-normal h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[15px] text-black text-center w-[81.076px]">
          <p className="leading-[normal]">{selectedBrand || '品牌'}</p>
        </div>
        <Group />
      </div>

      {/* 下拉菜单 */}
      {isOpen && (
        <div className="absolute top-[48px] left-0 w-[122px] bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-[240px] overflow-y-auto">
          <div 
            className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-[14px] text-gray-600 border-b border-gray-100"
            onClick={(e) => {
              e.stopPropagation();
              onBrandChange(null);
            }}
          >
            全部品牌
          </div>
          {BRAND_OPTIONS.map((brand) => (
            <div
              key={brand}
              className={`px-4 py-2 hover:bg-purple-50 cursor-pointer text-[14px] transition-colors ${
                selectedBrand === brand ? 'bg-purple-100 text-purple-700 font-medium' : 'text-gray-800'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                onBrandChange(brand);
              }}
            >
              {brand}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Group1() {
  return (
    <div className="h-[11px] relative shrink-0 w-[15.206px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 11">
        <g id="Group 7">
          <path d={svgPaths.p39e4ea00} id="Vector 103" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="5" />
        </g>
      </svg>
    </div>
  );
}

// 车型筛选组件
function Component1({ selectedModel, onModelChange, isOpen, onToggle }: {
  selectedModel: string | null;
  onModelChange: (model: string | null) => void;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="absolute left-[823.47px] top-0" data-name="车型筛选">
      <div 
        className={`box-border content-stretch flex h-[42px] items-center p-[6px] rounded-[81px] w-[122.127px] cursor-pointer transition-colors ${
          selectedModel ? 'bg-[#dbdbff]' : 'bg-white'
        }`}
        onClick={onToggle}
      >
        <div aria-hidden="true" className="absolute border-[0.5px] border-black border-solid inset-0 pointer-events-none rounded-[81px]" />
        <div className="flex flex-col font-['Inter:Regular',_'Noto_Sans_JP:Regular',_sans-serif] font-normal h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[15px] text-black text-center w-[81.076px]">
          <p className="leading-[normal]">{selectedModel || '车型'}</p>
        </div>
        <Group1 />
      </div>

      {/* 下拉菜单 */}
      {isOpen && (
        <div className="absolute top-[48px] left-0 w-[122px] bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-[240px] overflow-y-auto">
          <div 
            className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-[14px] text-gray-600 border-b border-gray-100"
            onClick={(e) => {
              e.stopPropagation();
              onModelChange(null);
            }}
          >
            全部车型
          </div>
          {MODEL_OPTIONS.map((model) => (
            <div
              key={model}
              className={`px-4 py-2 hover:bg-purple-50 cursor-pointer text-[14px] transition-colors ${
                selectedModel === model ? 'bg-purple-100 text-purple-700 font-medium' : 'text-gray-800'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                onModelChange(model);
              }}
            >
              {model}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Group2() {
  return (
    <div className="h-[11px] relative shrink-0 w-[15.206px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 11">
        <g id="Group 7">
          <g id="Vector 103">
            <mask fill="white" id="path-1-inside-1_1_1157">
              <path d={svgPaths.pf585580} />
            </mask>
            <path d={svgPaths.pf585580} fill="var(--fill-0, white)" />
            <path d={svgPaths.p1021300} fill="var(--stroke-0, black)" mask="url(#path-1-inside-1_1_1157)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

// 视角筛选组件
function Component2({ selectedView, onViewChange, isOpen, onToggle }: {
  selectedView: string | null;
  onViewChange: (view: string | null) => void;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="absolute left-[958.94px] top-0" data-name="视角筛选">
      <div 
        className={`box-border content-stretch flex h-[42px] items-center px-[5px] py-[6px] rounded-[81px] w-[122.127px] cursor-pointer transition-colors ${
          selectedView ? 'bg-[#dbdbff]' : 'bg-white'
        }`}
        onClick={onToggle}
      >
        <div aria-hidden="true" className="absolute border-[0.5px] border-black border-solid inset-0 pointer-events-none rounded-[81px]" />
        <div className="flex flex-col font-['Inter:Regular',_'Noto_Sans_SC:Regular',_'Noto_Sans_JP:Regular',_sans-serif] font-normal h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[15px] text-black text-center w-[81.076px]">
          <p className="leading-[normal]">{selectedView || '视角'}</p>
        </div>
        <Group2 />
      </div>

      {/* 下拉菜单 */}
      {isOpen && (
        <div className="absolute top-[48px] left-0 w-[122px] bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-[240px] overflow-y-auto">
          <div 
            className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-[14px] text-gray-600 border-b border-gray-100"
            onClick={(e) => {
              e.stopPropagation();
              onViewChange(null);
            }}
          >
            全部视角
          </div>
          {VIEW_OPTIONS.map((view) => (
            <div
              key={view}
              className={`px-4 py-2 hover:bg-purple-50 cursor-pointer text-[14px] transition-colors ${
                selectedView === view ? 'bg-purple-100 text-purple-700 font-medium' : 'text-gray-800'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                onViewChange(view);
              }}
            >
              {view}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Group3() {
  return (
    <div className="h-[11px] relative shrink-0 w-[15.206px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 11">
        <g id="Group 7">
          <path d={svgPaths.p118b0200} id="Vector 103" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="5" />
        </g>
      </svg>
    </div>
  );
}

// 部件筛选组件（⭐ 暂时禁用）
function Component3({ selectedPart, onPartChange, isOpen, onToggle }: {
  selectedPart: string | null;
  onPartChange: (part: string | null) => void;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const disabled = true; // ⭐ 禁用状态
  
  return (
    <div className="absolute left-[1094.41px] top-0" data-name="部件筛选" title="功能开发中，敬请期待">
      <div 
        className={`box-border content-stretch flex h-[42px] items-center px-[5px] py-[11px] rounded-[81px] w-[122.127px] transition-colors ${
          disabled 
            ? 'bg-[#f5f5f5] cursor-default opacity-50' 
            : selectedPart 
              ? 'bg-[#dbdbff] cursor-pointer' 
              : 'bg-white cursor-pointer'
        }`}
        onClick={disabled ? undefined : onToggle}
      >
        <div aria-hidden="true" className={`absolute border-[0.5px] border-solid inset-0 pointer-events-none rounded-[81px] ${
          disabled ? 'border-gray-300' : 'border-black'
        }`} />
        <div className={`flex flex-col font-['Inter:Regular',_'Noto_Sans_JP:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[15px] text-center w-[81.076px] ${
          disabled ? 'text-gray-400' : 'text-black'
        }`}>
          <p className="leading-[normal]">{selectedPart || '部件'}</p>
        </div>
        <Group3 />
      </div>

      {/* ⭐ 禁用时不显示下拉菜单 */}
      {!disabled && isOpen && (
        <div className="absolute top-[48px] left-0 w-[122px] bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-[240px] overflow-y-auto">
          <div 
            className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-[14px] text-gray-600 border-b border-gray-100"
            onClick={(e) => {
              e.stopPropagation();
              onPartChange(null);
            }}
          >
            全部部件
          </div>
          {PART_OPTIONS.map((part) => (
            <div
              key={part}
              className={`px-4 py-2 hover:bg-purple-50 cursor-pointer text-[14px] transition-colors ${
                selectedPart === part ? 'bg-purple-100 text-purple-700 font-medium' : 'text-gray-800'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                onPartChange(part);
              }}
            >
              {part}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Group4() {
  return (
    <div className="h-[11px] relative shrink-0 w-[15.206px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 11">
        <g id="Group 7">
          <path d={svgPaths.p118b0200} id="Vector 103" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="5" />
        </g>
      </svg>
    </div>
  );
}

// 时间筛选组件（⭐ 暂时禁用）
function Component4({ selectedTime, onTimeChange, isOpen, onToggle }: {
  selectedTime: string | null;
  onTimeChange: (time: string | null) => void;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const disabled = true; // ⭐ 禁用状态
  
  return (
    <div className="absolute left-[1229.88px] top-0" data-name="时间筛选" title="功能开发中，敬请期待">
      <div 
        className={`box-border content-stretch flex h-[42px] items-center p-[6px] rounded-[81px] w-[122.127px] transition-colors ${
          disabled 
            ? 'bg-[#f5f5f5] cursor-default opacity-50' 
            : selectedTime 
              ? 'bg-[#dbdbff] cursor-pointer' 
              : 'bg-white cursor-pointer'
        }`}
        onClick={disabled ? undefined : onToggle}
      >
        <div aria-hidden="true" className={`absolute border-[0.5px] border-solid inset-0 pointer-events-none rounded-[81px] ${
          disabled ? 'border-gray-300' : 'border-black'
        }`} />
        <div className={`flex flex-col font-['Inter:Regular',_'Noto_Sans_SC:Regular',_sans-serif] font-normal h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[15px] text-center w-[81.076px] ${
          disabled ? 'text-gray-400' : 'text-black'
        }`}>
          <p className="leading-[normal]">{selectedTime || '时间'}</p>
        </div>
        <Group4 />
      </div>

      {/* ⭐ 禁用时不显示下拉菜单 */}
      {!disabled && isOpen && (
        <div className="absolute top-[48px] left-0 w-[122px] bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-[240px] overflow-y-auto">
          <div 
            className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-[14px] text-gray-600 border-b border-gray-100"
            onClick={(e) => {
              e.stopPropagation();
              onTimeChange(null);
            }}
          >
            全部时间
          </div>
          {TIME_OPTIONS.map((time) => (
            <div
              key={time}
              className={`px-4 py-2 hover:bg-purple-50 cursor-pointer text-[14px] transition-colors ${
                selectedTime === time ? 'bg-purple-100 text-purple-700 font-medium' : 'text-gray-800'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                onTimeChange(time);
              }}
            >
              {time}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface Component5Props {
  onFilterChange?: (filters: {
    keyword?: string; // 保持keyword参数，虽然右侧筛选器不使用
    brands: string[];
    models: string[];
    views: string[];
    parts: string[];
    times: string[];
  }) => void;
}

function Component5({ onFilterChange }: Component5Props = {}) {
  // ⭐ 从缓存中恢复状态
  const [selectedBrand, setSelectedBrand] = useState<string | null>(cachedSelectedBrand);
  const [selectedModel, setSelectedModel] = useState<string | null>(cachedSelectedModel);
  const [selectedView, setSelectedView] = useState<string | null>(cachedSelectedView);
  const [selectedPart, setSelectedPart] = useState<string | null>(cachedSelectedPart);
  const [selectedTime, setSelectedTime] = useState<string | null>(cachedSelectedTime);
  
  const [isBrandDropdownOpen, setIsBrandDropdownOpen] = useState(false);
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [isViewDropdownOpen, setIsViewDropdownOpen] = useState(false);
  const [isPartDropdownOpen, setIsPartDropdownOpen] = useState(false);
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  // ⭐ 跟踪是否是组件首次挂载后的第一批 useEffect
  const isComponentMountRef = useRef(true);

  // ⭐ 组件挂载后标记结束初始化（使用微任务延迟，确保所有同步 useEffect 都执行完）
  useEffect(() => {
    console.log('✅ [右侧筛选器] 组件挂载，准备结束初始化标记');
    console.log('📦 恢复缓存的筛选器:', { 
      品牌: cachedSelectedBrand, 
      车型: cachedSelectedModel, 
      视角: cachedSelectedView 
    });
    // 使用 Promise.resolve() 确保在所有同步代码执行完后再标记
    Promise.resolve().then(() => {
      isComponentMountRef.current = false;
      console.log('✅ [右侧筛选器] 初始化标记已结束');
    });
  }, []);

  // 点击外部关闭所有下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsBrandDropdownOpen(false);
        setIsModelDropdownOpen(false);
        setIsViewDropdownOpen(false);
        setIsPartDropdownOpen(false);
        setIsTimeDropdownOpen(false);
      }
    };

    if (isBrandDropdownOpen || isModelDropdownOpen || isViewDropdownOpen || isPartDropdownOpen || isTimeDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isBrandDropdownOpen, isModelDropdownOpen, isViewDropdownOpen, isPartDropdownOpen, isTimeDropdownOpen]);

  // 通知父组件筛选条件变化（右侧筛选器）
  useEffect(() => {
    if (onFilterChange) {
      const filters = {
        keyword: undefined, // 右侧筛选器不涉及keyword
        brands: selectedBrand ? [selectedBrand] : [],
        models: selectedModel ? [selectedModel] : [],
        views: selectedView ? [selectedView] : [],
        parts: selectedPart ? [selectedPart] : [],
        times: selectedTime ? [selectedTime] : []
      };
      
      console.log('🔧 右侧筛选器变化:', filters, '组件挂载状态:', isComponentMountRef.current);
      onFilterChange(filters, isComponentMountRef.current);  // ⭐ 始终传递组件挂载状态
    }
  }, [selectedBrand, selectedModel, selectedView, selectedPart, selectedTime, onFilterChange]);

  // 处理各个筛选器的选择（同步更新缓存）
  const handleBrandChange = (brand: string | null) => {
    setSelectedBrand(brand);
    cachedSelectedBrand = brand; // ⭐ 更新缓存
    setIsBrandDropdownOpen(false);
  };

  const handleModelChange = (model: string | null) => {
    setSelectedModel(model);
    cachedSelectedModel = model; // ⭐ 更新缓存
    setIsModelDropdownOpen(false);
  };

  const handleViewChange = (view: string | null) => {
    setSelectedView(view);
    cachedSelectedView = view; // ⭐ 更新缓存
    setIsViewDropdownOpen(false);
  };

  const handlePartChange = (part: string | null) => {
    setSelectedPart(part);
    cachedSelectedPart = part; // ⭐ 更新缓存
    setIsPartDropdownOpen(false);
  };

  const handleTimeChange = (time: string | null) => {
    setSelectedTime(time);
    cachedSelectedTime = time; // ⭐ 更新缓存
    setIsTimeDropdownOpen(false);
  };

  return (
    <div className="absolute contents left-[688px] top-0" data-name="右侧筛选" ref={dropdownRef}>
      <Component 
        selectedBrand={selectedBrand}
        onBrandChange={handleBrandChange}
        isOpen={isBrandDropdownOpen}
        onToggle={() => {
          setIsBrandDropdownOpen(!isBrandDropdownOpen);
          setIsModelDropdownOpen(false);
          setIsViewDropdownOpen(false);
          setIsPartDropdownOpen(false);
          setIsTimeDropdownOpen(false);
        }}
      />
      <Component1 
        selectedModel={selectedModel}
        onModelChange={handleModelChange}
        isOpen={isModelDropdownOpen}
        onToggle={() => {
          setIsModelDropdownOpen(!isModelDropdownOpen);
          setIsBrandDropdownOpen(false);
          setIsViewDropdownOpen(false);
          setIsPartDropdownOpen(false);
          setIsTimeDropdownOpen(false);
        }}
      />
      <Component2 
        selectedView={selectedView}
        onViewChange={handleViewChange}
        isOpen={isViewDropdownOpen}
        onToggle={() => {
          setIsViewDropdownOpen(!isViewDropdownOpen);
          setIsBrandDropdownOpen(false);
          setIsModelDropdownOpen(false);
          setIsPartDropdownOpen(false);
          setIsTimeDropdownOpen(false);
        }}
      />
      <Component3 
        selectedPart={selectedPart}
        onPartChange={handlePartChange}
        isOpen={isPartDropdownOpen}
        onToggle={() => {
          setIsPartDropdownOpen(!isPartDropdownOpen);
          setIsBrandDropdownOpen(false);
          setIsModelDropdownOpen(false);
          setIsViewDropdownOpen(false);
          setIsTimeDropdownOpen(false);
        }}
      />
      <Component4 
        selectedTime={selectedTime}
        onTimeChange={handleTimeChange}
        isOpen={isTimeDropdownOpen}
        onToggle={() => {
          setIsTimeDropdownOpen(!isTimeDropdownOpen);
          setIsBrandDropdownOpen(false);
          setIsModelDropdownOpen(false);
          setIsViewDropdownOpen(false);
          setIsPartDropdownOpen(false);
        }}
      />
    </div>
  );
}

function Component6() {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      // 这里可以添加搜索逻辑
      console.log('搜索:', searchValue.trim());
    }
  };

  return (
    <div className="absolute h-[42px] left-0 top-0 w-[664px] z-0" data-name="中部搜索栏">
      <div className="absolute inset-[-1.19%_-0.15%_-3.57%_-0.15%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 666 44">
          <g id="ä¸­é¨æç´¢æ ">
            <g filter="url(#filter0_d_10_49)" id="ä¸­é¨æç´¢">
              <rect fill="var(--fill-0, white)" height="42" rx="21" width="664" x="1" y="0.5" />
              <rect height="41.5" rx="20.75" stroke="var(--stroke-0, black)" strokeWidth="0.5" width="663.5" x="1.25" y="0.75" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="44" id="filter0_d_10_49" width="666" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="0.5" />
              <feGaussianBlur stdDeviation="0.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.42 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_10_49" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_10_49" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
      {/* 添加搜索输入框 */}
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={handleSearch}
        placeholder=""
        className="absolute w-full h-full bg-transparent border-none outline-none px-8 text-[16px] text-black z-0"
      />
    </div>
  );
}

function Group5({ onClick }: { onClick: () => void }) {
  return (
    <div 
      className="absolute h-[8px] right-[10.72px] top-1/2 translate-y-[-50%] w-[7.145px] cursor-pointer"
      onClick={onClick}
    >
      <div className="absolute inset-[-12.5%_-14%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
          <g id="Group 12">
            <path d={svgPaths.p2dd296c0} id="Vector 104" stroke="var(--stroke-0, #494949)" strokeLinecap="round" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}



function Group6({ onClick }: { onClick: () => void }) {
  return (
    <div 
      className="absolute h-[8px] right-[10.72px] top-1/2 translate-y-[-50%] w-[7.145px] cursor-pointer"
      onClick={onClick}
    >
      <div className="absolute inset-[-12.5%_-14%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
          <g id="Group 12">
            <path d={svgPaths.p2dd296c0} id="Vector 104" stroke="var(--stroke-0, #494949)" strokeLinecap="round" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Label({ isVisible, onDelete, position, text }: { isVisible: boolean; onDelete: () => void; position: { left: number }; text: string }) {
  if (!isVisible) {
    return null;
  }

  // 根据文字长度计算标签宽度
  const baseWidth = 60; // 基础宽度
  const charWidth = 8; // 每个字符的宽度
  const minWidth = 80; // 最小宽度
  const maxWidth = 200; // 最大宽度
  const calculatedWidth = Math.min(Math.max(text.length * charWidth + baseWidth, minWidth), maxWidth);

  return (
    <div 
      className="absolute h-[24px] top-[9px] z-20" 
      data-name="label01"
      style={{ left: `${position.left}px`, width: `${calculatedWidth}px` }}
    >
      <div className="absolute inset-0 bg-[#dbdbff] rounded-[81px]" />
      <div className="absolute flex items-center justify-start font-['Inter:Regular',_sans-serif] font-normal leading-[0] left-[12px] not-italic text-[14px] text-[rgba(0,0,0,0.8)] text-nowrap top-0 w-[calc(100%-24px)] h-full z-20">
        <p className="leading-[normal] whitespace-pre">{text}</p>
      </div>
      <Group6 onClick={onDelete} />
    </div>
  );
}

function Label1({ isVisible, onDelete, position, text }: { isVisible: boolean; onDelete: () => void; position: { left: number }; text: string }) {
  if (!isVisible) {
    return null;
  }

  // 根据文字长度计算标签宽度
  const baseWidth = 60; // 基础宽度
  const charWidth = 8; // 每个字符的宽度
  const minWidth = 80; // 最小宽度
  const maxWidth = 200; // 最大宽度
  const calculatedWidth = Math.min(Math.max(text.length * charWidth + baseWidth, minWidth), maxWidth);

  return (
    <div 
      className="absolute h-[24px] top-[9px] z-20" 
      data-name="label02"
      style={{ left: `${position.left}px`, width: `${calculatedWidth}px` }}
    >
      <div className="absolute inset-0 bg-[#dbdbff] rounded-[81px]" />
      <div className="absolute flex items-center justify-start font-['Inter:Regular',_sans-serif] font-normal leading-[0] left-[12px] not-italic text-[14px] text-[rgba(0,0,0,0.8)] text-nowrap top-0 w-[calc(100%-24px)] h-full z-20">
        <p className="leading-[normal] whitespace-pre">{text}</p>
      </div>
      <Group5 onClick={onDelete} />
    </div>
  );
}

function InputBox({ onAddLabel, position }: { onAddLabel: (text: string) => void; position: { left: number } }) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      onAddLabel(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div 
      className="absolute h-[24px] top-[9px] w-[111px] z-20"
      style={{ left: `${position.left}px` }}
    >
      <div className="absolute inset-0 bg-white rounded-[81px] border border-gray-300" />
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="输入标签..."
        className="absolute inset-0 bg-transparent border-none outline-none px-3 text-[14px] text-[rgba(0,0,0,0.8)] placeholder-gray-400 z-20"
      />
    </div>
  );
}

interface Component7Props {
  onFilterChange?: (filters: {
    keyword?: string;
    brands: string[];
    models: string[];
    views: string[];
    parts: string[];
    times: string[];
  }) => void;
}

export default function Component7({ onFilterChange }: Component7Props = {}) {
  // ⭐ 从缓存中恢复标签状态
  const [labels, setLabels] = useState<Array<{ id: string; text: string; visible: boolean }>>(cachedLabels);

  const handleDeleteLabel = (labelId: string) => {
    setLabels(prevLabels => {
      const newLabels = prevLabels.map(label => 
        label.id === labelId ? { ...label, visible: false } : label
      );
      cachedLabels = newLabels; // ⭐ 更新缓存
      return newLabels;
    });
  };

  const handleAddLabel = (text: string) => {
    const newLabel = {
      id: `label-${Date.now()}`,
      text: text,
      visible: true
    };
    setLabels(prevLabels => {
      const newLabels = [...prevLabels, newLabel];
      cachedLabels = newLabels; // ⭐ 更新缓存
      return newLabels;
    });
  };

  // ⭐ 跟踪是否是组件首次挂载后的第一批 useEffect
  const isComponentMountRef = useRef(true);

  // ⭐ 组件挂载后标记结束初始化（使用微任务延迟，确保所有同步 useEffect 都执行完）
  useEffect(() => {
    console.log('✅ [标签筛选] 组件挂载，准备结束初始化标记');
    console.log('📦 恢复缓存的标签:', cachedLabels.filter(l => l.visible).map(l => l.text));
    // 使用 Promise.resolve() 确保在所有同步代码执行完后再标记
    Promise.resolve().then(() => {
      isComponentMountRef.current = false;
      console.log('✅ [标签筛选] 初始化标记已结束');
    });
  }, []);

  // 🔍 当标签变化时，将标签文本作为关键词传递给筛选功能
  useEffect(() => {
    if (onFilterChange) {
      const visibleLabelTexts = labels
        .filter(label => label.visible)
        .map(label => label.text);
      
      // 将所有标签文本组合成一个关键词（用空格分隔）
      const keyword = visibleLabelTexts.join(' ');
      
      console.log('🏷️ 标签变化，触发筛选:', visibleLabelTexts, '组件挂载状态:', isComponentMountRef.current);
      
      // 只有当有标签时才触发筛选
      // 如果用户删除了所有标签，传递空关键词
      onFilterChange({
        keyword: keyword.trim(),
        brands: [],
        models: [],
        views: [],
        parts: [],
        times: []
      }, isComponentMountRef.current);  // ⭐ 始终传递组件挂载状态
    }
  }, [labels, onFilterChange]);

  // 辅助函数：根据文字内容计算标签宽度
  const calculateLabelWidth = (text: string): number => {
    const baseWidth = 60; // 基础宽度
    const charWidth = 8; // 每个字符的宽度
    const minWidth = 80; // 最小宽度
    const maxWidth = 200; // 最大宽度
    return Math.min(Math.max(text.length * charWidth + baseWidth, minWidth), maxWidth);
  };

  // 计算每个可见标签的位置
  const visibleLabels = labels.filter(label => label.visible);
  const labelPositions = visibleLabels.map((label, index) => {
    // 计算累计宽度（包括当前标签之前的所有标签和间距）
    let totalWidth = 14; // 起始位置
    for (let i = 0; i < index; i++) {
      const prevLabelWidth = calculateLabelWidth(visibleLabels[i].text);
      totalWidth += prevLabelWidth + 10; // 每个标签后添加10px间距
    }
    return { left: totalWidth };
  });

  // 计算输入框的位置（在最后一个可见标签的右侧）
  let inputBoxLeft = 14; // 起始位置
  visibleLabels.forEach(label => {
    const labelWidth = calculateLabelWidth(label.text);
    inputBoxLeft += labelWidth + 10; // 每个标签后添加10px间距
  });
  // 如果没有任何标签，inputBoxLeft保持14px
  const inputBoxPosition = {
    left: inputBoxLeft
  };

  return (
    <div className="relative size-full" data-name="中部栏">
      <Component5 onFilterChange={onFilterChange} />
      <Component6 />
      {visibleLabels.map((label, index) => {
        const position = labelPositions[index];
        if (label.id === 'label01') {
          return (
            <Label 
              key={label.id}
              isVisible={label.visible}
              onDelete={() => handleDeleteLabel(label.id)}
              position={position}
              text={label.text}
            />
          );
        } else if (label.id === 'label02') {
          return (
            <Label1 
              key={label.id}
              isVisible={label.visible}
              onDelete={() => handleDeleteLabel(label.id)}
              position={position}
              text={label.text}
            />
          );
        } else {
          // 动态添加的标签使用Label组件
          return (
            <Label 
              key={label.id}
              isVisible={label.visible}
              onDelete={() => handleDeleteLabel(label.id)}
              position={position}
              text={label.text}
            />
          );
        }
      })}
      <InputBox 
        onAddLabel={handleAddLabel}
        position={inputBoxPosition}
      />
    </div>
  );
}