import {combineReducers, createStore} from "redux";
import {appReducer} from "./reducer";

const reducer = combineReducers({appReducer});
export default createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());