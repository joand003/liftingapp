"use client"
import React from 'react'
import { signOut } from 'next-auth/react'

export default function LogoutButton() {

  return (
        <button className='bg-purple-500 hover:bg-purple-400 px-2' onClick={()=>{signOut()}} >Logout</button>
  )
}
