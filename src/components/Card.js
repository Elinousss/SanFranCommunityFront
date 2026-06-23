import React from 'react';

const Card = ({ className = '', children }) => (
  <div className={`card ${className}`.trim()}>{children}</div>
);

export default Card;
