import svgPaths from "./svg-58vs26dot4";
import svgPathsSidebar from "./svg-2oczj8fsfm";
import svgPathsDetail from "./svg-fj137422in";
import DynamicUserName from "@/components/DynamicUserName";
import DynamicUserInitial from "@/components/DynamicUserInitial";
import img1 from "figma:asset/5b705b92be0721d93aaa1956ff0e19d5f801458a.png";
import img2 from "figma:asset/b0ef633e840f58f4d9b3383d20f87d9d4bbde4ae.png";
import img21 from "figma:asset/f0d1fd67cd8c187a7ced484b53d26339e55cba01.png";
import img4 from "figma:asset/71972fe01fb56284826b4ab0e79b9cf51967814b.png";
import imgAi041 from "figma:asset/46003650cde3b949971119d949fc7063f28bc448.png";
import imgSuv1 from "figma:asset/aaef27828b208eb34705cf8627140f4cb4a529bf.png";
import imgIntersect from "figma:asset/e2cc2b7cf74e7714fdd94354b7cd1ccc784092f6.png";
import img3 from "figma:asset/bc5714d60e019c3c784b95baca32952d6f1d72e7.png";
import imgRectangle111 from "figma:asset/5880bb629400122a7becba383a1a2df705a4f543.png";
import imgRectangle112 from "figma:asset/52ff54fdbc5c65d4f10af9c0d4c604013a66f45b.png";
import imgRectangle113 from "figma:asset/76af68a3d86761209fded8546f3b0cd9a662ea1d.png";
import imgRectangle114 from "figma:asset/927399bea4e705fc317fa6cb7bc28d1f1396a4ba.png";
import imgRectangle115 from "figma:asset/da6d932f6a15e9062e1ef53ee43a5d45dcd75173.png";
import imgRectangle116 from "figma:asset/76b068d2c67de238b3862a12d7e92286afc33051.png";
import imgRectangle117 from "figma:asset/94dfce12004e71b0224e228d7186c4084c273863.png";
import imgRectangle118 from "figma:asset/8d7053bfaebaad2ed4df62b89754a5db435ff89b.png";
import imgRectangle119 from "figma:asset/ffb39a4509d0cbd2bdb81e0841ea3762e5334a79.png";
import imgAi042 from "figma:asset/46003650cde3b949971119d949fc7063f28bc448.png";
import imgImage38 from "figma:asset/b67c5cd1f5d7f39c925a6e1cf3a7b6ff0675f1f6.png";

// 背景组件
function BackgroundComponent() {
  return (
    <div className="absolute h-[2174px] right-[-425px] top-[-232px] w-[1881px]" data-name="背景">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1881 2174">
        <g id="èæ¯">
          <g id="Rectangle 32"></g>
          <foreignObject height="593.6" width="622.6" x="115.7" y="-6.3">
            <div style={{ backdropFilter: "blur(2px)", clipPath: "url(#bgblur_0_1_597_clip_path)", height: "100%", width: "100%" }} xmlns="http://www.w3.org/1999/xhtml" />
          </foreignObject>
          <ellipse cx="427" cy="290.5" data-figma-bg-blur-radius="4" fill="url(#paint0_radial_1_597)" fillOpacity="0.49" id="Ellipse 52" opacity="0.2" rx="305" ry="290.5" />
          <rect fill="var(--fill-0, #A2A2A2)" height="176" id="æ»è½®" rx="4" transform="matrix(-1 0 0 1 1438 285)" width="8" />
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

// 左侧导航栏组件（复用）
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
      <div className="absolute aspect-[200/200] left-[17.22%] opacity-80 right-[71.06%] top-[775px]" data-name="轿车 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img1} />
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',_'Noto_Sans_JP:Regular',_'Noto_Sans_SC:Regular',_'Noto_Sans_KR:Regular',_sans-serif] font-normal inset-[70.01%_24.91%_28.47%_32.97%] justify-center leading-[0] not-italic opacity-80 text-[14px] text-[rgba(0,0,0,0.8)] text-nowrap">
        <p className="leading-[normal] whitespace-pre">SL的项目对标分析</p>
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',_'Noto_Sans_JP:Regular',_'Noto_Sans_SC:Regular',_sans-serif] font-normal inset-[65.17%_65.93%_33.21%_12.09%] justify-center leading-[0] not-italic text-[#5d5d5d] text-[15px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">历史分析</p>
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',_'Noto_Sans_JP:Regular',_sans-serif] font-normal inset-[23.55%_66.3%_74.84%_11.72%] justify-center leading-[0] not-italic text-[#5d5d5d] text-[15px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">全部工具</p>
      </div>
      <Group3 />
      <div className="absolute flex flex-col font-['Inter:Regular',_'Noto_Sans_JP:Regular',_'Noto_Sans_SC:Regular',_sans-serif] font-normal inset-[80.48%_20.88%_18%_32.97%] justify-center leading-[0] not-italic opacity-80 text-[14px] text-[rgba(0,0,0,0.8)] text-nowrap">
        <p className="leading-[normal] whitespace-pre">翼子板设计趋势分析</p>
      </div>
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
      <div className="absolute flex flex-col font-['Inter:Regular',_'Noto_Sans_JP:Regular',_'Noto_Sans_KR:Regular',_'Noto_Sans_SC:Regular',_sans-serif] font-normal inset-[75.29%_29.3%_23.19%_32.97%] justify-center leading-[0] not-italic opacity-80 text-[14px] text-[rgba(0,0,0,0.8)] text-nowrap">
        <p className="leading-[normal] whitespace-pre">ZU的遮阳板对标</p>
      </div>
      <div className="absolute aspect-[200/200] left-[17.22%] opacity-80 right-[71.06%] top-[833px]" data-name="SUV 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgSuv1} />
      </div>
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
      <div className="absolute contents left-[14.22%] right-[76.29%] top-[16px]" data-name="Mask group">
        <div className="absolute aspect-[200/200] bg-[#6062ef] left-[14.22%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px] mask-size-[22px_22px] right-[76.29%] top-[16px]" data-name="收藏 未收藏 4" style={{ maskImage: `url('${img4}')` }} />
      </div>
    </div>
  );
}

