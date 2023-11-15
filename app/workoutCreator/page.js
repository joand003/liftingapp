"use client"
import React, {useState} from 'react'
import WorkoutForm from '../components/WorkoutForm'
import ExerciseFinder from '../components/ExerciseFinder'
import WorkoutPreview from '../components/WorkoutPreview'

export default function WorkoutCreator() {
  const blankWorkout = {
    activity: "",
    weight: [""],
    sets: 1,
    reps: [""],
    cooldown: [""],
    time: [""],
  };
  const [workoutArray, setWorkoutArray] = useState([blankWorkout]);
  const [workoutName, setWorkoutName] = useState("");

  return (
    <div className='flex justify-center'>
      <div className='flex flex-col'>
          <div className='2xl:flex 2xl:flex-row'>
            <div className="lg:flex lg:flex-row sm:mx-10">
              <WorkoutForm workoutArray={workoutArray} workoutName={workoutName} blankWorkout={blankWorkout} setWorkoutArray={setWorkoutArray} setWorkoutName={setWorkoutName}/>
              <WorkoutPreview workoutArray={workoutArray} workoutName={workoutName}/>
            </div>
            <ExerciseFinder />
          </div>
      </div>
    </div>
  )
}
