import { useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useUser } from "@/contexts/UserContext";
import { useAIAnalysis } from "@/contexts/AIAnalysisContext";
import { useDebug } from "@/contexts/DebugContext";
import img1 from "@/assets/ai-analysis/5b705b92be0721d93aaa1956ff0e19d5f801458a.png";

// ⭐ 骨架屏：对话项加载中
function DialogueItemSkeleton() {
  return (
    <div className="rounded-[18px] mb-[10px] py-[8px] pl-[12px] pr-[8px] bg-[#f8f9fa]">
      <div className="flex items-center gap-[10px]">
        <div className="w-[18px] h-[18px] bg-gradient-to-br from-[#e0dff5] to-[#d5d4e8] rounded-full animate-pulse flex-shrink-0"></div>
        <div className="flex-1">
          <div className="h-[14px] bg-gradient-to-r from-[#e8e6f2] to-[#f0eff5] rounded w-[80%] animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

// ⭐ 动态对话项
interface DialogueItemProps {
  title: string;
  isActive: boolean;
  onClick: () => void;
}

function DialogueItem({ title, isActive, onClick }: DialogueItemProps) {
  return (
    <div
      className={`
        cursor-pointer transition-all duration-200 rounded-[18px] mb-[10px] py-[8px] pl-[12px] pr-[8px]
        ${isActive ? 'bg-[#ebe9ff] shadow-[0_1px_3px_rgba(96,98,239,0.12)]' : 'hover:bg-[#f5f3ff]'}
      `}
      onClick={onClick}
    >
      <div className="flex items-center gap-[10px]">
        <img src={img1} alt="" className={`w-[18px] h-[18px] object-contain flex-shrink-0 ${isActive ? 'opacity-80' : 'opacity-70'}`} />
        <p className={`font-['Inter:Regular',_'Noto_Sans_SC:Regular',_sans-serif] text-[14px] truncate flex-1 leading-[1.4] ${isActive ? 'text-[rgba(0,0,0,0.9)] font-medium' : 'text-[rgba(0,0,0,0.8)]'}`}>
          {title}
        </p>
      </div>
    </div>
  );
}

export default function LeftNavOverlay() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setInviteCode } = useUser();
  const { dialogues, isLoadingDialogues, currentDialogueID, selectDialogue } = useAIAnalysis();
  const { handleLogoClick } = useDebug();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  // 退出登录
  const handleLogout = () => {
    setInviteCode('');
    setShowDropdown(false);
    navigate('/login');
  };

  return (
    <div className="fixed left-0 top-0 z-50" style={{ width: '273px' }}>
      {/* ⭐ Quality Logo 点击区域 - 用于触发调试工具（隐藏功能，不显示指针变化） */}
      <button
        onClick={(e) => {
          console.log('🎯 Quality logo clicked in LeftNavOverlay!');
          e.stopPropagation();
          handleLogoClick();
        }}
        className="absolute z-[100]"
        style={{
          left: '19px',
          top: '46px',
          width: '186px',
          height: '46px',
          cursor: 'default'
        }}
        aria-label="Debug Tool Toggle"
      />
      
      {/* 用户头像下拉区域 - 从top: 130px开始，覆盖用户头像和下拉箭头 */}
      <div ref={dropdownRef} className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="absolute hover:bg-purple-100 hover:bg-opacity-20 transition-all rounded-lg"
          style={{ 
            left: '20px',
            top: '130px',
            width: '233px',
            height: '50px'
          }}
          title="用户菜单"
        />
        
        {/* 下拉菜单 */}
        {showDropdown && (
          <div 
            className="absolute bg-white rounded-[20px] shadow-[0_8px_24px_rgba(0,0,0,0.12)] border border-[rgba(0,0,0,0.06)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
            style={{ 
              left: '20px',
              top: '185px',
              width: '233px',
              zIndex: 100
            }}
          >
            <button
              onClick={handleLogout}
              className="w-full py-3.5 text-left hover:bg-gradient-to-r hover:from-[#f5f4ff] hover:to-[#faf9ff] transition-all duration-200 flex items-center text-[15px] text-[#272727] font-medium group"
              style={{ paddingLeft: '24px', gap: '26px' }}
            >
              <svg 
                className="w-5 h-5 text-[#6062ef] group-hover:scale-110 transition-transform duration-200 flex-shrink-0" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                />
              </svg>
              <span className="group-hover:text-[#6062ef] transition-colors duration-200">退出登录</span>
            </button>
          </div>
        )}
      </div>
      
      {/* 灵感搜集 / 车型展示 - 从top: 300px开始，高度到386px */}
      <button
        onClick={() => navigate('/car-showcase')}
        className="absolute hover:bg-purple-100 hover:bg-opacity-20 transition-all"
        style={{ 
          left: 0,
          top: '300px',
          width: '273px',
          height: '86px'
        }}
        title="车型展示 / 灵感搜集"
      />
      
      {/* 收藏夹 - 从top: 386px开始，高度到457px */}
      <button
        onClick={() => navigate('/favorites')}
        className="absolute hover:bg-purple-100 hover:bg-opacity-20 transition-all"
        style={{ 
          left: 0,
          top: '386px',
          width: '273px',
          height: '71px'
        }}
        title="收藏夹"
      />
      
      {/* 我的项目 - 从top: 457px开始，高度到525px（⭐ 禁用状态） */}
      <button
        onClick={undefined}
        disabled
        className="absolute transition-all cursor-default bg-purple-50 bg-opacity-60"
        style={{ 
          left: 0,
          top: '457px',
          width: '273px',
          height: '68px'
        }}
        title="暂无权限访问"
      />
      
      {/* 线上评审 - 从top: 525px开始，高度到596px（⭐ 禁用状态） */}
      <button
        onClick={undefined}
        disabled
        className="absolute transition-all cursor-default bg-purple-50 bg-opacity-60"
        style={{ 
          left: 0,
          top: '525px',
          width: '273px',
          height: '71px'
        }}
        title="暂无权限访问"
      />
      
      {/* AI分析 - 从top: 596px开始 */}
      <button
        onClick={() => navigate('/ai-analysis')}
        className="absolute hover:bg-purple-100 hover:bg-opacity-20 transition-all"
        style={{ 
          left: 0,
          top: '596px',
          width: '273px',
          height: '71px'
        }}
        title="AI分析"
      />
      
      {/* ⭐ 历史分析 - 对话列表（只在非 AI 分析页面显示） */}
      {location.pathname !== '/ai-analysis' && (
        <>
          {/* 隐藏滚动条样式 */}
          <style>{`
            .dialogue-list-scroll::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          
          {/* 加载中 */}
          {isLoadingDialogues && (
            <div className="absolute left-[48px] right-[32px] top-[755px]" style={{ height: '300px' }}>
              <div className="flex flex-col pt-[8px]">
                <DialogueItemSkeleton />
                <DialogueItemSkeleton />
                <DialogueItemSkeleton />
              </div>
            </div>
          )}
          
          {/* 空状态 */}
          {!isLoadingDialogues && dialogues.length === 0 && (
            <div 
              className="absolute left-[60px] w-[150px] h-[120px] flex flex-col items-center justify-center pointer-events-none z-[100]"
              style={{ top: '775px' }}
            >
              <p className="font-['Inter:Regular',_sans-serif] text-[13px] text-[rgba(0,0,0,0.4)] text-center whitespace-nowrap">
                暂无对话历史
                <br />
                <span className="text-[11px]">开始新的对话吧</span>
              </p>
            </div>
          )}
          
          {/* 对话列表 */}
          {!isLoadingDialogues && dialogues.length > 0 && (
            <div 
              className="dialogue-list-scroll absolute overflow-y-auto"
              style={{
                left: '48px',
                right: '32px',
                top: '755px',
                height: '300px',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                paddingTop: '8px',
              }}
            >
              {dialogues.map((dialogue) => (
                <DialogueItem
                  key={dialogue.dialogueID}
                  title={dialogue.title}
                  isActive={dialogue.dialogueID === currentDialogueID}
                  onClick={() => {
                    selectDialogue(dialogue.dialogueID);
                    navigate('/ai-analysis');
                  }}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}