function LeftSidebarComponent() {
  return (
    <div className="fixed h-[1117px] left-0 top-0 w-[273px] z-40" data-name="左侧组件">
      <Component5 />
      <FavoritesHighlight />
    </div>
  );
}

// 顶部搜索栏组件
function SearchBar() {
  return (
    <div className="absolute contents left-[322px] top-[47px]" data-name="上部搜索栏">
      <div className="absolute bg-white h-[46px] left-[322px] rounded-[203px] top-[47px] w-[559px]" data-name="上部搜索">
        <div aria-hidden="true" className="absolute border-[0.5px] border-black border-solid inset-0 pointer-events-none rounded-[203px] shadow-[0px_0.5px_2px_0px_rgba(0,0,0,0.42)]" />
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',_'Noto_Sans_JP:Regular',_'Noto_Sans_SC:Regular',_sans-serif] font-normal h-[34px] justify-center leading-[0] left-[388px] not-italic text-[20px] text-[rgba(0,0,0,0.26)] top-[71px] translate-y-[-50%] w-[467px]">
        <p className="leading-[normal]">关于这辆车，有什么问题都可以问我</p>
      </div>
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

function LanguageSelector() {
  return (
    <div className="absolute contents right-[64px] top-[54px]">
      <div className="absolute flex flex-col font-['Inter:Regular',_'Noto_Sans_SC:Bold',_'Noto_Sans_JP:Bold',_sans-serif] font-normal h-[34px] justify-center leading-[0] not-italic right-[64px] text-[15px] text-[rgba(0,0,0,0.26)] text-right top-[71px] translate-y-[-50%] w-[467px]">
        <p className="leading-[normal]">
          <span>{`English / `}</span>
          <span className="font-['Inter:Bold',_'Noto_Sans_SC:Bold',_'Noto_Sans_JP:Bold',_sans-serif] font-bold not-italic text-[#6062ef]">简体中文</span>
        </p>
      </div>
    </div>
  );
}

function TopSearchComponent() {
  return (
    <div className="absolute contents left-[322px] top-[47px]" data-name="顶部搜索框">
      <SearchBar />
      <LanguageSelector />
    </div>
  );
}

// Back按钮组件
function VectorArrowLeft() {
  return (
    <div className="absolute inset-[29.17%_20.83%]" data-name="Vector">
      <div className="absolute inset-[-10%_-7.14%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 12">
          <g id="Vector">
            <path d={svgPathsDetail.p140feb00} fill="var(--stroke-0, #8F9090)" id="Vector-13" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function XnixLineArrowLeft() {
  return (
    <div className="absolute left-[322px] size-[24px] top-[114px]" data-name="Xnix/Line/Arrow_Left">
      <VectorArrowLeft />
    </div>
  );
}

interface BackButtonProps {
  onBackClick?: () => void;
}

function BackButton({ onBackClick }: BackButtonProps) {
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

// 收藏夹信息组件
function GroupMenu() {
  return (
    <div className="absolute contents right-[67px] top-[177px]">
      <div className="absolute bg-[#cacaca] right-[67px] rounded-[26px] size-[8px] top-[177px]" />
      <div className="absolute bg-[#cacaca] right-[79px] rounded-[26px] size-[8px] top-[177px]" />
      <div className="absolute bg-[#cacaca] right-[91px] rounded-[26px] size-[8px] top-[177px]" />
    </div>
  );
}

function GroupTitleInfo() {
  return (
    <div className="absolute contents left-[322px] top-[154px]">
      <div className="absolute flex flex-col font-['Inter:Bold',_'Noto_Sans_JP:Bold',_'Noto_Sans_SC:Bold',_'Noto_Sans_KR:Bold',_sans-serif] font-bold justify-center leading-[0] left-[322px] not-italic text-[30px] text-[rgba(0,0,0,0.95)] text-nowrap top-[177px] translate-y-[-50%]">
        <p className="leading-[normal] whitespace-pre">越野车外饰对标</p>
      </div>
      <div className="absolute h-[46px] left-[549px] mix-blend-darken top-[154px] w-[62px]" data-name="image 38">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage38} />
      </div>
    </div>
  );
}

function FavoritesInfo() {
  return (
    <div className="absolute contents left-[322px] top-[154px]" data-name="收藏夹信息">
      <GroupTitleInfo />
      <p className="absolute font-['Inter:Regular',_'Noto_Sans_SC:Regular',_'Noto_Sans_JP:Regular',_sans-serif] font-normal leading-[1.5] left-[322px] not-italic text-[14px] text-black top-[211px] w-[805px]">这些越野车涵盖方程豹、丰田、奔驰、捷途、坦克等品牌，价格从十几万到二百多万不等,多为近年发布的车型，定位中大型或硬派越野，动力与驱动形式丰富，满足不同越野需求。</p>
    </div>
  );
}

// 快速整理按钮组件
function VectorCheckBox() {
  return (
    <div className="absolute inset-[20.833%]" data-name="Vector">
      <div className="absolute inset-[-3.57%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
          <g id="Vector">
            <path d={svgPathsDetail.p15f7a800} fill="var(--stroke-0, #3C3C3C)" id="Vector-10" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function XnixLineBoxCheck() {
  return (
    <div className="[grid-area:1_/_1] ml-[24px] mt-[26px] relative size-[60px]" data-name="Xnix/Line/Box_check">
      <VectorCheckBox />
    </div>
  );
}

function Group2Quick() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
      <div className="[grid-area:1_/_1] bg-[#f5f4ff] h-[104px] ml-0 mt-0 relative rounded-[103px] w-[107px]">
        <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.05)] border-solid inset-0 pointer-events-none rounded-[103px]" />
      </div>
      <XnixLineBoxCheck />
    </div>
  );
}

function QuickOrganizeButton() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] items-end leading-[0] left-[324px] top-[281px] w-[107px]" data-name="快速整理按钮">
      <Group2Quick />
      <div className="flex flex-col font-['Inter:Bold',_'Noto_Sans_JP:Bold',_sans-serif] font-bold justify-center min-w-full not-italic relative shrink-0 text-[15px] text-[rgba(0,0,0,0.95)] text-center w-[min-content]">
        <p className="leading-[normal]">快速整理</p>
      </div>
    </div>
  );
}

