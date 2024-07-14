const addRegistryData = (state = {}, action) => {
    switch (action.type) {
        case "addRegistry":
            return {
                addRegistryData: action.payload
            };
        case "logoutAction":
            return {
                addRegistryData: undefined
            };
        default:
            return state;
    }
};

export default addRegistryData;
