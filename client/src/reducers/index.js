import { combineReducers } from 'redux';
import authReducer from './authReducer';
import alertReducer from './alertReducer';
import transactionReducer from './transactionReducer';

import loadingReducer from './loadingReducer';
import { LOGOUT } from '../actions/types';
import activePeriodReducer from './activePeriodReducer';

// export default combineReducers({
//   auth: authReducer,
//   alert: alertReducer,
//   transaction: transactionReducer,
//   activeMonth: activeMonthReducer
// });

const appReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  transaction: transactionReducer,
  activePeriod: activePeriodReducer,

  loading: loadingReducer
});

const rootReducer = (state, action) => {
  // Clear all data in redux store to initial.
  if (action.type === LOGOUT) {
    localStorage.removeItem('token');
    state = undefined;
  }
  return appReducer(state, action);
};
export default rootReducer;
