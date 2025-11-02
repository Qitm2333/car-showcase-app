import { API_CONFIG } from '@/config/api';

// ==================== 接口定义 ====================

// 收藏夹接口
export interface FavoriteFolder {
  folderID: string;
  folderName: string;
  folderIcon: string;
  createTime: string;
}

// 收藏项接口
export interface FavoriteItem {
  favoriteID: string;
  folderID?: string;  // 可选：所属文件夹ID
  carID: string;
  carName: string;
  imageURL: string;
  favoriteTime: string;
}

// ==================== 收藏夹管理 ====================

// 创建收藏夹
export async function createFolder(data: {
  userID: string;
  folderName: string;
  folderIcon?: string;
}): Promise<{ success: boolean; message?: string; data?: any }> {
  try {
    console.log('发送创建收藏夹请求:', {
      url: API_CONFIG.USER_FAVORITE_API,
      data: { action: 'createFolder', ...data }
    });

    const response = await fetch(API_CONFIG.USER_FAVORITE_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'createFolder',
        ...data,
      }),
    });

    console.log('创建收藏夹响应状态:', response.status, response.statusText);

    if (!response.ok) {
      console.error('HTTP 错误:', response.status, response.statusText);
      return { 
        success: false, 
        message: `HTTP ${response.status}: ${response.statusText}` 
      };
    }

    const result = await response.json();
    console.log('创建收藏夹响应数据:', result);
    
    return result;
  } catch (error) {
    console.error('创建收藏夹异常:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : '创建失败' 
    };
  }
}

// 获取收藏夹列表
export async function getFolderList(userID: string): Promise<{
  success: boolean;
  folders: FavoriteFolder[];
  total: number;
}> {
  try {
    const response = await fetch(API_CONFIG.USER_FAVORITE_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'listFolders',
        userID,
      }),
    });

    if (!response.ok) {
      console.error('请求失败:', response.status, response.statusText);
      return { success: false, folders: [], total: 0 };
    }

    const result = await response.json();
    console.log('收藏夹列表 API 返回:', result);
    
    // 确保返回格式正确
    return {
      success: result.success !== false,
      folders: Array.isArray(result.folders) ? result.folders : [],
      total: result.total || 0,
    };
  } catch (error) {
    console.error('获取收藏夹列表失败:', error);
    return { success: false, folders: [], total: 0 };
  }
}

// 删除收藏夹
export async function deleteFolder(
  userID: string,
  folderID: string
): Promise<{ success: boolean; message?: string }> {
  try {
    const response = await fetch(API_CONFIG.USER_FAVORITE_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'deleteFolder',
        userID,
        folderID,
      }),
    });

    if (!response.ok) {
      throw new Error('网络错误');
    }

    return await response.json();
  } catch (error) {
    console.error('删除收藏夹失败:', error);
    return { success: false, message: '删除失败' };
  }
}

// ==================== 收藏管理 ====================

// 添加到收藏（支持指定文件夹）
export async function addToFavorite(data: {
  userID: string;
  carID: string;
  carName: string;
  imageURL: string;
  folderID?: string; // 可选：指定收藏到哪个文件夹
}): Promise<{ success: boolean; message?: string; data?: any }> {
  try {
    const response = await fetch(API_CONFIG.USER_FAVORITE_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'add',
        userID: data.userID,
        carID: data.carID,
        carName: data.carName,
        imageURL: data.imageURL,
        folderID: data.folderID, // 传递 folderID
      })
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('添加收藏失败:', error);
    return { success: false, message: '网络错误' };
  }
}

// 获取收藏列表（支持按文件夹筛选）
export async function getFavoriteList(
  userID: string,
  folderID?: string
): Promise<{ success: boolean; favorites: FavoriteItem[]; total: number }> {
  try {
    const response = await fetch(API_CONFIG.USER_FAVORITE_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'list',
        userID: userID,
        folderID: folderID, // 可选：只获取特定文件夹的收藏
      })
    });
    
    if (!response.ok) {
      console.error('请求失败:', response.status, response.statusText);
      return { success: false, favorites: [], total: 0 };
    }
    
    const result = await response.json();
    console.log('收藏列表 API 返回:', result);
    
    // 确保返回格式正确
    return {
      success: result.success !== false,
      favorites: Array.isArray(result.favorites) ? result.favorites : [],
      total: result.total || 0
    };
  } catch (error) {
    console.error('获取收藏列表失败:', error);
    return { success: false, favorites: [], total: 0 };
  }
}

// 取消收藏
export async function deleteFavorite(userID: string, favoriteID: string): Promise<{ success: boolean; message?: string }> {
  try {
    const response = await fetch(API_CONFIG.USER_FAVORITE_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'delete',
        userID: userID,
        favoriteID: favoriteID
      })
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('取消收藏失败:', error);
    return { success: false, message: '网络错误' };
  }
}
