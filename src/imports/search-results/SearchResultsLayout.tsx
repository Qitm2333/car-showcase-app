import React from "react";
import SearchBar from "@/components/SearchBar";
import LanguageSelector from "@/components/LanguageSelector";
import DynamicUserName from "@/components/DynamicUserName";
import DynamicUserInitial from "@/components/DynamicUserInitial";
import CarShowcaseSidebar from "@/imports/inspiration-main/左侧组件-15-767";
// Favorites 侧边栏所需资源
import svgPathsSidebar from "@/imports/favorites-main/svg-2oczj8fsfm";
import svgPaths from "@/imports/favorites-main/svg-58vs26dot4";
// AI Analysis 侧边栏所需资源
import svgPathsLeftSidebarAi from "@/imports/ai-analysis/svg-lt6sj6nxih";
import svgPathsAi from "@/imports/ai-analysis/svg-x97xq9ehdi";
import img1 from "figma:asset/5b705b92be0721d93aaa1956ff0e19d5f801458a.png";
import img2 from "figma:asset/b0ef633e840f58f4d9b3383d20f87d9d4bbde4ae.png";
import img21 from "figma:asset/f0d1fd67cd8c187a7ced484b53d26339e55cba01.png";
import img4 from "figma:asset/71972fe01fb56284826b4ab0e79b9cf51967814b.png";
import imgAi041 from "figma:asset/46003650cde3b949971119d949fc7063f28bc448.png";
import imgAi042 from "figma:asset/8e8053a6dbca7a6848f369ad65db2225e6e22d34.png";
import imgSuv1 from "figma:asset/aaef27828b208eb34705cf8627140f4cb4a529bf.png";
import imgIntersect from "figma:asset/e2cc2b7cf74e7714fdd94354b7cd1ccc784092f6.png";

interface SearchResultsLayoutProps {
  onBackClick?: () => void;
  searchQuery: string;
  from?: "car-showcase" | "favorites" | "ai-analysis";
}

