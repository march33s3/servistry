import React, { createContext, useReducer } from 'react';
import axios from '../../config/api';
import serviceReducer from './serviceReducer';

export const ServiceContext = createContext();

export const ServiceProvider = ({ children }) => {
  const initialState = {
    services: [],
    service: null,
    loading: true,
    error: null
  };

  const [state, dispatch] = useReducer(serviceReducer, initialState);

  // Get services for a registry
  const getRegistryServices = async (registryId) => {
    try {
      const res = await axios.get(`/api/service/registry/${registryId}`);

      dispatch({
        type: 'GET_SERVICES',
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: 'SERVICE_ERROR',
        payload: err.response.data.msg
      });
    }
  };

  

  // Get service by ID
  const getService = async (id) => {
    try {
      const res = await axios.get(`/api/service/${id}`);

      dispatch({
        type: 'GET_SERVICE',
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: 'SERVICE_ERROR',
        payload: err.response.data.msg
      });
    }
  };

  // Get service by ID (public access for contributions)
  const getPublicService = async (id) => {
    try {
      const res = await axios.get(`/api/service/public/${id}`);

      dispatch({
        type: 'GET_SERVICE',
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: 'SERVICE_ERROR',
        payload: err.response?.data?.msg || 'Error retrieving service'
      });
    }
  };

  // Create service
  const createService = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/service', formData, config);

      dispatch({
        type: 'CREATE_SERVICE',
        payload: res.data
      });

      return res.data;
    } catch (err) {
      dispatch({
        type: 'SERVICE_ERROR',
        payload: err.response.data.msg
      });
      return null;
    }
  };

  // Update service
  const updateService = async (id, formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(`/api/service/${id}`, formData, config);

      dispatch({
        type: 'UPDATE_SERVICE',
        payload: res.data
      });

      return res.data;
    } catch (err) {
      dispatch({
        type: 'SERVICE_ERROR',
        payload: err.response.data.msg
      });
      return null;
    }
  };

  // Delete service
  const deleteService = async (id) => {
    try {
      await axios.delete(`/api/service/${id}`);

      dispatch({
        type: 'DELETE_SERVICE',
        payload: id
      });
    } catch (err) {
      dispatch({
        type: 'SERVICE_ERROR',
        payload: err.response.data.msg
      });
    }
  };

  // Create payment intent
  const createPaymentIntent = async (serviceId, amount, email) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/payment/create-payment-intent', { serviceId, amount, email }, config);
      return res.data;
    } catch (err) {
      dispatch({
        type: 'SERVICE_ERROR',
        payload: err.response.data.msg
      });
      return null;
    }
  };

  // Clear errors
  const clearErrors = () => dispatch({ type: 'CLEAR_ERRORS' });

  return (
    <ServiceContext.Provider
      value={{
        services: state.services,
        service: state.service,
        loading: state.loading,
        error: state.error,
        getRegistryServices,
        getService,
        getPublicService,
        createService,
        updateService,
        deleteService,
        createPaymentIntent,
        clearErrors
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};