// AI分析按钮组件
function AiAnalysisButton() {
  return (
    <div className="absolute contents left-[448px] top-[281px]" data-name="AI分析按钮">
      <div className="absolute flex flex-col font-['Inter:Bold',_'Noto_Sans_JP:Bold',_sans-serif] font-bold justify-center leading-[0] left-[500.5px] not-italic text-[15px] text-[rgba(0,0,0,0.95)] text-center top-[402px] translate-x-[-50%] translate-y-[-50%] w-[105px]">
        <p className="leading-[normal]">AI分析</p>
      </div>
      <div className="absolute bg-[#f5f4ff] h-[104px] left-[448px] rounded-[90px] top-[281px] w-[107px]">
        <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.05)] border-solid inset-0 pointer-events-none rounded-[90px]" />
      </div>
      <div className="absolute h-[104px] left-[448px] rounded-[99px] top-[281px] w-[107px]">
        <div aria-hidden="true" className="absolute border-[#ffa8a8] border-[3px] border-solid inset-0 pointer-events-none rounded-[99px]" />
      </div>
      <div className="absolute left-[477px] size-[51px] top-[308px]" data-name="AI-04 2">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgAi042} />
      </div>
    </div>
  );
}

// 车辆卡片组件
function CarCardFrame({ title, image }: { title: string; image: string }) {
  return (
    <div className="content-stretch flex items-end justify-between relative shrink-0 w-full">
      <div className="flex flex-col font-['Bricolage_Grotesque:Bold',_'Noto_Sans_SC:Bold',_'Noto_Sans_JP:Bold',_sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#272727] text-[22px] text-nowrap" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">{title}</p>
      </div>
    </div>
  );
}

