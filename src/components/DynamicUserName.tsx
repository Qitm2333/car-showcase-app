import React from 'react';
import { useUser } from '@/contexts/UserContext';

interface DynamicUserNameProps {
  className?: string;
  style?: React.CSSProperties;
}

const DynamicUserName: React.FC<DynamicUserNameProps> = ({ className = '', style = {} }) => {
  const { userName } = useUser();
  
  return (
    <p className={`leading-[normal] whitespace-pre ${className}`} style={style}>
      {userName}
    </p>
  );
};

export default DynamicUserName;