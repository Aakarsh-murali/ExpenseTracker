import React,{useState,useEffect} from 'react'
import { useTransactions } from '../context/TransactionContext';
import CSS from "csstype"




const budgetStyles:CSS.Properties = {
    color: "black",
    border: "4px solid",
    background:"linear-gradient(109.6deg, rgb(251, 250, 225) 11.2%, rgb(206, 240, 185) 47.5%, rgb(100, 163, 111) 100.2%)"
    
};


const TotalIncome:React.FC = () => {
    const { transactions, fetchTransactions } = useTransactions();
    const [totalIncome, setTotalIncome] = useState<number>(0);

useEffect(() => {
    fetchTransactions();
}, [fetchTransactions]);

useEffect(() => {
    const calculateTotals = () => {
        let incomeTotal = 0;
       

        transactions.forEach((transaction) => {
            if (transaction.transactionType === 'income') {
                incomeTotal += transaction.transactionAmount;
            }
        });

        setTotalIncome(incomeTotal);
       
    };

    calculateTotals();
}, [transactions]);



  return (
    <div 
        className='budget'
        style={budgetStyles}
            >
        <div className="progress-text">
            <h3>Total Income</h3>
            <p>+${totalIncome.toFixed(2)}</p>
        </div>
    </div>
  )
}

export default TotalIncome