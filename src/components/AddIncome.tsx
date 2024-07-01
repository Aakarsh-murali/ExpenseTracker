import { CurrencyDollarIcon } from '@heroicons/react/24/solid'
import React , {useState,ChangeEvent,FormEvent}from 'react'
import { useTransactions } from '../context/TransactionContext'
import { Iexp } from '../interfaces'
import { toast } from 'react-toastify'


const AddIncome:React.FC = () => {

    const { addTransaction } = useTransactions();
    const [transactionType, setTransactionType] = useState<string>('income');
    const [transactionDescription, setTransactionDescription] = useState<string>("");
    const [transactionAmount, setTransactionAmount] = useState<number>(0);
    const token = localStorage.getItem('token');
    

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const { name, value } = event.target;

        switch (name) {
            case "transactionType":
                setTransactionType(value);
                break;
            case "transactionDescription":
                setTransactionDescription(value);
                break;
            case "transactionAmount":
                setTransactionAmount(Number(value));
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        const newTransaction: Iexp = {
            transactionType,
            transactionDescription,
            transactionAmount
        };

        try {
            const response = await fetch('http://localhost:8080/api/transaction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTransaction)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            addTransaction(responseData); // Add transaction to the context
            setTransactionType("income");
            setTransactionDescription("");
            setTransactionAmount(0);
           
            console.log('Transaction successfully added:', responseData);
            toast.success("Successfully Added")
            
        } catch (error) {
            console.error('Failed to add transaction:', error);
        }
    };
  return (
    <div className='form-wrapper'>
        <h2 className='h3'>
            Create <span className='accent'>Income</span>
        </h2>
        <form className='grid-sm' onSubmit={handleSubmit}>
            <div className="grid-xs">
                <label htmlFor='newBudget'> Income Description</label>
                <input 
                    type="text"
                    name='transactionDescription' 
                    id='newBudget' 
                    value={transactionDescription} required
                    onChange={handleChange}
                    placeholder='e.g., Bonus' />
            </div>
            <div className="grid-xs">
                <label htmlFor='newBudgetAmount'>Amount</label>
                <input
                    type='number'
                    step={1}
                    name='transactionAmount'
                    value={transactionAmount} required
                    id='newBudgetAmount'
                    onChange={handleChange}
                    placeholder='e.g., $200'
                    />
            </div>
            
            <button type='submit' className='btn btn--dark'>
                <span>Create Income</span>
                <CurrencyDollarIcon width={20} />
            </button>
        </form>
    </div>
  )
}

export default AddIncome