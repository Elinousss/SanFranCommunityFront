import React from 'react';

const Input = ({ label, id, icon, ...props }) => (
  <div className="form-group">
    {label && <label htmlFor={id}>{label}</label>}
    <div className="input-wrapper">
      {icon && <i className={`fas fa-${icon}`}></i>}
      <input id={id} {...props} />
    </div>
  </div>
);

export default Input;
