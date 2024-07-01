export interface Iexp {
    transactionType: string;
    transactionDescription: string;
    transactionAmount: number;
}
export interface TransactionDto {
    transactionId: number;
    transactionType: 'income' | 'expense'; // Define possible types
    transactionDescription: string;
    transactionAmount: number;
    transactionDate: string;
}
