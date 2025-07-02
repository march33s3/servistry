import React from 'react';
import { colors } from '../../styles/theme';

const StepIndicator = ({ steps = [], current = 0 }) => {
  const containerStyle = {
    display: 'flex',
    gap: '8px',
    marginBottom: '1rem'
  };
  const stepStyle = (active) => ({
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: active ? colors.primary : colors.lightGray
  });
  return (
    <div style={containerStyle}>
      {steps.map((s, idx) => (
        <div key={idx} style={stepStyle(idx <= current)} title={s} />
      ))}
    </div>
  );
};

export default StepIndicator;

