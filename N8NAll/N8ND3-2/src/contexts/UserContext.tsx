import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  inviteCode: string;
  avatar: string;
  role: string;
}

interface UserContextType {
  user: User | null;
  login: (userId: string) => void;
  logout: () => void;
  inviteCode: string;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// 预设的5个用户
const USERS: Record<string, User> = {
  '1': {
    id: '1',
    name: '张设计师',
    inviteCode: 'USER001',
    avatar: '👨‍🎨',
    role: '设计总监'
  },
  '2': {
    id: '2',
    name: '李工程师',
    inviteCode: 'USER002',
    avatar: '👩‍💻',
    role: '产品经理'
  },
  '3': {
    id: '3',
    name: '王分析师',
    inviteCode: 'USER003',
    avatar: '👨‍💼',
    role: '市场分析'
  },
  '4': {
    id: '4',
    name: '赵研究员',
    inviteCode: 'USER004',
    avatar: '👩‍🔬',
    role: '技术研发'
  },
  '5': {
    id: '5',
    name: '刘测试员',
    inviteCode: 'DEMO2024',
    avatar: '👨‍🚀',
    role: '测试账户'
  }
};

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    // 从 localStorage 恢复登录状态
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userId: string) => {
    const selectedUser = USERS[userId];
    if (selectedUser) {
      setUser(selectedUser);
      localStorage.setItem('currentUser', JSON.stringify(selectedUser));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <UserContext.Provider 
      value={{ 
        user, 
        login, 
        logout, 
        inviteCode: user?.inviteCode || '' 
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

export { USERS };

