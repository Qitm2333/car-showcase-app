/**
 * 🔍 车型直接搜索服务
 * 
 * 功能：
 * - 调用N8N工作流进行车型搜索
 * - 支持模糊匹配和SerpAPI搜索
 * - 返回车型的所有图片（外观、内饰、座椅）
 */

import { API_ENDPOINTS } from '@/config/api';

// 搜索结果中的图片信息
export interface SearchImageResult {
  url: string;
  type: 'high_quality' | 'standard';
  category: string;
  carName: string;
}

// N8N搜索API的返回结果
export interface N8NSearchResult {
  success: boolean;
  carId?: string;
  carName?: string;
  matchType?: string;
  totalImages?: number;
  images?: SearchImageResult[];
  categorySummary?: {
    [category: string]: number;
  };
  message?: string;
  error?: string;
  timestamp?: string;
}

/**
 * 搜索车型并获取所有图片
 * @param carName 车型名称（支持模糊匹配）
 * @returns 搜索结果，包含车型ID和所有图片
 */
export async function searchCarImages(carName: string): Promise<N8NSearchResult> {
  try {
    console.log('🔍 开始搜索车型:', carName);

    const response = await fetch(API_ENDPOINTS.CAR_SEARCH, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        carName: carName.trim()
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data: N8NSearchResult = await response.json();

    console.log('✅ 搜索成功:', {
      carName: data.carName,
      totalImages: data.totalImages,
      categorySummary: data.categorySummary
    });

    return data;
  } catch (error) {
    console.error('❌ 搜索失败:', error);
    
    return {
      success: false,
      error: error instanceof Error ? error.message : '搜索服务异常',
      message: '无法完成搜索，请稍后重试'
    };
  }
}

