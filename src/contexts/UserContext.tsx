import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextType {
  inviteCode: string;
  setInviteCode: (code: string) => void;
  userName: string;
  setUserName: (name: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [inviteCode, setInviteCode] = useState<string>('');
  const [userName, setUserName] = useState<string>('Young');

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