// 背景组件
function Background() {
  return (
    <div className="absolute h-[2174px] right-[-425px] top-[-232px] w-[1881px]" data-name="背景">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1881 2174">
        <g id="背景">
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

// ============ 直接复制 favorites 页面的 LeftSidebarComponent 及其依赖 ============

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

// ============ 直接复制 favorites 页面的完整 Component5 ============

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
      {/* ⭐ 移除：SL的项目对标分析、翼子板设计趋势分析 */}
      <div className="absolute flex flex-col font-['Inter:Regular',_'Noto_Sans_JP:Regular',_'Noto_Sans_SC:Regular',_sans-serif] font-normal inset-[65.17%_65.93%_33.21%_12.09%] justify-center leading-[0] not-italic text-[#5d5d5d] text-[15px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">历史分析</p>
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',_'Noto_Sans_JP:Regular',_sans-serif] font-normal inset-[23.55%_66.3%_74.84%_11.72%] justify-center leading-[0] not-italic text-[#5d5d5d] text-[15px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">全部工具</p>
      </div>
      <Group3 />
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

function FavoritesLeftSidebar() {
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

// ============ 直接复制 AI Analysis 页面的完整 Component5 及其依赖 ============

function FrameLeft() {
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

function Group1Left() {
  return (
    <div className="absolute contents inset-[11.64%_6.59%_83.6%_6.96%]">
      <div className="absolute bg-white inset-[11.64%_6.59%_83.6%_6.96%] rounded-[18px]">
        <div aria-hidden="true" className="absolute border-[#6f30d6] border-[0.2px] border-solid inset-0 pointer-events-none rounded-[18px]" />
      </div>
    </div>
  );
}

function Group3Left() {
  return (
    <div className="absolute contents inset-[4.12%_24.98%_91.76%_6.96%]">
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
      <div className="absolute flex flex-col font-['Reddit_Sans:Bold',_sans-serif] font-bold inset-[4.66%_24.98%_92.13%_16.85%] justify-center leading-[0] text-[#6062ef] text-[30px] text-center tracking-[0.6px]">
        <p className="leading-[normal]">Quality</p>
      </div>
    </div>
  );
}

function Group4Left() {
  return (
    <div className="absolute contents inset-[48.79%_71.43%_48.7%_18.32%]">
      <div className="absolute inset-[48.79%_71.43%_48.7%_18.32%]" data-name="Xnix/Line/Video_plus">
        <div className="absolute bottom-1/4 left-[12.5%] right-[12.5%] top-1/4">
          <div className="absolute inset-[-4.29%_-2.86%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 16">
              <g id="Vector">
                <path clipRule="evenodd" d={svgPaths.p3651580} fillRule="evenodd" id="Vector-22" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
                <path d={svgPaths.p3dfca380} fill="var(--stroke-0, black)" id="Vector-23" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Component5Left() {
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
      <FrameLeft />
      <Group1Left />
      <div className="absolute flex flex-col font-['Inter:Bold',_sans-serif] font-bold inset-[12.98%_43.96%_84.87%_32.97%] justify-center leading-[0] not-italic text-[20px] text-black text-nowrap">
        <DynamicUserName />
      </div>
      {/* ⭐ 移除：SL的项目对标分析、翼子板设计趋势分析 */}
      <div className="absolute flex flex-col font-['Inter:Regular',_'Noto_Sans_JP:Regular',_'Noto_Sans_SC:Regular',_sans-serif] font-normal inset-[65.17%_65.93%_33.21%_12.09%] justify-center leading-[0] not-italic text-[#5d5d5d] text-[15px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">历史分析</p>
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',_'Noto_Sans_JP:Regular',_sans-serif] font-normal inset-[23.55%_66.3%_74.84%_11.72%] justify-center leading-[0] not-italic text-[#5d5d5d] text-[15px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">全部工具</p>
      </div>
      <Group3Left />
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
            <path d={svgPathsAi.p10dcc480} id="Vector 118" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeOpacity="0.25" strokeWidth="2" />
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
      <Group4Left />
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

function AiHighlight() {
  return (
    <div className="absolute h-[55px] left-[19px] top-[601px] w-[243px]" data-name="AI分析组件亮条">
      <div className="absolute bottom-[3.38%] left-0 right-[4.53%] top-0">
        <div className="absolute bottom-[-3.76%] left-[-0.43%] right-[-0.43%] top-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 234 56">
            <g filter="url(#filter0_d_45_1183)" id="Group 1437252927">
              <path d={svgPathsLeftSidebarAi.pf796d80} fill="url(#paint0_linear_45_1183)" id="Rectangle 33" stroke="var(--stroke-0, #C8A6FF)" strokeWidth="0.2" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="55.1429" id="filter0_d_45_1183" width="234" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="1" />
                <feGaussianBlur stdDeviation="0.5" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_45_1183" />
                <feBlend in="SourceGraphic" in2="effect1_dropShadow_45_1183" mode="normal" result="shape" />
              </filter>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_45_1183" x1="239.5" x2="-22.5" y1="-26" y2="76.5">
                <stop stopColor="white" />
                <stop offset="0.485577" stopColor="#E4E4FF" />
                <stop offset="1" stopColor="#D1D2FF" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div className="absolute bottom-0 flex flex-col font-['Inter:Bold',_'Noto_Sans_JP:Bold',_sans-serif] font-bold justify-center leading-[0] left-[28.81%] not-italic right-0 text-[#6062ef] text-[20px] top-0">
        <p className="leading-[normal]">AI分析</p>
      </div>
      <div className="absolute contents left-[13.58%] right-[76.95%] top-[17px]" data-name="Mask group">
        <div className="absolute aspect-[200/200] bg-[#6062ef] left-[13.58%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px] right-[76.95%] top-[17px]" data-name="AI-04 2" style={{ maskImage: `url('${imgAi042}')`, maskSize: '23px 23px' }} />
      </div>
    </div>
  );
}

function AIAnalysisLeftSidebar() {
  return (
    <div className="fixed h-[1117px] left-0 top-0 w-[273px] z-40" data-name="左侧组件">
      <Component5Left />
      <AiHighlight />
    </div>
  );
}

// 返回按钮
function BackButton({ onClick }: { onClick?: () => void }) {
  return (
    <div className="absolute left-[346px] top-[225px] cursor-pointer" onClick={onClick}>
      <span className="text-[16px]">← 返回</span>
    </div>
  );
}

// 搜索标题
function SearchTitle({ searchQuery }: { searchQuery: string }) {
  return (
    <div className="absolute left-[346px] top-[275px]">
      <h2 className="text-[28px] font-bold">
        搜索结果: <span className="text-[#6062ef]">{searchQuery}</span>
      </h2>
    </div>
  );
}

// 搜索内容占位符
function SearchResultsContent() {
  return (
    <div className="absolute left-[346px] top-[350px] right-[56px] bottom-[56px]">
      <div className="text-gray-500">搜索结果内容将在这里显示...</div>
    </div>
  );
}

// 主布局组件
export default function SearchResultsLayout({
  onBackClick,
  searchQuery,
  from = "car-showcase"
}: SearchResultsLayoutProps) {
  return (
    <div className="bg-white relative size-full" data-name="搜索结果页面布局">
      {/* 背景 */}
      <Background />

      {/* 左侧导航栏 - 根据来源选择 */}
      {from === "favorites" ? (
        <FavoritesLeftSidebar />
      ) : from === "ai-analysis" ? (
        <AIAnalysisLeftSidebar />
      ) : (
        <div className="fixed left-0 top-0 h-screen z-50">
          <CarShowcaseSidebar />
        </div>
      )}

      {/* 搜索栏 */}
      <div className="absolute contents left-[322px] top-[47px]">
        <SearchBar placeholder={searchQuery || "继续搜索..."} from={from} />
        <LanguageSelector />
      </div>

      {/* 返回按钮 */}
      <BackButton onClick={onBackClick} />

      {/* 搜索标题 */}
      <SearchTitle searchQuery={searchQuery} />

      {/* 搜索内容 */}
      <SearchResultsContent />
    </div>
  );
}

