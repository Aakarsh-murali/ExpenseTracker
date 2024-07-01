import React,{useState,useEffect} from 'react'
import { useTransactions } from '../context/TransactionContext';
import CSS from "csstype"
import { Default } from 'react-toastify/dist/utils';




const budgetStyles:CSS.Properties = {
    color: "black",
    border: "4px solid ",
    background:"radial-gradient(circle at 10% 20%, rgb(255, 197, 118) 0%, rgb(254, 106, 103) 47.7%, rgb(240, 23, 23) 92.3%)"
    
};


const TotalExpense = () => {
    const { transactions, fetchTransactions } = useTransactions();
    const [totalExpense, setTotalExpense] = useState<number>(0);

useEffect(() => {
    fetchTransactions();
}, [fetchTransactions]);

useEffect(() => {
    const calculateTotals = () => {
        let expenseTotal = 0;
        let incomeTotal = 0;


       

        transactions.forEach((transaction) => {
            if (transaction.transactionType === 'income') {
                incomeTotal += transaction.transactionAmount;
            } else if (transaction.transactionType === 'expense') {
                expenseTotal += transaction.transactionAmount;
            }
        });

        setTotalExpense(expenseTotal);
       
    };

    calculateTotals();
}, [transactions]);



  return (
    <div 
        className='budget'
        style={budgetStyles}
            >
        <div className="progress-text">
            <h3>Total Expense</h3>
            <p>-${totalExpense.toFixed(2)}</p>
        </div>
    </div>
  )
}
export default TotalExpense 