import React, { useState } from 'react'
import { Form, NavLink , useLocation} from 'react-router-dom'
import logomark from "../assets/logomark.svg"
import {ArrowLeftEndOnRectangleIcon} from '@heroicons/react/24/solid'

interface NavProps {
    userName:string | null;
}

const Nav:React.FC<NavProps> = ({userName}) => {
    const location = useLocation()
    const [showViewAll,setShowViewAll] = useState(false);
  return (
    <nav className='navbar'>
        <NavLink to="/" aria-label='Go to Home'>
            <img src={logomark} alt='' height={30} />
            <span>FinBuddy</span>
        </NavLink>
        {location.pathname === "/viewall" ?(
            <NavLink to='/'>
                 <div className="navbar-right">
                        <button type='submit'
                            id='go-back'
                            className='btn btn--dark'>Go Back</button>
                    </div>
            </NavLink>
    
    ) :(    
            <NavLink to="/viewall">
            <div className="navbar-right">
                <button type='submit' 
                id='view-all' 
                className='btn btn--dark'>View all Transaction</button>
            </div>
            </NavLink>
        )}    

        {userName &&(
            <Form
                method='post'
                action='/logout'
                onSubmit={(event) => {
                    if( !window.confirm("Logout user and all data?")){
                        event.preventDefault()
                    }
                }}
            > 
                <button type='submit' className='btn btn--warning'>
                    <span>Logout</span>
                    <ArrowLeftEndOnRectangleIcon width={20} />
                </button>
            </Form>    
        )}
    </nav>
  )
}

export default Nav