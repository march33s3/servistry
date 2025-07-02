import React from 'react';
import { colors } from '../../styles/theme';

const Card = ({ style, children, ...rest }) => {
  const baseStyle = {
    backgroundColor: '#fff',
    borderRadius: 5,
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    padding: '1.5rem'
  };
  return (
    <div style={{ ...baseStyle, ...style }} {...rest}>
      {children}
    </div>
  );
};

export default Card;

