// 智能整理服务
import { getSmartOrganizeEndpoint } from '@/config/api';

export interface SmartOrganizeRequest {
  userID: string;
  folderID: string;
  carNames: string[];
  filterCategory?: string;
  filterViewType?: string;
}

export interface SmartOrganizeResponse {
  success: boolean;
  message?: string;
  totalImages?: number;
  savedImages?: number;
  carSummary?: Record<string, number>;
  error?: string;
  timestamp?: string;
}

/**
 * 调用智能整理功能
 */
export async function smartOrganize(params: SmartOrganizeRequest): Promise<SmartOrganizeResponse> {
  const endpoint = getSmartOrganizeEndpoint();
  
  console.log('📦 [智能整理] 开始整理:', {
    carNames: params.carNames,
    filterCategory: params.filterCategory,
    filterViewType: params.filterViewType
  });
  
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const result: SmartOrganizeResponse = await response.json();
    
    console.log('✅ [智能整理] 完成:', {
      success: result.success,
      totalImages: result.totalImages,
      savedImages: result.savedImages
    });
    
    return result;
  } catch (error) {
    console.error('❌ [智能整理] 失败:', error);
    throw error;
  }
}

