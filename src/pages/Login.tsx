import React from "react";
import { useNavigate } from "react-router-dom";
import svgPaths from "../imports/login/svg-umkjzh2tjw";
import { useUser } from "@/contexts/UserContext";
import { API_ENDPOINTS } from "@/config/api";
import FrogGame from "@/components/FrogGame";
import logoImage from "@/assets/logo.png";

function LeftBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <style>{`
        @keyframes gradient-flow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
      
      {/* 流动渐变背景 */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #6062EF 0%, #4671F4 25%, #7B7FF5 50%, #9D9FFF 75%, #C6C6FF 100%)',
          backgroundSize: '400% 400%',
          animation: 'gradient-flow 12s ease-in-out infinite'
        }}
      />
    </div>
  );
}

function RightBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-white via-[#fafbff] to-[#f8f9ff]">
      <div className="absolute inset-0">
        <svg className="block w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1459 1877">
          <g id="右侧背景渐变" opacity="0.6">
            <circle cx="50%" cy="60%" fill="url(#paint1_radial_2_89)" id="Ellipse 51" r="40%" />
          </g>
          <defs>
            <radialGradient cx="0" cy="0" gradientTransform="rotate(90)" gradientUnits="userSpaceOnUse" id="paint1_radial_2_89" r="1">
              <stop stopColor="#A77EFF" stopOpacity="0.15" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Logo({ onClick }: { onClick: () => void }) {
  return (
    <div 
      className="absolute left-[28px] top-[28px] z-50 w-[52px] h-[52px] md:w-[56px] md:h-[56px] cursor-pointer"
      onClick={onClick}
      title="🐸 连续点击3次..."
    >
      <style>{`
        @keyframes logo-float {
          0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 0.95;
          }
          50% {
            transform: translateY(-4px) scale(1.05);
            opacity: 1;
          }
        }
        
        @keyframes logo-entrance {
          0% {
            opacity: 0;
            transform: scale(0.8) rotate(-10deg);
          }
          100% {
            opacity: 0.95;
            transform: scale(1) rotate(0deg);
          }
        }
        
        .logo-animated {
          animation: 
            logo-entrance 1s cubic-bezier(0.16, 1, 0.3, 1) forwards,
            logo-float 4s ease-in-out 1.5s infinite;
          opacity: 0;
        }
        
        .logo-animated:hover {
          transform: scale(1.1);
        }
        
        .logo-animated:hover img {
          filter: brightness(0) invert(1) drop-shadow(0 4px 12px rgba(255, 255, 255, 0.6));
        }
      `}</style>
      <div className="logo-animated transition-all duration-200">
        <img 
          src={logoImage} 
          alt="Logo" 
          className="block size-full object-contain"
          style={{ filter: 'brightness(0) invert(1)' }}
        />
      </div>
    </div>
  );
}

function AnimatedTextCarousel() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isExiting, setIsExiting] = React.useState(false);

  const textContent = [
    {
      title: "欢迎回来",
      subtitle: "启用更高效的辅助工具，为你的汽车设计工作赋能增效",
      color: "#C6C6FF"
    },
    {
      title: "AI 报告",
      subtitle: "与 RAG 模型深度探讨最新设计理念，共析行业设计趋势",
      color: "#9D9FFF"
    },
    {
      title: "智能整理",
      subtitle: "精准检索所需资源，助你摆脱繁琐找图，聚焦设计核心",
      color: "#7B7FF5"
    }
  ];

  React.useEffect(() => {
    // 总周期：进入(1.4s) + 停留(3s) + 退出(0.8s) = 5.2s
    const timer = setTimeout(() => {
      setIsExiting(true);
      
      // 退出动画完成后切换到下一个
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % textContent.length);
        setIsExiting(false);
      }, 800); // 退出动画时长
    }, 4400); // 进入动画(1.4s) + 停留(3s)

    return () => clearTimeout(timer);
  }, [currentIndex, textContent.length]);

  const currentText = textContent[currentIndex];

  return (
    <div className="relative z-50 text-center text-white px-8 max-w-[600px]">
      <style>{`
        @keyframes slide-up-fade-in {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-up-fade-out {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-40px);
          }
        }
        
        .animate-title-enter {
          animation: slide-up-fade-in 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        
        .animate-subtitle-enter {
          animation: slide-up-fade-in 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
          opacity: 0;
        }
        
        .animate-title-exit {
          animation: slide-up-fade-out 0.8s cubic-bezier(0.6, 0, 0.84, 0) forwards;
        }
        
        .animate-subtitle-exit {
          animation: slide-up-fade-out 0.8s cubic-bezier(0.6, 0, 0.84, 0) 0.1s forwards;
        }
        
        @keyframes line-grow {
          0% {
            width: 0;
            opacity: 0;
          }
          100% {
            width: 60px;
            opacity: 1;
          }
        }
        
        @keyframes line-shrink {
          0% {
            width: 60px;
            opacity: 1;
          }
          100% {
            width: 0;
            opacity: 0;
          }
        }
        
        @keyframes number-fade-in {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 0.15;
            transform: scale(1);
          }
        }
        
        @keyframes number-fade-out {
          0% {
            opacity: 0.15;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(1.2);
          }
        }
        
        @keyframes dot-pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.4;
          }
          50% {
            transform: scale(1.3);
            opacity: 1;
          }
        }
        
        .decorative-line-enter {
          animation: line-grow 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards;
          width: 0;
          opacity: 0;
        }
        
        .decorative-line-exit {
          animation: line-shrink 0.6s cubic-bezier(0.6, 0, 0.84, 0) forwards;
        }
        
        .number-enter {
          animation: number-fade-in 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards;
          opacity: 0;
        }
        
        .number-exit {
          animation: number-fade-out 0.6s cubic-bezier(0.6, 0, 0.84, 0) forwards;
        }
      `}</style>
      
      {/* 大号装饰数字 */}
      <div 
        key={`number-${currentIndex}`}
        className={`${isExiting ? 'number-exit' : 'number-enter'} absolute right-8 top-0 font-['Inter:Black',_sans-serif] font-black text-[180px] leading-none pointer-events-none select-none`}
        style={{ 
          color: currentText.color,
          opacity: 0
        }}
      >
        0{currentIndex + 1}
      </div>
      
      {/* 装饰线条 */}
      <div 
        key={`line-${currentIndex}`}
        className={`${isExiting ? 'decorative-line-exit' : 'decorative-line-enter'} absolute left-1/2 -translate-x-1/2 top-[-40px] h-[2px] rounded-full`}
        style={{
          background: `linear-gradient(90deg, transparent, ${currentText.color}, transparent)`
        }}
      />
      
      {/* 内容区域 */}
      <div className="relative">
        <h1 
          key={`title-${currentIndex}`}
          className={`${isExiting ? 'animate-title-exit' : 'animate-title-enter'} font-['Inter:Extra_Bold',_'Noto_Sans_SC:Black',_'Noto_Sans_JP:Black',_sans-serif] font-extrabold mb-6 text-[48px] md:text-[56px] lg:text-[64px] leading-tight`}
        >
          {currentText.title}
        </h1>
        <p 
          key={`subtitle-${currentIndex}`}
          className={`${isExiting ? 'animate-subtitle-exit' : 'animate-subtitle-enter'} font-['Inter:Regular',_'Noto_Sans_JP:Regular',_'Noto_Sans_SC:Regular',_sans-serif] font-normal tracking-wide text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed opacity-95`}
        >
          {currentText.subtitle}
        </p>
      </div>
      
      {/* 进度指示器 */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[-60px] flex gap-3">
        {textContent.map((_, index) => (
          <div
            key={index}
            className="relative w-2 h-2 rounded-full transition-all duration-500"
            style={{
              background: index === currentIndex ? currentText.color : 'rgba(255, 255, 255, 0.3)',
              transform: index === currentIndex ? 'scale(1)' : 'scale(0.8)',
              opacity: index === currentIndex ? 1 : 0.5
            }}
          >
            {index === currentIndex && (
              <div 
                className="absolute inset-0 rounded-full animate-ping"
                style={{ background: currentText.color, opacity: 0.6 }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const { setInviteCode, setUserName } = useUser();
  const [inviteCode, setLocalInviteCode] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  
  // 🐸 彩蛋状态管理
  const [showGame, setShowGame] = React.useState(false);
  const [clickCount, setClickCount] = React.useState(0);
  const lastClickTimeRef = React.useRef<number>(0);
  
  const handleLogoClick = () => {
    const now = Date.now();
    
    // 如果距离上次点击超过2秒，重置计数
    if (now - lastClickTimeRef.current > 2000) {
      setClickCount(1);
    } else {
      setClickCount(prev => prev + 1);
    }
    
    lastClickTimeRef.current = now;
    
    // 连续点击3次，切换游戏显示
    if (clickCount >= 2) {
      setShowGame(prev => !prev);
      setClickCount(0);
      console.log('🐸 彩蛋游戏', showGame ? '关闭' : '开启');
    }
  };

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
    <div className="login-page-marker bg-white min-h-screen w-full overflow-hidden">
      <div className="flex h-screen">
        {/* Left Side - Welcome Section / Game */}
        <div className="relative flex-1 flex items-center justify-center overflow-hidden">
          <LeftBackground />
          <Logo onClick={handleLogoClick} />
          
          {/* 根据状态显示游戏或文字动画 */}
          {showGame ? (
            <div className="absolute inset-0 z-40">
              <FrogGame />
            </div>
          ) : (
            <AnimatedTextCarousel />
          )}
        </div>

        {/* Right Side - Invite Code Form */}
        <div className="relative flex-1 flex items-center justify-center overflow-hidden">
          <RightBackground />
          <div className="relative z-10 w-full max-w-[420px] px-8 animate-form-entrance">
            <style>{`
              @keyframes form-entrance {
                0% {
                  opacity: 0;
                  transform: translateX(30px);
                }
                100% {
                  opacity: 1;
                  transform: translateX(0);
                }
              }
              
              .animate-form-entrance {
                animation: form-entrance 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards;
                opacity: 0;
              }
            `}</style>
            <h2 className="font-['Inter:Regular',_'Noto_Sans_JP:Regular',_'Noto_Sans_SC:Regular',_sans-serif] font-normal text-black mb-10 text-[24px] md:text-[26px] leading-normal">
              输入邀请码
            </h2>

            <div className="space-y-7">
              {/* Invite Code Field */}
              <div className="relative">
                <label className="font-['Inter:Bold',_sans-serif] font-bold text-[rgba(0,0,0,0.3)] block mb-2.5 text-[13px] leading-normal">
                  邀请码
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={inviteCode}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && inviteCode && !loading) {
                        handleLogin();
                      }
                    }}
                    placeholder="请输入邀请码"
                    className="w-full font-['Inter:Regular',_sans-serif] font-normal text-black text-[15px] bg-transparent border-none outline-none pb-2.5 placeholder:text-gray-300 leading-normal" 
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-black opacity-20" />
                </div>
                {error && (
                  <p className="mt-2.5 font-['Inter:Regular',_sans-serif] text-red-500 text-[12px] animate-in fade-in slide-in-from-top-1 duration-200">
                    {error}
                  </p>
                )}
              </div>

              {/* Login Button */}
              <button 
                onClick={handleLogin}
                className="w-full bg-[#6062ef] text-white rounded-[16px] py-3 font-['Inter:Regular',_'Noto_Sans_JP:Regular',_'Noto_Sans_SC:Regular',_sans-serif] font-medium text-[16px] hover:bg-[#5052df] hover:shadow-lg active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 leading-normal" 
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

