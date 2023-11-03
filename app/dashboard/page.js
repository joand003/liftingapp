"use client"
import React, {useState} from 'react'
import Timer from '../components/Timer'

export default function Dashboard() {
    const [exerciseListArray, setExerciseListArray] = useState([])

    
  return (
    <div>
        <h1 className='text-4xl'>Dashboard</h1>
        <h4 className='text-xl'>Select your workout:</h4>

        <Timer />
    </div>
  )
}
