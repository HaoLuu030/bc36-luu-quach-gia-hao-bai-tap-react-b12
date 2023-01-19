import { combineReducers, createStore } from "redux";
import { userManagementReducer } from "./reducers/userManagementReducers";

const rootReducer = combineReducers({
  userManagementReducer,
});

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
