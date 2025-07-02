import React from 'react';
import { colors } from '../../styles/theme';

const ProgressBar = ({ value = 0 }) => {
  const percentage = Math.min(Math.max(value, 0), 100);
  const containerStyle = {
    width: '100%',
    height: 10,
    backgroundColor: colors.lightGray,
    borderRadius: 5,
    overflow: 'hidden'
  };
  const barStyle = {
    height: '100%',
    width: `${percentage}%`,
    backgroundColor: colors.primary,
    borderRadius: 5
  };
  return (
    <div style={containerStyle}>
      <div style={barStyle} />
    </div>
  );
};

export default ProgressBar;

