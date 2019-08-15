import { ADD_MESSAGE, CHANGE_STAGE } from '../types';

const initialState = {
  progressMessages:{},
  stage: ""
};

export default (state = initialState, {type,payload}) => {
  switch (type) {
      // case CHANGE_STAGE:
      //     return {
      //         ...state,
      //         stage: payload
      //     };
      case ADD_MESSAGE:
          const launcher = payload.launcher;
          const message = payload.message;
          return {
              ...state
          };
      default:
          return initialState;
  }
  return state;
};
