import React, { useState } from 'react';
import { colors } from '../../styles/theme';

const AccordionItem = ({ title, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${colors.lightGray}` }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          textAlign: 'left',
          padding: '0.75rem',
          background: 'none',
          border: 'none',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        {title}
      </button>
      {open && <div style={{ padding: '0.75rem' }}>{children}</div>}
    </div>
  );
};

const Accordion = ({ items = [] }) => (
  <div style={{ border: `1px solid ${colors.lightGray}`, borderRadius: 4 }}>
    {items.map((item, i) => (
      <AccordionItem key={i} title={item.title}>{item.content}</AccordionItem>
    ))}
  </div>
);

export default Accordion;