function CarCard1() {
  return (
    <div className="absolute bottom-[69.48%] content-stretch flex flex-col gap-[10px] items-center justify-end left-0 right-[76.15%] top-0">
      <CarCardFrame title="钛7" image={imgRectangle111} />
      <div className="absolute bottom-[16.07%] left-0 pointer-events-none right-0 rounded-[20px] top-0">
        <div aria-hidden="true" className="absolute inset-0 rounded-[20px]">
          <div className="absolute bg-[#f8f8f8] inset-0 rounded-[20px]" />
          <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[20px] size-full" src={imgRectangle111} />
        </div>
        <div aria-hidden="true" className="absolute border border-[#ededed] border-solid inset-0 rounded-[20px]" />
      </div>
    </div>
  );
}

function CarCard2() {
  return (
    <div className="absolute bottom-[69.48%] content-stretch flex flex-col gap-[10px] items-center justify-end left-[25.41%] right-[50.74%] top-0">
      <CarCardFrame title="普拉多" image={imgRectangle112} />
      <div className="absolute bottom-[16.07%] left-0 pointer-events-none right-0 rounded-[20px] top-0">
        <div aria-hidden="true" className="absolute inset-0 rounded-[20px]">
          <div className="absolute bg-[#f8f8f8] inset-0 rounded-[20px]" />
          <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[20px] size-full" src={imgRectangle112} />
        </div>
        <div aria-hidden="true" className="absolute border border-[#ededed] border-solid inset-0 rounded-[20px]" />
      </div>
    </div>
  );
}

function CarCard3() {
  return (
    <div className="absolute bottom-[69.48%] content-stretch flex flex-col gap-[10px] items-center justify-end left-[50.74%] right-[25.41%] top-0">
      <CarCardFrame title="奔驰大G" image={imgRectangle115} />
      <div className="absolute bottom-[16.07%] left-0 pointer-events-none right-0 rounded-[20px] top-0">
        <div aria-hidden="true" className="absolute inset-0 rounded-[20px]">
          <div className="absolute bg-[#f8f8f8] inset-0 rounded-[20px]" />
          <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[20px] size-full" src={imgRectangle115} />
        </div>
        <div aria-hidden="true" className="absolute border border-[#ededed] border-solid inset-0 rounded-[20px]" />
      </div>
    </div>
  );
}

function CarCard4() {
  return (
    <div className="absolute bottom-[69.48%] content-stretch flex flex-col gap-[10px] items-center justify-end left-[76.15%] right-0 top-0">
      <CarCardFrame title="捷途山海T2" image={imgRectangle119} />
      <div className="absolute bottom-[16.07%] left-0 pointer-events-none right-0 rounded-[20px] top-0">
        <div aria-hidden="true" className="absolute inset-0 rounded-[20px]">
          <div className="absolute bg-[#f8f8f8] inset-0 rounded-[20px]" />
          <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[20px] size-full" src={imgRectangle119} />
        </div>
        <div aria-hidden="true" className="absolute border border-[#ededed] border-solid inset-0 rounded-[20px]" />
      </div>
    </div>
  );
}

function CarCard5() {
  return (
    <div className="absolute bottom-[34.74%] content-stretch flex flex-col gap-[10px] items-center justify-end left-0 right-[76.15%] top-[34.74%]">
      <CarCardFrame title="坦克300" image={imgRectangle113} />
      <div className="absolute bottom-[16.07%] left-0 pointer-events-none right-0 rounded-[20px] top-0">
        <div aria-hidden="true" className="absolute inset-0 rounded-[20px]">
          <div className="absolute bg-[#f8f8f8] inset-0 rounded-[20px]" />
          <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[20px] size-full" src={imgRectangle113} />
        </div>
        <div aria-hidden="true" className="absolute border border-[#ededed] border-solid inset-0 rounded-[20px]" />
      </div>
    </div>
  );
}

