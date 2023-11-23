import React from 'react'

export default function WorkoutProgress({currentWorkout}) {
  console.log(`currentWorkout: ${JSON.stringify(currentWorkout)}`)
  return (
    <div>
      <h2 className='text-3xl'>Workout Progress:</h2>
      {currentWorkout.map((item, index) => {
        return (<p key={index}>{item.activity}</p>)
      })}
    </div>
  )
}
