import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * 🎯 缩放提示管理器
 * 
 * 功能：首次登录进入主界面时自动触发缩放提示弹窗（当前会话只触发一次）
 */
interface ScaleHintManagerProps {
  /** LanguageSelector 的 ref，用于调用 openScaleDialog */
  onTriggerHint: () => void;
}

export default function ScaleHintManager({ onTriggerHint }: ScaleHintManagerProps) {
  const location = useLocation();
  const hasTriggeredInSession = useRef(false); // 🔒 标记当前会话是否已触发过

  useEffect(() => {
    // 如果当前会话已经触发过，直接跳过
    if (hasTriggeredInSession.current) {
      return;
    }

    // 只在非登录页面执行
    if (location.pathname === '/login' || location.pathname === '/') {
      return;
    }

    // 检查是否已显示过提示（跨会话持久化）
    const hasShown = localStorage.getItem('scale-hint-shown');
    
    if (!hasShown) {
      console.log('🎯 首次登录，准备弹出缩放提示...');
      hasTriggeredInSession.current = true; // 🔒 标记为已触发
      
      // 延迟 800ms 弹出，让用户先看到界面
      const timer = setTimeout(() => {
        console.log('🎯 触发缩放提示弹窗');
        onTriggerHint();
      }, 800);

      return () => clearTimeout(timer);
    } else {
      console.log('✅ 用户已看过缩放提示，跳过');
    }
  }, [location.pathname, onTriggerHint]);

  return null; // 这个组件不渲染任何内容
}

