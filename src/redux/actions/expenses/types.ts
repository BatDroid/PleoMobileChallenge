export const SET_CURRENT_EXPENSE = 'SET_CURRENT_EXPENSE';
export const UPDATE_EXPENSE_REQUEST = 'UPDATE_EXPENSE_REQUEST';
export const UPDATE_EXPENSE_SUCCESS = 'UPDATE_EXPENSE_SUCCESS';
export const UPDATE_EXPENSE_ERROR = 'UPDATE_EXPENSE_ERROR';

interface Amount {
  value: string;
  currency: string;
}

interface User {
  first: string;
  last: string;
  email: string;
}

export interface Receipt {
  url: string;
}

export interface ExpenseType {
  id: string;
  date: string;
  merchant: string;
  comment: string;
  category: string;
  receipts: Receipt[];
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
    | typeof UPDATE_EXPENSE_SUCCESS
    | typeof UPDATE_EXPENSE_REQUEST
    | typeof UPDATE_EXPENSE_ERROR;
}
