import React from 'react';

const Button = ({ type = 'button', children, className = '', ...props }) => (
  <button type={type} className={`btn ${className}`.trim()} {...props}>
    {children}
  </button>
);

export default Button;
