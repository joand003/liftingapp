"use client"
import React from 'react'
import LogoutButton from '../components/LogoutButton'
import Checkstatus from '../components/Checkstatus'
import axios from 'axios'
import { useSession } from 'next-auth/react'

export default function Profile() {
  const { data: session } = useSession();

  const handleDeleteAccount = async() => {
    console.log("in handleDeleteAccount")
    const response = await axios.post('/api/deleteAllWorkouts', {uid: session.user.id})
    console.log(`response.data.message: ${JSON.stringify(response.data.message)}`)
    const response2 = await axios.post('/api/deleteUser', {uid: session.user.id})
    console.log(`response2.data.message: ${JSON.stringify(response2.data.message)}`)
  }

  return (
    <div>
        <h1 className='text-4xl'>Profile</h1>
        <h4 className='text-xl'>Name: </h4>
        <h4 className='text-xl'>Email: </h4>
        <h4 className='text-xl'>Total workouts recorded: </h4>
        <h4 className='text-xl'>Workouts: </h4>
        {/* //TODO add variable for workout preference in weight */}
        <h4 className='text-xl'>Show weight in: lbs or kg </h4>
        <button className='bg-purple-500 hover:bg-purple-500 rounded px-2'>Delete Account</button>
        <LogoutButton />
        <Checkstatus />
    </div>
  )
}
