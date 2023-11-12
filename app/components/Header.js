"use client"
import React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'

export default function Header() {
    const { data: session } = useSession();
    const userName = session?.user?.name;


  return (
    <div className='flex flex-row justify-end h-6 bg-slate-800'>
        {userName ? <div className='text-white pr-3'>Welcome {userName}</div>: <div className='text-white pr-3'>Please login to get started</div>}
        <Link className='bg-purple-500 hover:bg-purple-400 px-2 h-full border-black border-x' href='/dashboard'>Dashboard</Link>
        <Link className='bg-purple-500 hover:bg-purple-400 px-2 h-full border-black border-r' href='/workoutCreator'>Workout Creator</Link>
        <Link className='bg-purple-500 hover:bg-purple-400 px-2 h-full border-black border-r' href='/profile'>Profile</Link>
        {userName ? <LogoutButton className="h-full border-black border-r"/> : <LoginButton className="h-full border-black border-r"/>}
        
    </div>
  )
}
