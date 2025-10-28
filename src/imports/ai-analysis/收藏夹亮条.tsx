import svgPaths from "./svg-sjiyknj77f";
import img4 from "figma:asset/71972fe01fb56284826b4ab0e79b9cf51967814b.png";

/**
 * @figmaAssetKey d01ea438306121aad479ef651aa470ebda548236
 */
function Component({ className }: { className?: string }) {
  return (
    <div className={className} data-name="收藏夹亮条">
      <div className="absolute inset-0">
        <div className="absolute bottom-[-3.76%] left-[-0.43%] right-[-0.43%] top-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 234 56">
            <g filter="url(#filter0_d_42_235)" id="Group 1437252925">
              <path d={svgPaths.pf796d80} fill="url(#paint0_linear_42_235)" id="Rectangle 33" stroke="var(--stroke-0, #C8A6FF)" strokeWidth="0.2" />
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
      <div className="absolute contents left-[33px] top-[16px]" data-name="Mask group">
        <div className="absolute bg-[#6062ef] left-[33px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px] mask-size-[22px_22px] size-[22px] top-[16px]" data-name="收藏 未收藏 4" style={{ maskImage: `url('${img4}')` }} />
      </div>
    </div>
  );
}

export default function Component1() {
  return <Component className="relative size-full" />;
}