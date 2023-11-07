import React from 'react'

export default function DayComponent({workoutDay, handleDayChange}) {
  return (
    <div>
        <label htmlFor='dayofweek'>Day of Week</label>
            <select className='w-fit pl-1 text-slate-800' name='dayofweek' id='dayofweek' placeholder='Select a day of the week' value={workoutDay} onChange={handleDayChange}>
                {!workoutDay && <option value='Select Day'>Select Day</option>}
                <option value='Monday'>Monday</option>
                <option value='Tuesday'>Tuesday</option>
                <option value='Wednesday'>Wednesday</option>
                <option value='Thursday'>Thursday</option>
                <option value='Friday'>Friday</option>
                <option value='Saturday'>Saturday</option>
                <option value='Sunday'>Sunday</option>
            </select>
    </div>
  )
}
