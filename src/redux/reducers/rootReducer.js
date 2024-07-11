import { combineReducers } from 'redux';
import { blockReducer } from './blockReducer';
import { productReducer } from './productReducer';
import { financeReducer } from './financeReducer'; // Import the finance reducer
const rootReducer = combineReducers({
  product: productReducer,
  block: blockReducer,
  finance: financeReducer, // Add the finance reducer here
});

export default rootReducer;
