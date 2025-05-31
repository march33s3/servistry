import React, { createContext, useReducer } from 'react';
import axios from '../../config/api';
import registryReducer from './registryReducer';

export const RegistryContext = createContext();

export const RegistryProvider = ({ children }) => {
  const initialState = {
    registries: [],
    registry: null,
    publicRegistry: null,
    loading: true,
    error: null
  };

  const [state, dispatch] = useReducer(registryReducer, initialState);

  // Get user's registries
  const getUserRegistries = async () => {
    try {
      const res = await axios.get('/api/registry/user');

      dispatch({
        type: 'GET_REGISTRIES',
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: 'REGISTRY_ERROR',
        payload: err.response.data.msg
      });
    }
  };

  // Get registry by ID
  const getRegistry = async (id) => {
    try {
      const res = await axios.get(`/api/registry/${id}`);

      dispatch({
        type: 'GET_REGISTRY',
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: 'REGISTRY_ERROR',
        payload: err.response.data.msg
      });
    }
  };

  // Get public registry by slug
  const getPublicRegistry = async (slug) => {
    try {
      const res = await axios.get(`/api/registry/public/${slug}`);

      dispatch({
        type: 'GET_PUBLIC_REGISTRY',
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: 'REGISTRY_ERROR',
        payload: err.response.data.msg
      });
    }
  };

  // Create registry
  const createRegistry = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/registry', formData, config);

      dispatch({
        type: 'CREATE_REGISTRY',
        payload: res.data
      });

      return res.data;
    } catch (err) {
      dispatch({
        type: 'REGISTRY_ERROR',
        payload: err.response.data.msg
      });
      return null;
    }
  };

  // Update registry
  const updateRegistry = async (id, formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(`/api/registry/${id}`, formData, config);

      dispatch({
        type: 'UPDATE_REGISTRY',
        payload: res.data
      });

      return res.data;
    } catch (err) {
      dispatch({
        type: 'REGISTRY_ERROR',
        payload: err.response.data.msg
      });
      return null;
    }
  };

  // Delete registry
  const deleteRegistry = async (id) => {
    try {
      await axios.delete(`/api/registry/${id}`);

      dispatch({
        type: 'DELETE_REGISTRY',
        payload: id
      });
    } catch (err) {
      dispatch({
        type: 'REGISTRY_ERROR',
        payload: err.response.data.msg
      });
    }
  };

  // Clear errors
  const clearErrors = () => dispatch({ type: 'CLEAR_ERRORS' });

  return (
    <RegistryContext.Provider
      value={{
        registries: state.registries,
        registry: state.registry,
        publicRegistry: state.publicRegistry,
        loading: state.loading,
        error: state.error,
        getUserRegistries,
        getRegistry,
        getPublicRegistry,
        createRegistry,
        updateRegistry,
        deleteRegistry,
        clearErrors
      }}
    >
      {children}
    </RegistryContext.Provider>
  );
};