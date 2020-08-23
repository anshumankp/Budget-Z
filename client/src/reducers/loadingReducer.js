import {
  TRANSACTION_LOADING,
  TRANSACTION_LOADED,
  USER_LOADING,
  USER_LOADED
} from '../actions/types';

const initialState = {
  transactionsLoading: false,
  userLoading: false,
  msg: 'Please wait...'
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TRANSACTION_LOADING:
      return {
        ...state,
        transactionsLoading: true,
        msg: action.payload
      };
    case TRANSACTION_LOADED:
      return {
        ...state,
        transactionsLoading: false,
        msg: ''
      };
    case USER_LOADING:
      return {
        ...state,
        userLoading: true,
        msg: action.payload
      };
    case USER_LOADED:
      return {
        ...state,
        userLoading: false,
        msg: ''
      };

    default:
      return state;
  }
};
