import React from 'react'
import { Intro } from './Intro'
import { fetchData, useLoaderData } from '../helper'


import { formDataToObject } from '../helper'
import AddIncome from './AddIncome'
import  AddExpense  from './AddExpense'
import Table from './Table'
import TotalIncome from './TotalIncome'
import TotalExpense from './TotalExpense'
import TotalBalance from './TotalBalance'






export const dashboardLoader = () => {
  const userName = fetchData("userName");
  return {userName}
}

export async function dashboardAction({ request }: { request: Request }) {
  try {
    const formData = await request.formData();
    const { userName } = formDataToObject(formData);
    
    if (userName) {
      localStorage.setItem("userName", userName);
    } else {
      throw new Error("Invalid userName value");
    }
  } catch (error) {
    console.error("Error in dashboardAction:", error);
  }
}





export const Dashboard: React.FC = () => {
  
  const {userName} = useLoaderData()
  return (
    <>
      <div className='dashboard'>
        <h1>Welcome</h1>
        <div className='grid-sm'>
          <div className="grid-lg">
            <div className="flex-lg">
              <AddIncome />
              <AddExpense />
            </div>
            <div className="budgets">
              <TotalIncome />
              <TotalExpense />
              <TotalBalance />
            </div>
            
            <div className="grid-md">
              <h2>Recent Transactions</h2>
              <Table />
            </div>

          </div>
        </div>
      </div>
      
    </>
  )
}

