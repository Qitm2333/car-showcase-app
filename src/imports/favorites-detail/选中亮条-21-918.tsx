import svgPaths from "./svg-52ioa9k0j6";

function Vector() {
  return (
    <div className="absolute h-[22.181px] left-[31.58px] top-[14.07px] w-[24.542px]" data-name="Vector">
      <div className="absolute inset-[-2.71%_-2.44%_-2.7%_-2.44%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 24">
          <g id="Vector">
            <path clipRule="evenodd" d={svgPaths.pb9e5200} fillRule="evenodd" id="Vector-15" stroke="#6062EF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
            <path d={svgPaths.pa806600} fill="#6062EF" id="Vector-16" />
            <path d={svgPaths.p13ba8220} id="Vector 619" stroke="#6062EF" strokeLinecap="round" strokeWidth="1.2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

export default function Component() {
  return (
    <div className="relative size-full" data-name="选中亮条">
      <div className="absolute h-[53.143px] left-0 top-0 w-[232px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 232 54">
          <path d={svgPaths.p10a36b00} fill="url(#paint0_linear_21_918)" id="Rectangle 33" stroke="#6062EF" strokeWidth="0.2" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_21_918" x1="238.5" x2="-23.5" y1="-26" y2="76.5">
              <stop stopColor="white" />
              <stop offset="0.485577" stopColor="#E4E4FF" />
              <stop offset="1" stopColor="#D1D2FF" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <Vector />
      <div className="absolute flex flex-col font-['Inter:Bold',_'Noto_Sans_JP:Bold',_sans-serif] font-bold justify-center leading-[0] left-[71px] not-italic text-[#6062ef] text-[20px] text-nowrap top-[26.57px] translate-y-[-50%]">
        <p className="leading-[normal] whitespace-pre">灵感搜集</p>
      </div>
    </div>
  );
}
