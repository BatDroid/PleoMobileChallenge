import {Dispatch} from 'redux';
import {
  ExpenseType,
  SET_CURRENT_EXPENSE,
  UPDATE_EXPENSE_REQUEST,
  UPDATE_EXPENSE_SUCCESS,
  UPDATE_EXPENSE_ERROR,
} from './types';
import api from '../../../config/api';
import {getUpdateExpenseUrl, getUploadReceiptUrl} from '../../../config/api/routes';

export function setCurrentExpense(expense: ExpenseType, dispatch: Dispatch) {
  dispatch({
    type: SET_CURRENT_EXPENSE,
    currentExpense: expense,
  });
}

export function setCommentExpense(expenseId: string, comment: string) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: UPDATE_EXPENSE_REQUEST,
    });
    api
      .post(getUpdateExpenseUrl(expenseId), {comment})
      .then(response => {
        if (response && response.status === 200)
          dispatch({
            type: UPDATE_EXPENSE_SUCCESS,
            currentExpense: response.data,
          });
        else
          dispatch({
            type: UPDATE_EXPENSE_ERROR,
            errorStatus: response.status,
          });
      })
      .catch(() => {
        dispatch({
          type: UPDATE_EXPENSE_ERROR,
          errorStatus: 500,
        });
      });
  };
}

export function uploadReceipt(expenseId: string, receiptPath: string) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: UPDATE_EXPENSE_REQUEST,
    });
    let formData = new FormData();
    formData.append('receipt', {
      uri: receiptPath,
      type: 'image/jpeg',
      name: 'receipt',
    });
    api
      .post(getUploadReceiptUrl(expenseId), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        if (response && response.status === 200)
          dispatch({
            type: UPDATE_EXPENSE_SUCCESS,
            currentExpense: response.data,
          });
        else
          dispatch({
            type: UPDATE_EXPENSE_ERROR,
            errorStatus: response.status,
          });
      })
      .catch((e) => {
        dispatch({
          type: UPDATE_EXPENSE_ERROR,
          errorStatus: 500,
        });
      });
  };
}
