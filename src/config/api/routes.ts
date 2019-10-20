export const BASE_URL = 'http://localhost:3000';

export function getUpdateExpenseUrl(expenseId: string) {
    return `${BASE_URL}/expenses/${expenseId}`
}

export function getUploadReceiptUrl(expenseId: string) {
    return `${BASE_URL}/expenses/${expenseId}/receipts`
}

export function getReceiptImagePath(receiptPath: string) {
    return `${BASE_URL}${receiptPath}`;
}
