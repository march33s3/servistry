import React, { useState, useEffect } from 'react';
import axios from '../../config/api';

const CategorySelection = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/category');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    onCategorySelect(category);
  };

  if (loading) {
    return <div className="loading-container"><div className="loading"></div></div>;
  }

  return (
    <div className="category-selection">
      <h2>What type of registry are you creating?</h2>
      <p>Choose the category that best fits your situation.</p>
      
      <div className="category-grid">
        {categories.map(category => (
          <div 
            key={category._id}
            className={`category-card ${selectedCategory?._id === category._id ? 'selected' : ''}`}
            onClick={() => handleCategorySelect(category)}
          >
            <div className="category-icon">{category.icon}</div>
            <h3>{category.name}</h3>
            <p>{category.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySelection;