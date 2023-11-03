import React, { useState } from 'react'
import weightLiftingArray from '@/utils/weightLiftingArray'

export default function WorkoutForm() {
    const [workoutName, setWorkoutName] = useState('')
    const [workoutArray, setWorkoutArray] = useState([])
    const [currentNumber, setCurrentNumber] = useState(0)
    const blankWorkout = {activity: '', weight: '', sets: '', reps: '', cooldown: '', dayofweek: '', time: ''}
    const [workoutObject, setWorkoutObject] = useState(blankWorkout)

    const numberOfWorkouts = workoutArray.length

    const handeAddActivity = (e) => {
        console.log("adding activity")
        console.log(workoutObject)
        const updatedWorkoutArray = [...workoutArray];
        updatedWorkoutArray[currentNumber] = workoutObject;

        const newWorkoutArray = workoutArray.map((object) => object === workoutArray[currentNumber] ? workoutObject : object)

        setWorkoutArray(newWorkoutArray)
        if (currentNumber === numberOfWorkouts) {
            setWorkoutObject(blankWorkout)
        } else {
            setWorkoutObject(workoutArray[currentNumber + 1])
        }
        setCurrentNumber(currentNumber + 1)

    }
    
    const handleRemoveActivity = (e) => {
        console.log("removing activity")
        let newArray = [...workoutArray]
        newArray.pop()
        setWorkoutArray(newArray)
    }

    const handleSumbit = (e) => {
        // TODO add a check to make sure all fields are filled out
        // TODO add check to make sure name is filled out
        // TODO add submit to database
        console.log("submitting")
        console.log(workoutArray)
        console.log(currentNumber)
    }

    const handleNext = (e) => {
        console.log("next")
        if (currentNumber === numberOfWorkouts) {
            return
        }
        setWorkoutObject(workoutArray[currentNumber + 1])
        setCurrentNumber(currentNumber + 1)
    }

    const handlePrevious = (e) => {
        console.log("previous")
        if (currentNumber === 0) {
            return
        }
        setWorkoutObject(workoutArray[currentNumber - 1])
        setCurrentNumber(currentNumber - 1)
    }


    const handleNameChange = (e) => {
        setWorkoutName(e.target.value)
    }

    const handleObjectChange = (e) => {
        const {name} = e.target
        setWorkoutObject((workoutObject)=>({...workoutObject, [name]: e.target.value}))
    }

  return (
    <div className=''>
    <form className='flex flex-col space-y-1'>
            <label htmlFor='name'>Workout Name:</label>
            <input className='w-1/4 pl-1 text-slate-800' type='text' name='name' id='name' value={workoutName} onChange={handleNameChange} placeholder='Enter a name for your workout' />
            <label htmlFor='activity'>Activity</label>
            <select className='w-fit text-slate-800' name='activity' id='activity' placeholder='Select an activity' value={workoutObject.activity} onChange={handleObjectChange}>
            {!workoutObject.activity && <option value='Select Activity'>Select Activity</option>}
                {weightLiftingArray.map((item, index)=>{
                    return <option value={item} key={index + item}>{item}</option>
                }
                )}
            </select>
            <label htmlFor='weight'>Weight</label>
            <input className='w-36 pl-1 text-slate-800' type='number' name='weight' id='weight' placeholder='Enter a weight' value={workoutObject.weight} onChange={handleObjectChange}/>
            <label htmlFor='sets'>Sets</label>
            <input className='w-48 pl-1 text-slate-800' type='number' name='sets' id='sets' placeholder='Enter a number of sets' value={workoutObject.sets} onChange={handleObjectChange}/>
            <label htmlFor='reps'>Reps</label>
            <input className='w-48 pl-1 text-slate-800' type='number' name='reps' id='reps' placeholder='Enter a number of reps' value={workoutObject.reps} onChange={handleObjectChange}/>
            <label htmlFor='cooldown'>Cooldown</label>
            <input className='w-64 pl-1 text-slate-800' type='number' name='cooldown' id='cooldown' placeholder='Enter a cooldown time in seconds' value={workoutObject.cooldown} onChange={handleObjectChange}/>
            <label htmlFor='dayofweek'>Day of Week</label>
            <select className='w-fit pl-1 text-slate-800' name='dayofweek' id='dayofweek' placeholder='Select a day of the week' value={workoutObject.dayofweek} onChange={handleObjectChange}>
                {!workoutObject.dayofweek && <option value='Select Day'>Select Day</option>}
                <option value='monday'>Monday</option>
                <option value='tuesday'>Tuesday</option>
                <option value='wednesday'>Wednesday</option>
                <option value='thursday'>Thursday</option>
                <option value='friday'>Friday</option>
                <option value='saturday'>Saturday</option>
                <option value='sunday'>Sunday</option>
            </select>
            {/* TODO add time for activities that require time such as a run or stretching etc */}
        {/* <label htmlFor='timer'>Timer</label>
        <input  className='w-fit pl-1 text-slate-800' type='number' name='timer' id='timer' placeholder='Enter a time in seconds' /> */}
        </form>
        <div className='pt-5'>
            <button className='bg-purple-500 hover:bg-purple-400 px-2 h-full mr-2' onClick={handeAddActivity}>{currentNumber + 1 != numberOfWorkouts ? 'Update activity' : 'Add activity'}</button>
            <button className='bg-purple-500 hover:bg-purple-400 px-2 h-full mr-2' onClick={handleRemoveActivity}>Remove activity</button>
            <button className='bg-purple-500 hover:bg-purple-400 px-2 h-full mr-2' onClick={handleSumbit}>Submit</button>
            {currentNumber === 0 ? null : <button className='bg-purple-500 hover:bg-purple-400 px-2 h-full mr-2' onClick={handlePrevious}>Previous Activity</button>}
            {currentNumber === numberOfWorkouts ? null : <button className='bg-purple-500 hover:bg-purple-400 px-2 h-full mr-2' onClick={handleNext}>Next Activity</button>}
        </div>
        <div>
            {workoutArray.length === 0 ? null : <h3 className='text-2xl'>Workout Preview</h3>}
            {workoutArray.map((item, index)=>{
                return (
                <div className='pb-10 flex flex-col max-w-5xl' key={index + 'div'}>
                    <p key={index + 'activity'}><span className='font-bold text-purple-600'>Activity:</span> {item.activity}</p>
                    <p key={index + 'sets'}><span className='font-bold text-purple-600'>Sets:</span> {item.sets}</p>
                    <p key={index + 'weight'}><span className='font-bold text-purple-600'>Weight:</span> {item.weight}</p>
                    <p key={index + 'reps'}><span className='font-bold text-purple-600'>Reps:</span> {item.reps}</p>
                    <p key={index + 'cd'}><span className='font-bold text-purple-600'>Cooldown:</span> {item.cooldown}</p>
                    <p key={index + 'dow'}><span className='font-bold text-purple-600'>Day of Week:</span> {item.dayofweek}</p>
                </div>
                )
            })}
        </div>
        </div>
  )
}
