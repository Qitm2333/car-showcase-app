/**
 * AI分析Context - 管理对话状态
 * 维护：currentDialogueID, currentTitle, conversationHistory
 * 基于Demo实现：N8ND4/NEW02/ai-chat-demo.html
 */

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { useUser } from './UserContext';
import * as aiService from '../services/aiAnalysisService';

// ========== 类型定义 ==========

interface AIAnalysisContextValue {
  // 核心状态（前端维护）
  currentDialogueID: string | null;
  currentTitle: string;
  conversationHistory: string;
  messages: aiService.AIMessage[];
  currentTags: string[];  // ⭐ 新增：当前对话的标签（收藏夹名称数组）
  
  // 对话列表
  dialogues: aiService.AIDialogue[];
  isLoadingDialogues: boolean;
  
  // 加载对话详情状态
  isLoadingDetail: boolean;
  
  // 发送状态
  isSending: boolean;
  
  // 报告生成错误提示
  showReportError: boolean;
  setShowReportError: (show: boolean) => void;
  
  // 操作函数
  loadDialogueList: () => Promise<void>;
  selectDialogue: (dialogueID: string) => Promise<void>;
  startNewDialogue: () => void;
  sendMessage: (content: string, tags: string[]) => Promise<void>;  // ⭐ 修改：添加 tags 参数
  generateReport: () => Promise<string | null>;  // 返回HTML内容
  setCurrentTags: (tags: string[]) => void;  // ⭐ 新增：允许外部更新 tags
}

const AIAnalysisContext = createContext<AIAnalysisContextValue | undefined>(undefined);

// ========== Provider ==========

