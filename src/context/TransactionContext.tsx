import React, { createContext, useContext, useState, useEffect } from 'react';
import { TransactionDto } from '../interfaces'; // Adjust import path as per your project structure

// Define the shape of your context
interface TransactionContextType {
    transactions: TransactionDto[];
    addTransaction: (transaction: TransactionDto) => void;
    updateTransaction: (transactionId: number, updatedTransaction: TransactionDto) => void;
    deleteTransaction: (transactionId: number) => void;
    fetchTransactions: () => void;
}

// Create the context
const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

// Create the provider component
export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [transactions, setTransactions] = useState<TransactionDto[]>([]);

    // Function to fetch transactions from the backend
    const fetchTransactions = async () => {
        try {
            const token = localStorage.getItem('token'); // Retrieve JWT token from localStorage

            const response = await fetch('http://localhost:8080/api/transaction', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'ngrok-skip-browser-warning': 'true'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch transactions');
            }

            const fetchedTransactions = await response.json();
            setTransactions(fetchedTransactions);
        } catch (error) {
            console.error('Error fetching transactions:', error);
            // Handle error (e.g., show error message)
        }
    };

    // Fetch transactions when the provider mounts
    useEffect(() => {
        fetchTransactions();
    },[]); // Ensure the effect runs only once after the initial render

    // Function to add a new transaction
    const addTransaction = (transaction: TransactionDto) => {
        setTransactions([...transactions, transaction]);
    };

    // Function to update an existing transaction
    const updateTransaction = (transactionId: number, updatedTransaction: TransactionDto) => {
        const updatedTransactions = transactions.map((transaction) =>
            transaction.transactionId === transactionId ? updatedTransaction : transaction
        );
        setTransactions(updatedTransactions);
    };

    const deleteTransaction = (transactionId: number) => {
        const updatedTransactions = transactions.filter(transaction => transaction.transactionId !== transactionId);
        setTransactions(updatedTransactions);
    }

    return (
        <TransactionContext.Provider value={{ transactions, addTransaction, updateTransaction, fetchTransactions, deleteTransaction }}>
            {children}
        </TransactionContext.Provider>
    );
};

// Custom hook to use the transaction context
export const useTransactions = () => {
    const context = useContext(TransactionContext);
    if (!context) {
        throw new Error('useTransactions must be used within a TransactionProvider');
    }
    return context;
};
