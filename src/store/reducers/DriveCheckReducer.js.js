import { ADD_MESSAGE } from '../types';

const initialState = {
  progressMessages:{}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      
    default:
      return initialState;
  }
  return state;
};
