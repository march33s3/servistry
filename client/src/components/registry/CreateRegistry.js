import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegistryContext } from '../../context/registry/RegistryState';
import { toast } from 'react-toastify';
import CategorySelection from '../onboarding/CategorySelection';
import EmotionalCheckIn from '../onboarding/EmotionalCheckIn';
import CategoryQuestion from '../onboarding/CategoryQuestion';

const CreateRegistry = () => {
  const { createRegistry, error, clearErrors } = useContext(RegistryContext);
  const navigate = useNavigate();

  const [step, setStep] = useState('category'); // 'category', 'emotion', 'categoryQuestion', 'details'
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [emotionalResponse, setEmotionalResponse] = useState('');
  const [emotionalResponseOther, setEmotionalResponseOther] = useState('');
  const [categoryResponse, setCategoryResponse] = useState('');
  const [categoryResponseOther, setCategoryResponseOther] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  const { title, description } = formData;

    const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setStep('emotion');
  };

  const handleEmotionalResponse = (emotion, otherText) => {
    setEmotionalResponse(emotion);
    setEmotionalResponseOther(otherText);
    setStep('categoryQuestion');
  };

  const handleCategoryResponse = (response, otherText) => {
    setCategoryResponse(response);
    setCategoryResponseOther(otherText);
    setStep('details');
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const registryData = {
      title,
      description,
      category: selectedCategory._id,
      emotionalResponse,
      categoryResponse,
      emotionalResponseOther,
      categoryResponseOther
    };
    
    const registry = await createRegistry(formData);
    
    if (registry) {
      toast.success('Registry created successfully');
      navigate(`/view-registry/${registry._id}`);
    } else {
      toast.error(error || 'Failed to create registry');
      clearErrors();
      setIsSubmitting(false); // Reset on error
    }
  };

  const renderStep = () => {
    switch (step) {
      case 'category':
        return <CategorySelection onCategorySelect={handleCategorySelect} />;
      
      case 'emotion':
        return <EmotionalCheckIn onEmotionalResponse={handleEmotionalResponse} />;
      
      case 'categoryQuestion':
        return (
          <CategoryQuestion 
            category={selectedCategory} 
            onCategoryResponse={handleCategoryResponse} 
          />
        );
      
      case 'details':
        return (
          <div className="registry-details">
            <h2>Tell us about your registry</h2>
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="title">Registry Title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={title}
                  onChange={onChange}
                  placeholder="e.g., Sarah's Baby Registry, Moving Fund for the Johnsons"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  id="description"
                  value={description}
                  onChange={onChange}
                  placeholder="Tell people what this registry is for and how services would help..."
                  required
                ></textarea>
              </div>
              <div className="form-actions">
                <button 
                  type="submit" 
                  className={`btn btn-primary ${isSubmitting ? 'btn-loading' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating Registry...' : 'Create Registry'}
                </button>
                <button 
                  type="button" 
                  className="btn btn-light" 
                  onClick={() => setStep('categoryQuestion')}
                  disabled={isSubmitting}
                >
                  Back
                </button>
              </div>
            </form>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="form-container create-registry-flow">
      <div className="progress-indicator">
        <div className={`step ${step === 'category' ? 'active' : step !== 'category' ? 'completed' : ''}`}>1</div>
        <div className={`step ${step === 'emotion' ? 'active' : step === 'categoryQuestion' || step === 'details' ? 'completed' : ''}`}>2</div>
        <div className={`step ${step === 'categoryQuestion' ? 'active' : step === 'details' ? 'completed' : ''}`}>3</div>
        <div className={`step ${step === 'details' ? 'active' : ''}`}>4</div>
      </div>
      
      {renderStep()}
      
      <div className="trust-indicator">
        Your responses help us provide better service suggestions
      </div>
    </div>
  );
};

export default CreateRegistry;