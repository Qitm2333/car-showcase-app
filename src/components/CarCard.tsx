import { CarData } from "@/data/carData";

interface CarCardProps {
  car: CarData;
  onClick?: (carId: string) => void;
  // 使用完全精确的inset定位
  bgInset: string;
  imgInset: string;
  nameInset: string;
  typeInset: string;
}

export default function CarCard({ car, onClick, bgInset, imgInset, nameInset, typeInset }: CarCardProps) {
  // 将inset字符串转换为对象
  const parseInset = (inset: string) => {
    const [top, right, bottom, left] = inset.split('_');
    return { top, right, bottom, left };
  };
  
  const bgPos = parseInset(bgInset);
  const imgPos = parseInset(imgInset);
  const namePos = parseInset(nameInset);
  const typePos = parseInset(typeInset);
  
  return (
    <>
      {/* 卡片背景 - 完全按原布局 */}
      <div 
        className="absolute bg-[#f4f4f4] rounded-[18px]"
        style={bgPos}
      >
        <div aria-hidden="true" className="absolute border border-[#d8d8d8] border-solid inset-0 pointer-events-none rounded-[18px]" />
      </div>
      
      {/* 车辆图片 - 完全按原布局 */}
      <div 
        className="absolute cursor-pointer"
        style={imgPos}
        onClick={() => onClick?.(car.carID.toString())}
      >
        <img 
          alt={car.carName}
          className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" 
          src={car.carImage}
          loading="lazy" 
        />
      </div>
      
      {/* 车辆名称 - 完全按原布局 */}
      <div 
        className="absolute flex flex-col font-['Inter:Bold',_sans-serif] font-bold justify-center leading-[0] not-italic text-[#202020] text-[18px]"
        style={namePos}
      >
        <p className="leading-[normal]">{car.carName}</p>
      </div>
      
      {/* 车型类型 - 完全按原布局 */}
      <div 
        className="absolute flex flex-col font-['Inter:Bold',_sans-serif] font-bold justify-center leading-[0] not-italic text-[18px] text-[rgba(32,32,32,0.3)] text-right"
        style={typePos}
      >
        <p className="leading-[normal]">{car.carType}</p>
      </div>
    </>
  );
}

