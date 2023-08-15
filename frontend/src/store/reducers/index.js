// reducers/index.js
import { combineReducers } from 'redux';
import cartReducer from './cartReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
});

export default rootReducer;
