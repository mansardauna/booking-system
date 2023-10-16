import React, { ReactNode } from 'react';

interface ButtonProps {
  variant: 'primary' | 'secondary';
  onClick: () => void;
  className?: string;
  children:ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant, onClick, children, className }) => {
  const buttonClasses = variant === 'primary'
    ? 'bg-primeColor text-white border border-gray-500 hover:bg-gray-800'
    : 'bg-white text-black border border-gray-500 hover:bg-gray-100';

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${buttonClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
