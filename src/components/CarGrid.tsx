import { useMemo } from "react";
import { CAR_DATA, CarData } from "@/data/carData";
import CarCard from "./CarCard";

interface CarGridProps {
  onCarClick?: (carId: string) => void;
  // 筛选条件（可选）
  filterBrand?: string | null;
  filterModel?: string | null;
  filterYear?: string | null;
  searchQuery?: string;
}

// 原来的3行4列布局位置（使用完全精确的inset定位）
const CAR_POSITIONS = [
  // 第一行
  { 
    bgInset: '2.21%_75.25%_72.99%_2.19%',
    imgInset: '4.27%_75.81%_74.92%_2.83%',
    nameInset: '27.83%_86.42%_67.9%_2.19%',
    typeInset: '27.83%_75.25%_67.9%_13.3%'
  },
  { 
    bgInset: '2.21%_26.52%_72.99%_50.85%',
    imgInset: '4.27%_27.72%_73.55%_51.48%',
    nameInset: '27.83%_37.69%_67.9%_50.85%',
    typeInset: '27.83%_26.59%_67.9%_62.02%'
  },
  { 
    bgInset: '2.21%_50.85%_72.99%_26.52%',
    imgInset: '4.27%_52.12%_73.55%_27.09%',
    nameInset: '27.83%_62.09%_67.9%_26.52%',
    typeInset: '27.83%_50.92%_67.9%_37.69%'
  },
  { 
    bgInset: '2.21%_2.19%_72.99%_75.25%',
    imgInset: '4.27%_3.4%_73.55%_75.81%',
    nameInset: '27.83%_13.37%_67.9%_75.25%',
    typeInset: '27.83%_2.19%_67.9%_86.42%'
  },
  
  // 第二行
  { 
    bgInset: '34.86%_75.25%_40.34%_2.19%',
    imgInset: '34.86%_76.45%_41.99%_2.79%',
    nameInset: '60.49%_86.42%_35.24%_2.19%',
    typeInset: '60.49%_75.25%_35.24%_13.3%'
  },
  { 
    bgInset: '34.86%_26.52%_40.34%_50.85%',
    imgInset: '34.86%_27.33%_41.99%_51.91%',
    nameInset: '60.49%_37.69%_35.24%_50.85%',
    typeInset: '60.49%_26.59%_35.24%_62.02%'
  },
  { 
    bgInset: '34.86%_50.85%_40.34%_26.52%',
    imgInset: '34.86%_51.8%_41.99%_27.44%',
    nameInset: '60.49%_62.09%_35.24%_26.52%',
    typeInset: '60.49%_50.92%_35.24%_37.69%'
  },
  { 
    bgInset: '34.86%_2.19%_40.34%_75.25%',
    imgInset: '34.86%_3%_41.99%_76.24%',
    nameInset: '60.49%_13.37%_35.24%_75.25%',
    typeInset: '60.35%_2.22%_34.86%_86.7%'
  },
  
  // 第三行
  { 
    bgInset: '67.9%_75.25%_7.3%_2.19%',
    imgInset: '67.9%_76.45%_8.95%_2.79%',
    nameInset: '93.52%_86.42%_2.21%_2.19%',
    typeInset: '93.52%_75.25%_2.21%_13.3%'
  },
  { 
    bgInset: '67.9%_26.52%_7.3%_50.85%',
    imgInset: '69.14%_27.79%_10.2%_52.19%',
    nameInset: '93.52%_37.69%_2.21%_50.85%',
    typeInset: '93.52%_26.59%_2.21%_62.02%'
  },
  { 
    bgInset: '67.9%_50.85%_7.3%_26.52%',
    imgInset: '67.9%_51.48%_11.3%_27.16%',
    nameInset: '93.52%_62.09%_2.21%_26.52%',
    typeInset: '93.52%_50.92%_2.21%_37.69%'
  },
  { 
    bgInset: '67.9%_2.19%_7.3%_75.25%',
    imgInset: '68.72%_2.93%_8.12%_76.31%',
    nameInset: '93.52%_13.37%_2.21%_75.25%',
    typeInset: '93.52%_2.19%_2.21%_86.42%'
  },
];

export default function CarGrid({ 
  onCarClick,
  filterBrand,
  filterModel,
  filterYear,
  searchQuery 
}: CarGridProps) {
  
  // 根据筛选条件过滤车型数据
  const filteredCars = useMemo(() => {
    let result = [...CAR_DATA];
    
    // 品牌筛选
    if (filterBrand) {
      result = result.filter(car => car.brand === filterBrand);
    }
    
    // 车型筛选
    if (filterModel) {
      result = result.filter(car => car.carType === filterModel);
    }
    
    // 年份筛选
    if (filterYear) {
      result = result.filter(car => car.year === filterYear);
    }
    
    // 搜索查询
    if (searchQuery && searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(car => 
        car.carName.toLowerCase().includes(query) ||
        car.carType.toLowerCase().includes(query) ||
        car.brand?.toLowerCase().includes(query)
      );
    }
    
    return result;
  }, [filterBrand, filterModel, filterYear, searchQuery]);
  
  return (
    <div className="absolute aspect-[1414/725.766] left-[291px] overflow-clip right-[23px] top-[440px]" data-name="车图片边框">
      {/* 使用原来的绝对定位布局 - 3行4列 */}
      {filteredCars.slice(0, 12).map((car, index) => (
        <CarCard 
          key={car.carID} 
          car={car} 
          onClick={onCarClick}
          bgInset={CAR_POSITIONS[index].bgInset}
          imgInset={CAR_POSITIONS[index].imgInset}
          nameInset={CAR_POSITIONS[index].nameInset}
          typeInset={CAR_POSITIONS[index].typeInset}
        />
      ))}
      
      {/* 无结果提示 */}
      {filteredCars.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-400 text-[18px] font-['Inter:Regular',_sans-serif]">
            没有找到符合条件的车型
          </p>
        </div>
      )}
    </div>
  );
}

