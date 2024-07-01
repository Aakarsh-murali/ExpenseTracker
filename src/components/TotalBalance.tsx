import React,{useEffect,useState} from 'react'
import { useTransactions } from '../context/TransactionContext';

const TotalBalance = () => {

        const { transactions } = useTransactions();
        const [totalBalance, setTotalBalance] = useState<number | null>(null);
    
        useEffect(() => {  
            const fetchTotalBalance = async () => {
                try {
                    const response = await fetch('http://localhost:8080/api/transaction/total-balance',{
                        headers:{
                            'ngrok-skip-browser-warning': 'true'
                        }
                        
                    });
                    if (!response.ok) {
                        throw new Error('Failed to fetch total balance');
                    }
                    const data = await response.json();
                    setTotalBalance(data.totalBalance);
                } catch (error) {
                    console.error('Error fetching total balance:', error);
                    // Handle error (e.g., show error message)
                }
            };
            fetchTotalBalance();
        }, [transactions]); // Dependency on transactions to update totals when transactions change
    






    return (
        <div 
            className='budget'
                >
            <div className="progress-text">
                <h3>Total Balance</h3>
                <p>${totalBalance?.toFixed(2)}</p>
            </div>
        </div>
      )
}


export default TotalBalance