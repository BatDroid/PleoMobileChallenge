import {combineReducers} from 'redux';
import {expenseReducer} from './expenses';

export default combineReducers({
  expenses: expenseReducer,
});
