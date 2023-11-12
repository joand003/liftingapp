"use client"
import React, {useState, useEffect} from 'react'
import CooldownTimer from '../components/CooldownTimer'
import ActivityTimer from '../components/ActivityTimer'
import CurrentWorkoutComponent from '../components/CurrentWorkoutComponent'
import { useSession } from 'next-auth/react'
import axios from 'axios'

export default function Dashboard() {
    const { data: session, status } = useSession();
    const [exerciseListArray, setExerciseListArray] = useState([])
    const [exerciseNameArray, setExerciseNameArray] = useState([])
    const [currentWorkout, setCurrentWorkout] = useState([{activity: '', weight: [''], sets: 1, reps: [''], cooldown: [''], time: ['']}])
    const [currentActivityIndex, setCurrentActivityIndex] = useState(0)
    const [currentSet, setCurrentSet] = useState(0)
    const [currentWorkoutName, setCurrentWorkoutName] = useState('Select a workout')
    const [errorMessage, setErrorMessage] = useState('')    

    const handleSelectWorkout = (e) => {
        console.log('in handleSelectWorkout')
        const index = e.target.options[e.target.selectedIndex].getAttribute('data-index')
        console.log(`index: ${index}`)
        console.log(`exerciseListArray[index]: ${JSON.stringify(exerciseListArray[index])}`)
        console.log(`exerciseNameArray[index]: ${exerciseNameArray[index]}`)
        console.log(`exerciseListArray: ${JSON.stringify(exerciseListArray)}`)
        console.log(`exerciseNameArray: ${exerciseNameArray}`)
        setCurrentWorkout(exerciseListArray[index])
        setCurrentWorkoutName(exerciseNameArray[index])
    }

    const loadExistingWorkouts = async() => {
        console.log("in loadExistingWorkouts")
        setErrorMessage('')
        const response = await axios.post('/api/queryExerciseList', {uid: session.user.id})
        if (response.data.data.length === 0) {
            console.log("no workouts")
            setErrorMessage('You have no workouts to edit')
            return
        }
        const tempWorkoutArray = response.data.data.map((item) => {
            return (item.workoutArray)
        })
        const tempExerciseNameArray = response.data.data.map((item) => {
            return (item.workoutName)
        })
        console.log(`response.data.data: ${JSON.stringify(response.data.data)}`)
        console.log(`tempWorkoutArray: ${JSON.stringify(tempWorkoutArray)}`)
        console.log(`tempExerciseNameArray: ${tempExerciseNameArray}`)
        setExerciseNameArray(tempExerciseNameArray)
        setExerciseListArray(tempWorkoutArray)
    }

    useEffect(() => {
        if (status === 'authenticated' && session) {
        loadExistingWorkouts()
        }
    }, [session, status])
    
  return (
    <div>
        <h1 className='text-4xl'>Dashboard</h1>
        <h4 className='text-xl'>Select your workout:</h4>
        {exerciseNameArray.length === 0 ? <p>Please refresh to load your data.</p> : <select className='w-fit text-slate-800' name='workout' id='workout' placeholder='Select a workout' value={currentWorkoutName} onChange={handleSelectWorkout}>
            <option value='Select a workout' disabled={currentWorkoutName !== 'Select a workout'}>Select a workout</option>
            {exerciseNameArray.map((item, index)=>{
                return <option value={item} key={index + 'exerciseArrays'} data-index={index} >{item}</option>
            }
            )}
        </select>}
        {errorMessage === "" && currentWorkoutName !== 'Select a workout' ? <CurrentWorkoutComponent currentWorkout={currentWorkout} setCurrentWorkout={setCurrentWorkout} currentActivityIndex={currentActivityIndex} setCurrentActivityIndex={setCurrentActivityIndex} currentSet={currentSet} setCurrentSet={setCurrentSet} currentWorkoutName={currentWorkoutName}/> : <h4 className='text-xl'>{errorMessage}</h4>}

        {currentWorkout[currentActivityIndex].time[currentSet] === '' ? null : <ActivityTimer activityTime={currentWorkout[currentActivityIndex].time[currentSet] * 60}/>}

        {errorMessage === "" && currentWorkoutName !== 'Select a workout' ? <CooldownTimer cooldownTime={currentWorkout[currentActivityIndex].cooldown[currentSet]}/> : <p>Select a workout or create a new workout using the workout creator.</p>}
    </div>
  )
}
