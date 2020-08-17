import { CHANGE_MONTH } from './types';

export const nextMonth = activeMonth => dispatch => {
  const year = activeMonth.getFullYear();
  const month = activeMonth.getMonth() + 1;
  dispatch({
    type: CHANGE_MONTH,
    payload: { year, month }
  });
};

export const prevMonth = activeMonth => dispatch => {
  const year = activeMonth.getFullYear();
  const month = activeMonth.getMonth() - 1;
  dispatch({
    type: CHANGE_MONTH,
    payload: { year, month }
  });
};

export const resetMonth = loginTime => dispatch => {
  const year = loginTime.getFullYear();
  const month = loginTime.getMonth();
  dispatch({
    type: CHANGE_MONTH,
    payload: { year, month }
  });
};
