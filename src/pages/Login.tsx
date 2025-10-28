import React from "react";
import { useNavigate } from "react-router-dom";
import svgPaths from "../imports/login/svg-umkjzh2tjw";
import { useUser } from "@/contexts/UserContext";
import { API_ENDPOINTS } from "@/config/api";

function LeftBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute h-[1352px] left-0 top-[-235px] w-[1159px]">
        <div className="absolute inset-[-0.3%_-0.46%_-0.39%_-0.46%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1170 1362">
            <g id="左侧背景渐变">
              <g filter="url(#filter0_d_2_85)" id="Rectangle 32">
                <rect fill="url(#paint0_linear_2_85)" height="1117" width="1159" x="5.3" y="239" />
              </g>
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1127.6" id="filter0_d_2_85" width="1169.6" x="0" y="233.7">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset />
                <feGaussianBlur stdDeviation="2.65" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0.37 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_2_85" />
                <feBlend in="SourceGraphic" in2="effect1_dropShadow_2_85" mode="normal" result="shape" />
              </filter>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_2_85" x1="-224.2" x2="1164.3" y1="1593.5" y2="175">
                <stop stopColor="#6062EF" />
                <stop offset="0.348167" stopColor="#4671F4" />
                <stop offset="0.94789" stopColor="#C6C6FF" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}

function RightBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute h-[2815.5px] right-[-200px] bottom-0 w-[2188.5px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1459 1877">
          <g id="右侧背景渐变">
            <rect fill="url(#paint0_linear_2_89)" height="2430" id="Rectangle 33" width="1492" x="-100" />
            <circle cx="729.5" cy="1147.5" fill="url(#paint1_radial_2_89)" id="Ellipse 51" opacity="0.2" r="729.5" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_2_89" x1="626" x2="565.976" y1="177" y2="1545.04">
              <stop stopColor="white" />
              <stop offset="0.618751" stopColor="#F4FBFF" />
              <stop offset="1" stopColor="white" />
            </linearGradient>
            <radialGradient cx="0" cy="0" gradientTransform="translate(729.5 1147.5) rotate(90) scale(729.5)" gradientUnits="userSpaceOnUse" id="paint1_radial_2_89" r="1">
              <stop stopColor="#A77EFF" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div className="absolute left-[37px] size-[83px] top-[38px] z-10">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 83 83">
        <g id="Group 19">
          <circle cx="71.2717" cy="71.2719" fill="white" id="Ellipse 35" r="11.7283" />
          <path d={svgPaths.p250c0700} fill="white" id="Subtract" />
        </g>
      </svg>
    </div>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const { setInviteCode, setUserName } = useUser();
  const [inviteCode, setLocalInviteCode] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleLogin = async () => {
    if (!inviteCode.trim()) {
      setError("请输入邀请码");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // 调用N8N登录API
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inviteCode: inviteCode.trim()
        })
      });

      const data = await response.json();

      if (data.success) {
        // 登录成功
        setInviteCode(data.data.inviteCode);
        setUserName(data.data.userName);
        
        // 跳转到车型展示页面
        navigate("/car-showcase");
      } else {
        // 登录失败
        setError(data.message || "邀请码无效");
      }
    } catch (error) {
      console.error('登录错误:', error);
      setError("网络错误，请检查连接后重试");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalInviteCode(e.target.value);
    // 清除错误提示
    if (error) {
      setError("");
    }
  };

  return (
    <div className="bg-white min-h-screen w-full overflow-hidden">
      <div className="flex h-screen">
        {/* Left Side - Welcome Section */}
        <div className="relative flex-1 flex items-center justify-center overflow-hidden">
          <LeftBackground />
          <Logo />
          <div className="relative z-10 text-center text-white px-8 max-w-[854px]">
            <h1 className="font-['Inter:Extra_Bold',_'Noto_Sans_SC:Black',_'Noto_Sans_JP:Black',_sans-serif] font-extrabold mb-8" style={{ fontSize: '72px', lineHeight: 'normal' }}>
              欢迎回来
            </h1>
            <p className="font-['Inter:Regular',_'Noto_Sans_JP:Regular',_'Noto_Sans_SC:Regular',_sans-serif] font-normal tracking-[0.9px]" style={{ fontSize: '30px', lineHeight: '1.569' }}>
              使用更棒的辅助工具为你汽车设计的工作添砖加瓦
            </p>
          </div>
        </div>

        {/* Right Side - Invite Code Form */}
        <div className="relative flex-1 flex items-center justify-center overflow-hidden">
          <RightBackground />
          <div className="relative z-10 w-full max-w-[400px] px-8">
            <h2 className="font-['Inter:Regular',_'Noto_Sans_JP:Regular',_'Noto_Sans_SC:Regular',_sans-serif] font-normal text-black mb-12" style={{ fontSize: '35px', lineHeight: 'normal' }}>
              输入邀请码
            </h2>

            <div className="space-y-8">
              {/* Invite Code Field */}
              <div className="relative">
                <label className="font-['Inter:Bold',_sans-serif] font-bold text-[rgba(0,0,0,0.13)] block mb-3" style={{ fontSize: '16px', lineHeight: 'normal' }}>
                  邀请码
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={inviteCode}
                    onChange={handleInputChange}
                    placeholder="请输入邀请码"
                    className="w-full font-['Inter:Regular',_sans-serif] font-normal text-black bg-transparent border-none outline-none pb-2" 
                    style={{ fontSize: '16px', lineHeight: 'normal' }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-black opacity-30" />
                </div>
                {error && (
                  <p className="mt-2 font-['Inter:Regular',_sans-serif] text-red-500" style={{ fontSize: '14px' }}>
                    {error}
                  </p>
                )}
              </div>

              {/* Login Button */}
              <button 
                onClick={handleLogin}
                className="w-full bg-[#6062ef] text-white rounded-[20px] py-[10px] px-[140px] font-['Inter:Regular',_'Noto_Sans_JP:Regular',_'Noto_Sans_SC:Regular',_sans-serif] font-normal hover:bg-[#5052df] transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
                style={{ fontSize: '20px', lineHeight: 'normal' }}
                disabled={!inviteCode || loading}
              >
                {loading ? "验证中..." : "进入"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

