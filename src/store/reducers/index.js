import { combineReducers } from 'redux';
import driveCheckReducer from './DriveCheckReducer';
import appReducer from './appReducer';

export default combineReducers({
  driveCheckReducer : driveCheckReducer,
  appReducer : appReducer
});
