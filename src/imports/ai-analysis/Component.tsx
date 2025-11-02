import svgPaths from "./svg-cwakxrj0gf";

export default function Component() {
  return (
    <div className="relative size-full" data-name="选中亮条">
      {/* 背景渐变框 */}
      <div className="absolute h-[53.143px] left-0 top-0 w-[232px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 232 54">
          <path d={svgPaths.p12d07a00} fill="url(#paint0_linear_component)" id="Rectangle 33" stroke="#6062EF" strokeWidth="0.2" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_component" x1="238.5" x2="-23.5" y1="-26" y2="76.5">
              <stop stopColor="white" />
              <stop offset="0.485577" stopColor="#E4E4FF" />
              <stop offset="1" stopColor="#D1D2FF" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* 紫色灯泡图标 */}
      <div className="absolute h-[23.369px] left-[30.98px] top-[15px] w-[25.725px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 24">
          <g id="Vector">
            <path clipRule="evenodd" d={svgPaths.p17bc1df0} fillRule="evenodd" id="Vector-15" stroke="#6062EF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
            <path d={svgPaths.p2084b7f0} fill="#6062EF" id="Vector-16" />
            <path d={svgPaths.p10827c40} id="Vector 619" stroke="#6062EF" strokeLinecap="round" strokeWidth="1.2" />
          </g>
        </svg>
      </div>
      
      {/* 灵感搜集文字 */}
      <div className="absolute flex flex-col font-['Inter:Bold',_'Noto_Sans_JP:Bold',_sans-serif] font-bold justify-center leading-[0] left-[71px] not-italic text-[#6062ef] text-[20px] text-nowrap top-[26.57px] translate-y-[-50%]">
        <p className="leading-[normal] whitespace-pre">灵感搜集</p>
      </div>
    </div>
  );
}
