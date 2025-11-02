import React, { createContext, useContext, useState, useCallback } from 'react';

interface DebugContextValue {
  showDebugger: boolean;
  handleLogoClick: () => void;
}

const DebugContext = createContext<DebugContextValue | undefined>(undefined);

export function DebugProvider({ children }: { children: React.ReactNode }) {
  const [showDebugger, setShowDebugger] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [clickTimer, setClickTimer] = useState<NodeJS.Timeout | null>(null);

  const handleLogoClick = useCallback(() => {
    // 清除之前的定时器
    if (clickTimer) {
      clearTimeout(clickTimer);
    }

    const newCount = clickCount + 1;
    setClickCount(newCount);

    console.log(`🔧 Quality logo 点击次数: ${newCount}/3`);

    // 如果点击3次，显示调试工具
    if (newCount >= 3) {
      setShowDebugger(true);
      setClickCount(0);
      console.log('✅ 调试工具已激活！');
      return;
    }

    // 设置2秒后重置计数
    const timer = setTimeout(() => {
      setClickCount(0);
      console.log('⏱️ 点击计数已重置');
    }, 2000);

    setClickTimer(timer);
  }, [clickCount, clickTimer]);

  return (
    <DebugContext.Provider value={{ showDebugger, handleLogoClick }}>
      {children}
    </DebugContext.Provider>
  );
}

export function useDebug() {
  const context = useContext(DebugContext);
  if (!context) {
    throw new Error('useDebug must be used within DebugProvider');
  }
  return context;
}

