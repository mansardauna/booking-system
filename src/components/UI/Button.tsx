import React, { ReactNode } from 'react';

interface ButtonProps {
  variant: 'primary' | 'secondary';
  onClick: () => void;
  className?: string;
  children:ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant, onClick, children, className }) => {
  const buttonClasses = variant === 'primary'
    ? 'bg-primary border border-gray-500 hover:bg-gray-800'
    : 'bg-transparent  border border-transparent hover:border-gray-600 hover:border ';

  return (
    <button
      onClick={onClick}
      className={`p-2 ${buttonClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
