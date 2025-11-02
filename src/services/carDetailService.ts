/**
 * 🚗 车辆详情服务
 * 
 * 功能：
 * - 根据 carID 或 carName 获取车辆详细信息
 * - 包含 AI 分析、智能标签、相关车型、详细图片等
 * 
 * 对应 N8N 工作流：
 * - webhook: car-detail-complete
 * - Google Sheet: CarImageURLMVP用
 */

import { API_ENDPOINTS } from '@/config/api';

// ==================== 类型定义 ====================

/**
 * 车辆详情图片
 */
export interface CarDetailImage {
  url: string;           // 图片URL
  category: string;      // 分类：外观、内饰、座椅等
  viewType: string;      // 视角：view45, viewFront, viewSide等
}

/**
 * 相关车型
 */
export interface RelatedCar {
  carName: string;        // 车型名称
  carID: number;          // 车辆ID
  carPriceRange: string;  // 价格范围
  vehicleClass: string;   // 车型类别
  brandID: number;        // 品牌ID
  relevanceScore: number; // 相关度评分
}

/**
 * 车辆详情完整数据
 */
export interface CarDetailData {
  carName: string;         // 车型名称
  carPriceRange: string;   // 价格范围
  vehicleClass: string;    // 车型类别
  carID: number;           // 车辆ID
  brandID: number;         // 品牌ID
  mainImageUrl: string;    // 主图URL（view45外观图）
  aiAnalysis: string;      // AI分析内容
  smartTags: string[];     // 智能标签数组（3-5个关键词）
  relatedCars: RelatedCar[];      // 相关车型列表（最多6个）
  detailImages: CarDetailImage[]; // 详细图片列表
  stats: {
    totalImages: number;       // 总图片数
    relatedCarsCount: number;  // 相关车型数
  };
}

/**
 * N8N API 返回结构
 */
export interface N8NCarDetailResponse {
  success: boolean;
  data?: CarDetailData;
  timestamp?: string;
  error?: string;  // 失败时的错误信息
}

/**
 * 查询参数（支持 carID 或 carName）
 */
export interface CarDetailQueryParams {
  carID?: number | string;  // 车辆ID（优先）
  carName?: string;         // 车型名称（备用）
}

// ==================== API 调用 ====================

/**
 * 获取车辆详情
 * 
 * @param params - 查询参数（carID 或 carName）
 * @returns 车辆详情数据
 * 
 * @example
 * ```typescript
 * // 通过 carID 查询
 * const detail = await fetchCarDetail({ carID: 5964 });
 * 
 * // 通过 carName 查询
 * const detail = await fetchCarDetail({ carName: "比亚迪海豹" });
 * ```
 */
export async function fetchCarDetail(
  params: CarDetailQueryParams
): Promise<CarDetailData> {
  console.log('🚗 查询车辆详情:', params);

  // 验证参数
  if (!params.carID && !params.carName) {
    throw new Error('请提供 carID 或 carName');
  }

  try {
    // 构建请求体（优先使用 carID）
    const requestBody = params.carID 
      ? { carID: Number(params.carID) }
      : { carName: params.carName };

    console.log('📤 发送请求到 N8N:', API_ENDPOINTS.CAR_DETAIL);
    console.log('📦 请求参数:', requestBody);

    const response = await fetch(API_ENDPOINTS.CAR_DETAIL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP 错误: ${response.status} ${response.statusText}`);
    }

    const result: N8NCarDetailResponse = await response.json();
    console.log('📥 N8N 响应:', result);

    if (!result.success || !result.data) {
      throw new Error(result.error || '获取车辆详情失败');
    }

    console.log('✅ 车辆详情获取成功:', result.data.carName);
    console.log('📊 统计信息:', result.data.stats);

    return result.data;

  } catch (error) {
    console.error('❌ 获取车辆详情失败:', error);
    
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('未知错误');
    }
  }
}

/**
 * 预加载车辆详情（用于优化性能）
 * 
 * @param carID - 车辆ID
 */
export async function preloadCarDetail(carID: number): Promise<void> {
  try {
    await fetchCarDetail({ carID });
    console.log('✅ 预加载成功:', carID);
  } catch (error) {
    console.warn('⚠️ 预加载失败:', carID, error);
  }
}

