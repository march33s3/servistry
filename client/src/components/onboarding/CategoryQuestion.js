import React, { useState } from 'react';

const CategoryQuestion = ({ category, onCategoryResponse }) => {
  const [selectedResponse, setSelectedResponse] = useState('');
  const [otherText, setOtherText] = useState('');

  const handleResponseSelect = (response) => {
    setSelectedResponse(response);
    if (response !== 'other') {
      onCategoryResponse(response, '');
    }
  };

  const handleOtherSubmit = () => {
    onCategoryResponse('other', otherText);
  };

  return (
    <div className="category-question">
      <h2>{category.categorySpecificQuestion}</h2>
      <p>This helps us suggest the most relevant services for you.</p>
      
      <div className="response-options">
        {category.questionOptions.map(option => (
          <label key={option.value} className="response-option">
            <input
              type="radio"
              name="categoryResponse"
              value={option.value}
              checked={selectedResponse === option.value}
              onChange={() => handleResponseSelect(option.value)}
            />
            <span className="response-text">{option.text}</span>
          </label>
        ))}
        <label className="response-option">
          <input
            type="radio"
            name="categoryResponse"
            value="other"
            checked={selectedResponse === 'other'}
            onChange={() => handleResponseSelect('other')}
          />
          <span className="response-text">Other</span>
        </label>
      </div>

      {selectedResponse === 'other' && (
        <div className="other-response">
          <textarea
            value={otherText}
            onChange={(e) => setOtherText(e.target.value)}
            placeholder="Please describe your biggest priority..."
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

export default CategoryQuestion;