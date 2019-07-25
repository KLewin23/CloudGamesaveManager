import { combineReducers } from 'redux';
import homescreen from './homescreenReducer';
import appReducer from './appReducer';

export default combineReducers({
  homescreen,
  appReducer
});
