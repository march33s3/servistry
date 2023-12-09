import {compose, legacy_createStore as createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import reducer from "./store/reducer";

const store = createStore(
    reducer,
    compose(
        composeWithDevTools()
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ),
);
export default store;
