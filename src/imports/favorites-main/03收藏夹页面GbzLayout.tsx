/**
 * 🗂️ 收藏夹主页面布局组件
 * 支持动态数据展示和骨架屏加载
 */

import React from "react";
import svgPaths from "./svg-58vs26dot4";
import svgPathsSidebar from "./svg-2oczj8fsfm";
import svgPathsFavorites from "./svg-fznlftz932";
import DynamicUserName from "@/components/DynamicUserName";
import DynamicUserInitial from "@/components/DynamicUserInitial";
import FavoriteIcon from "@/components/FavoriteIcon";
import img1 from "figma:asset/5b705b92be0721d93aaa1956ff0e19d5f801458a.png";
import img2 from "figma:asset/b0ef633e840f58f4d9b3383d20f87d9d4bbde4ae.png";
import img21 from "figma:asset/f0d1fd67cd8c187a7ced484b53d26339e55cba01.png";
import img4 from "figma:asset/71972fe01fb56284826b4ab0e79b9cf51967814b.png";
import imgAi041 from "figma:asset/46003650cde3b949971119d949fc7063f28bc448.png";
import imgSuv1 from "figma:asset/aaef27828b208eb34705cf8627140f4cb4a529bf.png";
import imgIntersect from "figma:asset/e2cc2b7cf74e7714fdd94354b7cd1ccc784092f6.png";
import img3 from "figma:asset/bc5714d60e019c3c784b95baca32952d6f1d72e7.png";
import logoImage from "@/assets/logo.png";

