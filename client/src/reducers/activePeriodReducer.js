import { CHANGE_MONTH } from '../actions/types';

const initialState = {
  loginTime: new Date(),
  activePeriod: new Date()
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_MONTH:
      return {
        ...state,
        activePeriod: new Date(action.payload.year, action.payload.month)
      };
    default:
      return state;
  }
};
