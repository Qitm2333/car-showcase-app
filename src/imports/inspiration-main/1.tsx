import svgPaths from "./svg-olpvxv52em";

function Group() {
  return (
    <div className="absolute h-[53.143px] left-0 top-0 w-[232px]">
      <div className="absolute bottom-[-3.76%] left-[-0.43%] right-[-0.43%] top-0">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 234 56">
          <g filter="url(#filter0_d_1_1253)" id="Group 6">
            <path d={svgPaths.pf796d80} fill="url(#paint0_linear_1_1253)" id="Rectangle 33" stroke="var(--stroke-0, #6062EF)" strokeWidth="0.2" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="55.1429" id="filter0_d_1_1253" width="234" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="1" />
              <feGaussianBlur stdDeviation="0.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_1253" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_1253" mode="normal" result="shape" />
            </filter>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_1253" x1="239.5" x2="-22.5" y1="-26" y2="76.5">
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
      <div className="absolute inset-[-2.71%_-2.44%]">
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
    <div className="relative shrink-0 size-[31px]" data-name="Xnix/Line/Lightbulb_on">
      <Vector />
    </div>
  );
}

function Group1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="[grid-area:1_/_1] flex flex-col font-['Inter:Bold',_'Noto_Sans_JP:Bold',_sans-serif] font-bold justify-center ml-0 mt-[12px] not-italic relative text-[#6062ef] text-[20px] text-nowrap translate-y-[-50%]">
        <p className="leading-[normal] whitespace-pre">灵感搜集</p>
      </div>
    </div>
  );
}

function XnixLineLightbulbOn1() {
  return <div className="shrink-0 size-[31px]" data-name="Xnix/Line/Lightbulb_on" />;
}

export default function Component() {
  return (
    <div className="relative size-full" data-name="1">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[11px] items-center px-[29px] py-[10px] relative size-full">
          <Group />
          <XnixLineLightbulbOn />
          <Group1 />
          <XnixLineLightbulbOn1 />
        </div>
      </div>
    </div>
  );
}