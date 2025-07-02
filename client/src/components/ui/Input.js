import React from 'react';
import { colors, fonts } from '../../styles/theme';

const Input = ({ label, error, ...rest }) => {
  const baseStyle = {
    width: '100%',
    padding: '0.8rem',
    border: `1px solid ${colors.lightGray}`,
    borderRadius: 4,
    fontSize: '1rem',
    fontFamily: fonts.base
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      {label && <label style={{ display: 'block', marginBottom: '0.5rem' }}>{label}</label>}
      <input style={baseStyle} {...rest} />
      {error && <div style={{ color: colors.danger, marginTop: 4, fontSize: '0.85rem' }}>{error}</div>}
    </div>
  );
};

export default Input;

