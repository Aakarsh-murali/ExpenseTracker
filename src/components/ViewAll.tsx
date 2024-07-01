import React, { useState, useEffect, ChangeEvent } from 'react';
import { TransactionDto } from '../interfaces';
import { useTransactions } from '../context/TransactionContext';
import EditModal from './EditModal';
import editpng from '../assets/editIcon.png';
import deletepng from '../assets/deleteIcon.png';
import { toast } from 'react-toastify';

const ViewAll: React.FC = () => {
    const { transactions, updateTransaction, deleteTransaction, fetchTransactions } = useTransactions();
    const [activeTab, setActiveTab] = useState<'income' | 'expense'>('income');
    const [filteredTransactions, setFilteredTransactions] = useState<TransactionDto[]>([]);
    const [editingTransaction, setEditingTransaction] = useState<TransactionDto | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [searchQuery, setSeachQuery] = useState<string>("");

    useEffect(() => {
        const filtered = transactions
            .filter(t => 
                t.transactionType === activeTab &&
                (t.transactionDescription.toLowerCase().includes(searchQuery.toLowerCase()) || 
                t.transactionAmount.toString().includes(searchQuery) ||
                t.transactionDate.includes(searchQuery))
            )
            .sort((a, b) => new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime());

        setFilteredTransactions(filtered.reverse());
    }, [transactions, activeTab, searchQuery]);


    const handleEdit = (transaction: TransactionDto) => {
        setEditingTransaction(transaction);
        setIsModalOpen(true);
    };

    const handleUpdate = async (transaction: TransactionDto) => {
        try {
            await updateTransaction(transaction.transactionId, transaction);

            const response = await fetch(`http://localhost:8080/api/transaction/${transaction.transactionId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                },
                body: JSON.stringify(transaction),
            });

            if (!response.ok) {
                throw new Error('Failed to update transaction');
            }
            

            setIsModalOpen(false);
            setEditingTransaction(null);
            toast.success("Updated Successfully")
        } catch (error) {
            console.error('Error updating transaction:', error);
        }
    };

    const handleDelete = async (transactionId: number) => {
        try {
            const response = await fetch(`http://localhost:8080/api/transaction/${transactionId}`, {
                method: 'DELETE',
                headers: {
                    'ngrok-skip-browser-warning': 'true'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete transaction');
            }

            deleteTransaction(transactionId);
            toast.success("Deleted")
        } catch (error) {
            console.error('Error deleting transaction:', error);
        }
    };

    const handleTabClick = (tab: 'income' | 'expense') => {
        setActiveTab(tab);
        setFilteredTransactions(transactions.filter(t => t.transactionType === tab));
    };

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) =>{
        setSeachQuery(event.target.value)
    };

    return (
        <div className="container2">
            <div className="tabs">
                <button className={activeTab === 'income' ? 'active' : ''} onClick={() => handleTabClick('income')}>Income</button>
                <button className={activeTab === 'expense' ? 'active' : ''} onClick={() => handleTabClick('expense')}>Expense</button>
            </div>
            <input
                type='text'
                placeholder='Seach Transaction'
                value={searchQuery}
                onChange={handleSearchChange}
                className='search-bar'/>



            <div className="table-container">
                <div className="table">
                    <table>
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTransactions.map((transaction) => (
                                <tr key={transaction.transactionId} className={transaction.transactionAmount < 0 ? 'minus' : 'plus'}>
                                    <td>{transaction.transactionDescription}</td>
                                    <td>${transaction.transactionAmount}</td>
                                    <td>{transaction.transactionDate}</td>
                                    <td>
                                        <button className="edit-btn" onClick={() => handleEdit(transaction)}>
                                            <img src={editpng} alt='Edit' className='icon'/>
                                        </button>
                                        <button className="delete-btn" onClick={() => handleDelete(transaction.transactionId)}>
                                            <img src={deletepng} alt='Delete' className='icon'/>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div> 
            </div>
            <EditModal
                transaction={editingTransaction}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleUpdate}
            />
        </div>
    );
};

export default ViewAll;
