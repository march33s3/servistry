const servicesData = (state = {}, action) => {
    switch (action.type) {
        case "getServices":
            return {
                servicesData: action.payload
            };
        default:
            return state;
    }
};

export default servicesData;
