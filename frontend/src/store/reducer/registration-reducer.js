// reducers/registration-reducer.js
const initialState = {
    registration: [],
    loading: false,
    error: null,
  };
  
  export const registrationReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_REGISTRATION_SUCCESS':
        return { ...state, registration: [...state.registration, action.payload], loading: false };
      case 'ADD_REGISTRATION_FAIL':
        return { ...state, error: action.payload, loading: false };
      default:
        return state;
    }
  };