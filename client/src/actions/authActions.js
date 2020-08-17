import axios from 'axios';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_AUTHENTICATED,
  LOGOUT,
  CLEAR_ERRORS
} from './types';

// Check token & load user
export const loadUser = () => async (dispatch, getState) => {
  //User loading
  try {
    // dispatch({ type: USER_LOADING, payload: 'Checking Session...' });
    const res = await axios.get('/api/auth', tokenConfig(getState));
    dispatch({ type: USER_AUTHENTICATED, payload: res.data });
    // dispatch({ type: USER_LOADED });
  } catch (err) {
    dispatch({ type: AUTH_ERROR, payload: err.response.data.message });
    // dispatch({ type: USER_LOADED });
  }
};

// Register User
export const register = ({ name, email, password }) => async dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Request body
  const body = JSON.stringify({ name, email, password });
  dispatch({ type: USER_LOADING, payload: 'Completing Registration..' });
  try {
    const res = await axios.post('/api/users', body, config);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });

    dispatch({ type: USER_LOADED });
  } catch (err) {
    dispatch({ type: REGISTER_FAIL, payload: err.response.data.msg });
    setTimeout(() => dispatch({ type: CLEAR_ERRORS }), 100);
    dispatch({ type: USER_LOADED });
  }
};

// Login User
export const login = ({ email, password }) => async dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Request body
  const body = JSON.stringify({ email, password });
  dispatch({ type: USER_LOADING, payload: 'Signing In..' });
  try {
    const res = await axios.post('/api/auth', body, config);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });

    dispatch({ type: USER_LOADED });
  } catch (err) {
    dispatch({ type: LOGIN_FAIL, payload: err.response.data.msg });
    setTimeout(() => dispatch({ type: CLEAR_ERRORS }), 100);
    dispatch({ type: USER_LOADED });
  }
};

// Logout User
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};

// Clear Errors
export const clearErrors = () => dispatch => {
  setTimeout(() => dispatch({ type: CLEAR_ERRORS }), 5000);
};

// Setup config/headers and token
export const tokenConfig = getState => {
  // Get token from local storage
  const token = getState().auth.token;

  //Headers
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };

  // If token, add to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};
