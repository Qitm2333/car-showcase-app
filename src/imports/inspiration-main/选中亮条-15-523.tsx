import svgPaths from "./svg-oss87h4qhp";

function Group() {
  return (
    <div className="absolute h-[53.143px] left-0 top-0 w-[232px]">
      <div className="absolute bottom-[-3.76%] left-[-0.43%] right-[-0.43%] top-0">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 234 56">
          <g filter="url(#filter0_d_15_527)" id="Group 6">
            <path d={svgPaths.pf796d80} fill="url(#paint0_linear_15_527)" id="Rectangle 33" stroke="var(--stroke-0, #6062EF)" strokeWidth="0.2" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="55.1429" id="filter0_d_15_527" width="234" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="1" />
              <feGaussianBlur stdDeviation="0.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_15_527" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_15_527" mode="normal" result="shape" />
            </filter>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_15_527" x1="239.5" x2="-22.5" y1="-26" y2="76.5">
              <stop stopColor="white" />
              <stop offset="0.485577" stopColor="#E4E4FF" />
              <stop offset="1" stopColor="#D1D2FF" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Vector() {
  return (
    <div className="absolute h-[22.181px] left-[2.58px] top-[3px] w-[24.542px]" data-name="Vector">
      <div className="absolute inset-[-2.71%_-2.44%_-2.7%_-2.44%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 24">
          <g id="Vector">
            <path clipRule="evenodd" d={svgPaths.pb9e5200} fillRule="evenodd" id="Vector-15" stroke="var(--stroke-0, #6062EF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
            <path d={svgPaths.pa806600} fill="var(--stroke-0, #6062EF)" id="Vector-16" />
            <path d={svgPaths.p13ba8220} id="Vector 619" stroke="var(--stroke-0, #6062EF)" strokeLinecap="round" strokeWidth="1.2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function XnixLineLightbulbOn() {
  return (
    <div className="absolute left-0 size-[31px] top-0" data-name="Xnix/Line/Lightbulb_on">
      <Vector />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-[29px] top-[11.07px]">
      <div className="absolute flex flex-col font-['Inter:Bold',_'Noto_Sans_JP:Bold',_sans-serif] font-bold justify-center leading-[0] left-[42px] not-italic text-[#6062ef] text-[20px] text-nowrap top-[15.93px] translate-y-[-50%]">
        <p className="leading-[normal] whitespace-pre">灵感搜集</p>
      </div>
      <XnixLineLightbulbOn />
    </div>
  );
}

function Component1() {
  return (
    <div className="absolute contents left-0 top-0" data-name="1">
      <Group />
      <Group1 />
    </div>
  );
}

export default function Component() {
  return (
    <div className="relative size-full" data-name="选中亮条">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[10px] items-center px-[29px] py-[11px] relative size-full">
          <Component1 />
        </div>
      </div>
    </div>
  );
}