/**
 * ⭐ 收藏夹服务
 * 
 * 统一管理所有收藏夹相关的 API 调用
 * 与 N8N USER_FAVORITE 端点交互
 */

import { API_ENDPOINTS } from '@/config/api';

// ========== 接口定义 ==========

/** 收藏夹文件夹 */
export interface FavoriteFolder {
  folderID: string;
  folderName: string;
  folderIcon: string;
  createdAt: string;
  coverImage?: string;  // 🆕 封面图（收藏夹第一张图片）
}

/** 收藏项 */
export interface FavoriteItem {
  itemID: string;
  folderID: string;
  carID: number;
  carName: string;
  imageURL: string;
  category?: string;    // 🆕 车型类别（如 "紧凑型SUV"）
  viewType?: string;    // 🆕 视角类型（如 "view45", "view-45"）
  addedAt: string;
}

/** API 响应基础结构 */
interface APIResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}

// ========== 收藏夹管理 API ==========

/**
 * 创建新收藏夹
 */
export async function createFolder(params: {
  inviteCode: string;
  folderName: string;
  folderIcon?: string;
}): Promise<{
  success: boolean;
  message?: string;
  folder?: FavoriteFolder;
}> {
  try {
    const response = await fetch(API_ENDPOINTS.USER_FAVORITE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'createFolder',
        userID: params.inviteCode,  // 使用 inviteCode 作为 userID
        folderName: params.folderName,
        folderIcon: params.folderIcon || '📁',
      }),
    });

    const data = await response.json();
    console.log('🔍 N8N createFolder 原始返回:', JSON.stringify(data, null, 2));
    console.log('🔍 返回数据类型:', typeof data, 'success字段:', data.success, 'message字段:', data.message, 'folderID字段:', data.folderID);
    
    // ✅ 兼容多种返回格式
    // 格式1: { success: true, folder: {...} }
    // 格式2: { message: "收藏夹创建成功", folderID: "xxx", ... }
    // 格式3: { success: false, message: "收藏夹创建成功" } (N8N可能错误地返回 success: false)
    
    // 判断是否成功
    let isSuccess = false;
    if (data.success === true) {
      isSuccess = true;
      console.log('✅ 成功判断：data.success === true');
    } else if (data.message && typeof data.message === 'string' && data.message.includes('成功')) {
      isSuccess = true;
      console.log('✅ 成功判断：message 包含"成功"');
    } else if (data.folderID && typeof data.folderID === 'string' && data.folderID.length > 0) {
      isSuccess = true;
      console.log('✅ 成功判断：存在有效的 folderID');
    }
    
    console.log('🔍 最终判断结果 isSuccess:', isSuccess);
    
    // 构造 folder 对象
    let folderData: FavoriteFolder | undefined = undefined;
    
    // 🔍 兼容多种数据结构
    // 格式1: { folder: {...} }
    // 格式2: { folderID: "xxx", folderName: "xxx", ... }
    // 格式3: { data: { folderID: "xxx", folderName: "xxx", ... } }  ← N8N 实际返回的格式
    
    if (data.folder) {
      folderData = data.folder;
      console.log('📁 从 data.folder 获取 folder 对象');
    } else if (data.data && data.data.folderID) {
      // ✅ 处理嵌套的 data 结构
      folderData = {
        folderID: data.data.folderID,
        folderName: data.data.folderName || params.folderName,
        folderIcon: data.data.folderIcon || params.folderIcon || '📁',
        createdAt: data.data.createdAt || data.data.createTime || new Date().toISOString(),
      };
      console.log('📁 从 data.data.folderID 构造 folder 对象');
    } else if (data.folderID) {
      folderData = {
        folderID: data.folderID,
        folderName: data.folderName || params.folderName,
        folderIcon: data.folderIcon || params.folderIcon || '📁',
        createdAt: data.createdAt || data.createTime || new Date().toISOString(),
      };
      console.log('📁 从 data.folderID 构造 folder 对象');
    } else {
      console.warn('⚠️ 无法获取或构造 folder 对象，N8N 可能没有返回 folderID');
      console.warn('⚠️ data 结构:', JSON.stringify(data, null, 2));
    }
    
    console.log('🔍 构造的 folder:', folderData ? JSON.stringify(folderData, null, 2) : 'undefined');
    
    const result = {
      success: isSuccess,
      message: data.message,
      folder: folderData,
    };
    
    console.log('🔍 createFolder 最终返回:', JSON.stringify(result, null, 2));
    
    return result;
  } catch (error) {
    console.error('创建收藏夹失败:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : '网络错误',
    };
  }
}

/**
 * 获取用户的所有收藏夹
 */
