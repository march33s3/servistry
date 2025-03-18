export default (state, action) => {
  switch (action.type) {
    case 'GET_REGISTRIES':
      return {
        ...state,
        registries: action.payload,
        loading: false
      };
    case 'GET_REGISTRY':
      return {
        ...state,
        registry: action.payload,
        loading: false
      };
    case 'GET_PUBLIC_REGISTRY':
      return {
        ...state,
        publicRegistry: action.payload,
        loading: false
      };
    case 'CREATE_REGISTRY':
      return {
        ...state,
        registries: [action.payload, ...state.registries],
        loading: false
      };
    case 'UPDATE_REGISTRY':
      return {
        ...state,
        registries: state.registries.map(registry =>
          registry._id === action.payload._id ? action.payload : registry
        ),
        registry: action.payload,
        loading: false
      };
    case 'DELETE_REGISTRY':
      return {
        ...state,
        registries: state.registries.filter(registry => registry._id !== action.payload),
        loading: false
      };
    case 'REGISTRY_ERROR':
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