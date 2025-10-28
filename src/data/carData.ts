// 🚗 导入车型图片
import imgRectangle38 from "figma:asset/a1b90f8daf13d379ebf6d553b1dff88203bd119c.png";
import imgRectangle112 from "figma:asset/3ffb39d8b3bef565e4f2fb15d777b9ab5d4ddf7b.png";
import imgRectangle113 from "figma:asset/cffe1fbf428ed25ad5a84182688ca48d3add27c8.png";
import imgRectangle114 from "figma:asset/fe88e2b0f8c3b38365d336d96d441b8bd54252cf.png";
import imgRectangle115 from "figma:asset/301cad066fb1c5e7b05b6a1df34bd832ccef4c5d.png";
import imgRectangle116 from "figma:asset/682613e05c8b85ded242c6ef98f0248ac89a693b.png";
import imgRectangle117 from "figma:asset/887f54565e55bc697204a65a9406b889a6d4e7a1.png";
import imgRectangle118 from "figma:asset/2f62cd76adb661e3bc440b6abb0d83bc40d389ce.png";
import imgRectangle119 from "figma:asset/46e09025f1b6ff0435afede77e649be8c2bad4a6.png";
import imgRectangle120 from "figma:asset/3f4f44a26f6516075da5800d7ccb6749d140171d.png";
import imgRectangle111 from "figma:asset/5a3a08e514f2cbd71869cf85e1ae1d217113d09d.png";
import imgRectangle121 from "figma:asset/e533fec372b396be4570e727a825031af9f9e87a.png";

// 车型数据类型定义
export interface CarData {
  carID: number;
  carName: string;
  carType: string;
  carImage: string;
  brand?: string;      // 品牌
  year?: string;       // 年份
  view?: string;       // 视角
  parts?: string[];    // 相关部件
}

// 车型数据 - 便于维护和扩展
export const CAR_DATA: CarData[] = [
  // 第一行
  {
    carID: 1,
    carName: 'Smart #1',
    carType: 'SUV',
    carImage: imgRectangle38,
    brand: '比亚迪',
    year: '2024'
  },
  {
    carID: 2,
    carName: 'ZEEKR 009',
    carType: 'MPV',
    carImage: imgRectangle112,
    brand: '吉利',
    year: '2024'
  },
  {
    carID: 3,
    carName: 'IM6',
    carType: 'SUV',
    carImage: imgRectangle113,
    brand: '上汽',
    year: '2024'
  },
  {
    carID: 4,
    carName: 'Lynk & Co 05',
    carType: 'SUV',
    carImage: imgRectangle114,
    brand: '吉利',
    year: '2023'
  },
  
  // 第二行
  {
    carID: 5,
    carName: 'BYD Seal 06',
    carType: 'Sedan',
    carImage: imgRectangle115,
    brand: '比亚迪',
    year: '2024'
  },
  {
    carID: 6,
    carName: 'BYD Song Plus',
    carType: 'SUV',
    carImage: imgRectangle116,
    brand: '比亚迪',
    year: '2024'
  },
  {
    carID: 7,
    carName: 'Xiaopeng G6',
    carType: 'SUV',
    carImage: imgRectangle117,
    brand: '小鹏',
    year: '2024'
  },
  {
    carID: 8,
    carName: 'NIO ET5',
    carType: 'Sedan',
    carImage: imgRectangle118,
    brand: '蔚来',
    year: '2023'
  },
  
  // 第三行
  {
    carID: 9,
    carName: 'Li L9',
    carType: 'SUV',
    carImage: imgRectangle119,
    brand: '理想',
    year: '2024'
  },
  {
    carID: 10,
    carName: 'Aito M7',
    carType: 'SUV',
    carImage: imgRectangle120,
    brand: '问界',
    year: '2024'
  },
  {
    carID: 11,
    carName: 'Tesla Model Y',
    carType: 'SUV',
    carImage: imgRectangle111,
    brand: '特斯拉',
    year: '2024'
  },
  {
    carID: 12,
    carName: 'BYD Han',
    carType: 'Sedan',
    carImage: imgRectangle121,
    brand: '比亚迪',
    year: '2024'
  }
];

