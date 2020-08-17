import { SET_ALERT, REMOVE_ALERT, CLEAR_ALERTS } from './types';
import { v4 as uuidv4 } from 'uuid';

export const setAlert = (msg, type, timeout = 5000) => dispatch => {
  let id = uuidv4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, type, id }
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};

export const clearAlerts = () => dispatch => dispatch({ type: CLEAR_ALERTS });
