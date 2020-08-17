import {
  SET_LOADING,
  GET_TRANSACTIONS,
  DELETE_TRANSACTION,
  ADD_TRANSACTION,
  TRANSACTION_ERROR,
  CLEAR_TRANSACTION,
  TRANSACTION_LOADING,
  TRANSACTION_LOADED,
  TRANSACTION_UPDATED
} from './types';
import axios from 'axios';
import { tokenConfig } from './authActions';

export const getTransactions = () => async (dispatch, getState) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await axios.get('/api/transactions', tokenConfig(getState));
    dispatch({ type: GET_TRANSACTIONS, payload: res.data });
  } catch (err) {
    dispatch({ type: TRANSACTION_ERROR, payload: err.response.data });
  }
};

// Get Transactions for a particular month
export const getMonthlyTransactions = ({ month, year }) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: TRANSACTION_LOADING, payload: 'Fetching Transactions..' });
    const res = await axios.get(
      `api/transactions/year/${year}/month/${month}`,
      tokenConfig(getState)
    );
    dispatch({ type: GET_TRANSACTIONS, payload: res.data });
    dispatch({ type: TRANSACTION_LOADED });
  } catch (err) {
    dispatch({ type: TRANSACTION_ERROR, payload: err.response.data });
    dispatch({ type: TRANSACTION_LOADED });
  }
};

//Add Transaction
export const addTransaction = ({ text, amount, classification }) => async (
  dispatch,
  getState
) => {
  dispatch({ type: TRANSACTION_LOADING, payload: 'Adding Transaction..' });
  const transaction = JSON.stringify({ text, amount, classification });
  try {
    const res = await axios.post(
      '/api/transactions',
      transaction,
      tokenConfig(getState)
    );

    dispatch({ type: ADD_TRANSACTION, payload: res.data });
    dispatch({ type: TRANSACTION_UPDATED, payload: 'transaction__added' });
    setTimeout(() => dispatch({ type: TRANSACTION_UPDATED, payload: '' }), 100);
    dispatch({ type: TRANSACTION_LOADED });
  } catch (err) {
    dispatch({ type: TRANSACTION_ERROR, payload: err.response.data.msg });
    dispatch({ type: TRANSACTION_LOADED });
  }
};

// Delete transaction

export const deleteTransaction = id => async (dispatch, getState) => {
  try {
    dispatch({ type: TRANSACTION_LOADING, payload: 'Deleting Transaction..' });
    await axios.delete(`/api/transactions/${id}`, tokenConfig(getState));
    dispatch({ type: DELETE_TRANSACTION, payload: id });
    dispatch({ type: TRANSACTION_UPDATED, payload: 'transaction__deleted' });
    setTimeout(() => dispatch({ type: TRANSACTION_UPDATED, payload: '' }), 100);
    dispatch({ type: TRANSACTION_LOADED });
  } catch (err) {
    dispatch({ type: TRANSACTION_ERROR, payload: err.response.data.msg });
    dispatch({ type: TRANSACTION_LOADED });
  }
};

// Clear all transactions from state
export const clearTransactions = () => dispatch => {
  dispatch({ type: CLEAR_TRANSACTION });
};
