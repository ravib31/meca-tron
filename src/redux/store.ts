import { legacy_createStore, combineReducers } from "redux";
import CartReducer from "./cart/cart-reducer";
import authReducer from "./auth/auth-reducer";

const rootReducer = combineReducers({ cart: CartReducer, auth: authReducer });

export const store = legacy_createStore(rootReducer);
