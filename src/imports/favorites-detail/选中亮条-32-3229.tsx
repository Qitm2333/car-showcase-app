import svgPaths from "./svg-q23bbkxmx8";

/**
 * @figmaAssetKey ef1c9ec2beedd96b59febab0ec7679b9d01aa491
 */
function Component({ className }: { className?: string }) {
  return (
    <div className={className} data-name="选中亮条">
      <div className="absolute h-[53.143px] left-0 top-0 w-[232px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 232 54">
          <path d={svgPaths.p10a36b00} fill="url(#paint0_linear_32_3233)" id="Rectangle 33" stroke="var(--stroke-0, #6062EF)" strokeWidth="0.2" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_32_3233" x1="238.5" x2="-23.5" y1="-26" y2="76.5">
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

export default function Component1() {
  return <Component className="relative rounded-[18px] size-full" />;
}