import {
  ExpenseActions,
  ExpenseType,
  SET_CURRENT_EXPENSE,
  SET_COMMENT_SUCCESS,
  SET_COMMENT_REQUEST,
  SET_COMMENT_ERROR,
} from '../actions/expenses/types';

export function expenseReducer(
  state: {currentExpense: ExpenseType | null} = {currentExpense: null},
  action: ExpenseActions,
) {
  switch (action.type) {
    case SET_CURRENT_EXPENSE:
    case SET_COMMENT_SUCCESS:
      return {
        ...state,
        currentExpense: action.currentExpense,
        isLoading: false,
      };
    case SET_COMMENT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case SET_COMMENT_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}

export interface ExpenseStoreType {
  expenses: {
    currentExpense: ExpenseType | null;
    isLoading: boolean;
  };
}
