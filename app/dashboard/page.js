"use client"
import React, {useState} from 'react'
import Timer from '../components/Timer'
import DayComponent from '../components/DayComponent'

export default function Dashboard() {
    const [exerciseListArray, setExerciseListArray] = useState(["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"])
    const day1 = [{activity: 'bicep curls', weight: [10, 15], sets: 2, reps: [6, 7], cooldown: [45, 55], time: ['', '']}, {activity: 'tricep extensions', weight: [10, 15], sets: 2, reps: [6, 7], cooldown: [60, 60], time: ['', '']}, {activity: 'pushups', weight: [0, 0], sets: 2, reps: [6, 7], cooldown: [60, 60], time: ['', '']}, {activity: 'pullups', weight: [0, 0], sets: 2, reps: [6, 7], cooldown: [60, 60], time: ['', '']}, {activity: 'planks', weight: [0, 0], sets: 2, reps: ['', ''], cooldown: [60, 60], time: [1, 1]}]
    const day1Data = {name: 'day1', dayofweek: 'Monday'}

    const maxRounds = day1.length
    const [currentWorkout, setCurrentWorkout] = useState(day1)
    const [currentActivityIndex, setCurrentActivityIndex] = useState(0)
    const [currentActivity, setCurrentActivity] = useState(day1[currentActivityIndex])
    const [currentSet, setCurrentSet] = useState(0)

    const handleSelectWorkout = (e) => {
        console.log(e.target.value)
        console.log('selected workout')
    }

    const handleChangeAmount = (e) => {
        if (e.target.name === 'reps') {
            let newReps = currentActivity.reps
            newReps[currentSet] += Number(e.target.value)
            if (newReps[currentSet] < 0) {
                newReps[currentSet] = 0
            }
            setCurrentActivity({...currentActivity, reps: newReps})
            let newWorkout = [...currentWorkout]
            newWorkout[currentActivityIndex] = {...currentActivity, reps: newReps}
            setCurrentWorkout(newWorkout)
        }
        if (e.target.name === 'weight') {
            let newWeight = currentActivity.weight
            newWeight[currentSet] += Number(e.target.value)
            if (newWeight[currentSet] < 0) {
                newWeight[currentSet] = 0
            }
            setCurrentActivity({...currentActivity, weight: newWeight})
            let newWorkout = [...currentWorkout]
            newWorkout[currentActivityIndex] = {...currentActivity, weight: newWeight}
            setCurrentWorkout(newWorkout)
        }
    }

    

    const handlePreviousSet = () => {
        if (currentSet > 0) {
            setCurrentSet(currentSet - 1)
        }
    }

    const handleNextSet = () => {
        if (currentSet < currentActivity.sets - 1) {
            setCurrentSet(currentSet + 1)
        }
    }

    const handlePreviousActivity = () => {
        if (currentActivityIndex > 0) {
            setCurrentActivityIndex(currentActivityIndex - 1)
            setCurrentActivity(day1[currentActivityIndex - 1])
            setCurrentSet(0)
        }
    }

    const handleNextActivity = () => {
        if (currentActivityIndex < maxRounds - 1) {
            setCurrentActivityIndex(currentActivityIndex + 1)
            setCurrentActivity(day1[currentActivityIndex + 1])
            setCurrentSet(0)
        }
    }

    const handleSaveWorkout = () => {
        console.log('saved workout')
    }
    
  return (
    <div>
        <h1 className='text-4xl'>Dashboard</h1>
        <h4 className='text-xl'>Select your workout:</h4>
        <select className='w-fit text-slate-800' name='workout' id='workout' placeholder='Select a workout' onChange={handleSelectWorkout}>
            {exerciseListArray.map((item, index)=>{
                return <option value={item} key={index + item}>{item}</option>
            }
            )}
        </select>
        <div className='flex flex-col'>
            <h4 className='text-3xl font-bold text-purple-500'>Workout:</h4>        
            <h4 className='text-xl'><span className='text-purple-500'>Day:</span> {day1Data.dayofweek}</h4>
            <h4 className='text-xl'><span className='text-purple-500'>Name:</span> {day1Data.name}</h4>
            <h4 className='text-xl'><span className='text-purple-500'>Activity:</span> {currentActivityIndex + 1}/{maxRounds}, {currentActivity.activity}</h4>
            <h4 className='text-xl'><span className='text-purple-500'>Set:</span> {currentSet + 1} / {currentActivity.sets}</h4>
            <div className='flex flex-row'>
                <h4 className='text-xl'><span className='text-purple-500'>Weight:</span> {currentActivity.weight[currentSet]}
                <span className='text-green-500 pl-1'>{currentActivity.weight[currentSet] < 2 ? 'lb' : 'lbs'}</span>
                </h4>
                <button onClick={handleChangeAmount} value={-5} className='bg-purple-500 hover:bg-purple-400 rounded px-1 ml-2 text-xl' name='weight'>-</button>
                <button onClick={handleChangeAmount} value={5} className='bg-purple-500 hover:bg-purple-400 rounded px-1 ml-2 text-xl' name='weight'>+</button>
            </div>
            <div className='flex flex-row'>
                <h4 className='text-xl'><span className='text-purple-500'>Reps:</span> {currentActivity.reps[currentSet]}</h4> 
                <button onClick={handleChangeAmount} value={-1} className='bg-purple-500 hover:bg-purple-400 rounded px-1 ml-2 text-xl' name='reps'>-</button>
                <button onClick={handleChangeAmount} value={1} className='bg-purple-500 hover:bg-purple-400 rounded px-1 ml-2 text-xl' name='reps'>+</button>
            </div>
            <div>
                <h4 className='text-xl'><span className='text-purple-500'>Cooldown:</span> {currentActivity.cooldown[currentSet]} <span className='text-green-500'>s</span></h4>
            </div>
            <div className='flex flex-row'>
                <h4 className='text-xl'><span className='text-purple-500'>Time:</span> {currentActivity.time[currentSet]}</h4>
                {/* add an edit to allow specified change in time in minutes */}
            </div>
            <div className='flex flex-row space-x-3 pl-3'>
                {currentSet === 0 ? null :<button onClick={handlePreviousSet} className='bg-purple-500 hover:bg-purple-400 rounded px-2'>Previous Set</button>}
                {currentSet + 1 === currentActivity.sets ? null : <button onClick={handleNextSet} className='bg-purple-500 hover:bg-purple-400 rounded px-2'>Next Set</button>}
                {currentActivityIndex === 0 ? null : <button onClick={handlePreviousActivity} className='bg-purple-500 hover:bg-purple-400 rounded px-2'>Previous Activity</button>}
                {currentActivityIndex + 1 === maxRounds ? null : <button onClick={handleNextActivity} className='bg-purple-500 hover:bg-purple-400 rounded px-2'>Next Activity</button>}
                {currentActivityIndex + 1 === maxRounds && currentSet + 1 === currentActivity.sets ? <button onClick={handleSaveWorkout} className='bg-purple-500 hover:bg-purple-400 rounded px-2'>Save Workout</button> : null}
            </div>
        </div>



        <Timer cooldownTime={currentActivity.cooldown[currentSet]}/>
    </div>
  )
}
