import React from 'react'
import WorkoutForm from '../components/WorkoutForm'
import ExerciseFinder from '../components/ExerciseFinder'

export default function WorkoutCreator() {

  return (
    <div className='flex flex-col pl-3 ml-1 md:ml-6 lg:ml-24'>
        <h1 className='text-4xl text-center'>Workout Creator</h1>
        <h4 className='text-xl'>Please select a workout to edit or start creating a new workout.</h4>
        <h4 className='text-xl'>You can use the ExerciseFinder below to learn more about different exercises.</h4>
        <WorkoutForm />
        <ExerciseFinder />
        
    </div>
  )
}
