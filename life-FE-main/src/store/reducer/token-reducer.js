export default (state = {}, action) => {
    switch (action.type) {
        case "setTokenActions":
            return {
                token: action.payload
            };
        case "logoutAction":
            return {
                loginData: undefined
            };
        default:
            return state;
    }
};
