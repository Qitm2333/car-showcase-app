/**
 * AI分析服务 - 连接N8N的DeepSeek AI
 * 基于Demo实现：N8ND4/NEW02/ai-chat-demo.html
 */

import { API_ENDPOINTS } from '@/config/api';

// ========== 接口定义 ==========

export interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  messageType?: 'text' | 'proposal' | 'confirmation';  // ⭐ 可选：AI消息类型
}

export interface AIDialogue {
  dialogueID: string;
  title: string;
  tags: string[];  // 标签数组
  createTime: string;
  preview: string;  // 最后一条AI回复的预览
  status: 'active' | 'archived';
}

export interface SendMessageRequest {
  action: 'sendMessage';
  userID: string;
  dialogueID: string | null;  // 新对话时为null
  title: string;  // 前端维护的标题
  conversationHistory: string;  // 前端维护的对话历史
  content: string;  // 用户输入
  tags: string[];  // ⭐ 新增：用户附加的收藏夹标签（收藏夹名称数组）
}

export interface SendMessageResponse {
  success: boolean;
  dialogueID: string;
  messageID: string;
  aiReply: string;
  messageType: 'text' | 'proposal' | 'confirmation';  // ⭐ 新增：消息类型
  title: string;  // AI生成的标题（第一轮）或维护的标题
  extractedTags: string[];
  conversationHistory: string;  // 更新后的对话历史
}

export interface GetDialogueListRequest {
  action: 'getDialogueList';
  userID: string;
}

export interface GetDialogueListResponse {
  success: boolean;
  dialogues: AIDialogue[];
  total: number;
}

export interface GetDialogueDetailRequest {
  action: 'getDialogueDetail';
  userID: string;
  dialogueID: string;
}

export interface GetDialogueDetailResponse {
  success: boolean;
  dialogueID: string;
  title: string;
  conversationHistory: string;
  tags: string;  // ⭐ 新增：逗号分隔的标签字符串（如 "越野车,SUV,外观"）
  messages: AIMessage[];
  totalMessages: number;
}

export interface GenerateReportRequest {
  action: 'generateReport';
  userID: string;
  dialogueID: string;
}

export interface GenerateReportResponse {
  success: boolean;
  reportID: string;
  htmlContent: string;
  createTime: string;
  imageStats?: {
    total: number;
    matched: number;
    filterCategory: string;
    filterViewType: string;
  };
}

// ========== API配置 ==========

const AI_ANALYSIS_ENDPOINT_KEY = 'n8n_ai_analysis_endpoint';

// 获取AI分析端点
function getAIAnalysisEndpoint(): string {
  const savedEndpoint = localStorage.getItem(AI_ANALYSIS_ENDPOINT_KEY);
  if (savedEndpoint) {
    return savedEndpoint;
  }
  // 使用统一的API配置（已包含代理）
  return API_ENDPOINTS.AI_ANALYSIS;
}

// 保存AI分析端点
export function saveAIAnalysisEndpoint(endpoint: string): void {
  localStorage.setItem(AI_ANALYSIS_ENDPOINT_KEY, endpoint);
  console.log('✅ AI分析端点已保存:', endpoint);
}

// ========== API调用函数 ==========

/**
 * 发送消息并获取AI回复
 */
export async function sendMessage(
  userID: string,
  dialogueID: string | null,
  title: string,
  conversationHistory: string,
  content: string,
  tags: string[]  // ⭐ 新增：用户附加的标签（收藏夹名称数组）
): Promise<SendMessageResponse> {
  const endpoint = getAIAnalysisEndpoint();
  
  const payload: SendMessageRequest = {
    action: 'sendMessage',
    userID,
    dialogueID,
    title,
    conversationHistory,
    content,
    tags  // ⭐ 传递 tags 到 N8N
  };

  console.log('📤 [AI分析] 发送消息:', {
    dialogueID,
    title,
    contentLength: content.length,
    historyLength: conversationHistory.length
  });

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ [AI分析] 错误响应内容:', errorText);
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result: SendMessageResponse = await response.json();
    
    console.log('📥 [AI分析] 收到回复:', {
      success: result.success,
      dialogueID: result.dialogueID,
      title: result.title,
      messageType: result.messageType,
      aiReplyLength: result.aiReply?.length,
      tags: result.extractedTags
    });

    if (!result.success) {
      throw new Error('AI分析服务返回失败');
    }

    return result;
  } catch (error) {
    console.error('❌ [AI分析] 发送消息失败:', error);
    throw error;
  }
}

/**
 * 获取用户的对话列表
 */
export async function getDialogueList(userID: string): Promise<GetDialogueListResponse> {
  const endpoint = getAIAnalysisEndpoint();
  
  const payload: GetDialogueListRequest = {
    action: 'getDialogueList',
    userID
  };

  console.log('📤 [AI分析] 获取对话列表:', { userID });

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result: GetDialogueListResponse = await response.json();
    
    console.log('📥 [AI分析] 对话列表:', {
      success: result.success,
      total: result.total,
      dialogues: result.dialogues?.length
    });

    if (!result.success) {
      throw new Error('获取对话列表失败');
    }

    return result;
  } catch (error) {
    console.error('❌ [AI分析] 获取对话列表失败:', error);
    throw error;
  }
}

/**
 * 获取对话详情
 */
export async function getDialogueDetail(
  userID: string,
  dialogueID: string
): Promise<GetDialogueDetailResponse> {
  const endpoint = getAIAnalysisEndpoint();
  
  const payload: GetDialogueDetailRequest = {
    action: 'getDialogueDetail',
    userID,
    dialogueID
  };

  console.log('📤 [AI分析] 获取对话详情:', { dialogueID });

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result: GetDialogueDetailResponse = await response.json();
    
    console.log('📥 [AI分析] 对话详情:', {
      success: result.success,
      title: result.title,
      messagesCount: result.messages?.length
    });

    if (!result.success) {
      throw new Error('获取对话详情失败');
    }

    return result;
  } catch (error) {
    console.error('❌ [AI分析] 获取对话详情失败:', error);
    throw error;
  }
}

/**
 * 生成对比矩阵HTML报告
 */
export async function generateReport(
  userID: string,
  dialogueID: string
): Promise<GenerateReportResponse> {
  const endpoint = getAIAnalysisEndpoint();
  
  const payload: GenerateReportRequest = {
    action: 'generateReport',
    userID,
    dialogueID
  };

  console.log('📤 [AI分析] 生成报告:', { dialogueID });

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result: GenerateReportResponse = await response.json();
    
    console.log('📥 [AI分析] 报告生成完成:', {
      success: result.success,
      reportID: result.reportID,
      htmlLength: result.htmlContent?.length
    });

    if (!result.success) {
      throw new Error('报告生成失败');
    }

    return result;
  } catch (error) {
    console.error('❌ [AI分析] 生成报告失败:', error);
    throw error;
  }
}

