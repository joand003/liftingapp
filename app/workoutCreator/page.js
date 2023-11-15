import React from 'react'
import WorkoutForm from '../components/WorkoutForm'
import ExerciseFinder from '../components/ExerciseFinder'

export default function WorkoutCreator() {

  return (
    <div className='flex flex-col ml-1 md:ml-6 lg:ml-24'>
        <div className='2xl:flex 2xl:flex-row'>
          <WorkoutForm />
          <ExerciseFinder />
        </div>
    </div>
  )
}
