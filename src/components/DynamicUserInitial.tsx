import React from 'react';
import { useUser } from '@/contexts/UserContext';

interface DynamicUserInitialProps {
  className?: string;
  style?: React.CSSProperties;
}

const DynamicUserInitial: React.FC<DynamicUserInitialProps> = ({ className = '', style = {} }) => {
  const { userName } = useUser();
  
  // 获取用户名的第一个字母，默认为 'Y'
  const initial = userName ? userName.charAt(0).toUpperCase() : 'Y';
  
  return (
    <p className={`leading-[normal] ${className}`} style={style}>
      {initial}
    </p>
  );
};

export default DynamicUserInitial;

