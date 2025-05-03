// TestCards.js - Add this as a separate component
import React, { useState } from 'react';

const TestCards = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  const testCards = [
    { number: '4242 4242 4242 4242', description: 'Successful payment' },
    { number: '4000 0000 0000 0002', description: 'Generic decline' },
    { number: '4000 0000 0000 9995', description: 'Insufficient funds decline' },
    { number: '4000 0000 0000 3220', description: 'Processing error' },
    { number: '4000 0000 0000 3063', description: '3D Secure authentication' },
  ];
  
  const copyCardNumber = (cardNumber) => {
    navigator.clipboard.writeText(cardNumber)
      .then(() => {
        // Show a small copied indicator
        const cardElement = document.getElementById(`card-${cardNumber.replace(/\s/g, '')}`);
        if (cardElement) {
          cardElement.classList.add('copied');
          setTimeout(() => {
            cardElement.classList.remove('copied');
          }, 1000);
        }
      });
  };
  
  // Only show in development
  if (process.env.NODE_ENV !== 'development') return null;
  
  return (
    <div className="test-cards-section">
      <button 
        onClick={() => setIsVisible(!isVisible)} 
        className="test-cards-toggle"
      >
        {isVisible ? 'Hide Test Cards' : 'Show Test Cards'}
      </button>
      
      {isVisible && (
        <div className="test-cards-container">
          <p className="test-cards-info">For testing, use any of these cards, any future expiry date, and any 3 digits for CVC:</p>
          <ul className="test-cards-list">
            {testCards.map((card) => (
              <li 
                key={card.number}
                id={`card-${card.number.replace(/\s/g, '')}`}
                onClick={() => copyCardNumber(card.number)}
                className="test-card-item"
              >
                <span className="test-card-number">{card.number}</span>
                <span className="test-card-description">{card.description}</span>
                <span className="copy-indicator">Click to copy</span>
              </li>
            ))}
          </ul>
          <p className="test-cards-note">All card info is processed securely via Stripe</p>
        </div>
      )}
    </div>
  );
};

export default TestCards;