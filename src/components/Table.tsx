import React, { useState, useEffect } from 'react';
import { useTransactions } from '../context/TransactionContext';
import { TransactionDto } from '../interfaces';

import { CalendarIcon, CurrencyDollarIcon } from '@heroicons/react/24/solid';

const Table: React.FC = () => {
  const { transactions } = useTransactions();
  const [filteredTransactions, setFilteredTransactions] = useState<TransactionDto[]>([]);

  useEffect(() => {
    const filtered = transactions
      .slice()
      .sort((a, b) => {
        const dateDiff = new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime();
        if (dateDiff !== 0) return dateDiff;
        return b.transactionId - a.transactionId; // Assuming higher IDs are more recent
      })
      .slice(0, 5);
  
    setFilteredTransactions(filtered);
  }, [transactions]);
  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction) => (
            <tr key={transaction.transactionId} className={transaction.transactionAmount < 0 ? 'minus' : 'plus'}>
              <td>{transaction.transactionDescription}</td>
              <td>${transaction.transactionAmount}</td>
              <td>{transaction.transactionDate} <CalendarIcon className='date-icon'/></td>
              <td>{transaction.transactionType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
