const selectedRegistry = (state = {}, action) => {
    switch (action.type) {
        case "selectedRegistryAction":
            return {
                selectedRegistry: action.payload
            };
        case "logoutAction":
            return {
                loginData: undefined
            };
        default:
            return state;
    }
};

export default selectedRegistry;
