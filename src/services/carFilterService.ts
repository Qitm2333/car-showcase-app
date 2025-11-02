import { API_ENDPOINTS } from '@/config/api';

// 筛选参数接口
export interface FilterParams {
  keyword?: string;      // 关键词搜索
  brands?: string[];     // 品牌列表
  models?: string[];     // 车型列表
  views?: string[];      // 视角列表
}

// N8N返回的车型数据结构
export interface N8NCarResult {
  carID: number;           // ✅ 新增车辆ID
  carName: string;
  vehicleClass: string;
  viewType: string;
  imageURL: string;
  carPriceRange?: string;  // 价格区间（可选）
  brandID?: number;        // 品牌ID（可选）
  category?: string;       // 分类（可选）
  [key: string]: any;      // 其他可能的字段
}

// API响应接口
export interface FilterResponse {
  success: boolean;
  count: number;
  results: N8NCarResult[];
  filters: FilterParams;
  timestamp: string;
  message?: string;
}

/**
 * 调用N8N筛选API获取车型数据
 * @param filters 筛选条件
 * @returns 筛选结果
 */
export async function fetchFilteredCars(filters: FilterParams): Promise<FilterResponse> {
  try {
    console.log('🔍 发送筛选请求:', filters);

    const response = await fetch(API_ENDPOINTS.CAR_FILTER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filters),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data: FilterResponse = await response.json();
    
    console.log('✅ 筛选结果:', {
      count: data.count,
      filters: data.filters,
      timestamp: data.timestamp
    });

    return data;
  } catch (error) {
    console.error('❌ 筛选API调用失败:', error);
    
    // 返回空结果而不是抛出错误，保证用户体验
    return {
      success: false,
      count: 0,
      results: [],
      filters: filters,
      timestamp: new Date().toISOString(),
      message: error instanceof Error ? error.message : '筛选失败'
    };
  }
}

