const loginData = (state = {}, action) => {
    switch (action.type) {
        case "getLoginData":
            return {
                loginData: action.payload
            };
        case "logoutAction":
            return {
                loginData: undefined
            };
        default:
            return state;
    }
};

export default loginData;
