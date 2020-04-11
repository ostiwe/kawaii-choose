import {combineReducers, createStore} from "redux";
import {appReducer} from "./reducer";

const reducer = combineReducers({appReducer});
export default createStore(reducer);