import { Navigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * 🔒 路由守卫组件
 * 保护需要登录才能访问的路由
 * 如果用户未登录（没有 inviteCode），则重定向到登录页
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { inviteCode } = useUser();

  // 🔐 检查用户是否已登录（是否有 inviteCode）
  if (!inviteCode) {
    console.warn('🚫 未登录，重定向到登录页');
    return <Navigate to="/login" replace />;
  }

  // ✅ 已登录，允许访问
  return <>{children}</>;
};

