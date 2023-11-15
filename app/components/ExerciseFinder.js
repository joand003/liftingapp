"use client"
import React, {useState} from 'react'
import axios from 'axios'

export default function ExerciseFinder() {
    const [exerciseName, setExerciseName] = useState('')
    const [exerciseArray, setExerciseArray] = useState([])
    const [errorMsg, setErrorMsg] = useState('')

    
    const handleExerciseNameChange = (event) => {
        setExerciseName(event.target.value)
        setErrorMsg('')
    }

  return (
    <div className='flex justify-center mt-12'>
    <div className='mx-10'>
        <h3 className='text-2xl'>Exercise Finder</h3>
        <h4 className='text-xl'>You can use the ExerciseFinder below to learn more about different exercises.</h4>
        <div className='flex flex-col sm:flex-row pb-3'>
        <p className='pr-2'>Find exercises by name: </p>
        <input className='text-slate-800' type='text' placeholder='Enter exercise name' value={exerciseName} onChange={handleExerciseNameChange} />
        <button 
            className='bg-purple-500 hover:bg-purple-400 px-2 h-full border-black border-r'
            onClick={async()=>{
            const response = await axios.post('/api/exercise', {exerciseName})
            const dataArray = response.data.info

            if (dataArray.length === 0) {
                setErrorMsg('No known exercise was found. Please try again.')
            }
            setExerciseArray(dataArray)
        }}>Submit</button>
        </div>
        <div className='flex flex-col'>
            {exerciseArray.length === 0 ? <p>{errorMsg}</p> : exerciseArray.map((item, index)=>{
                return (
                <div className='mb-4 flex flex-col max-w-5xl border border-r-1 p-2 border-teal-500' key={index + 'efdiv'}>
                    <p key={item.name + index}><span className='font-bold text-purple-600'>Name:</span> {item.name}</p>
                    <p key={item.muscle + index}><span className='font-bold text-purple-600'>Muscle:</span> {item.muscle}</p>
                    <p key={item.equipment + index}><span className='font-bold text-purple-600'>Equipment:</span> {item.equipment}</p>
                    <p key={item.instructions + index}><span className='font-bold text-purple-600'>Instructions:</span> {item.instructions}</p>
                </div>
                )
            })}
        </div>
    </div>
    </div>
  )
}
