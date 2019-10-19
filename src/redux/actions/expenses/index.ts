import {Dispatch} from 'redux';
import {
  ExpenseType,
  SET_CURRENT_EXPENSE,
  SET_COMMENT_REQUEST,
  SET_COMMENT_SUCCESS,
  SET_COMMENT_ERROR,
} from './types';
import api from '../../../config/api';
import {getUpdateExpenseUrl} from '../../../config/api/routes';

export function setCurrentExpense(expense: ExpenseType, dispatch: Dispatch) {
  dispatch({
    type: SET_CURRENT_EXPENSE,
    currentExpense: expense,
  });
}

export function setCommentExpense(expenseId: string, comment: string) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: SET_COMMENT_REQUEST,
    });
    api
      .post(getUpdateExpenseUrl(expenseId), {comment})
      .then(response => {
        if (response && response.status === 200)
          dispatch({
            type: SET_COMMENT_SUCCESS,
            currentExpense: response.data,
          });
        else
          dispatch({
            type: SET_COMMENT_ERROR,
            errorStatus: response.status,
          });
      })
      .catch(() => {
        dispatch({
          type: SET_COMMENT_ERROR,
          errorStatus: 500,
        });
      });
  };
}
