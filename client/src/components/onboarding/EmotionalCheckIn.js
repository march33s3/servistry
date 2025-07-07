import React, { useState } from 'react';

const EmotionalCheckIn = ({ onEmotionalResponse }) => {
  const [selectedEmotion, setSelectedEmotion] = useState('');
  const [otherText, setOtherText] = useState('');

  const emotionalOptions = [
    { value: 'overwhelmed-stressed', text: 'Overwhelmed and stressed' },
    { value: 'hopeful-anxious', text: 'Hopeful but anxious' },
    { value: 'exhausted-drained', text: 'Exhausted and drained' },
    { value: 'excited-nervous', text: 'Excited but nervous' },
    { value: 'worried-future', text: 'Worried about the future' },
    { value: 'grateful-support', text: 'Grateful for support' },
    { value: 'taking-one-day', text: 'Taking it one day at a time' },
    { value: 'other', text: 'Other' }
  ];

  const handleEmotionSelect = (emotion) => {
    setSelectedEmotion(emotion);
    if (emotion !== 'other') {
      onEmotionalResponse(emotion, '');
    }
  };

  const handleOtherSubmit = () => {
    onEmotionalResponse('other', otherText);
  };

  return (
    <div className="emotional-checkin">
      <h2>How are you feeling about this situation right now?</h2>
      <p>This helps us understand how to best support you.</p>
      
      <div className="emotion-options">
        {emotionalOptions.map(option => (
          <label key={option.value} className="emotion-option">
            <input
              type="radio"
              name="emotion"
              value={option.value}
              checked={selectedEmotion === option.value}
              onChange={() => handleEmotionSelect(option.value)}
            />
            <span className="emotion-text">{option.text}</span>
          </label>
        ))}
      </div>

      {selectedEmotion === 'other' && (
        <div className="other-emotion">
          <textarea
            value={otherText}
            onChange={(e) => setOtherText(e.target.value)}
            placeholder="Please describe how you're feeling..."
            rows="3"
          />
          <button 
            onClick={handleOtherSubmit}
            disabled={!otherText.trim()}
            className="btn btn-primary"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
};

export default EmotionalCheckIn;