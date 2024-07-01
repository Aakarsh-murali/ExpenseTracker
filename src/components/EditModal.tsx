import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { TransactionDto } from '../interfaces';

interface EditModalProps {
    transaction: TransactionDto | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (transaction: TransactionDto) => void;
}

const EditModal: React.FC<EditModalProps> = ({ transaction, isOpen, onClose, onSave }) => {
    const [editedTransaction, setEditedTransaction] = useState<TransactionDto | null>(null);

    useEffect(() => {
        setEditedTransaction(transaction);
    }, [transaction]);

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const { name, value } = event.target;
        if (editedTransaction) {
            setEditedTransaction({ ...editedTransaction, [name]: name === 'transactionAmount' ? parseFloat(value) : value });
        }
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        if (editedTransaction) {
            onSave(editedTransaction);
        }
    };

    if (!isOpen || !editedTransaction) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h3>Edit Transaction</h3>
                <form onSubmit={handleSubmit}>
                    <div className='form-control'>
                        <label htmlFor='transactionType'>Transaction Type</label>
                        <select
                            id='transactionType'
                            name='transactionType'
                            value={editedTransaction.transactionType}
                            onChange={handleChange}
                            className='select-box'
                        >
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>
                    </div>
                    <div className='form-control'>
                        <label htmlFor='transactionDescription'>Description</label>
                        <input
                            type='text'
                            id='transactionDescription'
                            name='transactionDescription'
                            value={editedTransaction.transactionDescription}
                            onChange={handleChange}
                            placeholder='Enter description'
                        />
                    </div>
                    <div className='form-control'>
                        <label htmlFor='transactionAmount'>Amount</label>
                        <input
                            type='number'
                            id='transactionAmount'
                            name='transactionAmount'
                            value={editedTransaction.transactionAmount}
                            onChange={handleChange}
                            placeholder='Enter amount'
                        />
                    </div>
                    <button type="submit" className='btn-save'>Save</button>
                    <button type="button" className='btn-cancel' onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default EditModal;
