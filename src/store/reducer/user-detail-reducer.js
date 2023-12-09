export default (state = {}, action) => {
    switch (action.type) {
        case "setUserDetail":
            return {
                userDetail: action.payload
            };
        case "logoutAction":
            return {
                loginData: undefined
            };
        default:
            return {...state};
    }
};
