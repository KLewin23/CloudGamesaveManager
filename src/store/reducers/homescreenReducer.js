import { CHANGE_RATE } from '../types';

const initialState = {
  33: 1.4,
  34: 1.5,
  35: 1.6,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_RATE:
      state = {
        ...state,
        rate: action.payload,
      };
      break;
    default:
      return initialState;
  }
  return state;
};
