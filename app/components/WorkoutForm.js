"use client"
import React, { useState, useEffect } from 'react'
import weightLiftingArray from '@/utils/weightLiftingArray'
import DayComponent from './DayComponent'
import ActivityComponent from './ActivityComponent'

export default function WorkoutForm() {
    const [workoutName, setWorkoutName] = useState('')
    const [currentNumber, setCurrentNumber] = useState(0)
    const [workoutDay, setWorkoutDay] = useState('')
    const blankWorkout = {activity: '', weight: [''], sets: 1, reps: [''], cooldown: [''], time: ['']}
    const [workoutObject, setWorkoutObject] = useState(blankWorkout)
    const [workoutArray, setWorkoutArray] = useState([blankWorkout])
    const numberOfRadioDials = 5 //Max # is 9 to avoid errors in handleObjectyArrayChange (Should be fine as no one does more then 9 sets)
    const numberOfWorkouts = workoutArray.length


    const handeAddActivity = () => {
        console.log("adding activity")

        let newWorkoutArray = [...workoutArray, blankWorkout]
        setWorkoutArray(newWorkoutArray)
        setCurrentNumber(currentNumber + 1)
    }
    
    const handleRemoveActivity = () => {
        console.log("removing activity")
        let newArray = [...workoutArray]
        newArray.splice(currentNumber, 1)
        if (newArray.length === 0) {
            setWorkoutObject(blankWorkout)
            setWorkoutArray([blankWorkout])
            return
        }
        setWorkoutArray(newArray)
        if (currentNumber === 0) {
            return
        }
        setCurrentNumber(currentNumber - 1)
    }

    const handleSumbit = () => {
        // TODO add a check to make sure all fields are filled out
        // TODO add check to make sure name is filled out
        // TODO add submit to database
        // TODO check if all fields are filled in and add current workout to array then submit to database
        console.log("submitting")
        console.log(`workoutObject: ${JSON.stringify(workoutObject)}`)
        console.log(`workoutArray: ${workoutArray.length}`)
        console.log(`currentNumber: ${currentNumber}`)
    }

    const handleNext = () => {
        console.log("next")
        if (currentNumber + 1 === numberOfWorkouts) {
            return
        }
        setCurrentNumber(currentNumber + 1)
    }

    const handlePrevious = () => {
        console.log("previous")
        if (currentNumber === 0) {
            return
        }
        setCurrentNumber(currentNumber - 1)
    }


    const handleNameChange = (e) => {
        setWorkoutName(e.target.value)
    }

    const handleSetsChange = (e) => {
        let tempWorkoutObject = {...workoutObject}
        tempWorkoutObject.sets = e.target.value
        setWorkoutObject(tempWorkoutObject)
        const tempWorkoutArray = workoutArray.map((object) => object === workoutArray[currentNumber] ? tempWorkoutObject : object)
        setWorkoutArray(tempWorkoutArray)
    }

    const handleActivityChange = (e) => {
        let tempWorkoutObject = {...workoutObject}
        tempWorkoutObject.activity = e.target.value
        setWorkoutObject(tempWorkoutObject)
        const tempWorkoutArray = workoutArray.map((object) => object === workoutArray[currentNumber] ? tempWorkoutObject : object)
        setWorkoutArray(tempWorkoutArray)
    }

    const handleObjectArrayChange = (e) => {
        const {name} = e.target
        const index = Number(e.target.id.slice(-1))
        const tempArray = workoutObject[name]
        tempArray[index] = e.target.value
        setWorkoutObject((workoutObject)=>({...workoutObject, [name]: tempArray}))
    }

    const handleDayChange = (e) => {
        setWorkoutDay(e.target.value)
    }


    const radioDials = []
    for (let i = 0; i < numberOfRadioDials; i++) {
        radioDials.push(<input className='ml-2' type='radio' name='sets' id={`sets${i}`} value={i + 1} checked={workoutObject.sets == i + 1} onChange={handleSetsChange} key={i + 'input'}/>)
        radioDials.push(<label className='mr-4 pl-1' htmlFor={`sets${i}`} key={i + 'label'}>{i + 1}</label>)
    }

    useEffect(() => {
        //* This is to reset the workout object when the current number changes
        if (workoutArray.length === 0) {
            setWorkoutObject(blankWorkout)
        } else {
            setWorkoutObject(workoutArray[currentNumber])
        }
    }, [workoutArray, currentNumber])

    useEffect(() => {
        //* This is to update the number of sets in the workout object specifically the weight, reps, and cooldown arrays
        for (let i = workoutObject.weight.length; i < workoutObject.sets; i++) {
            let tempWeightArray = workoutObject.weight
            tempWeightArray.push('')
            setWorkoutObject((workoutObject)=>({...workoutObject, weight: tempWeightArray}))
        }
        for (let i = workoutObject.reps.length; i < workoutObject.sets; i++) {
            let tempRepsArray = workoutObject.reps
            tempRepsArray.push('')
            setWorkoutObject((workoutObject)=>({...workoutObject, reps: tempRepsArray}))
        }
        for (let i = workoutObject.cooldown.length; i < workoutObject.sets; i++) {
            let tempCooldownArray = workoutObject.cooldown
            tempCooldownArray.push('')
            setWorkoutObject((workoutObject)=>({...workoutObject, cooldown: tempCooldownArray}))
        }
        for (let i = workoutObject.time.length; i < workoutObject.sets; i++) {
            let tempTimeArray = workoutObject.time
            tempTimeArray.push('')
            setWorkoutObject((workoutObject)=>({...workoutObject, time: tempTimeArray}))
        }

        for (let i = workoutObject.weight.length; i > workoutObject.sets; i--) {
            let tempWeightArray = workoutObject.weight
            tempWeightArray.pop()
            setWorkoutObject((workoutObject)=>({...workoutObject, weight: tempWeightArray}))
        }
        for (let i = workoutObject.reps.length; i > workoutObject.sets; i--) {
            let tempRepsArray = workoutObject.reps
            tempRepsArray.pop()
            setWorkoutObject((workoutObject)=>({...workoutObject, reps: tempRepsArray}))
        }
        for (let i = workoutObject.cooldown.length; i > workoutObject.sets; i--) {
            let tempCooldownArray = workoutObject.cooldown
            tempCooldownArray.pop()
            setWorkoutObject((workoutObject)=>({...workoutObject, cooldown: tempCooldownArray}))
        }
        for (let i = workoutObject.time.length; i > workoutObject.sets; i--) {
            let tempTimeArray = workoutObject.time
            tempTimeArray.pop()
            setWorkoutObject((workoutObject)=>({...workoutObject, time: tempTimeArray}))
        }
    
    }, [workoutObject.sets])

  return (
    <div className=''>
    <form className='flex flex-col space-y-1'>
            <label htmlFor='name'>Workout Name:</label>
            <input className='w-1/4 pl-1 text-slate-800' type='text' name='name' id='name' value={workoutName} onChange={handleNameChange} placeholder='Enter a name for your workout' />
            <DayComponent workoutDay={workoutDay} handleDayChange={handleDayChange}/>
            <ActivityComponent workoutObject={workoutObject} handleActivityChange={handleActivityChange} weightLiftingArray={weightLiftingArray} currentNumber={currentNumber}/>
            <div>
            <label className='' htmlFor='sets'>Sets:</label>
            {radioDials}
            </div>
                {workoutObject.weight.map((item, index)=>{
                    return (
                        <div key={index + 'div'} className='flex flex-col'>
                            <label htmlFor={`weight${index}`}>Weight for set {index + 1}</label>
                            <input className='w-36 pl-1 text-slate-800' type='number' name='weight' id={`weight${index}`} placeholder='Enter a weight' value={workoutObject.weight[index]} onChange={handleObjectArrayChange} key={index + 'weightInput'}/>
                            <label htmlFor={`reps${index}`}>Reps for set {index + 1}</label>
                            <input className='w-48 pl-1 text-slate-800' type='number' name='reps' id={`reps${index}`} placeholder='Enter the number of reps' value={workoutObject.reps[index]} onChange={handleObjectArrayChange} key={index + 'repsInput'}/>
                            <label htmlFor={`cooldown${index}`}>Cooldown for set {index + 1}</label>
                            <input className='w-64 pl-1 text-slate-800' type='number' name='cooldown' id={`cooldown${index}`} placeholder='Enter a cooldown time in seconds' value={workoutObject.cooldown[index]} onChange={handleObjectArrayChange} key={index + 'cooldownInput'}/>
                            <label htmlFor={`time${index}`}>Time for set {index + 1}</label>
                            <input className='w-64 pl-1 mb-6 text-slate-800' type='number' name='time' id={`time${index}`} placeholder='Enter a time in minutes if needed' value={workoutObject.time[index]} onChange={handleObjectArrayChange} key={index + 'timeInput'}/>
                        </div>
                    )
                })}
        </form>
        <div className='pt-5'>
            <button className='bg-purple-500 hover:bg-purple-400 px-2 h-full mr-2' onClick={handleRemoveActivity}>Remove this activity</button>
            <button className='bg-purple-500 hover:bg-purple-400 px-2 h-full mr-2' onClick={handeAddActivity}>Add new activity</button>
            <button className='bg-purple-500 hover:bg-purple-400 px-2 h-full mr-2' onClick={handleSumbit}>Submit</button>
            {currentNumber === 0 ? null : <button className='bg-purple-500 hover:bg-purple-400 px-2 h-full mr-2' onClick={handlePrevious}>Previous Activity</button>}
            {currentNumber + 1 >= numberOfWorkouts ? null : <button className='bg-purple-500 hover:bg-purple-400 px-2 h-full mr-2' onClick={handleNext}>Next Activity</button> }
        </div>
        <div>
            <h3 className='text-2xl'>Workout Preview</h3>
            <p className='text-xl'><span className='font-bold text-purple-600'>Workout Name:</span> {workoutName}</p>
            <p className='text-xl'><span className='font-bold text-purple-600'>Day of Week:</span> {workoutDay}</p>
            {workoutArray.map((item, index)=>{
                return (
                    console.log(`item.sets: ${item.sets}`),
                <div className='pb-10 flex flex-col max-w-5xl' key={index + 'div'}>
                    <p key={index + 'activity'}><span className='font-bold text-purple-600'>Activity {index + 1}:</span> {item.activity}</p>
                    <p key={index + 'sets'}><span className='font-bold text-purple-600'>Sets:</span> {item.sets}</p>
                    <div className='flex flex-row text-green-500'>
                        <div className='flex flex-col'>
                            {item.weight.map((item, index)=>{
                                return (
                                        <p key={index + 'weight'} className='pr-3'><span className='font-bold text-purple-600'>Weight:</span> {item} {item < 2 ? 'lb' : 'lbs'}</p>
                                )
                            })}
                        </div>
                        <div className='flex flex-col'>
                            {item.reps.map((item, index)=>{
                                return (
                                        <p key={index + 'reps'} className='pr-3'><span className='font-bold text-purple-600'>Reps:</span> {item}</p>
                                )
                            })}
                        </div>
                        <div className='flex flex-col'>
                            {item.cooldown.map((item, index)=>{
                                return (
                                        <p key={index + 'cd'} className='pr-3'><span className='font-bold text-purple-600'>Cooldown:</span> {item} s</p>
                                )
                            })}
                        </div>
                        <div className='flex flex-col'>
                            {item.time.map((item, index)=>{
                                return (
                                        <p key={index + 'time'} className='pr-3'><span className='font-bold text-purple-600'>Time:</span> {item} min</p>
                                )
                            })}
                        </div>
                    </div>
                </div>
                )
            })}
        </div>
        </div>
  )
}
