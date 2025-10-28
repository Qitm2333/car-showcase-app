import svgPaths from "./svg-52ioa9k0j6";
import XnixLineLightbulbOn from "./XnixLineLightbulbOn";

export default function Component() {
  return (
    <div className="relative size-full" data-name="选中亮条">
      <div className="size-full">
        <div className="box-border content-stretch flex gap-[10px] items-start p-[10px] relative size-full">
          <div className="absolute h-[53.143px] left-0 top-0 w-[232px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 232 54">
              <path d={svgPaths.p10a36b00} fill="url(#paint0_linear_18_813)" id="Rectangle 33" stroke="var(--stroke-0, #6062EF)" strokeWidth="0.2" />
              <defs>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_18_813" x1="238.5" x2="-23.5" y1="-26" y2="76.5">
                  <stop stopColor="white" />
                  <stop offset="0.485577" stopColor="#E4E4FF" />
                  <stop offset="1" stopColor="#D1D2FF" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="absolute left-[29px] size-[31px] top-[11.07px]">
            <XnixLineLightbulbOn />
          </div>
          <div className="absolute flex flex-col font-['Inter:Bold',_'Noto_Sans_JP:Bold',_sans-serif] font-bold justify-center leading-[0] left-[71px] not-italic text-[#6062ef] text-[20px] text-nowrap top-[26.57px] translate-y-[-50%]">
            <p className="leading-[normal] whitespace-pre">灵感搜集</p>
          </div>
        </div>
      </div>
    </div>
  );
}