import React from "react";

const Button = ({ children, className, ...props }) => {
  return (
    <button className={`px-4 py-2 rounded-lg bg-blue-500 text-white ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button; // ✅ Ensure this is a default export