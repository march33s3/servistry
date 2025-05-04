// client/src/utils/registryUtils.js

import axios from 'axios';

/**
 * Get registry data by service ID using multiple fallback approaches
 * @param {string} serviceId - The service ID to get registry data for
 * @returns {Promise<Object|null>} - The registry data or null if not found
 */
export const getRegistryByServiceId = async (serviceId) => {
  try {
    console.log('Fetching detailed service data for:', serviceId);
    
    // Try to get the combined service and registry data from our new endpoint
    try {
      const detailsResponse = await axios.get(`/api/service/details/${serviceId}`);
      if (detailsResponse.data && detailsResponse.data.registry) {
        console.log('Found registry via details endpoint:', detailsResponse.data.registry);
        return detailsResponse.data.registry;
      }
    } catch (detailsErr) {
      console.log('Details endpoint failed, trying fallback approaches');
    }
    
    // First get the service to find its registry ID
    const serviceResponse = await axios.get(`/api/service/public/${serviceId}`);
    
    if (!serviceResponse.data || !serviceResponse.data.registry) {
      throw new Error('Service not found or has no registry reference');
    }
    
    const registryId = serviceResponse.data.registry;
    console.log('Found registry ID from service:', registryId);
    
    // Try different approaches to get the registry data
    
    // 1. Try the public registry endpoint with slug (if we have it)
    try {
      // If the registry ID looks like a slug (contains non-MongoDB ID characters)
      if (typeof registryId === 'string' && /[^a-f0-9]/i.test(registryId)) {
        const publicResponse = await axios.get(`/api/registry/public/${registryId}`);
        if (publicResponse.data && publicResponse.data.registry) {
          console.log('Found registry via public endpoint with slug:', publicResponse.data.registry);
          return publicResponse.data.registry;
        }
      }
    } catch (publicErr) {
      console.log('Public registry endpoint failed');
    }
    
    // 2. Try direct registry access (might work if the user owns it)
    try {
      const directResponse = await axios.get(`/api/registry/${registryId}`);
      console.log('Found registry via direct access:', directResponse.data);
      return directResponse.data;
    } catch (directErr) {
      console.log('Direct registry access failed');
    }
    
    // 3. Try searching user registries
    try {
      const userRegistriesResponse = await axios.get('/api/registry/user');
      if (userRegistriesResponse.data && userRegistriesResponse.data.length > 0) {
        const matchingRegistry = userRegistriesResponse.data.find(r => r._id === registryId);
        if (matchingRegistry) {
          console.log('Found registry in user registries:', matchingRegistry);
          return matchingRegistry;
        }
      }
    } catch (userErr) {
      console.log('User registries search failed');
    }
    
    // If we've exhausted all options and still no registry data
    console.error('Could not find registry data through any method');
    return null;
  } catch (err) {
    console.error('Error in getRegistryByServiceId:', err);
    throw err;
  }
};

/**
 * Safe navigation back to the registry page
 * @param {Object} navigate - React Router's navigate function
 * @param {Object|null} registryData - The registry data or null
 */
export const navigateToRegistry = (navigate, registryData) => {
  if (registryData && registryData.urlSlug) {
    navigate(`/registry/${registryData.urlSlug}`);
  } else {
    navigate('/');
  }
};