import React from 'react'
import { Form, Link, NavLink } from 'react-router-dom'
import { UserPlusIcon } from '@heroicons/react/24/solid'
import pngegg from "../assets/pngegg.png"
export const Intro = () => {


    



  return (
    <div className='intro'>
        <div>
            <h1>
                Your Personal
                <h1 className='accent'>Expense Tracker</h1>
            </h1>
            <Form method="post">
                <input type='text' name="username" required
                placeholder='What is your name?'
                aria-label='Your Name'
                autoComplete='given-name'
                />
                <button type='submit' className='btn btn--dark'>
                    <span>Create Account</span>
                    <UserPlusIcon width={20} />

                </button>

            </Form>
            <NavLink to="/login" >
                <p>Already a user? Log in.</p>
            </NavLink>
        </div>
        <img src={pngegg} alt='' width={600} />
    </div>
  )
}