export async function getFolderList(inviteCode: string): Promise<{
  success: boolean;
  message?: string;
  folders: FavoriteFolder[];
}> {
  try {
    console.log('📤 getFolderList 请求:', {
      url: API_ENDPOINTS.USER_FAVORITE,
      action: 'listFolders',
      userID: inviteCode,
    });

    const response = await fetch(API_ENDPOINTS.USER_FAVORITE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'listFolders',  // ✅ 修正：与 N8N 保持一致
        userID: inviteCode,
      }),
    });

    console.log('📥 getFolderList 响应状态:', response.status, response.statusText);
    console.log('📥 响应头 Content-Type:', response.headers.get('content-type'));

    // 检查响应是否为空
    const text = await response.text();
    console.log('📥 响应原始文本:', text.substring(0, 500)); // 只打印前500字符

    if (!text || text.trim() === '') {
      console.warn('⚠️ N8N 返回空响应（可能是新用户没有数据），返回空列表');
      return {
        success: true,  // ✅ 改为 true，让前端认为是正常的"没有收藏夹"
        message: 'N8N 返回空响应，可能是新用户',
        folders: [],
      };
    }

    // 尝试解析 JSON
    let data;
    try {
      data = JSON.parse(text);
      console.log('✅ JSON 解析成功:', data);
    } catch (parseError) {
      console.error('❌ JSON 解析失败:', parseError);
      console.error('❌ 响应文本不是有效的 JSON:', text);
      return {
        success: false,
        message: 'N8N 返回的不是有效的 JSON',
        folders: [],
      };
    }

    return {
      success: data.success,
      message: data.message,
      folders: data.folders || [],
    };
  } catch (error) {
    console.error('❌ getFolderList 请求失败:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : '网络错误',
      folders: [],
    };
  }
}

/**
 * 删除收藏夹（软删除）
 */
export async function deleteFolder(
  inviteCode: string,
  folderID: string
): Promise<APIResponse> {
  try {
    const response = await fetch(API_ENDPOINTS.USER_FAVORITE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'deleteFolder',
        userID: inviteCode,
        folderID,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('删除收藏夹失败:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : '网络错误',
    };
  }
}

// ========== 收藏项管理 API ==========

/**
 * 添加收藏
 */
export async function addToFavorite(params: {
  inviteCode: string;
  folderID: string;
  carID: number;
  carName: string;
  imageURL: string;
  category?: string;
  viewType?: string;
}): Promise<APIResponse> {
  try {
    console.log('📤 addToFavorite 请求参数:', {
      action: 'add',
      userID: params.inviteCode,
      folderID: params.folderID,
      carID: params.carID,
      carName: params.carName,
      imageURL: params.imageURL.substring(0, 50) + '...',
      category: params.category || '',
      viewType: params.viewType || '',
    });

    const response = await fetch(API_ENDPOINTS.USER_FAVORITE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'add',
        userID: params.inviteCode,
        folderID: params.folderID,
        carID: params.carID,
        carName: params.carName,
        imageURL: params.imageURL,
        category: params.category || '',
        viewType: params.viewType || '',
      }),
    });

    const data = await response.json();
    console.log('📥 addToFavorite N8N 返回:', JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error('添加收藏失败:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : '网络错误',
    };
  }
}

/**
 * 获取收藏列表
 * @param inviteCode 用户邀请码
 * @param folderID 可选，指定收藏夹ID（不传则返回所有）
 */
export async function getFavoriteList(
  inviteCode: string,
  folderID?: string
): Promise<{
  success: boolean;
  message?: string;
  favorites: FavoriteItem[];
}> {
  try {
    const requestBody: any = {
      action: 'list',
      userID: inviteCode,
    };

    if (folderID) {
      requestBody.folderID = folderID;
    }

    const response = await fetch(API_ENDPOINTS.USER_FAVORITE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    
    // 将 favoriteID 映射为 itemID，favoriteTime 映射为 addedAt
    const favorites = (data.favorites || []).map((item: any) => ({
      itemID: item.favoriteID,
      folderID: item.folderID,
      carID: item.carID,
      carName: item.carName,
      imageURL: item.imageURL,
      category: item.category || '',
      viewType: item.viewType || '',
      addedAt: item.favoriteTime,
    }));

    return {
      success: data.success,
      message: data.message,
      favorites,
    };
  } catch (error) {
    console.error('获取收藏列表失败:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : '网络错误',
      favorites: [],
    };
  }
}

/**
 * 删除收藏（软删除）
 */
export async function deleteFavorite(
  inviteCode: string,
  itemID: string
): Promise<APIResponse> {
  try {
    const response = await fetch(API_ENDPOINTS.USER_FAVORITE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'delete',
        userID: inviteCode,
        favoriteID: itemID,  // N8N 端用的是 favoriteID
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('删除收藏失败:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : '网络错误',
    };
  }
}

