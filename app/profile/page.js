"use client"
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSession, signOut } from 'next-auth/react'

export default function Profile() {
  const { data: session, status } = useSession();
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteMessage, setDeleteMessage] = useState('')
  const [toggleWeight, setToggleWeight] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState('')
  const [toggleDeleteInput, setToggleDeleteInput] = useState(false)

  const handleDeleteAccount = async() => {
    setIsDeleting(true)
    setDeleteMessage('Deletion in progress...')
    await axios.post('/api/deleteAllWorkouts', {uid: session.user.id})
    await axios.post('/api/deleteUser', {uid: session.user.id})
    setDeleteMessage('Account deleted you will be logged out shortly...')
    setTimeout(()=>{signOut({ callbackUrl: "/"})}, 3000)
  }

  const handleDeleteMessage = (e) => {
    setDeleteConfirmation(e.target.value)
  }

  const handleToggleDeleteInput = () => {
    setToggleDeleteInput(!toggleDeleteInput)
  }


  return (
    <div className='ml-1 md:ml-6 lg:ml-24'>
        <h1 className='text-4xl'>Profile</h1>
        {session ? <h4 className='text-xl'>Name: {session.user.name}</h4> : null}
        {session ? <h4 className='text-xl pb-6'>Email: {session.user.email}</h4> : null}
        {session ? null : <h4 className='text-xl'>Loading...</h4>}
        {/* <h4 className='text-xl'>Total workouts recorded: </h4>
        <h4 className='text-xl'>Workouts: </h4> */}
        {/* //TODO add variable for workout preference in weight */}
        {/* <h4 className='text-xl'>Show weight in: <button className='bg-purple-500 hover:bg-purple-400 rounded px-2' onClick={()=>{setToggleWeight(!toggleWeight)}}>{toggleWeight ? 'kg' : 'lbs'}</button></h4> */}
        <button className='bg-purple-500 hover:bg-purple-400 rounded px-2' onClick={()=>{signOut({callbackUrl: "/"})}}>Logout</button>
        <br></br>
        <button className='bg-purple-500 hover:bg-purple-500 rounded px-2 mt-4' onClick={handleToggleDeleteInput}>Delete Account</button>
        {toggleDeleteInput ? <div>
          <input type='text' className='border-2 border-purple-500 rounded px-2 w-52 text-gray-800' placeholder='Type "delete" to proceed' onChange={handleDeleteMessage}/>
          {deleteConfirmation === 'delete' ? <button className='bg-purple-500 hover:bg-purple-400 rounded px-2' onClick={handleDeleteAccount} disabled={isDeleting}>Confirm Delete Account</button> : null}
        </div> : null}
        {deleteMessage !== '' ? <h4 className='text-xl'>{deleteMessage}</h4> : null}
    </div>
  )
}
