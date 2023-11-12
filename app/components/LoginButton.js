"use client"
import React from 'react'
import { signIn } from 'next-auth/react'

export default function LoginButton() {

  return (
        <button className='bg-purple-500 hover:bg-purple-400 px-2' onClick={()=>{signIn("google")}} >Login</button>
  )
}
