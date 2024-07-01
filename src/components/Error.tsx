import { ArrowUturnLeftIcon, HomeIcon } from '@heroicons/react/24/solid'
import React from 'react'
import {Link, useNavigate } from 'react-router-dom'

export const Error = () => {
  const navigate = useNavigate()
  return (
    <div className='error'>
      <h1>Oops! We've got a problem.</h1>
      <div className='flex-md'>
        <button className='btn btn--dark' onClick={()=> navigate(-1)}><ArrowUturnLeftIcon width={20}/><span>
          Go back</span></button>
        <Link 
          to='/'
          className='btn btn--dark'
          >
            <HomeIcon width={20} />
            <span>Go Home</span>
          </Link>

      </div>
    </div>
  )
}
