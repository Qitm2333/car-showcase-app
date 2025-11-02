import svgPaths from "./svg-58vs26dot4";
import svgPathsAi from "./svg-xtqbhjr4bc";
import svgPathsCarDisplay from "./svg-c0u9sgduw3";
import DynamicUserName from "@/components/DynamicUserName";
import DynamicUserInitial from "@/components/DynamicUserInitial";
// 🔍 导入可复用的搜索栏和语言选择器组件
import SearchBar from "@/components/SearchBar";
import LanguageSelector from "@/components/LanguageSelector";
import img1 from "figma:asset/5b705b92be0721d93aaa1956ff0e19d5f801458a.png";
import img2 from "figma:asset/b0ef633e840f58f4d9b3383d20f87d9d4bbde4ae.png";
import img21 from "figma:asset/f0d1fd67cd8c187a7ced484b53d26339e55cba01.png";
import imgAi041 from "figma:asset/46003650cde3b949971119d949fc7063f28bc448.png";
import imgSuv1 from "figma:asset/aaef27828b208eb34705cf8627140f4cb4a529bf.png";
import imgIntersect from "figma:asset/e2cc2b7cf74e7714fdd94354b7cd1ccc784092f6.png";
import imgRectangle41 from "figma:asset/80ab433ee5d251fbbb7b788ec507847909a919dd.png";
import imgRectangle102 from "figma:asset/9add7d3732d5b7a3e23b32d59b0787614f0a4e5b.png";
import imgRectangle104 from "figma:asset/a41398710b885ec03d0fbad453b211e47234a36e.png";
import imgRectangle42 from "figma:asset/fd0d85b94b178952404bd7dd5484a37ea0772214.png";
import imgRectangle103 from "figma:asset/0cf0b17dc63b1a173782923dfb839a1589f776f6.png";
import imgRectangle105 from "figma:asset/aed798292ee5e05dbeb0a168c1072df2b85e8c40.png";
import imgRectangle106 from "figma:asset/f8414e1d982ae8aad2fd1438ffd8222522ad8cfd.png";
import imgRectangle107 from "figma:asset/77b04aa93bf947389974ee15bb285c829cefe348.png";
import imgRectangle108 from "figma:asset/0d826f3d4df08e0f2daa783740a6e70a91eb91c3.png";
import imgRectangle109 from "figma:asset/47420c87a3efc480086ce270fe241dded021c55d.png";
import imgRectangle110 from "figma:asset/82d151b0e451bd41e8255ebb065eed6f3647215a.png";
import imgRectangle111 from "figma:asset/50732a050355a44cbb1aabae6ea1c82c773db845.png";
import imgRectangle112 from "figma:asset/a2b4fffc1a6ffc05ef8117cf52f0fdc33439e0dc.png";
import imgRectangle113 from "figma:asset/d3dc4c08e7256464681072641fcef274ffc9cd4b.png";
import imgRectangle114 from "figma:asset/587b45465940481d178f5907f5cab47e8089ea30.png";
import imgRectangle43 from "figma:asset/0f348fc38bfd7a955914a721fc8a6cea89ab5ea8.png";
import AiAnalysis from "./Ai分析";
import type { CarDetailData } from "@/services/carDetailService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ImageViewer from "@/components/ImageViewer";
import { useVisitHistory } from "@/contexts/VisitHistoryContext";
import FavoriteButton from "@/components/FavoriteButton";

