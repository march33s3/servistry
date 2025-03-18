export default (state, action) => {
  switch (action.type) {
    case 'GET_SERVICES':
      return {
        ...state,
        services: action.payload,
        loading: false
      };
    case 'GET_SERVICE':
      return {
        ...state,
        service: action.payload,
        loading: false
      };
    case 'CREATE_SERVICE':
      return {
        ...state,
        services: [action.payload, ...state.services],
        loading: false
      };
    case 'UPDATE_SERVICE':
      return {
        ...state,
        services: state.services.map(service =>
          service._id === action.payload._id ? action.payload : service
        ),
        service: action.payload,
        loading: false
      };
    case 'DELETE_SERVICE':
      return {
        ...state,
        services: state.services.filter(service => service._id !== action.payload),
        loading: false
      };
    case 'SERVICE_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case 'CLEAR_ERRORS':
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};