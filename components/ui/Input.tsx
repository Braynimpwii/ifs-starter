import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => {
  return (
    <label className="flex flex-col gap-1 text-sm">
      {label && <span className="text-sm text-gray-700">{label}</span>}
      <input className={`border rounded-md px-3 py-2 ${className}`} {...props} />
    </label>
  );
};

export default Input;