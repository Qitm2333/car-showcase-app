import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UserContextType {
  inviteCode: string;
  setInviteCode: (code: string) => void;
  userName: string;
  setUserName: (name: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const USER_DEBUG_KEY = 'debug_user_info'; // 🆕 与 WebhookDebugger 同步

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 🆕 从 localStorage 初始化用户信息（用于调试）
  const [inviteCode, setInviteCode] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(USER_DEBUG_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.inviteCode || '';
      }
    } catch (error) {
      console.error('加载用户信息失败:', error);
    }
    return '';
  });

  const [userName, setUserName] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(USER_DEBUG_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.userName || 'Young';
      }
    } catch (error) {
      console.error('加载用户信息失败:', error);
    }
    return 'Young';
  });

  // 🆕 监听 inviteCode 和 userName 变化，自动保存到 localStorage
  useEffect(() => {
    if (inviteCode) {
      const userInfo = {
        inviteCode,
        userName,
      };
      localStorage.setItem(USER_DEBUG_KEY, JSON.stringify(userInfo));
      console.log('💾 用户信息已保存到 localStorage:', userInfo);
    } else {
      // 如果 inviteCode 为空，清除 localStorage
      localStorage.removeItem(USER_DEBUG_KEY);
      console.log('🗑️ 用户信息已从 localStorage 清除');
    }
  }, [inviteCode, userName]);

  return (
    <UserContext.Provider value={{ inviteCode, setInviteCode, userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};