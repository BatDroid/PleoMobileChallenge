import {
  ExpenseActions,
  ExpenseType,
  SET_CURRENT_EXPENSE,
  UPDATE_EXPENSE_SUCCESS,
  UPDATE_EXPENSE_REQUEST,
  UPDATE_EXPENSE_ERROR,
} from '../actions/expenses/types';

export function expenseReducer(
  state: {currentExpense: ExpenseType | null} = {currentExpense: null},
  action: ExpenseActions,
) {
  switch (action.type) {
    case SET_CURRENT_EXPENSE:
    case UPDATE_EXPENSE_SUCCESS:
      return {
        ...state,
        currentExpense: action.currentExpense,
        isLoading: false,
      };
    case UPDATE_EXPENSE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case UPDATE_EXPENSE_ERROR:
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
