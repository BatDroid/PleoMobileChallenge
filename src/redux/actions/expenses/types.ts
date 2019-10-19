export const SET_CURRENT_EXPENSE = 'SET_CURRENT_EXPENSE';
export const SET_COMMENT_REQUEST = 'SET_COMMENT_REQUEST';
export const SET_COMMENT_SUCCESS = 'SET_COMMENT_SUCCESS';
export const SET_COMMENT_ERROR = 'SET_COMMENT_ERROR';

interface Amount {
  value: string;
  currency: string;
}

interface User {
  first: string;
  last: string;
  email: string;
}

export interface ExpenseType {
  id: string;
  date: string;
  merchant: string;
  comment: string;
  category: string;
  receipts: [string];
  user: User;
  amount: Amount;
  index: number;
}

export interface ExpensePayloadType {
  currentExpense: ExpenseType;
}

export interface ExpenseActions extends ExpensePayloadType {
  type:
    | typeof SET_CURRENT_EXPENSE
    | typeof SET_COMMENT_SUCCESS
    | typeof SET_COMMENT_REQUEST
    | typeof SET_COMMENT_ERROR;
}
