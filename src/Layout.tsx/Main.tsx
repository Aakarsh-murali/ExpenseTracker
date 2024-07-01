import React from 'react'
import { Outlet } from 'react-router-dom'
import wave from "../assets/wave.svg"
import Nav from '../components/Nav'
import { fetchData } from '../helper'
import { useLoaderData } from '../helper'
import { Dashboard } from '../components/Dashboard'
import { Intro } from '../components/Intro'


export const mainLoader = () : {userName: string} =>{
  const userName = fetchData("userName");
  return {userName}
}

const Main:React.FC = () => {

  const {userName} = useLoaderData()
  return (
    <div className='layout'>
        <Nav userName = {userName} />
        <main>  
          <Outlet />
        </main>
        <img src={wave} alt=""/>
    </div>
  )
}

export default Main