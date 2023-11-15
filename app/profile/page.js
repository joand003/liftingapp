"use client"
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSession, signOut } from 'next-auth/react'

export default function Profile() {
  const { data: session, status } = useSession();
  const [isDeleting, setIsDeleting] = useState(false)
  const [isDeletingWorkout, setIsDeletingWorkout] = useState(false)
  const [deleteMessage, setDeleteMessage] = useState('')
  const [deleteWorkoutMessage, setDeleteWorkoutMessage] = useState('')
  // const [toggleWeight, setToggleWeight] = useState(false)  Future feature to toggle weight between kg and lbs
  const [deleteConfirmation, setDeleteConfirmation] = useState('')
  const [deleteWorkoutConfirmation, setDeleteWorkoutConfirmation] = useState('')
  const [toggleDeleteInput, setToggleDeleteInput] = useState(false)
  const [toggleDeleteWorkoutInput, setToggleDeleteWorkoutInput] = useState(false) 
  const [exerciseListArray, setExerciseListArray] = useState([])
  const [exerciseNameArray, setExerciseNameArray] = useState([])
  const [exerciseWorkoutIDArray, setExerciseWorkoutIDArray] = useState([])
  const [selectedWorkoutID, setSelectedWorkoutID] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleDeleteAccount = async() => {
    setIsDeleting(true)
    setDeleteMessage('Deletion in progress...')
    await axios.post('/api/deleteAllWorkouts', {uid: session.user.id})
    await axios.post('/api/deleteUser', {uid: session.user.id})
    setDeleteMessage('Account deleted you will be logged out shortly...')
    setTimeout(()=>{signOut({ callbackUrl: "/"})}, 3000)
  }

  const handleDeleteWorkout = async() => {
    setIsDeletingWorkout(true)
    setDeleteWorkoutMessage('Deletion in progress...')
    await axios.post('/api/deleteWorkout', {uid: session.user.id, workoutID: selectedWorkoutID})
    loadExistingWorkouts()
    setDeleteWorkoutMessage('Workout deleted')
    setToggleDeleteWorkoutInput(false)
    setDeleteWorkoutConfirmation('')
    setIsDeletingWorkout(false)
    setTimeout(()=>{setDeleteWorkoutMessage('')}, 2000)
  }

  const handleCheckWorkoutDeletion = () => {
    setToggleDeleteWorkoutInput(!toggleDeleteWorkoutInput)
  }

  const handleDeleteWorkoutConfirmation = (e) => {
    setDeleteWorkoutConfirmation(e.target.value)
  }

  const handleDeleteMessage = (e) => {
    setDeleteConfirmation(e.target.value)
  }

  const handleToggleDeleteInput = () => {
    setToggleDeleteInput(!toggleDeleteInput)
  }
  const loadExistingWorkouts = async() => {
    setErrorMessage('')
    const response = await axios.post('/api/queryExerciseList', {uid: session.user.id})
    if (response.data.data.length === 0) {
        setErrorMessage('You have no workouts to edit')
        return
    }
    const tempWorkoutArray = response.data.data.map((item) => {
        return (item.workoutArray)
    })
    const tempExerciseNameArray = response.data.data.map((item) => {
        return (item.workoutName)
    })
    const tempExerciseWorkoutIDArray = response.data.data.map((item) => {
      return (item.workoutID)
    })

    setExerciseNameArray(tempExerciseNameArray)
    setExerciseListArray(tempWorkoutArray)
    setExerciseWorkoutIDArray(tempExerciseWorkoutIDArray)
}

  useEffect(() => {
      if (status === 'authenticated' && session) {
      loadExistingWorkouts()
      }
  }, [session, status])


  return (
    <div className='ml-1 md:ml-6 lg:ml-24'>
        <h1 className='text-4xl'>Profile</h1>
        {session ? <h4 className='text-xl'>Name: {session.user.name}</h4> : null}
        {session ? <h4 className='text-xl pb-6'>Email: {session.user.email}</h4> : null}
        {session ? null : <h4 className='text-xl'>Loading...</h4>}
        <h4 className='text-xl'>Workouts:</h4>
        {exerciseNameArray.map((item, index)=>{
          return (
            <p key={index + 'exerciseArrays'} className='border border-r-1 border-teal-500 p-2 w-fit'>{item} <button className='bg-purple-500 hover:bg-purple-400 rounded px-2 ml-10' onClick={()=>{setSelectedWorkoutID(exerciseWorkoutIDArray[index]); handleCheckWorkoutDeletion()}} disabled={isDeletingWorkout}>Delete</button></p>
          )
        })}
        {toggleDeleteWorkoutInput ? 
        <div>
          <input type='text' className='border-2 border-purple-500 rounded px-2 w-52 text-gray-800' placeholder='Type "delete" to proceed' onChange={handleDeleteWorkoutConfirmation}/>
          {deleteWorkoutConfirmation === 'delete' ? <button className='bg-purple-500 hover:bg-purple-400 rounded px-2 ml-2' onClick={handleDeleteWorkout} disabled={isDeletingWorkout}>Confirm Delete Workout</button> : null}
        </div> : null}
        {deleteWorkoutMessage !== '' ? <h4 className='text-xl'>{deleteWorkoutMessage}</h4> : null}
        {/* <h4 className='text-xl'>Total workouts recorded: </h4>
        <h4 className='text-xl'>Workouts: </h4> */}
        {/* //TODO add variable for workout preference in weight */}
        {/* <h4 className='text-xl'>Show weight in: <button className='bg-purple-500 hover:bg-purple-400 rounded px-2' onClick={()=>{setToggleWeight(!toggleWeight)}}>{toggleWeight ? 'kg' : 'lbs'}</button></h4> */}
        <button className='bg-purple-500 hover:bg-purple-400 rounded px-2 mt-10' onClick={()=>{signOut({callbackUrl: "/"})}}>Logout</button>
        <br></br>
        <button className='bg-purple-500 hover:bg-purple-500 rounded px-2 mt-4' onClick={handleToggleDeleteInput}>Delete Account</button>
        {toggleDeleteInput ? <div>
          <input type='text' className='border-2 border-purple-500 rounded px-2 w-52 text-gray-800' placeholder='Type "delete" to proceed' onChange={handleDeleteMessage}/>
          {deleteConfirmation === 'delete' ? <button className='bg-purple-500 hover:bg-purple-400 rounded px-2 ml-2' onClick={handleDeleteAccount} disabled={isDeleting}>Confirm Delete Account</button> : null}
        </div> : null}
        {deleteMessage !== '' ? <h4 className='text-xl'>{deleteMessage}</h4> : null}
    </div>
  )
}