function Component() {
  return (
    <div className="fixed h-[2174px] right-[-425px] top-[-232px] w-[1881px] pointer-events-none z-0" data-name="背景">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1881 2174">
        <g id="èæ¯">
          <g id="Rectangle 32"></g>
          <foreignObject height="593.6" width="622.6" x="115.7" y="-6.3">
            <div style={{ backdropFilter: "blur(2px)", clipPath: "url(#bgblur_0_1_597_clip_path)", height: "100%", width: "100%" }} xmlns="http://www.w3.org/1999/xhtml" />
          </foreignObject>
          <ellipse cx="427" cy="290.5" data-figma-bg-blur-radius="4" fill="url(#paint0_radial_1_597)" fillOpacity="0.49" id="Ellipse 52" opacity="0.2" rx="305" ry="290.5" />
          <circle cx="1151.5" cy="1444.5" fill="url(#paint1_radial_1_597)" fillOpacity="0.38" id="æ»è½®" rx="4" transform="matrix(-1 0 0 1 1438 285)" width="8" />
          <circle cx="1151.5" cy="1444.5" fill="url(#paint1_radial_1_597)" fillOpacity="0.38" id="Ellipse 51" opacity="0.2" r="729.5" />
        </g>
        <defs>
          <clipPath id="bgblur_0_1_597_clip_path" transform="translate(-115.7 6.3)">
            <ellipse cx="427" cy="290.5" rx="305" ry="290.5" />
          </clipPath>
          <radialGradient cx="0" cy="0" gradientTransform="translate(427 290.5) rotate(90) scale(290.5 305)" gradientUnits="userSpaceOnUse" id="paint0_radial_1_597" r="1">
            <stop stopColor="#7E8BFF" />
            <stop offset="1" stopColor="white" />
          </radialGradient>
          <radialGradient cx="0" cy="0" gradientTransform="translate(1151.5 1444.5) rotate(90) scale(729.5)" gradientUnits="userSpaceOnUse" id="paint1_radial_1_597" r="1">
            <stop stopColor="#7E98FF" />
            <stop offset="1" stopColor="white" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}

interface Component1Props {
  historyItems?: Array<{ carID: number; carName: string }>;
  onHistoryClick?: (index: number, carID: number) => void;
}

function Component1({ historyItems = [], onHistoryClick }: Component1Props) {
  // 🔄 面包屑导航（基于访问历史）
  if (historyItems.length === 0) {
    return null;
  }

  // 只显示当前车型
  if (historyItems.length === 1) {
  return (
      <div className="absolute left-[325px] top-[177.5px] translate-y-[-50%]" data-name="导航栏文字">
        <div className="flex flex-col font-['Inter:Bold',_'Noto_Sans_JP:Bold',_'Noto_Sans_SC:Bold',_sans-serif] font-bold justify-center text-[30px] text-[rgba(0,0,0,0.95)]">
          <p className="leading-[35px] text-nowrap whitespace-pre">{historyItems[0].carName}</p>
      </div>
      </div>
    );
  }

  // 显示面包屑：上一个车型 / 当前车型
  const previousItem = historyItems[historyItems.length - 2];
  const currentItem = historyItems[historyItems.length - 1];

  return (
    <div className="absolute left-[325px] top-[177.5px] translate-y-[-50%] flex items-center gap-[10px]" data-name="导航栏文字">
      {/* 上一个车型（可点击） */}
      <div 
        className="flex flex-col font-['Inter:Bold',_'Noto_Sans_SC:Bold',_sans-serif] font-bold justify-center text-[30px] text-[rgba(0,0,0,0.4)] cursor-pointer hover:text-[rgba(0,0,0,0.6)] transition-colors"
        onClick={() => onHistoryClick?.(historyItems.length - 2, previousItem.carID)}
      >
        <p className="leading-[35px] text-nowrap whitespace-pre">{previousItem.carName}</p>
      </div>
      
      {/* 分隔符 */}
      <div className="flex flex-col font-['Inter:Bold',_sans-serif] font-bold justify-center text-[40px] text-[rgba(0,0,0,0.4)]">
        <p className="leading-[35px] text-nowrap whitespace-pre">/</p>
      </div>
      
      {/* 当前车型 */}
      <div className="flex flex-col font-['Inter:Bold',_'Noto_Sans_JP:Bold',_'Noto_Sans_SC:Bold',_sans-serif] font-bold justify-center text-[30px] text-[rgba(0,0,0,0.95)]">
        <p className="leading-[35px] text-nowrap whitespace-pre">{currentItem.carName}</p>
      </div>
    </div>
  );
}

function Vector() {
  return (
    <div className="absolute inset-[29.17%_20.83%]" data-name="Vector">
      <div className="absolute inset-[-10%_-7.14%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 12">
          <g id="Vector">
            <path d={svgPaths.p140feb00} fill="var(--stroke-0, #8F9090)" id="Vector-13" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function XnixLineArrowLeft() {
  return (
    <div className="absolute left-[322px] size-[24px] top-[114px]" data-name="Xnix/Line/Arrow_Left">
      <Vector />
    </div>
  );
}

interface BackProps {
  onBackClick?: () => void;
}

function Back({ onBackClick }: BackProps) {
  return (
    <div 
      className="absolute contents left-[322px] top-[114px] cursor-pointer" 
      data-name="Back组件"
      onClick={onBackClick}
    >
      <div className="absolute flex flex-col font-['Inter:Bold',_sans-serif] font-bold justify-center leading-[0] left-[352px] not-italic text-[#8f9090] text-[20px] text-nowrap top-[126px] translate-y-[-50%]">
        <p className="leading-[normal] whitespace-pre">Back</p>
      </div>
      <XnixLineArrowLeft />
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute aspect-[28/28] left-[19.78%] overflow-clip right-[73.63%] top-[899px]" data-name="Frame">
      <div className="absolute bottom-[86.77%] left-[18.63%] right-[37.25%] top-0" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 3">
          <path d={svgPaths.p3d59c00} fill="var(--fill-0, #545456)" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-[2.45%] right-[1.96%] top-[4.41%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
          <path d={svgPaths.pa222700} fill="var(--fill-0, #545456)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents inset-[11.64%_6.59%_83.6%_6.96%]">
      <div className="absolute bg-white inset-[11.64%_6.59%_83.6%_6.96%] rounded-[18px]">
        <div aria-hidden="true" className="absolute border-[#6f30d6] border-[0.2px] border-solid inset-0 pointer-events-none rounded-[18px]" />
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[4.12%_76.19%_91.76%_6.96%]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 46 46">
        <g id="Group 19">
          <g id="Ellipse 35">
            <circle cx="39.4992" cy="39.5003" fill="url(#paint0_linear_1_577)" r="6.5" />
            <circle cx="39.4992" cy="39.5003" fill="var(--fill-1, #999AFF)" r="6.5" />
          </g>
          <g id="Subtract">
            <path d={svgPaths.p1eb60c40} fill="url(#paint1_linear_1_577)" />
            <path d={svgPaths.p1eb60c40} fill="var(--fill-1, #6062EF)" />
          </g>
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_577" x1="45.9992" x2="30.4992" y1="43.0003" y2="34.0003">
            <stop stopColor="#6062EF" />
            <stop offset="1" stopColor="white" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_1_577" x1="35.9992" x2="10.9997" y1="3.49992" y2="43.499">
            <stop stopColor="#6062EF" />
            <stop offset="1" stopColor="#ADAEFC" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents inset-[4.12%_24.98%_91.76%_6.96%]">
      <Group />
      <div className="absolute flex flex-col font-['Reddit_Sans:Bold',_sans-serif] font-bold inset-[4.66%_24.98%_92.13%_16.85%] justify-center leading-[0] text-[#6062ef] text-[30px] text-center tracking-[0.6px]">
        <p className="leading-[normal]">Quality</p>
      </div>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents inset-[4.12%_24.98%_91.76%_6.96%]">
      <Group2 />
    </div>
  );
}

function Vector1() {
  return (
    <div className="absolute bottom-1/4 left-[12.5%] right-[12.5%] top-1/4" data-name="Vector">
      <div className="absolute inset-[-4.29%_-2.86%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 16">
          <g id="Vector">
            <path clipRule="evenodd" d={svgPaths.p3651580} fillRule="evenodd" id="Vector-22" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
            <path d={svgPaths.p3dfca380} fill="var(--stroke-0, black)" id="Vector-23" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function XnixLineVideoPlus() {
  return (
    <div className="absolute inset-[48.79%_71.43%_48.7%_18.32%]" data-name="Xnix/Line/Video_plus">
      <Vector1 />
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents inset-[48.79%_71.43%_48.7%_18.32%]">
      <XnixLineVideoPlus />
    </div>
  );
}

function Vector2() {
  return (
    <div className="absolute contents left-[2.58px] top-[3px]" data-name="Vector">
      <div className="absolute inset-[27.91%_31.25%_18.77%_27.43%]" data-name="Vector-15">
        <div className="absolute inset-[-3.63%_-4.68%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 18">
            <path clipRule="evenodd" d={svgPaths.p18b12500} fillRule="evenodd" id="Vector-15" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[20.83%_12.5%_23.78%_8.33%]" data-name="Vector-16">
        <div className="absolute inset-[-3.49%_-2.44%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 19">
            <path d={svgPaths.p129a0700} fill="var(--stroke-0, black)" id="Vector-16" />
          </svg>
        </div>
      </div>
      <div className="absolute h-[3px] left-[15px] top-[3px] w-0">
        <div className="absolute inset-[-20%_-0.6px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 5">
            <path d="M0.6 3.6V2.1V0.6" id="Vector 619" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="1.2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function XnixLineLightbulbOn() {
  return (
    <div className="absolute inset-[29.81%_71.06%_67.41%_17.58%]" data-name="Xnix/Line/Lightbulb_on">
      <Vector2 />
    </div>
  );
}

function Component5() {
  return (
    <div className="absolute h-[1117px] left-0 top-0 w-[273px]" data-name="Component 5">
      <div className="absolute bottom-[-0.18%] left-0 right-0 top-0" data-name="BG01">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 273 1119">
          <g id="BG01">
            <path d="M0 0H273V1119H0V0Z" fill="url(#paint0_linear_33_393)" fillOpacity="0.7" />
            <path d="M0 0H273V1119H0V0Z" fill="var(--fill-1, #F4F5FF)" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_33_393" x1="130.026" x2="-10" y1="-1.11657" y2="1089">
              <stop stopColor="#F6FCFF" />
              <stop offset="1" stopColor="#F7FAFF" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <Frame />
      <Group1 />
      <div className="absolute flex flex-col font-['Inter:Bold',_sans-serif] font-bold inset-[12.98%_43.96%_84.87%_32.97%] justify-center leading-[0] not-italic text-[20px] text-black text-nowrap">
        <DynamicUserName />
      </div>
      {/* ⭐ 移除：SL的项目对标分析 */}
      <div className="absolute flex flex-col font-['Inter:Regular',_'Noto_Sans_JP:Regular',_'Noto_Sans_SC:Regular',_sans-serif] font-normal inset-[65.17%_65.93%_33.21%_12.09%] justify-center leading-[0] not-italic text-[#5d5d5d] text-[15px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">历史分析</p>
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',_'Noto_Sans_JP:Regular',_sans-serif] font-normal inset-[23.55%_66.3%_74.84%_11.72%] justify-center leading-[0] not-italic text-[#5d5d5d] text-[15px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">全部工具</p>
      </div>
      <Group3 />
      {/* ⭐ 移除：翼子板设计趋势分析 */}
      <div className="absolute inset-[61.23%_6.59%_38.77%_7.69%]">
        <div className="absolute bottom-[-1px] left-0 right-0 top-[-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 234 2">
            <path d="M0 1H234" id="Vector 100" stroke="var(--stroke-0, #DBD3ED)" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[19.96%_6.59%_80.04%_6.96%]">
        <div className="absolute bottom-[-1px] left-0 right-0 top-[-1px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 236 2">
            <path d="M0 1H236" id="Vector 106" stroke="var(--stroke-0, #DBD3ED)" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute aspect-[200/200] left-[19.05%] right-[72.89%] top-[408px]" data-name="收藏 未收藏 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img2} />
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',_'Noto_Sans_JP:Regular',_sans-serif] font-normal inset-[36.44%_45.05%_61.41%_32.97%] justify-center leading-[0] not-italic text-[20px] text-[rgba(0,0,0,0.8)] text-nowrap">
        <p className="leading-[normal] whitespace-pre">收藏夹</p>
      </div>
      <div className="absolute aspect-[200/200] left-[19.41%] right-[73.26%] top-[479px]" data-name="项目-2 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img21} />
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',_'Noto_Sans_JP:Regular',_sans-serif] font-normal inset-[42.7%_37.73%_55.15%_32.97%] justify-center leading-[0] not-italic text-[20px] text-[rgba(0,0,0,0.8)] text-nowrap">
        <p className="leading-[normal] whitespace-pre">我的项目</p>
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',_'Noto_Sans_SC:Regular',_'Noto_Sans_JP:Regular',_sans-serif] font-normal inset-[48.97%_37.73%_48.88%_32.97%] justify-center leading-[0] not-italic text-[20px] text-[rgba(0,0,0,0.8)] text-nowrap">
        <p className="leading-[normal] whitespace-pre">线上评审</p>
      </div>
      <div className="absolute aspect-[200/200] left-[19.05%] right-[72.53%] top-[618px]" data-name="AI-04 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgAi041} />
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',_'Noto_Sans_JP:Regular',_sans-serif] font-normal inset-[55.24%_45.42%_42.61%_32.97%] justify-center leading-[0] not-italic text-[20px] text-[rgba(0,0,0,0.8)] text-nowrap">
        <p className="leading-[normal] whitespace-pre">AI分析</p>
      </div>
      {/* ⭐ 移除：ZU的遮阳板对标 */}
      <div className="absolute inset-[12.54%_71.8%_84.39%_15.75%]" data-name="Intersect">
        <img alt="" className="block max-w-none size-full" height="34.314" src={imgIntersect} width="34" />
      </div>
      <div className="absolute inset-[13.97%_17.22%_85.59%_77.66%]">
        <div className="absolute inset-[-20%_-7.14%_-24.58%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 8">
            <path d={svgPaths.p10dcc480} id="Vector 118" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeOpacity="0.25" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute flex inset-[5.55%_8.41%_93.11%_88.64%] items-center justify-center">
        <div className="flex-none h-[8.05px] rotate-[90deg] w-[14.95px]">
          <div className="relative size-full">
            <div className="absolute inset-[-12.42%_-6.69%_-18.26%_-6.69%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 11">
                <path d="M1 1L8.47485 9.05L15.95 1" id="Vector 119" stroke="var(--stroke-0, #8A8A8A)" strokeLinecap="round" strokeOpacity="0.95" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Group4 />
      <div className="absolute flex flex-col font-['Inter:Regular',_'Noto_Sans_JP:Regular',_sans-serif] font-normal inset-[30.17%_37.73%_67.68%_32.97%] justify-center leading-[0] not-italic text-[20px] text-[rgba(0,0,0,0.8)] text-nowrap">
        <p className="leading-[normal] whitespace-pre">灵感搜集</p>
      </div>
      <XnixLineLightbulbOn />
      <div className="absolute left-[43px] size-[35px] top-[140px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35 35">
          <circle cx="17.5" cy="17.5" fill="var(--fill-0, #787EFF)" id="Ellipse 61" r="17.5" />
        </svg>
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',_sans-serif] font-normal h-[17px] justify-center leading-[0] left-[60.5px] not-italic text-[18px] text-center text-white top-[156.5px] translate-x-[-50%] translate-y-[-50%] w-[19px]">
        <DynamicUserInitial />
      </div>
    </div>
  );
}

function Component2() {
  return (
    <div className="absolute h-[53.143px] left-[19px] rounded-[18px] top-[322px] w-[232px]" data-name="选中亮条">
      <div className="absolute h-[53.143px] left-0 top-0 w-[232px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 232 54">
          <path d={svgPaths.p10a36b00} fill="url(#paint0_linear_39_308)" id="Rectangle 33" stroke="var(--stroke-0, #6062EF)" strokeWidth="0.2" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_39_308" x1="238.5" x2="-23.5" y1="-26" y2="76.5">
              <stop stopColor="white" />
              <stop offset="0.485577" stopColor="#E4E4FF" />
              <stop offset="1" stopColor="#D1D2FF" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute h-[23.381px] left-[30.98px] top-[13.47px] w-[25.741px]" data-name="整合">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 24">
          <path d={svgPaths.p125d6d80} fill="var(--fill-0, #6062EF)" id="æ´å" />
        </svg>
      </div>
      <div className="absolute flex flex-col font-['Inter:Bold',_'Noto_Sans_JP:Bold',_sans-serif] font-bold justify-center leading-[0] left-[71px] not-italic text-[#6062ef] text-[20px] text-nowrap top-[26.57px] translate-y-[-50%]">
        <p className="leading-[normal] whitespace-pre">灵感搜集</p>
      </div>
    </div>
  );
}

function Component3() {
  return (
    <div className="fixed h-[1117px] left-0 top-0 w-[273px] z-40" data-name="左侧组件">
      <Component5 />
      <Component2 />
    </div>
  );
}

// ❌ 已移除静态的 Component4, Group5, Component6
// ✅ 使用可复用的 SearchBar 和 LanguageSelector 组件替代

// 车辆预览图组件
function VehiclePreviewGroup2() {
  return (
    <div className="absolute bottom-[69.58%] contents left-0 right-0 top-0">
      <div className="absolute bottom-[69.58%] left-0 right-[81.19%] rounded-[10px] top-0">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[10px] size-full" src={imgRectangle41} />
      </div>
      <div className="absolute bottom-[69.58%] left-[40.56%] right-[40.63%] rounded-[10px] top-0">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[10px] size-full" src={imgRectangle102} />
      </div>
      <div className="absolute bottom-[69.58%] left-[81.19%] right-0 rounded-[10px] top-0">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[10px] size-full" src={imgRectangle104} />
      </div>
      <div className="absolute bottom-[69.58%] left-[20.32%] right-[60.95%] rounded-[10px] top-0">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[10px] size-full" src={imgRectangle42} />
      </div>
      <div className="absolute bottom-[69.58%] left-[60.88%] right-[20.32%] rounded-[10px] top-0">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[10px] size-full" src={imgRectangle103} />
      </div>
    </div>
  );
}

function VehiclePreviewGroup1() {
  return (
    <div className="absolute bottom-[34.79%] contents left-0 right-0 top-[34.79%]">
      <div className="absolute bottom-[34.79%] left-0 right-[81.19%] rounded-[10px] top-[34.79%]">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[10px] size-full" src={imgRectangle105} />
      </div>
      <div className="absolute inset-[34.79%_40.63%_34.79%_40.56%] rounded-[10px]">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[10px] size-full" src={imgRectangle106} />
      </div>
      <div className="absolute bottom-[34.79%] left-[81.19%] right-0 rounded-[10px] top-[34.79%]">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[10px] size-full" src={imgRectangle107} />
      </div>
      <div className="absolute inset-[34.79%_60.95%_34.79%_20.32%] rounded-[10px]">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[10px] size-full" src={imgRectangle108} />
      </div>
      <div className="absolute inset-[34.79%_20.32%_34.79%_60.88%] rounded-[10px]">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[10px] size-full" src={imgRectangle109} />
      </div>
    </div>
  );
}

function VehiclePreviewGroup() {
  return (
    <div className="absolute bottom-0 contents left-0 right-0 top-[69.58%]">
      <div className="absolute bottom-0 left-0 right-[81.19%] rounded-[10px] top-[69.58%]">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[10px] size-full" src={imgRectangle110} />
      </div>
      <div className="absolute bottom-0 left-[40.56%] right-[40.63%] rounded-[10px] top-[69.58%]">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[10px] size-full" src={imgRectangle111} />
      </div>
      <div className="absolute bottom-0 left-[81.19%] right-0 rounded-[10px] top-[69.58%]">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[10px] size-full" src={imgRectangle112} />
      </div>
      <div className="absolute bottom-0 left-[20.32%] right-[60.95%] rounded-[10px] top-[69.58%]">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[10px] size-full" src={imgRectangle113} />
      </div>
      <div className="absolute bottom-0 left-[60.88%] right-[20.32%] rounded-[10px] top-[69.58%]">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[10px] size-full" src={imgRectangle114} />
      </div>
    </div>
  );
}

interface VehiclePreviewGridProps {
  detailImages?: Array<{ url: string; category: string; viewType: string }>;
  onImageClick?: (index: number) => void;
  carID?: string;
  carName?: string;
}

function VehiclePreviewGrid({ detailImages = [], onImageClick, carID, carName }: VehiclePreviewGridProps) {
  // 🎯 计算网格布局（5列，参考原始布局）
  const columns = 5;
  const rows = Math.ceil(detailImages.length / columns);
  
  // 参考原始布局的百分比定位
  // 列位置：0%, 20.32%, 40.56%, 60.88%, 81.19%
  // 行位置：0%, 34.79%, 69.58%
  const columnPercents = [0, 20.32, 40.56, 60.88, 81.19];
  const rowPercents = [0, 34.79, 69.58];
  
  // 每个图片的宽度和高度（百分比）
  const imageWidthPercent = 18.81; // 100% / 5列 - 间距调整
  const imageHeightPercent = 30.42; // 每行高度

  return (
    <div 
      className="absolute aspect-[1349.96/457] left-[322px] overflow-clip right-[56.04px] top-[755px]"
      data-name="车辆预览图"
    >
      {detailImages.map((image, index) => {
        const row = Math.floor(index / columns);
        const col = index % columns;
        
        // 如果超过3行，则不显示
        if (row >= 3) return null;
        
        const leftPercent = columnPercents[col] || 0;
        const topPercent = rowPercents[row] || 0;

        return (
          <div
            key={index}
            className="absolute rounded-[10px] cursor-pointer hover:bg-gray-50 transition-colors group"
            style={{ 
              left: `${leftPercent}%`, 
              top: `${topPercent}%`,
              width: `${imageWidthPercent}%`,
              height: `${imageHeightPercent}%`
            }}
            onClick={() => onImageClick?.(index)}
            data-name={`车辆图片-${index}`}
          >
            {/* 🖼️ 图片背景 */}
            <div className="absolute inset-0 bg-neutral-50 rounded-[10px]" />
            
            {/* 🖼️ 图片内容 - overflow-hidden容器 */}
            <div className="absolute inset-0 rounded-[10px] overflow-hidden">
              <img
                alt={`${image.category} - ${image.viewType}`}
                className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                src={image.url}
                loading="lazy"
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              {/* 🏷️ 分类标签 */}
              <div className="absolute left-[10px] top-[10px] bg-black/60 backdrop-blur-sm px-[12px] py-[6px] rounded-[6px] z-10">
                <p className="text-white text-[12px] font-medium leading-none">
                  {image.category}
                </p>
              </div>
            </div>
            
            {/* ⭐ 收藏按钮 - 右上角 */}
            {carID && carName && (
              <div className="absolute right-[8px] top-[8px] z-10">
                <FavoriteButton
                  carID={carID}
                  carName={carName}
                  imageURL={image.url}
                  category={image.category}
                  viewType={image.viewType}
                />
              </div>
            )}
            
            {/* 🖼️ 边框 */}
            <div aria-hidden="true" className="absolute border border-[#d0d0d0] border-solid inset-0 pointer-events-none rounded-[10px]" />
          </div>
        );
      })}
    </div>
  );
}

function CarTypeFrame3() {
  return (
    <div className="absolute bg-[#f2f2f2] box-border content-stretch flex gap-[10px] h-[28px] items-center justify-center left-[28px] px-[15px] py-px rounded-[81px] top-[443px] w-[93px]">
      <div className="flex flex-col font-['Inter:Regular',_'Noto_Sans_JP:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.8)] text-center text-nowrap">
        <p className="leading-[normal] whitespace-pre">小米SU7</p>
      </div>
    </div>
  );
}

function CarTypeFrame2() {
  return (
    <div className="absolute bg-[#f2f2f2] box-border content-stretch flex gap-[10px] h-[28px] items-center justify-center left-[228px] px-[13px] py-px rounded-[81px] top-[401px] w-[133px]">
      <div className="flex flex-col font-['Inter:Regular',_'Noto_Sans_JP:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.8)] text-nowrap">
        <p className="leading-[normal] whitespace-pre">特斯拉ModelX</p>
      </div>
    </div>
  );
}

function CarTypeFrame4() {
  return (
    <div className="absolute bg-[#f2f2f2] box-border content-stretch flex gap-[10px] h-[28px] items-center justify-center left-[130px] px-[17px] py-px rounded-[81px] top-[443px] w-[133px]">
      <div className="flex flex-col font-['Inter:Regular',_'Noto_Sans_JP:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.8)] text-nowrap">
        <p className="leading-[normal] whitespace-pre">特斯拉ModelY</p>
      </div>
    </div>
  );
}

function CarTypeFrame1() {
  return (
    <div className="absolute bg-[#f2f2f2] box-border content-stretch flex gap-[10px] h-[28px] items-center justify-center left-[129px] px-[11px] py-px rounded-[81px] top-[400px] w-[87px]">
      <div className="flex flex-col font-['Inter:Regular',_'Noto_Sans_SC:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.8)] text-center text-nowrap">
        <p className="leading-[normal] whitespace-pre">腾势N7</p>
      </div>
    </div>
  );
}

function CarTypeFrame() {
  return (
    <div className="absolute bg-[#f2f2f2] box-border content-stretch flex gap-[10px] h-[28px] items-center justify-center left-[28px] px-[12px] py-px rounded-[81px] top-[401px] w-[92px]">
      <div className="flex flex-col font-['Inter:Regular',_'Noto_Sans_JP:Regular',_'Noto_Sans_SC:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.8)] text-center text-nowrap">
        <p className="leading-[normal] whitespace-pre">比亚迪唐</p>
      </div>
    </div>
  );
}

interface RelatedCarsProps {
  relatedCars?: Array<{ carName: string; carID: number }>;
  onCarClick?: (carID: number) => void;
}

function RelatedCars({ relatedCars = [], onCarClick }: RelatedCarsProps) {
  // 🎯 相关车型位置配置（2列布局，每行2个）
  const positions = [
    { left: 28, top: 413 },   // 第1个（第1行左）
    { left: 28, top: 450 },   // 第3个（第2行左）
    { left: 180, top: 413 },  // 第2个（第1行右）
    { left: 180, top: 450 },  // 第4个（第2行右）
  ];

  return (
    <div className="absolute contents left-[28px] top-[285px]" data-name="相关车型">
      {/* 🏷️ 相关车型标题 */}
      <div className="absolute flex flex-col font-['Inter:Bold',_'Noto_Sans_JP:Bold',_sans-serif] font-bold justify-center leading-[0] not-italic right-[362px] text-[15px] text-[rgba(0,0,0,0.8)] top-[383px] translate-x-[100%] translate-y-[-50%] w-[89px]">
        <p className="leading-[normal]">相关车型</p>
      </div>
      
      {/* 🏷️ 智能标签标题 */}
      <div className="absolute flex flex-col font-['Inter:Bold',_'Noto_Sans_JP:Bold',_'Noto_Sans_SC:Bold',_sans-serif] font-bold justify-center leading-[0] not-italic right-[362px] text-[15px] text-[rgba(0,0,0,0.8)] top-[294px] translate-x-[100%] translate-y-[-50%] w-[89px]">
        <p className="leading-[normal]">智能标签</p>
      </div>
      
      {/* 🚗 相关车型列表（最多显示4个） */}
      {relatedCars.slice(0, 4).map((car, index) => (
        <div 
          key={car.carID}
          className="absolute bg-[#f2f2f2] box-border flex h-[28px] items-center justify-center px-[12px] py-px rounded-[81px] cursor-pointer hover:bg-[#e0e0e0] transition-colors whitespace-nowrap"
          style={{ left: `${positions[index]?.left || 28}px`, top: `${positions[index]?.top || 413}px` }}
          onClick={() => onCarClick?.(car.carID)}
        >
          <div className="flex flex-col font-['Inter:Regular',_'Noto_Sans_SC:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic text-[14px] text-[rgba(0,0,0,0.8)] text-center text-nowrap">
            <p className="leading-[normal] whitespace-pre">{car.carName}</p>
      </div>
        </div>
      ))}
    </div>
  );
}

interface SmartTagsProps {
  tags?: string[];
}

function SmartTags({ tags = ["ADS 2.0", "木纹", "Nappa真皮"] }: SmartTagsProps) {
  // 🎯 智能标签布局（使用 flex 布局避免重叠，字体大小与相关车型一致）
  if (tags.length === 0) return null;

  return (
    <div className="absolute left-[28px] top-[314px] flex flex-wrap gap-[8px] max-w-[333px]">
      {tags.slice(0, 3).map((tag, index) => (
        <div 
          key={index} 
          className="bg-[#f2f2f2] box-border flex h-[28px] items-center justify-center px-[12px] py-px rounded-[81px] whitespace-nowrap"
        >
          <div className="flex flex-col font-['Inter:Regular',_'Noto_Sans_SC:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic text-[14px] text-[rgba(0,0,0,0.8)] text-center text-nowrap">
            <p className="leading-[normal]">{tag}</p>
      </div>
        </div>
      ))}
    </div>
  );
}

interface AiAnalysisCardProps {
  vehicleClass?: string;
  carPriceRange?: string;
  aiAnalysis?: string;
  smartTags?: string[];
  relatedCars?: Array<{ carName: string; carID: number }>;
  onCarClick?: (carID: number) => void;
  carID?: number; // ✅ 新增 carID prop 用于跳转官网
}

function AiAnalysisCard({ 
  vehicleClass = "Sedan", 
  carPriceRange = "$27.98-$37.98", 
  aiAnalysis = "问界M7以'豪华+智能'为核心,内饰用Nappa真皮、木纹饰板营造质感,舒云座椅配多档按摩。华为ADS 2.0与多屏交互加持,静音性与环保性拉满,细节见品质。",
  smartTags = [],
  relatedCars = [],
  onCarClick,
  carID
}: AiAnalysisCardProps) {
  // 🔗 跳转官网功能
  const handleOfficialLinkClick = () => {
    if (carID) {
      const officialUrl = `https://www.autohome.com.cn/${carID}/`;
      window.open(officialUrl, '_blank');
    } else {
      alert('暂无官网链接');
    }
  };

  return (
    <div className="absolute bg-white content-stretch flex gap-[10px] h-[493px] items-center justify-end right-[54px] rounded-[18px] top-[222px] w-[390px]" data-name="AI分析">
      <div className="absolute h-[493px] right-0 rounded-[18px] top-0 w-[390px]" data-name="灰条边缘">
        <div aria-hidden="true" className="absolute border-2 border-[#ff9191] border-solid inset-0 pointer-events-none rounded-[18px]" />
      </div>
      <div 
        className="absolute flex flex-col font-['Inter:Bold',_'Noto_Sans_JP:Bold',_'Noto_Sans_SC:Bold',_sans-serif] font-bold justify-center leading-[0] not-italic right-[29px] text-[#6062ef] text-[15px] text-right top-[49px] translate-y-[-50%] w-[74px] cursor-pointer hover:opacity-80 transition-opacity"
        onClick={handleOfficialLinkClick}
      >
        <p className="leading-[normal]">跳转官网</p>
      </div>
      <div className="absolute flex flex-col font-['Inter:Bold',_'Noto_Sans_JP:Bold',_sans-serif] font-bold justify-center leading-[0] not-italic right-[362px] text-[28px] text-[rgba(0,0,0,0.8)] top-[41px] translate-x-[100%] translate-y-[-50%] w-[154px]">
        <p className="leading-[normal]">AI分析</p>
      </div>
      <RelatedCars relatedCars={relatedCars} onCarClick={onCarClick} />
      <div className="absolute h-0 right-[29px] top-[269px] w-[333px]">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 333 1">
            <path d="M0 0.5H333" id="Vector 104" stroke="var(--stroke-0, #7C7C7C)" />
          </svg>
        </div>
      </div>
      <div className="absolute h-0 right-[29px] top-[99px] w-[333px]">
        <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 333 1">
            <path d="M0 0.5H333" id="Vector 104" stroke="var(--stroke-0, #7C7C7C)" />
          </svg>
        </div>
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',_'Noto_Sans_SC:Regular',_'Noto_Sans_JP:Regular',_sans-serif] font-normal h-[170px] justify-center leading-[0] not-italic right-[362px] text-[16px] text-black top-[184px] translate-x-[100%] translate-y-[-50%] w-[333px]">
        <p className="leading-[2]">{aiAnalysis}</p>
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',_sans-serif] font-normal h-[28px] justify-center leading-[0] not-italic right-[29px] text-[18px] text-black text-right top-[81px] translate-y-[-50%] w-[149px]">
        <p className="leading-[normal]">{carPriceRange}</p>
      </div>
      <div className="absolute flex flex-col font-['Inter:Bold',_sans-serif] font-bold h-[29px] justify-center leading-[0] not-italic right-[362px] text-[18px] text-black top-[81.5px] translate-x-[100%] translate-y-[-50%] w-[149px]">
        <p className="leading-[normal]">{vehicleClass}</p>
      </div>
      <SmartTags tags={smartTags} />
    </div>
  );
}

// ❌ 已删除旧的静态收藏按钮组件（StarVector, StarVector1, XnixLineStar, FavoriteButton）
// ✅ 现在使用从 @/components/FavoriteButton 导入的动态组件

interface MainCarImageProps {
  mainImageUrl?: string;
}

function MainCarImage({ mainImageUrl = imgRectangle43 }: MainCarImageProps) {
  return (
    <div className="absolute contents left-[322px] top-[222px]" data-name="车辆主图片">
      <div className="absolute bg-neutral-50 h-[493px] left-[322px] right-[475px] rounded-[18px] top-[222px]" />
      <div className="absolute h-[493px] left-[322px] pointer-events-none right-[475px] rounded-[18px] top-[222px]">
        <img 
          alt="车辆主图" 
          className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[18px] size-full" 
          src={mainImageUrl} 
          referrerPolicy="no-referrer"
          crossOrigin="anonymous"
          onError={(e) => {
            (e.target as HTMLImageElement).src = imgRectangle43;
          }}
        />
        <div aria-hidden="true" className="absolute border border-[#b0b0b0] border-solid inset-0 rounded-[18px]" />
      </div>
      <FavoriteButton />
    </div>
  );
}

interface CarDisplaySectionProps {
  carDetail?: CarDetailData | null;
  onCarClick?: (carID: number) => void;
}

function CarDisplaySection({ carDetail, onCarClick }: CarDisplaySectionProps) {
  return (
    <div className="absolute contents left-[322px] top-[222px]">
      <AiAnalysisCard 
        vehicleClass={carDetail?.vehicleClass}
        carPriceRange={carDetail?.carPriceRange}
        aiAnalysis={carDetail?.aiAnalysis}
        smartTags={carDetail?.smartTags}
        relatedCars={carDetail?.relatedCars}
        onCarClick={onCarClick}
        carID={carDetail?.carID} // ✅ 传递 carID
      />
      <MainCarImage mainImageUrl={carDetail?.mainImageUrl} />
    </div>
  );
}

interface Component02GbzLayoutProps {
  onBackClick?: () => void;
  carDetail?: CarDetailData | null;
  isLoading?: boolean;  // ✅ 新增加载状态
  loadingCarID?: string; // ✅ 加载中的车辆ID
}

export default function Component02GbzLayout({ onBackClick, carDetail, isLoading = false, loadingCarID }: Component02GbzLayoutProps) {
  const navigate = useNavigate();
  const { history, addToHistory, loadFromCache, navigateToHistoryItem } = useVisitHistory();

  // 🖼️ 图片查看器状态
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 🔄 处理相关车型点击
  const handleRelatedCarClick = (carID: number) => {
    console.log('🔗 点击相关车型，carID:', carID);
    // ✅ 从详情页内部导航，不清空历史
    navigate(`/car-showcase/${carID}`, { state: { fromMain: false } });
  };

  // 📚 处理面包屑点击（返回上一层级）
  const handleBreadcrumbClick = (index: number, carID: number) => {
    console.log('📚 面包屑点击，返回到索引:', index, 'carID:', carID);
    navigateToHistoryItem(index);
    // ✅ 从详情页内部导航，不清空历史
    navigate(`/car-showcase/${carID}`, { state: { fromMain: false } });
  };

  // 🖼️ 处理图片点击 - 打开图片查看器
  const handleImageClick = (index: number) => {
    console.log('🖼️ 点击图片，索引:', index);
    setCurrentImageIndex(index);
    setIsViewerOpen(true);
  };

  // 🔒 关闭图片查看器
  const handleCloseViewer = () => {
    setIsViewerOpen(false);
  };

  // ⬅️ 上一张图片
  const handlePreviousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  // ➡️ 下一张图片
  const handleNextImage = () => {
    const totalImages = carDetail?.detailImages?.length || 0;
    if (currentImageIndex < totalImages - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  // 获取当前图片 URL
  const currentImageUrl = carDetail?.detailImages?.[currentImageIndex]?.url || '';
  const totalImages = carDetail?.detailImages?.length || 0;

  // 🔄 将访问历史转换为面包屑格式
  const breadcrumbItems = history.map(item => ({
    carID: item.carID,
    carName: item.carName
  }));

  return (
    <div className="bg-white relative w-full min-h-screen overflow-x-hidden" data-name="02车型展示-子层级-GBZ-layout">
      <Component />
      {/* 面包屑导航 - 加载时显示占位 */}
      {isLoading ? (
        <div className="absolute left-[325px] top-[177.5px] translate-y-[-50%]">
          <div className="h-[30px] w-[200px] bg-gray-200 rounded animate-pulse"></div>
        </div>
      ) : (
        <Component1 historyItems={breadcrumbItems} onHistoryClick={handleBreadcrumbClick} />
      )}
      <Back onBackClick={onBackClick} />
      <Component3 />
      {/* 🔍 顶部搜索栏 - 使用可复用组件，与 car-showcase 主页保持一致 */}
      <div className="absolute contents left-[322px] top-[47px]">
        <SearchBar placeholder="关于这辆车，有什么问题都可以问我" from="car-showcase" />
        <LanguageSelector />
      </div>
      
      {/* 🔄 加载状态 - 显示完整骨架屏 */}
      {isLoading ? (
        <>
          {/* 🦴 骨架屏 - 车辆主图 */}
          <div className="absolute left-[322px] h-[493px] right-[475px] top-[222px]">
            <div className="absolute inset-0 bg-gray-200 rounded-[18px] animate-pulse">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-4 border-[#6062ef] mb-3"></div>
                  <p className="text-[16px] text-gray-500">主图加载中...</p>
                </div>
              </div>
            </div>
            {/* 边框 */}
            <div aria-hidden="true" className="absolute border border-[#b0b0b0] border-solid inset-0 rounded-[18px] pointer-events-none" />
          </div>

          {/* 🦴 骨架屏 - AI分析卡片 */}
          <div className="absolute bg-white h-[493px] right-[54px] rounded-[18px] top-[222px] w-[390px]">
            {/* 背景 */}
            <div className="absolute inset-0 bg-gray-50 rounded-[18px]"></div>
            
            {/* AI分析标题 */}
            <div className="absolute flex flex-col font-bold justify-center left-[28px] text-[28px] text-[rgba(0,0,0,0.8)] top-[41px] translate-y-[-50%]">
              <p className="leading-[normal]">AI分析</p>
            </div>
            
            {/* 跳转官网 - 骨架 */}
            <div className="absolute right-[29px] top-[32px] h-[15px] w-[74px] bg-gray-200 rounded animate-pulse"></div>
            
            {/* 分隔线1 */}
            <div className="absolute h-0 right-[29px] top-[99px] w-[333px]">
              <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 333 1">
                  <path d="M0 0.5H333" stroke="#d0d0d0" />
                </svg>
              </div>
            </div>
            
            {/* 车型类别 - 骨架 */}
            <div className="absolute left-[28px] top-[72px] h-[18px] w-[120px] bg-gray-200 rounded animate-pulse"></div>
            
            {/* 价格范围 - 骨架 */}
            <div className="absolute right-[29px] top-[72px] h-[18px] w-[140px] bg-gray-200 rounded animate-pulse"></div>
            
            {/* 智能标签标题 */}
            <div className="absolute flex flex-col font-bold justify-center left-[28px] text-[15px] text-[rgba(0,0,0,0.8)] top-[285px]">
              <p className="leading-[normal]">智能标签</p>
            </div>
            
            {/* 智能标签骨架 */}
            <div className="absolute left-[28px] top-[314px] flex flex-wrap gap-[8px] max-w-[333px]">
              <div className="h-[28px] w-[80px] bg-gray-200 rounded-[81px] animate-pulse"></div>
              <div className="h-[28px] w-[60px] bg-gray-200 rounded-[81px] animate-pulse"></div>
              <div className="h-[28px] w-[100px] bg-gray-200 rounded-[81px] animate-pulse"></div>
            </div>
            
            {/* 相关车型标题 */}
            <div className="absolute flex flex-col font-bold justify-center left-[28px] text-[15px] text-[rgba(0,0,0,0.8)] top-[374px]">
              <p className="leading-[normal]">相关车型</p>
            </div>
            
            {/* 相关车型骨架 */}
            <div className="absolute left-[28px] top-[404px] flex flex-wrap gap-[8px] max-w-[333px]">
              <div className="h-[28px] w-[110px] bg-gray-200 rounded-[81px] animate-pulse"></div>
              <div className="h-[28px] w-[90px] bg-gray-200 rounded-[81px] animate-pulse"></div>
            </div>
            
            {/* 分隔线2 */}
            <div className="absolute h-0 right-[29px] top-[269px] w-[333px]">
              <div className="absolute bottom-[-0.5px] left-0 right-0 top-[-0.5px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 333 1">
                  <path d="M0 0.5H333" stroke="#d0d0d0" />
                </svg>
              </div>
            </div>
            
            {/* AI分析内容骨架 */}
            <div className="absolute left-[28px] right-[29px] top-[120px] space-y-2">
              <div className="h-[14px] bg-gray-200 rounded animate-pulse"></div>
              <div className="h-[14px] bg-gray-200 rounded animate-pulse w-[95%]"></div>
              <div className="h-[14px] bg-gray-200 rounded animate-pulse w-[90%]"></div>
              <div className="h-[14px] bg-gray-200 rounded animate-pulse w-[85%]"></div>
              <div className="h-[14px] bg-gray-200 rounded animate-pulse w-[92%]"></div>
              <div className="h-[14px] bg-gray-200 rounded animate-pulse w-[88%]"></div>
            </div>
            
            {/* 加载提示 */}
            <div className="absolute left-[28px] right-[29px] top-[215px] flex items-center justify-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#6062ef]"></div>
              <p className="ml-3 text-[14px] text-gray-500">AI分析加载中...</p>
            </div>
            
            {/* 边框 */}
            <div aria-hidden="true" className="absolute border-2 border-[#d0d0d0] border-solid inset-0 pointer-events-none rounded-[18px]" />
          </div>

          {/* 🦴 骨架屏 - 图片网格 */}
          <div className="absolute left-[322px] right-[56.04px] top-[755px] h-[457px]">
            {/* 显示15个占位图片框（5列3行） */}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((index) => {
              const row = Math.floor(index / 5);
              const col = index % 5;
              const columnPercents = [0, 20.32, 40.56, 60.88, 81.19];
              const rowPercents = [0, 34.79, 69.58];
              const leftPercent = columnPercents[col] || 0;
              const topPercent = rowPercents[row] || 0;
              
              return (
                <div
                  key={index}
                  className="absolute rounded-[10px]"
                  style={{ 
                    left: `${leftPercent}%`, 
                    top: `${topPercent}%`,
                    width: '18.81%',
                    height: '30.42%'
                  }}
                >
                  {/* 占位背景 */}
                  <div className="absolute inset-0 bg-gray-200 rounded-[10px] animate-pulse"></div>
                  
                  {/* 分类标签占位 */}
                  <div className="absolute left-[10px] top-[10px] h-[20px] w-[50px] bg-gray-300 rounded-[6px]"></div>
                  
                  {/* 边框 */}
                  <div aria-hidden="true" className="absolute border border-[#d0d0d0] border-solid inset-0 pointer-events-none rounded-[10px]" />
                </div>
              );
            })}
            
            {/* 加载提示 */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-white/90 backdrop-blur-sm px-6 py-4 rounded-[12px] shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#6062ef]"></div>
                  <p className="text-[16px] text-gray-600">图片加载中...</p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <VehiclePreviewGrid 
            detailImages={carDetail?.detailImages} 
            onImageClick={handleImageClick}
            carID={carDetail?.carID ? String(carDetail.carID) : (loadingCarID ? String(loadingCarID) : undefined)}
            carName={carDetail?.carName}
          />
          <CarDisplaySection 
            carDetail={carDetail} 
            onCarClick={handleRelatedCarClick}
          />
        </>
      )}
      
      {/* 🖼️ 图片查看器 */}
      <ImageViewer 
        isOpen={isViewerOpen}
        imageUrl={currentImageUrl}
        onClose={handleCloseViewer}
        onPrevious={handlePreviousImage}
        onNext={handleNextImage}
        currentIndex={currentImageIndex}
        totalCount={totalImages}
      />
    </div>
  );
}