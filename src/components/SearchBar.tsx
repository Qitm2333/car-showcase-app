/**
 * 🔍 全局搜索栏组件
 * 
 * 功能：
 * - 可输入搜索内容
 * - 点击搜索图标可触发搜索
 * - 支持Enter键触发搜索
 * - 显示在除登录页外的所有页面顶部
 * 
 * 使用位置：
 * - CarShowcaseMain (车型展示主页)
 * - CarShowcaseDetail (车型详情页)
 * - FavoritesMain (收藏夹主页)
 * - FavoritesDetail (收藏夹详情页)
 * - AIAnalysis (AI分析页)
 * 
 * 配置说明：
 * - 搜索功能目前为占位实现，后期可扩展
 * - 可通过onSearch回调自定义搜索逻辑
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// 🔍 正确的搜索图标（放大镜）
import searchIcon from "@/assets/inspiration-main/bc5714d60e019c3c784b95baca32952d6f1d72e7.png";

interface SearchBarProps {
  /** 搜索框的占位文本 */
  placeholder?: string;
  /** 搜索回调函数（目前为占位，后期可扩展） */
  onSearch?: (searchText: string) => void;
  /** 自定义样式类名 */
  className?: string;
  /** 来源页面，用于保持导航栏状态 */
  from?: "car-showcase" | "favorites" | "ai-analysis";
}

export default function SearchBar({ 
  placeholder = "关于这辆车，有什么问题都可以问我",
  onSearch,
  className = "",
  from = "car-showcase"
}: SearchBarProps) {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  // 处理搜索操作
  const handleSearch = () => {
    console.log("🔍 搜索内容:", searchText, "来源:", from);
    
    // 如果搜索内容不为空，跳转到搜索结果页，并携带来源信息
    if (searchText.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchText)}&from=${from}`);
    }
    
    // 调用外部传入的搜索回调（如果有）
    if (onSearch) {
      onSearch(searchText);
    }
    
    // TODO: 后期在此处添加实际的搜索逻辑
    // 例如：调用API、过滤数据等
  };

  // 处理输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  // 处理键盘事件（支持Enter键搜索）
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={`absolute contents left-[322px] top-[47px] ${className}`} data-name="上部搜索栏">
      {/* 搜索框背景 */}
      <div className="absolute bg-white h-[46px] left-[322px] rounded-[203px] top-[47px] w-[559px]" data-name="上部搜索">
        <div 
          aria-hidden="true" 
          className="absolute border-[0.5px] border-black border-solid inset-0 pointer-events-none rounded-[203px] shadow-[0px_0.5px_2px_0px_rgba(0,0,0,0.42)]" 
        />
      </div>
      
      {/* 搜索输入框 - 使用flex居中与原始设计一致 */}
      <input
        type="text"
        value={searchText}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        className="absolute font-['Inter:Regular',_'Noto_Sans_JP:Regular',_'Noto_Sans_SC:Regular',_sans-serif] font-normal left-[388px] not-italic text-[20px] text-black placeholder:text-[rgba(0,0,0,0.26)] top-[71px] translate-y-[-50%] h-[34px] w-[467px] bg-transparent border-none outline-none flex items-center"
        style={{ lineHeight: 'normal' }}
      />
      
      {/* 搜索图标按钮 */}
      <button 
        onClick={handleSearch}
        className="absolute left-[335px] size-[25px] top-[58px] cursor-pointer hover:opacity-80 transition-opacity"
        data-name="搜索按钮"
        title="点击搜索"
      >
        <img 
          alt="搜索" 
          className="absolute inset-0 max-w-none object-50%-50% object-cover opacity-[0.97] pointer-events-none size-full" 
          src={searchIcon} 
        />
      </button>
      
      {/* 分隔线 */}
      <div className="absolute h-[26px] left-[371px] top-[58px] w-0">
        <div className="absolute inset-[-1.92%_-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 27">
            <path 
              d="M0.5 0.5V26.5" 
              id="Vector 119" 
              stroke="var(--stroke-0, black)" 
              strokeLinecap="round" 
              strokeOpacity="0.22" 
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

