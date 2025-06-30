import React from 'react';

const categories = [
  { icon: 'fas fa-plane', title: 'Travel' },
  { icon: 'fas fa-home', title: 'Home' },
  { icon: 'fas fa-heart', title: 'Charity' },
  { icon: 'fas fa-child', title: 'Childcare' },
];

const CategoryGrid = () => (
  <div className="category-grid">
    {categories.map((cat) => (
      <div key={cat.title} className="category-card">
        <i className={cat.icon}></i>
        <h4>{cat.title}</h4>
      </div>
    ))}
  </div>
);

export default CategoryGrid;
