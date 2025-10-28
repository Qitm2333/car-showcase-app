import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useUser } from "@/contexts/UserContext";

export default function LeftNavOverlay() {
  const navigate = useNavigate();
  const { setInviteCode } = useUser();
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
            className="absolute bg-white rounded-lg shadow-lg border border-gray-200"
            style={{ 
              left: '20px',
              top: '185px',
              width: '200px',
              zIndex: 100
            }}
          >
            <button
              onClick={handleLogout}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors rounded-lg flex items-center gap-2 text-[14px] text-[rgba(0,0,0,0.8)]"
            >
              <svg 
                className="w-4 h-4" 
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
              退出登录
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
      
      {/* 我的项目 - 从top: 457px开始，高度到525px */}
      <button
        onClick={() => alert('暂无权限访问此功能')}
        className="absolute hover:bg-purple-100 hover:bg-opacity-20 transition-all"
        style={{ 
          left: 0,
          top: '457px',
          width: '273px',
          height: '68px'
        }}
        title="我的项目"
      />
      
      {/* 线上评审 - 从top: 525px开始，高度到596px */}
      <button
        onClick={() => alert('暂无权限访问此功能')}
        className="absolute hover:bg-purple-100 hover:bg-opacity-20 transition-all"
        style={{ 
          left: 0,
          top: '525px',
          width: '273px',
          height: '71px'
        }}
        title="线上评审"
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
    </div>
  );
}





