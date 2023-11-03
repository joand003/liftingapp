"use client"
import React, {useState} from 'react'
import WorkoutForm from '../components/WorkoutForm'
import ExerciseFinder from '../components/ExerciseFinder'

export default function WorkoutCreator() {
    const [workoutType, setWorkoutType] = useState('')

    const handleWorkoutType = (e) => {
        setWorkoutType(e.target.value)
    }

  return (
    <div className='flex flex-col pl-3'>
        <h1 className='text-4xl'>Workout Creator</h1>
        {/* <h4 className='text-xl'>Select the type of workout</h4>
        <label htmlFor='workouttype'>Workout Type</label>
        <select className='w-fit text-center text-slate-800' onChange={handleWorkoutType} value={workoutType} name='workouttype' id='workouttype' placeholder='Select a workout type'>
            {workoutType === '' && <option value='Select a workout type'>Select a workout type</option>}
            <option value='Strenght Training'>Strength Training</option>
            <option value='Cardiovascular Training'>Cardiovascular Training</option>
            <option value='Flexibility Training'>Flexibility Training</option>
        </select> */}
        <WorkoutForm />
        <ExerciseFinder />
        
    </div>
  )
}
