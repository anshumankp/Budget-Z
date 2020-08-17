import {
  GET_TRANSACTIONS,
  DELETE_TRANSACTION,
  ADD_TRANSACTION,
  TRANSACTION_ERROR,
  CLEAR_TRANSACTION,
  TRANSACTION_UPDATED
} from '../actions/types';

const initialState = {
  transactions: [],
  error: null,
  loading: true,
  transactionsUpdate: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    // case SET_LOADING:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    case GET_TRANSACTIONS:
      return {
        ...state,
        loading: false,
        transactions: action.payload
      };
    case DELETE_TRANSACTION:
      return {
        ...state,
        loading: false,
        transactions: state.transactions.filter(
          transaction => transaction._id !== action.payload
        )
      };
    case ADD_TRANSACTION:
      return {
        ...state,
        loading: false,
        transactions: [action.payload, ...state.transactions]
      };
    case TRANSACTION_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case TRANSACTION_UPDATED:
      return {
        ...state,
        transactionsUpdate: action.payload
      };

    case CLEAR_TRANSACTION:
      return {
        ...state,
        transactions: []
      };
    default:
      return state;
  }
};
