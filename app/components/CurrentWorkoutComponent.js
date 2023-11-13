import React, { useState } from 'react'
import axios from 'axios'
import { useSession } from 'next-auth/react'

export default function CurrentWorkoutComponent({currentWorkout, setCurrentWorkout, currentActivityIndex, setCurrentActivityIndex, currentSet, setCurrentSet, currentWorkoutName}) {
    const { data: session, status } = useSession();
    const [isSaving, setIsSaving] = useState(false)
    const [saveMessage, setSaveMessage] = useState('') 
    const currentDate = new Date()
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const currentDay = daysOfWeek[currentDate.getDay()]
    const stringDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`
    const maxRounds = currentWorkout.length

//

    const handleChangeAmount = (e) => {
        if (e.target.name === 'reps') {
            let newReps = currentWorkout[currentActivityIndex].reps
            newReps[currentSet] += Number(e.target.value)
            if (newReps[currentSet] < 0) {
                newReps[currentSet] = 0
            }
            const tempWorkoutArray = currentWorkout.map((object => object === currentWorkout[currentActivityIndex] ? {...object, reps: newReps} : object))
            setCurrentWorkout(tempWorkoutArray)
        }
        if (e.target.name === 'weight') {
            let newWeight = currentWorkout[currentActivityIndex].weight
            newWeight[currentSet] += Number(e.target.value)
            if (newWeight[currentSet] < 0) {
                newWeight[currentSet] = 0
            }
            const tempWorkoutArray = currentWorkout.map((object => object === currentWorkout[currentActivityIndex] ? {...object, weight: newWeight} : object))
            setCurrentWorkout(tempWorkoutArray)
        }
        if (e.target.name === 'minTime') {
            let newTime = currentWorkout[currentActivityIndex].time
            newTime[currentSet] += Number(e.target.value)
            if (newTime[currentSet] < 0) {
                newTime[currentSet] = 0
            }
            const tempWorkoutArray = currentWorkout.map((object => object === currentWorkout[currentActivityIndex] ? {...object, time: newTime } : object))
            setCurrentWorkout(tempWorkoutArray)
        }
    }

    const handleNext = () => {
        if (currentSet + 1 == currentWorkout[currentActivityIndex].sets && currentActivityIndex + 1 == maxRounds) {
            return
        }
        if (currentSet + 1 == currentWorkout[currentActivityIndex].sets) {
            setCurrentSet(0)
            setCurrentActivityIndex(currentActivityIndex + 1)
            return
        }
        setCurrentSet(currentSet + 1)
    }

    const handlePrevious = () => {
        if (currentSet == 0 && currentActivityIndex == 0) {
            return
        }
        if (currentSet == 0) {
            setCurrentSet(currentWorkout[currentActivityIndex - 1].sets - 1)
            setCurrentActivityIndex(currentActivityIndex - 1)
            return
        }
        setCurrentSet(currentSet - 1)
    }

    

    const handlePreviousSet = () => {
        if (currentSet > 0) {
            setCurrentSet(currentSet - 1)
        }
    }

    const handleNextSet = () => {
        if (currentSet < currentWorkout[currentActivityIndex].sets - 1) {
            setCurrentSet(currentSet + 1)
        }
    }

    const handlePreviousActivity = () => {
        if (currentActivityIndex > 0) {
            setCurrentActivityIndex(currentActivityIndex - 1)
            setCurrentSet(0)
        }
    }

    const handleNextActivity = () => {
        if (currentActivityIndex < maxRounds - 1) {
            setCurrentActivityIndex(currentActivityIndex + 1)
            setCurrentSet(0)
        }
    }

    const handleSaveWorkout = async () => {
        setIsSaving(true)
        setSaveMessage('Saving...')
        await axios.post('/api/submitWorkout', {uid: session.user.id, workoutName, workoutArray, workoutID})
        setSaveMessage('')  
        setIsSaving(false)

    }

  return (
    <div className='flex flex-col'>
            <h4 className='text-3xl font-bold text-purple-500'>Workout:</h4>        
            <h4 className='text-xl'><span className='text-purple-500'>Day:</span> {currentDay}, {stringDate}</h4>
            <h4 className='text-xl'><span className='text-purple-500'>Name:</span> {currentWorkoutName}</h4>
            <h4 className='text-xl'><span className='text-purple-500'>Activity:</span> {currentActivityIndex + 1}/{maxRounds}, {currentWorkout[currentActivityIndex].activity}</h4>
            <h4 className='text-xl'><span className='text-purple-500'>Set:</span> {currentSet + 1} / {currentWorkout[currentActivityIndex].sets}</h4>
            <div className='flex flex-row'>
                <h4 className='text-xl'><span className='text-purple-500'>Weight:</span> {currentWorkout[currentActivityIndex].weight[currentSet]}
                <span className='text-green-500 pl-1'>{currentWorkout[currentActivityIndex].weight[currentSet] < 2 ? 'lb' : 'lbs'}</span>
                </h4>
                <button onClick={handleChangeAmount} value={-5} className='bg-purple-500 hover:bg-purple-400 rounded px-1 ml-2 text-xl' name='weight'>-</button>
                <button onClick={handleChangeAmount} value={5} className='bg-purple-500 hover:bg-purple-400 rounded px-1 ml-2 text-xl' name='weight'>+</button>
            </div>
            <div className='flex flex-row'>
                <h4 className='text-xl'><span className='text-purple-500'>Reps:</span> {currentWorkout[currentActivityIndex].reps[currentSet]}</h4> 
                <button onClick={handleChangeAmount} value={-1} className='bg-purple-500 hover:bg-purple-400 rounded px-1 ml-2 text-xl' name='reps'>-</button>
                <button onClick={handleChangeAmount} value={1} className='bg-purple-500 hover:bg-purple-400 rounded px-1 ml-2 text-xl' name='reps'>+</button>
            </div>
            <div>
                <h4 className='text-xl'><span className='text-purple-500'>Cooldown:</span> {currentWorkout[currentActivityIndex].cooldown[currentSet]} <span className='text-green-500'>s</span></h4>
            </div>
            <div className='pb-2'>
                {currentWorkout[currentActivityIndex].time[currentSet] === '' ? null : <div className='flex flex-row'><h4 className='text-xl'><span className='text-purple-500'>Time:</span> {currentWorkout[currentActivityIndex].time[currentSet]}</h4>
                <button onClick={handleChangeAmount} value={-1} className='bg-purple-500 hover:bg-purple-400 rounded px-1 ml-2 text-xl' name='minTime'>-1</button>
                <button onClick={handleChangeAmount} value={-5} className='bg-purple-500 hover:bg-purple-400 rounded px-1 ml-2 text-xl' name='minTime'>-5</button>
                <button onClick={handleChangeAmount} value={5} className='bg-purple-500 hover:bg-purple-400 rounded px-1 ml-2 text-xl' name='minTime'>+5</button>
                <button onClick={handleChangeAmount} value={1} className='bg-purple-500 hover:bg-purple-400 rounded px-1 ml-2 text-xl' name='minTime'>+1</button>
                </div>}
            </div>
            <div className='flex flex-row space-x-3 pl-3'>
                <button onClick={handlePrevious} className='bg-purple-500 hover:bg-purple-400 disabled:bg-gray-500 rounded px-2' disabled={currentSet === 0 && currentActivityIndex === 0}>Previous</button>
                <button onClick={handleNext} className='bg-purple-500 hover:bg-purple-400 rounded px-2 disabled:bg-gray-500' disabled={currentSet + 1 === currentWorkout[currentActivityIndex].sets && currentActivityIndex + 1 === maxRounds}>Next</button>
                {currentActivityIndex + 1 === maxRounds && currentSet + 1 === currentWorkout[currentActivityIndex].sets ? <button onClick={handleSaveWorkout} disabled={isSaving} className='bg-purple-500 hover:bg-purple-400 rounded px-2'>Save Workout</button> : null}
                {saveMessage !== '' ? <h4 className='text-xl'>{saveMessage}</h4> : null}
            </div>
        </div>
  )
}
