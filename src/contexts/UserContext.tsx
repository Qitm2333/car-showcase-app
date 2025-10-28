import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextType {
  inviteCode: string;
  setInviteCode: (code: string) => void;
  userName: string;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [inviteCode, setInviteCode] = useState<string>('');
  
  // 用户名默认为邀请码，如果没有邀请码则显示'Young'
  const userName = inviteCode || 'Young';

  return (
    <UserContext.Provider value={{ inviteCode, setInviteCode, userName }}>
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