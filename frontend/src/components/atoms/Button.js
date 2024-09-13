import React from 'react';

export const Button = ({ children, onClick, variant }) => {
  const baseStyles = "py-2 px-4 rounded-full text-white mr-2 w-custom-button h-custom-button";
  const expandStyles = "bg-gray-900";
  const collapseStyles = "border border-gray-900 text-gray-900";
  const buttonStyles = variant === 'collapse' ? `${baseStyles} ${collapseStyles}` : `${baseStyles} ${expandStyles}`;

  return (
    <button 
      className={buttonStyles} 
      onClick={onClick}
    >
      {children}
    </button>
  );
};
