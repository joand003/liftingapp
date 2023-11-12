"use client"
import React, { useState, useEffect } from 'react'
import weightLiftingArray from '@/utils/weightLiftingArray'
import ActivityComponent from './ActivityComponent'
import axios from 'axios'
import { useSession } from 'next-auth/react'


export default function WorkoutForm() {
    const { data: session } = useSession();
    const [exerciseListArray, setExerciseListArray] = useState([])
    const [exerciseNameArray, setExerciseNameArray] = useState([])
    const [workoutIDArray, setWorkoutIDArray] = useState([])
    const [workoutName, setWorkoutName] = useState('')
    const [workoutID, setWorkoutID] = useState('')
    const [currentIndex, setCurrentIndex] = useState(0)
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [usingExistingWorkout, setUsingExistingWorkout] = useState(false)
    const blankWorkout = {activity: '', weight: [''], sets: 1, reps: [''], cooldown: [''], time: ['']}
    const [workoutArray, setWorkoutArray] = useState([blankWorkout])
    const numberOfRadioDials = 5 //Max # is 9 to avoid errors in handleObjectyArrayChange (Should be fine as no one does more then 9 sets)
    const numberOfWorkouts = workoutArray.length

    const handeAddActivity = () => {
        let newWorkoutArray = [...workoutArray, blankWorkout]
        setWorkoutArray(newWorkoutArray)
        setCurrentIndex(currentIndex + 1)
    }
    
    const handleRemoveActivity = () => {
        let newArray = [...workoutArray]
        newArray.splice(currentIndex, 1)
        if (newArray.length === 0) {
            setWorkoutArray([blankWorkout])
            return
        }
        setWorkoutArray(newArray)
        if (currentIndex === 0) {
            return
        }
        setCurrentIndex(currentIndex - 1)
    }

    const handleSumbit = async () => {
        if (workoutName === '') {
            alert('Please enter a name for your workout')
            return
        }
        const response = await axios.post('/api/submitWorkout', {uid: session.user.id, workoutName, workoutArray, workoutID})
        setWorkoutID('')
        setWorkoutName('')
        setWorkoutArray([blankWorkout])
        setUsingExistingWorkout(false)
        setErrorMessage('')
        setCurrentIndex(0)
        setExerciseListArray([])
        setExerciseNameArray([])
        setWorkoutIDArray([])
    }

    const handleNext = () => {
        if (currentIndex + 1 === numberOfWorkouts) {
            return
        }
        setCurrentIndex(currentIndex + 1)
    }

    const handlePrevious = () => {
        if (currentIndex === 0) {
            return
        }
        setCurrentIndex(currentIndex - 1)
    }


    const handleNameChange = (e) => {
        setWorkoutName(e.target.value)
    }

    const handleSetsChange = (e) => {
        let tempWorkoutObject = {...workoutArray[currentIndex]}
        tempWorkoutObject.sets = e.target.value
        const tempWorkoutArray = workoutArray.map((object) => object === workoutArray[currentIndex] ? tempWorkoutObject : object)
        setWorkoutArray(tempWorkoutArray)
    }

    const handleActivityChange = (e) => {
        let tempWorkoutObject = {...workoutArray[currentIndex]}
        tempWorkoutObject.activity = e.target.value
        const tempWorkoutArray = workoutArray.map((object) => object === workoutArray[currentIndex] ? tempWorkoutObject : object)
        setWorkoutArray(tempWorkoutArray)
    }

    const handleObjectArrayChange = (e) => {
        const {name} = e.target
        const index = Number(e.target.id.slice(-1))
        const tempArray = workoutArray[currentIndex][name]
        tempArray[index] = e.target.value
        const tempWorkoutArray = workoutArray.map((object) => object === workoutArray[currentIndex] ? {...workoutArray[currentIndex], [name]: tempArray} : object)
        setWorkoutArray(tempWorkoutArray)

    }


    const radioDials = []
    for (let i = 0; i < numberOfRadioDials; i++) {
        radioDials.push(<input className='ml-2' type='radio' name='sets' id={`sets${i}`} value={i + 1} checked={workoutArray[currentIndex].sets == i + 1} onChange={handleSetsChange} key={i + 'input'}/>)
        radioDials.push(<label className='mr-4 pl-1' htmlFor={`sets${i}`} key={i + 'label'}>{i + 1}</label>)
    }

    const loadExistingWorkouts = async() => {
        setErrorMessage('')
        setIsLoading(true)
        const response = await axios.post('/api/queryExerciseList', {uid: session.user.id})
        if (response.data.data.length === 0) {
            setErrorMessage('You have no workouts to edit')
            setIsLoading(false)
            return
        }
        const tempWorkoutArray = response.data.data.map((item) => {
            return (item.workoutArray)
        })
        const tempExerciseNameArray = response.data.data.map((item) => {
            return (item.workoutName)
        })
        const tempWorkoutIDArray = response.data.data.map((item) => {
            return (item.workoutID)
        })
        setExerciseNameArray(tempExerciseNameArray)
        setExerciseListArray(tempWorkoutArray)
        setWorkoutIDArray(tempWorkoutIDArray)
        setIsLoading(false)
    }

    const handleLoadingExistingWorkouts = () => {
        setUsingExistingWorkout(true)
        loadExistingWorkouts()
    }

    const handleSelectWorkout = (e) => {
        const index = e.target.options[e.target.selectedIndex].getAttribute('data-index')
        setWorkoutArray(exerciseListArray[index])
        setWorkoutName(exerciseNameArray[index])
        setWorkoutID(workoutIDArray[index])
    }

    const handleNewWorkout = () => {
        setWorkoutID('')
        setWorkoutName('')
        setWorkoutArray([blankWorkout])
        setUsingExistingWorkout(false)
    }
        

    useEffect(() => {
        //* This is to update the number of sets in the workout object specifically the weight, reps, and cooldown arrays
        for (let i = workoutArray[currentIndex].weight.length; i < workoutArray[currentIndex].sets; i++) {
            let tempWeightArray = workoutArray[currentIndex].weight
            tempWeightArray.push('')
            const tempWorkoutArray = workoutArray.map((object) => object === workoutArray[currentIndex] ? {...workoutArray[currentIndex], weight: tempWeightArray} : object)
            setWorkoutArray(tempWorkoutArray)
        }
        for (let i = workoutArray[currentIndex].reps.length; i < workoutArray[currentIndex].sets; i++) {
            let tempRepsArray = workoutArray[currentIndex].reps
            tempRepsArray.push('')
            const tempWorkoutArray = workoutArray.map((object) => object === workoutArray[currentIndex] ? {...workoutArray[currentIndex], reps: tempRepsArray} : object)
            setWorkoutArray(tempWorkoutArray)
        }
        for (let i = workoutArray[currentIndex].cooldown.length; i < workoutArray[currentIndex].sets; i++) {
            let tempCooldownArray = workoutArray[currentIndex].cooldown
            tempCooldownArray.push('')
            const tempWorkoutArray = workoutArray.map((object) => object === workoutArray[currentIndex] ? {...workoutArray[currentIndex], cooldown: tempCooldownArray} : object)
            setWorkoutArray(tempWorkoutArray)
        }
        for (let i = workoutArray[currentIndex].time.length; i < workoutArray[currentIndex].sets; i++) {
            let tempTimeArray = workoutArray[currentIndex].time
            tempTimeArray.push('')
            const tempWorkoutArray = workoutArray.map((object) => object === workoutArray[currentIndex] ? {...workoutArray[currentIndex], time: tempTimeArray} : object)
            setWorkoutArray(tempWorkoutArray)
        }

        for (let i = workoutArray[currentIndex].weight.length; i > workoutArray[currentIndex].sets; i--) {
            let tempWeightArray = workoutArray[currentIndex].weight
            tempWeightArray.pop()
            const tempWorkoutArray = workoutArray.map((object) => object === workoutArray[currentIndex] ? {...workoutArray[currentIndex], weight: tempWeightArray} : object)
            setWorkoutArray(tempWorkoutArray)

        }
        for (let i = workoutArray[currentIndex].reps.length; i > workoutArray[currentIndex].sets; i--) {
            let tempRepsArray = workoutArray[currentIndex].reps
            tempRepsArray.pop()
            const tempWorkoutArray = workoutArray.map((object) => object === workoutArray[currentIndex] ? {...workoutArray[currentIndex], reps: tempRepsArray} : object)
            setWorkoutArray(tempWorkoutArray)
        }
        for (let i = workoutArray[currentIndex].cooldown.length; i > workoutArray[currentIndex].sets; i--) {
            let tempCooldownArray = workoutArray[currentIndex].cooldown
            tempCooldownArray.pop()
            const tempWorkoutArray = workoutArray.map((object) => object === workoutArray[currentIndex] ? {...workoutArray[currentIndex], cooldown: tempCooldownArray} : object)
            setWorkoutArray(tempWorkoutArray)
        }
        for (let i = workoutArray[currentIndex].time.length; i > workoutArray[currentIndex].sets; i--) {
            let tempTimeArray = workoutArray[currentIndex].time
            tempTimeArray.pop()
            const tempWorkoutArray = workoutArray.map((object) => object === workoutArray[currentIndex] ? {...workoutArray[currentIndex], time: tempTimeArray} : object)
            setWorkoutArray(tempWorkoutArray)
        }
    
    }, [workoutArray[currentIndex].sets])



  return (
    <div className=''>
        <h4 className='text-xl'>Select from your workouts:</h4>
        <button className='bg-purple-500 hover:bg-purple-400 px-2 h-full mr-2' onClick={handleNewWorkout}>Start new workout</button>
        <button className='bg-purple-500 hover:bg-purple-400 px-2 h-full mr-2' disabled={isLoading} onClick={handleLoadingExistingWorkouts}>Load Workouts</button>
        {errorMessage === "" && usingExistingWorkout ? <select className='w-1/4 pl-1 text-slate-800' name='workout' id='workout' onChange={handleSelectWorkout}>
            <option value='Select a workout'>Select a workout</option>
            {exerciseNameArray.map((item, index)=>{
                return (
                    <option key={index + 'exerciseArrays'} data-index={index} value={item}>{item}</option>
                )
            })}
        </select> : null}
        {errorMessage === "" ? null : <p className='text-red-500'>{errorMessage}</p>}

    <form className='flex flex-col space-y-1'>
            <label htmlFor='name'>Workout Name:</label>
            <input className='w-1/4 pl-1 text-slate-800' type='text' name='name' id='name' value={workoutName} onChange={handleNameChange} placeholder='Enter a name for your workout' />
            <ActivityComponent workoutArray={workoutArray} handleActivityChange={handleActivityChange} weightLiftingArray={weightLiftingArray} currentIndex={currentIndex}/>
            <div>
            <label className='' htmlFor='sets'>Sets:</label>
            {radioDials}
            </div>
                {workoutArray[currentIndex].weight.map((item, index)=>{
                    return (
                        <div key={index + 'div'} className='flex flex-col'>
                            <label htmlFor={`weight${index}`}>Weight for set {index + 1}</label>
                            <input className='w-36 pl-1 text-slate-800' type='number' name='weight' id={`weight${index}`} placeholder='Enter a weight' value={workoutArray[currentIndex].weight[index]} onChange={handleObjectArrayChange} key={index + 'weightInput'}/>
                            <label htmlFor={`reps${index}`}>Reps for set {index + 1}</label>
                            <input className='w-48 pl-1 text-slate-800' type='number' name='reps' id={`reps${index}`} placeholder='Enter the number of reps' value={workoutArray[currentIndex].reps[index]} onChange={handleObjectArrayChange} key={index + 'repsInput'}/>
                            <label htmlFor={`cooldown${index}`}>Cooldown for set {index + 1}</label>
                            <input className='w-64 pl-1 text-slate-800' type='number' name='cooldown' id={`cooldown${index}`} placeholder='Enter a cooldown time in seconds' value={workoutArray[currentIndex].cooldown[index]} onChange={handleObjectArrayChange} key={index + 'cooldownInput'}/>
                            <label htmlFor={`time${index}`}>Time for set {index + 1}</label>
                            <input className='w-64 pl-1 mb-6 text-slate-800' type='number' name='time' id={`time${index}`} placeholder='Enter a time in minutes if needed' value={workoutArray[currentIndex].time[index]} onChange={handleObjectArrayChange} key={index + 'timeInput'}/>
                        </div>
                    )
                })}
        </form>
        <div className='pt-5'>
            <button className='bg-purple-500 hover:bg-purple-400 px-2 h-full mr-2' onClick={handleRemoveActivity}>Remove this activity</button>
            <button className='bg-purple-500 hover:bg-purple-400 px-2 h-full mr-2' onClick={handeAddActivity}>Add new activity</button>
            <button className='bg-purple-500 hover:bg-purple-400 px-2 h-full mr-2' onClick={handleSumbit}>Submit</button>
            {currentIndex === 0 ? null : <button className='bg-purple-500 hover:bg-purple-400 px-2 h-full mr-2' onClick={handlePrevious}>Previous Activity</button>}
            {currentIndex + 1 >= numberOfWorkouts ? null : <button className='bg-purple-500 hover:bg-purple-400 px-2 h-full mr-2' onClick={handleNext}>Next Activity</button> }
        </div>
        <div>
            <h3 className='text-2xl'>Workout Preview</h3>
            <p className='text-xl'><span className='font-bold text-purple-600'>Workout Name:</span> {workoutName}</p>
            {workoutArray.map((item, index)=>{
                return (
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
