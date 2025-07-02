import React from 'react';
import { colors } from '../../styles/theme';

const SidebarNav = ({ items = [], style }) => {
  const containerStyle = {
    width: 200,
    padding: '1rem',
    backgroundColor: colors.light,
    borderRight: `1px solid ${colors.lightGray}`,
    ...style
  };
  const linkStyle = {
    display: 'block',
    padding: '0.5rem 0',
    color: colors.dark
  };
  return (
    <nav style={containerStyle}>
      {items.map((item, i) => (
        <a key={i} href={item.href} style={linkStyle}>
          {item.label}
        </a>
      ))}
    </nav>
  );
};

export default SidebarNav;

