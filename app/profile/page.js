import React from 'react'
import LogoutButton from '../components/LogoutButton'
import Checkstatus from '../components/Checkstatus'

export default function Profile() {
  return (
    <div>
        <h1 className='text-4xl'>Profile</h1>
        <h4 className='text-xl'>Name: </h4>
        <h4 className='text-xl'>Email: </h4>
        <h4 className='text-xl'>Total workouts recorded: </h4>
        <h4 className='text-xl'>Workouts: </h4>
        {/* //TODO add variable for workout preference in weight */}
        <h4 className='text-xl'>Show weight in: lbs or kg </h4>
        <button>Delete Account</button>
        <LogoutButton />
        <Checkstatus />
    </div>
  )
}