function CarCard6() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[10px] inset-[34.74%_50.74%_34.74%_25.41%] items-center justify-end">
      <CarCardFrame title="坦克400" image={imgRectangle116} />
      <div className="absolute bottom-[16.07%] left-0 pointer-events-none right-0 rounded-[20px] top-0">
        <div aria-hidden="true" className="absolute inset-0 rounded-[20px]">
          <div className="absolute bg-[#f8f8f8] inset-0 rounded-[20px]" />
          <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[20px] size-full" src={imgRectangle116} />
        </div>
        <div aria-hidden="true" className="absolute border border-[#ededed] border-solid inset-0 rounded-[20px]" />
      </div>
    </div>
  );
}

function CarCard7() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[10px] inset-[34.74%_25.18%_34.74%_50.96%] items-center justify-end">
      <CarCardFrame title="坦克400" image={imgRectangle116} />
      <div className="absolute bottom-[16.07%] left-0 pointer-events-none right-0 rounded-[20px] top-0">
        <div aria-hidden="true" className="absolute inset-0 rounded-[20px]">
          <div className="absolute bg-[#f8f8f8] inset-0 rounded-[20px]" />
          <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[20px] size-full" src={imgRectangle116} />
        </div>
        <div aria-hidden="true" className="absolute border border-[#ededed] border-solid inset-0 rounded-[20px]" />
      </div>
    </div>
  );
}

function CarCard8() {
  return (
    <div className="absolute bottom-[34.74%] content-stretch flex flex-col gap-[10px] items-center justify-end left-[76.15%] right-0 top-[34.74%]">
      <CarCardFrame title="坦克500" image={imgRectangle118} />
      <div className="absolute bottom-[16.07%] left-0 pointer-events-none right-0 rounded-[20px] top-0">
        <div aria-hidden="true" className="absolute inset-0 rounded-[20px]">
          <div className="absolute bg-[#f8f8f8] inset-0 rounded-[20px]" />
          <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[20px] size-full" src={imgRectangle118} />
        </div>
        <div aria-hidden="true" className="absolute border border-[#ededed] border-solid inset-0 rounded-[20px]" />
      </div>
    </div>
  );
}

function CarCard9() {
  return (
    <div className="absolute bottom-0 content-stretch flex flex-col gap-[10px] items-center justify-end left-0 right-[76.15%] top-[69.48%]">
      <CarCardFrame title="坦克300" image={imgRectangle114} />
      <div className="absolute bottom-[16.07%] left-0 pointer-events-none right-0 rounded-[20px] top-0">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[20px] size-full" src={imgRectangle114} />
        <div aria-hidden="true" className="absolute border border-[#ededed] border-solid inset-0 rounded-[20px]" />
      </div>
    </div>
  );
}

function CarCard10() {
  return (
    <div className="absolute bottom-0 content-stretch flex flex-col gap-[10px] items-center justify-end left-[25.41%] right-[50.74%] top-[69.48%]">
      <CarCardFrame title="坦克400" image={imgRectangle117} />
      <div className="absolute bottom-[16.07%] left-0 pointer-events-none right-0 rounded-[20px] top-0">
        <div aria-hidden="true" className="absolute inset-0 rounded-[20px]">
          <div className="absolute bg-[#f8f8f8] inset-0 rounded-[20px]" />
          <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[20px] size-full" src={imgRectangle117} />
        </div>
        <div aria-hidden="true" className="absolute border border-[#ededed] border-solid inset-0 rounded-[20px]" />
      </div>
    </div>
  );
}

function CarGrid() {
  return (
    <div className="absolute aspect-[1350/734] left-[322px] overflow-clip right-[56px] top-[481px]" data-name="收藏车图">
      <CarCard1 />
      <CarCard2 />
      <CarCard3 />
      <CarCard4 />
      <CarCard5 />
      <CarCard6 />
      <CarCard7 />
      <CarCard8 />
      <CarCard9 />
      <CarCard10 />
    </div>
  );
}

// 分割线组件
function Divider() {
  return (
    <div className="absolute bg-white h-px right-0 shadow-[0px_1px_2.5px_0px_rgba(0,0,0,0.1)] top-[444px] w-[1936px]" data-name="分割栏" />
  );
}

interface Component04FavoritesDetailGbzLayoutProps {
  onBackClick?: () => void;
}

export default function Component04FavoritesDetailGbzLayout({ onBackClick }: Component04FavoritesDetailGbzLayoutProps) {
  return (
    <div className="bg-white relative size-full" data-name="04收藏夹-详情页-GBZ">
      <BackgroundComponent />
      <LeftSidebarComponent />
      <TopSearchComponent />
      <BackButton onBackClick={onBackClick} />
      <FavoritesInfo />
      <GroupMenu />
      <QuickOrganizeButton />
      <AiAnalysisButton />
      <Divider />
      <CarGrid />
    </div>
  );
}
