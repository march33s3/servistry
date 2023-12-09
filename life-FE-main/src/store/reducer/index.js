import {combineReducers} from "redux";
import userDetail from "./user-detail-reducer";
import servicesData from "./services-reducer";
import loginData from "./login-reducer";
import token from "./token-reducer";
import selectedRegistry from "./selected-registry-reducer";
import addRegistryData from "./add-regsitry-reducer";

export default combineReducers({
    userDetail,
    servicesData,
    loginData,
    token,
    selectedRegistry,
    addRegistryData
})
