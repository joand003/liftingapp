"use client"
import React from 'react'

export default function SetComponent(workoutObject, handleObjectArrayChange) {


    // const setUI = workoutObject.workoutObject.weight.map((item, index)=>{
    //     return (
    //         <div key={index + 'div'} className='flex flex-col'>
    //             <label htmlFor={`weight${index}`}>Weight for set {index + 1}</label>
    //             <input className='w-36 pl-1 text-slate-800' type='number' name='weight' id={`weight${index}`} placeholder='Enter a weight' value={workoutObject.weight[index]} onChange={handleObjectArrayChange} key={index + 'weightInput'}/>
    //             <label htmlFor={`reps${index}`}>Reps for set {index + 1}</label>
    //             <input className='w-48 pl-1 text-slate-800' type='number' name='reps' id={`reps${index}`} placeholder='Enter the number of reps' value={workoutObject.reps[index]} onChange={handleObjectArrayChange} key={index + 'repsInput'}/>
    //             <label htmlFor={`cooldown${index}`}>Cooldown for set {index + 1}</label>
    //             <input className='w-64 pl-1 mb-6 text-slate-800' type='number' name='cooldown' id={`cooldown${index}`} placeholder='Enter a cooldown time in seconds' value={workoutObject.cooldown[index]} onChange={handleObjectArrayChange} key={index + 'cooldownInput'}/>
    //         </div>
    //     )
    // })

  return (
    <div>
        {/* {setUI} */}
        {workoutObject.workoutObject.weight.map((item, index)=>{
            return (
                <p key={index}>Test {index}</p>
            )
        })}
    </div>
  )
}
