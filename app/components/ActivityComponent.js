import React from 'react'

export default function ActivityComponent({workoutObject, handleActivityChange, weightLiftingArray, currentNumber}) {
  return (
    <div>
        <label htmlFor='activity' className='pr-1'>Activity {currentNumber + 1}: </label>
            <select className='w-fit text-slate-800' name='activity' id='activity' placeholder='Select an activity' value={workoutObject.activity} onChange={handleActivityChange}>
            {!workoutObject.activity && <option value='Select Activity'>Select Activity</option>}
                {weightLiftingArray.map((item, index)=>{
                    return <option value={item} key={index + item}>{item}</option>
                }
                )}
            </select>
    </div>
  )
}
