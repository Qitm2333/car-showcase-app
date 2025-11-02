function Frame3() {
  return (
    <div className="absolute bg-[#f2f2f2] box-border content-stretch flex gap-[10px] h-[28px] items-center justify-center left-0 px-[15px] py-px rounded-[81px] top-[158px] w-[93px]">
      <div className="flex flex-col font-['Inter:Regular',_'Noto_Sans_JP:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.8)] text-center text-nowrap">
        <p className="leading-[normal] whitespace-pre">小米SU7</p>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute bg-[#f2f2f2] box-border content-stretch flex gap-[10px] h-[28px] items-center justify-center left-[200px] px-[13px] py-px rounded-[81px] top-[116px] w-[133px]">
      <div className="flex flex-col font-['Inter:Regular',_'Noto_Sans_JP:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.8)] text-nowrap">
        <p className="leading-[normal] whitespace-pre">特斯拉ModelX</p>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="absolute bg-[#f2f2f2] box-border content-stretch flex gap-[10px] h-[28px] items-center justify-center left-[102px] px-[17px] py-px rounded-[81px] top-[158px] w-[133px]">
      <div className="flex flex-col font-['Inter:Regular',_'Noto_Sans_JP:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.8)] text-nowrap">
        <p className="leading-[normal] whitespace-pre">特斯拉ModelY</p>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute bg-[#f2f2f2] box-border content-stretch flex gap-[10px] h-[28px] items-center justify-center left-[101px] px-[11px] py-px rounded-[81px] top-[115px] w-[87px]">
      <div className="flex flex-col font-['Inter:Regular',_'Noto_Sans_SC:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.8)] text-center text-nowrap">
        <p className="leading-[normal] whitespace-pre">腾势N7</p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute bg-[#f2f2f2] box-border content-stretch flex gap-[10px] h-[28px] items-center justify-center left-0 px-[12px] py-px rounded-[81px] top-[116px] w-[92px]">
      <div className="flex flex-col font-['Inter:Regular',_'Noto_Sans_JP:Regular',_'Noto_Sans_SC:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.8)] text-center text-nowrap">
        <p className="leading-[normal] whitespace-pre">比亚迪唐</p>
      </div>
    </div>
  );
}

export default function Component() {
  return (
    <div className="relative size-full" data-name="相关车型">
      <div className="absolute flex flex-col font-['Inter:Bold',_'Noto_Sans_JP:Bold',_sans-serif] font-bold justify-center leading-[0] not-italic right-[333px] text-[15px] text-[rgba(0,0,0,0.8)] top-[88px] translate-x-[100%] translate-y-[-50%] w-[89px]">
        <p className="leading-[normal]">相关车型</p>
      </div>
      <div className="absolute flex flex-col font-['Inter:Bold',_'Noto_Sans_JP:Bold',_'Noto_Sans_SC:Bold',_sans-serif] font-bold justify-center leading-[0] not-italic right-[333px] text-[15px] text-[rgba(0,0,0,0.8)] top-[9px] translate-x-[100%] translate-y-[-50%] w-[89px]">
        <p className="leading-[normal]">智能标签</p>
      </div>
      <Frame3 />
      <Frame2 />
      <Frame4 />
      <Frame1 />
      <Frame />
    </div>
  );
}