export function AIAnalysisProvider({ children }: { children: React.ReactNode }) {
  const { inviteCode } = useUser();
  
  // ⭐ 核心状态（前端维护）
  const [currentDialogueID, setCurrentDialogueID] = useState<string | null>(null);
  const [currentTitle, setCurrentTitle] = useState<string>('');
  const [conversationHistory, setConversationHistory] = useState<string>('');
  const [messages, setMessages] = useState<aiService.AIMessage[]>([]);
  const [currentTags, setCurrentTags] = useState<string[]>([]);  // ⭐ 新增：当前对话的标签
  
  // 对话列表
  const [dialogues, setDialogues] = useState<aiService.AIDialogue[]>([]);
  const [isLoadingDialogues, setIsLoadingDialogues] = useState(false);
  
  // 加载对话详情状态
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  
  // 发送状态
  const [isSending, setIsSending] = useState(false);
  
  // 报告生成错误提示
  const [showReportError, setShowReportError] = useState(false);
  
  // 防止重复初始化
  const isInitializedRef = useRef(false);

  // ========== 解析conversationHistory为messages数组 ==========
  const parseConversationHistory = useCallback((history: string): aiService.AIMessage[] => {
    if (!history) return [];
    
    const pairs = history.split('----').filter(s => s.trim());
    const parsedMessages: aiService.AIMessage[] = [];
    
    for (const pair of pairs) {
      if (pair.startsWith('userSpeak:')) {
        parsedMessages.push({
          role: 'user',
          content: pair.replace('userSpeak:', ''),
          timestamp: new Date().toISOString()
        });
      } else if (pair.startsWith('AISpeak:')) {
        parsedMessages.push({
          role: 'assistant',
          content: pair.replace('AISpeak:', ''),
          timestamp: new Date().toISOString()
        });
      }
    }
    
    return parsedMessages;
  }, []);

  // ========== 加载对话列表 ==========
  const loadDialogueList = useCallback(async () => {
    if (!inviteCode || inviteCode === 'testCode') {
      console.log('⏭️ [AI分析] 跳过加载对话列表：未登录');
      return;
    }
    
    setIsLoadingDialogues(true);
    
    try {
      const result = await aiService.getDialogueList(inviteCode);
      setDialogues(result.dialogues || []);
      console.log('✅ [AI分析] 对话列表加载成功:', result.dialogues.length);
    } catch (error) {
      console.error('❌ [AI分析] 加载对话列表失败:', error);
      setDialogues([]);
    } finally {
      setIsLoadingDialogues(false);
    }
  }, [inviteCode]);

  // ========== 选择对话 ==========
  const selectDialogue = useCallback(async (dialogueID: string) => {
    if (!inviteCode) {
      console.error('❌ [AI分析] 未登录，无法选择对话');
      return;
    }
    
    // ⭐ 乐观更新：立即更新 currentDialogueID，让 UI 立即显示选中状态
    const previousDialogueID = currentDialogueID;
    setCurrentDialogueID(dialogueID);
    
    try {
      console.log('🔄 [AI分析] 加载对话:', dialogueID);
      setIsLoadingDetail(true);
      
      const result = await aiService.getDialogueDetail(inviteCode, dialogueID);
      
      // ⭐ 调试：查看 N8N 返回的原始数据
      console.log('🔍🔍🔍 [N8N返回数据] 完整 result:', result);
      console.log('  result.tags 原始值:', result.tags);
      console.log('  result.tags 类型:', typeof result.tags);
      console.log('  result.tags 长度:', result.tags?.length);
      
      // ⭐ 更新其他状态
      console.log('✅ [标题更新] selectDialogue 设置标题为:', result.title || '未命名对话');
      setCurrentTitle(result.title || '未命名对话');
      setConversationHistory(result.conversationHistory || '');
      setMessages(result.messages || []);
      
      // ⭐ 新增：解析并设置 tags
      const tagsArray = result.tags 
        ? result.tags.split(',').filter(t => t.trim()).map(t => t.trim())
        : [];
      setCurrentTags(tagsArray);
      console.log('🏷️ [Tags] 从对话详情中恢复标签:', tagsArray);
      console.log('  解析前的 tags 字符串:', result.tags);
      
      console.log('✅ [AI分析] 对话加载成功:', {
        title: result.title,
        messagesCount: result.messages.length,
        tagsCount: tagsArray.length
      });
    } catch (error) {
      console.error('❌ [AI分析] 加载对话失败:', error);
      // 回滚到之前的对话ID
      setCurrentDialogueID(previousDialogueID);
    } finally {
      setIsLoadingDetail(false);
    }
  }, [inviteCode, currentDialogueID]);

  // ========== 开始新对话 ==========
  const startNewDialogue = useCallback(() => {
    console.log('🆕 [AI分析] 开始新对话');
    console.log('🗑️ [标题清空] startNewDialogue 清空标题');
    console.trace('👀 [调用栈] startNewDialogue 调用位置');
    
    setCurrentDialogueID(null);
    setCurrentTitle('');
    setConversationHistory('');
    setMessages([]);
    setCurrentTags([]);  // ⭐ 清空标签
    console.log('🏷️ [Tags] 清空所有标签');
  }, []);

  // ========== 发送消息 ==========
  const sendMessageHandler = useCallback(async (content: string, tags: string[]) => {
    if (!inviteCode) {
      alert('❌ 请先登录');
      return;
    }
    
    if (!content.trim()) {
      alert('❌ 消息内容不能为空');
      return;
    }
    
    if (isSending) {
      console.log('⏭️ [AI分析] 正在发送中，跳过');
      return;
    }
    
    console.log('🏷️ [Tags] 发送消息时的标签:', tags);
    
    setIsSending(true);
    
    // ⭐ 乐观更新：立即显示用户消息
    const userMessage: aiService.AIMessage = {
      role: 'user',
      content: content,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    try {
      const result = await aiService.sendMessage(
        inviteCode,
        currentDialogueID,
        currentTitle,
        conversationHistory,
        content,
        tags  // ⭐ 传递 tags 到 API
      );
      
      // ⭐ 更新核心状态
      setConversationHistory(result.conversationHistory);
      
      // ⭐ 更新标题（第一轮或标题变化时）
      console.log('📋 [标题检查] N8N返回的title:', {
        返回的title: result.title,
        当前title: currentTitle,
        是否更新: !!(result.title && result.title !== '未命名对话')
      });
      
      if (result.title && result.title !== '未命名对话') {
        console.log('✅ [标题更新] 从', currentTitle, '更新为', result.title);
        setCurrentTitle(result.title);
      } else {
        console.log('⏭️ [标题保持] 不更新标题，保持当前值:', currentTitle);
      }
      
      // ⭐ 如果是新对话，更新dialogueID
      if (!currentDialogueID) {
        setCurrentDialogueID(result.dialogueID);
        
        // 乐观更新对话列表
        const newDialogue: aiService.AIDialogue = {
          dialogueID: result.dialogueID,
          title: result.title,
          tags: result.extractedTags || [],
          createTime: new Date().toISOString(),
          preview: content.substring(0, 50) + (content.length > 50 ? '...' : ''),
          status: 'active'
        };
        
        setDialogues(prev => [newDialogue, ...prev]);
      }
      
      // ⭐ 添加AI回复消息
      const aiMessage: aiService.AIMessage = {
        role: 'assistant',
        content: result.aiReply,
        timestamp: new Date().toISOString(),
        messageType: result.messageType  // ⭐ 保存消息类型
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      console.log('✅ [AI分析] 消息发送成功');
    } catch (error) {
      console.error('❌ [AI分析] 发送消息失败:', error);
      
      // ⭐ 回滚乐观更新
      setMessages(prev => prev.filter(msg => msg !== userMessage));
      
      alert('❌ 发送失败，请重试');
    } finally {
      setIsSending(false);
    }
  }, [inviteCode, currentDialogueID, currentTitle, conversationHistory, isSending]);

  // ========== 生成报告 ==========
  const generateReportHandler = useCallback(async (): Promise<string | null> => {
    if (!inviteCode) {
      alert('❌ 请先登录');
      return null;
    }
    
    if (!currentDialogueID) {
      alert('❌ 请先开始一个对话\n\n提示：在输入框发送消息后，即可生成报告');
      return null;
    }
    
    if (!conversationHistory || conversationHistory.trim().length === 0) {
      alert('⚠️ 对话内容为空\n\n请先与AI进行几轮对话，讨论您想对比的车型');
      return null;
    }
    
    try {
      console.log('📊 [AI分析] 开始生成报告:', currentDialogueID);
      console.log('📋 [标题状态] 生成报告前的标题:', currentTitle);
      
      const result = await aiService.generateReport(inviteCode, currentDialogueID);
      
      console.log('✅ [AI分析] 报告生成成功:', result.reportID);
      console.log('📋 [标题状态] 生成报告后的标题:', currentTitle);
      
      return result.htmlContent;
    } catch (error) {
      console.error('❌ [AI分析] 生成报告失败:', error);
      setShowReportError(true);
      return null;
    }
  }, [inviteCode, currentDialogueID, conversationHistory, currentTitle]);

  // ========== 初始化：加载对话列表 ==========
  useEffect(() => {
    if (!inviteCode || isInitializedRef.current) return;
    
    isInitializedRef.current = true;
    loadDialogueList();
  }, [inviteCode, loadDialogueList]);

  // ========== Context Value ==========
  const value: AIAnalysisContextValue = {
    currentDialogueID,
    currentTitle,
    conversationHistory,
    messages,
    currentTags,  // ⭐ 导出当前标签
    dialogues,
    isLoadingDialogues,
    isLoadingDetail,
    isSending,
    showReportError,
    setShowReportError,
    loadDialogueList,
    selectDialogue,
    startNewDialogue,
    sendMessage: sendMessageHandler,
    generateReport: generateReportHandler,
    setCurrentTags  // ⭐ 导出标签setter
  };

  return (
    <AIAnalysisContext.Provider value={value}>
      {children}
    </AIAnalysisContext.Provider>
  );
}

// ========== Hook ==========

export function useAIAnalysis() {
  const context = useContext(AIAnalysisContext);
  if (!context) {
    throw new Error('useAIAnalysis must be used within AIAnalysisProvider');
  }
  return context;
}

