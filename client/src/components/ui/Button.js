import React from 'react';
import { colors } from '../../styles/theme';

const variants = {
  primary: {
    backgroundColor: colors.accent,
    color: '#fff'
  },
  secondary: {
    backgroundColor: colors.secondary,
    color: '#fff'
  },
  light: {
    backgroundColor: colors.light,
    color: colors.dark,
    border: `1px solid ${colors.lightGray}`
  },
  danger: {
    backgroundColor: colors.danger,
    color: '#fff'
  }
};

const Button = ({ variant = 'primary', style, children, ...rest }) => {
  const variantStyle = variants[variant] || variants.primary;
  return (
    <button style={{ padding: '0.6rem 1.3rem', borderRadius: 4, border: 'none', cursor: 'pointer', ...variantStyle, ...style }} {...rest}>
      {children}
    </button>
  );
};

export default Button;

