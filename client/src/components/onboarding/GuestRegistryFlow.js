// client/src/components/onboarding/GuestRegistryFlow.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../config/api'
import CategorySelection from './CategorySelection';
import EmotionalCheckIn from './EmotionalCheckIn';
import CategoryQuestion from './CategoryQuestion';
import RegistrationForm from './RegistrationForm';
import RegistryDetailsForm from './RegistryDetailsForm';

const GuestRegistryFlow = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('category');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Store all data as user progresses
  const [flowData, setFlowData] = useState({
    // Category data
    selectedCategory: null,
    
    // Emotional data
    emotionalResponse: '',
    emotionalResponseOther: '',
    
    // Category-specific data
    categoryResponse: '',
    categoryResponseOther: '',
    
    // User registration data
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    
    // Registry data
    title: '',
    description: ''
  });

  const handleCategorySelect = (category) => {
    setFlowData(prev => ({ ...prev, selectedCategory: category }));
    setStep('emotion');
  };

  const handleEmotionalResponse = (emotion, otherText) => {
    setFlowData(prev => ({ 
      ...prev, 
      emotionalResponse: emotion,
      emotionalResponseOther: otherText 
    }));
    setStep('categoryQuestion');
  };

  const handleCategoryResponse = (response, otherText) => {
    setFlowData(prev => ({ 
      ...prev, 
      categoryResponse: response,
      categoryResponseOther: otherText 
    }));
    setStep('registration');
  };

  const handleRegistration = (userData) => {
    setFlowData(prev => ({ ...prev, ...userData }));
    setStep('registryDetails');
  };

  const handleRegistryDetails = async (registryData) => {
    setIsSubmitting(true);
    
    try {
      // Combine all data and submit
      const completeData = {
        ...flowData,
        ...registryData
      };
      
      console.log('Submitting registration data:', completeData); // Debug log
      
      // Use axios instead of fetch
      const response = await axios.post('/api/auth/register-with-registry', completeData);
      
      console.log('Registration successful:', response.data); // Debug log
      
      // Store token and redirect
      localStorage.setItem('token', response.data.token);
      navigate(`/view-registry/${response.data.registry._id}`);
      
    } catch (error) {
      console.error('Registration error:', error);
      console.error('Error response:', error.response?.data); // More detailed error
      
      // Show user-friendly error message
      if (error.response?.data?.msg) {
        alert(`Registration failed: ${error.response.data.msg}`);
      } else if (error.response?.data?.errors) {
        alert(`Registration failed: ${error.response.data.errors.map(e => e.msg).join(', ')}`);
      } else {
        alert('Registration failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
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
            category={flowData.selectedCategory} 
            onCategoryResponse={handleCategoryResponse} 
          />
        );
      
      case 'registration':
        return <RegistrationForm onRegistration={handleRegistration} />;
      
      case 'registryDetails':
        return (
          <RegistryDetailsForm 
            category={flowData.selectedCategory}
            onSubmit={handleRegistryDetails}
            isSubmitting={isSubmitting}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="guest-registry-flow">
      <div className="progress-indicator">
        <div className={`step ${step === 'category' ? 'active' : ['emotion', 'categoryQuestion', 'registration', 'registryDetails'].includes(step) ? 'completed' : ''}`}>1</div>
        <div className={`step ${step === 'emotion' ? 'active' : ['categoryQuestion', 'registration', 'registryDetails'].includes(step) ? 'completed' : ''}`}>2</div>
        <div className={`step ${step === 'categoryQuestion' ? 'active' : ['registration', 'registryDetails'].includes(step) ? 'completed' : ''}`}>3</div>
        <div className={`step ${step === 'registration' ? 'active' : step === 'registryDetails' ? 'completed' : ''}`}>4</div>
        <div className={`step ${step === 'registryDetails' ? 'active' : ''}`}>5</div>
      </div>
      
      {renderStep()}
      
      <div className="trust-indicator">
        Your information is secure and your privacy is protected
      </div>
    </div>
  );
};

export default GuestRegistryFlow;