// 背景组件
function BackgroundComponent() {
  return (
    <div className="fixed h-[2174px] right-[-425px] top-[-232px] w-[1881px] pointer-events-none z-0" data-name="背景">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1881 2174">
        <g id="èæ¯">
          <g id="Rectangle 32"></g>
          <foreignObject height="593.6" width="622.6" x="115.7" y="-6.3">
            <div style={{ backdropFilter: "blur(2px)", clipPath: "url(#bgblur_0_1_597_clip_path)", height: "100%", width: "100%" }} xmlns="http://www.w3.org/1999/xhtml" />
          </foreignObject>
          <ellipse cx="427" cy="290.5" data-figma-bg-blur-radius="4" fill="url(#paint0_radial_1_597)" fillOpacity="0.49" id="Ellipse 52" opacity="0.2" rx="305" ry="290.5" />
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

// 左侧导航栏组件
// ⭐ 已删除：Frame 函数（笔记本图标）

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
      <img 
        src={logoImage} 
        alt="Logo" 
        className="block size-full object-contain"
      />
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
      {/* ⭐ 移除：笔记本图标 Frame */}
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
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full filter hue-rotate-[220deg] saturate-[1.5] brightness-[0.9]" src={img2} />
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

// 收藏夹亮条组件
function FavoritesHighlight() {
  return (
    <div className="absolute h-[53.143px] left-[19px] top-[392px] w-[232px]" data-name="收藏夹亮条">
      <div className="absolute inset-0">
        <div className="absolute bottom-[-3.76%] left-[-0.43%] right-[-0.43%] top-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 234 56">
            <g filter="url(#filter0_d_42_235)" id="Group 1437252925">
              <path d={svgPathsSidebar.pf796d80} fill="url(#paint0_linear_42_235)" id="Rectangle 33" stroke="var(--stroke-0, #C8A6FF)" strokeWidth="0.2" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="55.1429" id="filter0_d_42_235" width="234" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="1" />
                <feGaussianBlur stdDeviation="0.5" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_42_235" />
                <feBlend in="SourceGraphic" in2="effect1_dropShadow_42_235" mode="normal" result="shape" />
              </filter>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_42_235" x1="239.5" x2="-22.5" y1="-26" y2="76.5">
                <stop stopColor="white" />
                <stop offset="0.485577" stopColor="#E4E4FF" />
                <stop offset="1" stopColor="#D1D2FF" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div className="absolute flex flex-col font-['Inter:Bold',_'Noto_Sans_JP:Bold',_sans-serif] font-bold inset-[28.23%_43.53%_26.61%_30.6%] justify-center leading-[0] not-italic text-[#6062ef] text-[20px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">收藏夹</p>
      </div>
    </div>
  );
}

function LeftSidebarComponent() {
  return (
    <div className="fixed h-[1117px] left-0 top-0 w-[273px] z-40" data-name="左侧组件">
      <Component5 />
      <FavoritesHighlight />
      <div className="absolute aspect-[200/200] left-[19.05%] right-[72.89%] top-[408px]" data-name="收藏 未收藏 4">
        <div className="absolute inset-0 bg-[#6062ef] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px]" style={{ maskImage: `url('${img4}')`, maskSize: '22px 22px' }} />
      </div>
    </div>
  );
}

// 🔍 导入可交互的搜索栏组件
import GlobalSearchBar from "@/components/SearchBar";
import LanguageSelector from "@/components/LanguageSelector";

// 顶部搜索栏组件 - 已替换为可交互组件
function SearchBarComponent() {
  return (
    <div className="absolute contents left-[322px] top-[47px]" data-name="上部搜索栏">
      <GlobalSearchBar from="favorites" placeholder="搜索收藏的内容..." />
      <div className="absolute left-[335px] size-[25px] top-[58px]" data-name="搜索 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover opacity-[0.97] pointer-events-none size-full" src={img3} />
      </div>
      <div className="absolute h-[26px] left-[371px] top-[58px] w-0">
        <div className="absolute inset-[-1.92%_-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 27">
            <path d="M0.5 0.5V26.5" id="Vector 119" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeOpacity="0.22" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// 使用导入的全局 LanguageSelector 组件

function TopSearchComponent() {
  return (
    <>
      <SearchBarComponent />
      <LanguageSelector />
    </>
  );
}

// 收藏夹相关组件
function VectorAdd() {
  return (
    <div className="absolute inset-[29.167%]" data-name="Vector">
      <div className="absolute inset-[-5%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
          <g id="Vector">
            <path d={svgPathsFavorites.p38112000} fill="var(--stroke-0, white)" id="Vector-48" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function XnixLineAdd() {
  return (
    <div className="relative shrink-0 size-[36px]" data-name="Xnix/Line/Add">
      <VectorAdd />
    </div>
  );
}

function CreateFavoritesButtonFrame() {
  return (
    <div className="flex gap-[8px] items-center">
      <svg className="w-[20px] h-[20px] shrink-0" viewBox="0 0 20 20" fill="none">
        <path d="M10 4V16M4 10H16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
      <p className="font-['Bricolage_Grotesque:Medium',_'Noto_Sans_SC:Medium',_'Noto_Sans_JP:Medium',_sans-serif] font-medium text-[20px] text-white" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        创建收藏夹
      </p>
    </div>
  );
}

interface CreateFavoritesButtonProps {
  onClick?: () => void;
}

function CreateFavoritesButton({ onClick }: CreateFavoritesButtonProps) {
  return (
    <div 
      className="absolute bg-[#6062ef] box-border content-stretch flex flex-col gap-[10px] items-center justify-center pl-[16px] pr-[24px] py-[10px] right-[56px] rounded-[20px] top-[156px] translate-y-[-50%] cursor-pointer hover:bg-[#5053d5] transition-colors duration-200 z-10" 
      data-name="收藏夹"
      onClick={onClick}
    >
      <CreateFavoritesButtonFrame />
    </div>
  );
}

function FavoriteCardCount({ count }: { count: string }) {
  return (
    <div className="bg-[rgba(217,217,217,0.3)] box-border content-stretch flex gap-[10px] items-center justify-end px-[26px] py-[6px] relative rounded-[20px] shrink-0">
      <div className="flex flex-col font-['Bricolage_Grotesque:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#272727] text-[15px] text-center text-nowrap" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">{count}</p>
      </div>
    </div>
  );
}

function FavoriteCardTitle({ title, count }: { title: string; count: string }) {
  return (
    <div className="content-stretch flex items-end justify-between relative shrink-0 w-full z-10">
      <div className="flex flex-col font-['Bricolage_Grotesque:Bold',_'Noto_Sans_JP:Bold',_'Noto_Sans_SC:Bold',_'Noto_Sans_KR:Bold',_sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#272727] text-[22px] text-nowrap" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">{title}</p>
      </div>
      <FavoriteCardCount count={count} />
    </div>
  );
}

// 🎨 统一的淡雅背景色（类似 #f4f5ff 的浅紫蓝系）
const FOLDER_COLORS = [
  '#f4f5ff',  // 浅紫蓝
  '#f6f7ff',  // 浅紫蓝2
  '#f8f9ff',  // 浅紫蓝3
  '#f5f6ff',  // 浅紫蓝4
  '#f7f8ff',  // 浅紫蓝5
  '#f3f4ff',  // 浅紫蓝6
];

// 📐 卡片布局常量（骨架屏和动态卡片共享）
const CARD_LAYOUT = {
  rowHeight: 300,      // 每行高度
  rowGap: 50,         // 行间距
  leftValues: ['0', '25.41%', '50.74%', '76.15%'],   // 每列的left值
  rightValues: ['76.15%', '50.74%', '25.41%', '0'],  // 每列的right值
};

// 🦴 骨架屏卡片组件（匹配动态卡片布局）
interface SkeletonFavoriteCardProps {
  row: number;
  col: number;
  topOffset: number;
}

function SkeletonFavoriteCard({ row, col, topOffset }: SkeletonFavoriteCardProps) {
  return (
    <div 
      className="absolute content-stretch flex flex-col gap-[10px] items-center justify-end"
      style={{
        left: CARD_LAYOUT.leftValues[col],
        right: CARD_LAYOUT.rightValues[col],
        top: `${topOffset}px`,
        height: `${CARD_LAYOUT.rowHeight}px`,
      }}
    >
      {/* 标题和计数骨架 */}
      <div className="content-stretch flex items-end justify-between relative shrink-0 w-full z-10">
        <div className="h-[22px] w-[120px] bg-gray-200 rounded animate-pulse"></div>
        <div className="h-[28px] w-[60px] bg-gray-200 rounded-[20px] animate-pulse"></div>
      </div>
      {/* 图片区域骨架 */}
      <div className="absolute bottom-[20.09%] left-0 right-0 top-0 bg-gray-200 rounded-[20px] animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-gray-400 text-[14px]">加载中...</div>
        </div>
      </div>
    </div>
  );
}

// 🗂️ 动态收藏夹卡片组件
interface DynamicFavoriteCardProps {
  folder: FolderData;
  onClick: (folderId: string) => void;
  onDelete?: (folderId: string) => void;
  row: number; // 第几行 (0-based)
  col: number; // 第几列 (0-3)
  topOffset: number; // 顶部偏移量（px）
}

function DynamicFavoriteCard({ folder, onClick, onDelete, row, col, topOffset }: DynamicFavoriteCardProps) {
  const colorIndex = parseInt(folder.id.slice(-1), 36) % FOLDER_COLORS.length;
  const bgColor = FOLDER_COLORS[colorIndex];
  const [isDeleteConfirming, setIsDeleteConfirming] = React.useState(false);

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 阻止事件冒泡，避免触发卡片点击
    
    if (!isDeleteConfirming) {
      // 第一次点击：进入确认状态
      setIsDeleteConfirming(true);
    } else {
      // 第二次点击：执行删除
      if (onDelete) {
        onDelete(folder.id);
      }
    }
  };

  const handleMouseLeave = () => {
    // 鼠标移开时重置确认状态
    setIsDeleteConfirming(false);
  };

  return (
    <div 
      className="absolute content-stretch flex flex-col gap-[10px] items-center justify-end cursor-pointer hover:opacity-90 transition-all group"
      style={{
        left: CARD_LAYOUT.leftValues[col],
        right: CARD_LAYOUT.rightValues[col],
        top: `${topOffset}px`,
        height: `${CARD_LAYOUT.rowHeight}px`,
      }}
      data-name={folder.name}
      onClick={() => onClick(folder.id)}
    >
      <FavoriteCardTitle title={folder.name} count={folder.count.toString()} />
      <div className="absolute bottom-[20.09%] left-0 right-0 rounded-[20px] top-0">
        {/* 背景颜色 */}
        <div 
          className="absolute inset-0 rounded-[20px] pointer-events-none"
          style={{ backgroundColor: bgColor }}
        />
        
        {/* 🖼️ 封面图（如果有收藏内容） */}
        {folder.coverImage ? (
          <div className="absolute inset-0 rounded-[20px] overflow-hidden pointer-events-none">
            <img 
              src={folder.coverImage}
              alt={folder.name}
              className="w-full h-full object-cover opacity-90"
              loading="lazy"
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            {/* 半透明遮罩，让下面的文字更清晰 */}
            <div className="absolute inset-0 bg-black/5" />
          </div>
        ) : (
          /* ➕ 加号图标（空收藏夹） */
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg 
              width="48" 
              height="48" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#d0d0d0" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </div>
        )}
        
        {/* 图标 - 左上角，线框风格 */}
        <div className="absolute left-[16px] top-[12px] text-[#5d5d5d] opacity-40 pointer-events-none z-10">
          <FavoriteIcon name={folder.icon || 'folder'} size={20} />
        </div>
        {/* 删除按钮 - 右上角，悬浮显示 */}
        {onDelete && (
          <button
            onClick={handleDeleteClick}
            onMouseLeave={handleMouseLeave}
            className={`absolute right-[12px] top-[12px] h-[32px] rounded-[16px] shadow-md flex items-center overflow-hidden transition-all duration-200 opacity-0 group-hover:opacity-100 z-10 ${
              isDeleteConfirming 
                ? 'w-[140px] bg-red-500 text-white hover:bg-red-600 gap-2 px-3 justify-start' 
                : 'w-[32px] bg-white text-red-500 hover:bg-red-50 hover:text-red-600 justify-center'
            }`}
            title={isDeleteConfirming ? "再次点击确认删除" : "删除收藏夹"}
          >
            <div className="flex-shrink-0">
              <FavoriteIcon name="trash" size={18} />
            </div>
            <span 
              className={`text-[12px] font-medium whitespace-nowrap transition-opacity duration-200 ${
                isDeleteConfirming ? 'opacity-100 delay-100' : 'opacity-0 w-0'
              }`}
            >
              再次点击删除
            </span>
          </button>
        )}
        {/* 边框 */}
        <div aria-hidden="true" className="absolute border border-[#ededed] border-solid inset-0 rounded-[20px] pointer-events-none" />
      </div>
    </div>
  );
}

// 🦴 骨架屏网格（6个占位卡片，使用与动态卡片相同的布局）
function SkeletonFavoritesGrid() {
  const skeletonCount = 6; // 默认显示6个骨架屏卡片
  const rows = Math.ceil(skeletonCount / 4); // 2行
  const totalHeight = rows * CARD_LAYOUT.rowHeight + (rows - 1) * CARD_LAYOUT.rowGap; // 650px

  // 生成6个骨架屏卡片的位置
  const skeletonCards = Array.from({ length: skeletonCount }, (_, index) => {
    const row = Math.floor(index / 4);
    const col = index % 4;
    const topOffset = row * (CARD_LAYOUT.rowHeight + CARD_LAYOUT.rowGap);
    return { index, row, col, topOffset };
  });

  return (
    <div className="relative" style={{ height: `${totalHeight}px` }}>
      {skeletonCards.map(({ index, row, col, topOffset }) => (
        <SkeletonFavoriteCard
          key={index}
          row={row}
          col={col}
          topOffset={topOffset}
        />
      ))}
    </div>
  );
}

/** 📁 收藏夹数据结构 */
interface FolderData {
  id: string;
  name: string;
  count: number;
  icon?: string;
  coverImage?: string; // 🆕 封面图
}

interface FavoritesGridProps {
  folders?: FolderData[];
  isLoading?: boolean;
  onFavoriteClick?: (folderId: string) => void;
  onDeleteFolder?: (folderId: string) => void;
}

function FavoritesGrid({ folders = [], isLoading = false, onFavoriteClick, onDeleteFolder }: FavoritesGridProps) {
  // 🔄 加载状态 - 显示6个骨架屏卡片（使用与动态卡片相同的容器）
  if (isLoading) {
    return (
      <div className="absolute left-[322px] right-[56px] top-[222px] z-20" style={{ paddingBottom: '80px' }}>
        <SkeletonFavoritesGrid />
      </div>
    );
  }

  // 📁 动态渲染收藏夹卡片 - 每行4个持续向下排列
  if (folders && folders.length > 0) {
    const rows = Math.ceil(folders.length / 4); // 总行数
    const totalHeight = rows * CARD_LAYOUT.rowHeight + (rows - 1) * CARD_LAYOUT.rowGap;
    
    return (
      <div className="absolute left-[322px] right-[56px] top-[222px] z-20" style={{ paddingBottom: '80px' }}>
        <div className="relative" style={{ height: `${totalHeight}px` }}>
          {folders.map((folder, index) => {
            const row = Math.floor(index / 4);
            const col = index % 4;
            const topOffset = row * (CARD_LAYOUT.rowHeight + CARD_LAYOUT.rowGap);
            
            return (
              <DynamicFavoriteCard
                key={folder.id}
                folder={folder}
                row={row}
                col={col}
                topOffset={topOffset}
                onClick={onFavoriteClick || (() => {})}
                onDelete={onDeleteFolder}
              />
            );
          })}
        </div>
      </div>
    );
  }

  // 📂 空状态
  return (
    <div className="absolute left-[322px] right-[56px] top-[222px]" style={{ height: '487px' }}>
      <div className="flex items-center justify-center h-full">
        <div className="text-center text-[#999] text-[18px]">
          <p>还没有收藏夹</p>
          <p className="text-[14px] mt-2">点击右上角"创建收藏夹"开始使用</p>
        </div>
      </div>
    </div>
  );
}

function FavoritesTitle() {
  return (
    <div className="absolute flex flex-col font-['Inter:Bold',_'Noto_Sans_JP:Bold',_sans-serif] font-bold justify-center leading-[0] left-[322px] not-italic text-[35px] text-[rgba(0,0,0,0.95)] text-nowrap top-[156px] translate-y-[-50%] pointer-events-none">
      <p className="leading-[normal] whitespace-pre">收藏夹</p>
    </div>
  );
}

interface Component03FavoritesGbzLayoutProps {
  folders?: FolderData[];
  isLoading?: boolean;
  onFavoriteClick?: (folderId: string) => void;
  onDeleteFolder?: (folderId: string) => void;
  onCreateClick?: () => void;
}

export default function Component03FavoritesGbzLayout({ 
  folders = [],
  isLoading = false,
  onFavoriteClick,
  onDeleteFolder,
  onCreateClick
}: Component03FavoritesGbzLayoutProps) {
  return (
    <div className="bg-white relative min-h-screen w-full overflow-x-hidden" data-name="03收藏夹-GBZ">
      <BackgroundComponent />
      <LeftSidebarComponent />
      <TopSearchComponent />
      <CreateFavoritesButton onClick={onCreateClick} />
      <FavoritesGrid 
        folders={folders}
        isLoading={isLoading}
        onFavoriteClick={onFavoriteClick}
        onDeleteFolder={onDeleteFolder}
      />
      <FavoritesTitle />
    </div>
  );
}
