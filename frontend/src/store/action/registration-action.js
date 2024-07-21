// actions/registrationAction.js
import axios from 'axios';
export const addRegistration = (registrationData) => async (dispatch) => {
  try {
    const response = await axios.post('/api/registration/add', registrationData);
    dispatch({ type: 'ADD_USER_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'ADD_USER_FAIL', payload: error.response.data.message });
  }
};