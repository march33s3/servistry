import React from 'react';
import { colors } from '../../styles/theme';
import Card from './Card';
import Button from './Button';

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const ServiceModal = ({ open, service, onClose }) => {
  if (!open) return null;
  return (
    <div style={overlayStyle} onClick={onClose}>
      <Card style={{ width: 400 }} onClick={e => e.stopPropagation()}>
        <h3>{service.title}</h3>
        <p>{service.description}</p>
        <a href={service.link} target="_blank" rel="noopener noreferrer">
          View Service
        </a>
        <Button style={{ marginTop: '1rem' }} onClick={onClose}>Close</Button>
      </Card>
    </div>
  );
};

export default ServiceModal;

