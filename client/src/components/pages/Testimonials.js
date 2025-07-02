import React from 'react';

const testimonials = [
  { quote: 'Servistry made collecting funds for our honeymoon simple!', author: 'Jane & John' },
  { quote: 'Our friends loved how easy the registry was to use.', author: 'Alex' },
];

const Testimonials = () => (
  <div className="testimonials">
    {testimonials.map((t, idx) => (
      <div key={idx} className="testimonial">
        <p>"{t.quote}"</p>
        <p className="author">- {t.author}</p>
      </div>
    ))}
  </div>
);

export default Testimonials;
