"use client"
import React, { useState, useEffect } from 'react'
import { BsVolumeMuteFill, BsVolumeUpFill } from 'react-icons/bs'

export default function ActivityTimer({activityTime}) {
    let defaultTime = activityTime || 1800;

    const [time, setTime] = useState(defaultTime)
    const [timerOn, setTimerOn] = useState(false)
    const [timeOptionsOn, setTimeOptionsOn] = useState(false)
    const [soundOn, setSoundOn] = useState(true)

    const hours = Math.floor(time / 3600)
    const minutes = Math.floor(time / 60 % 60)
    const seconds = Math.floor(time % 60)

    useEffect(() => {
        setTime(activityTime)
        setTimerOn(false)
    }, [activityTime])

    useEffect(() => {
        let interval = null

        if (timerOn && time > 0) {
            interval = setInterval(() => {
                setTime(time => time - 1)
            }, 1000)
        } else if (timerOn && time === 0) {
            clearInterval(interval)
            const audio = new Audio('/alarm.mp3')
            if (soundOn) {
                audio.play()    
            }
            setTimerOn(false)
        }

        return () => clearInterval(interval)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timerOn, time])

    const toggleTimer = () => {
        setTimerOn(!timerOn)
    }

    const toggleTimeOptions = () => {
        setTimeOptionsOn(!timeOptionsOn)
    }

    const toggleSound = () => {
        setSoundOn(!soundOn)
    }

    const resetTimer = () => {
        setTime(defaultTime)
        setTimerOn(false)
    }
    const changeTime = (e) => {
        let newTime = time + Number(e.target.value)
        if (newTime < 0) {
            newTime = 0
        }
        if (newTime > 36000) {
            newTime = 36000
        }
        setTime(newTime)
    }

  return (
    <div className='my-1 p-2 border border-r-1 border-teal-500 w-full bg-gray-700'>
        <h3 className='text-2xl'>Activity Timer</h3>
        <div className='text-3xl text-purple-200 pl-10 pb-2'>{hours}:{minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds}</div>
        {timeOptionsOn ? <div className='pb-2'>
            <button onClick={changeTime} value={1800} className='bg-purple-500 hover:bg-color-400 rounded px-2 mr-2 mt-2'>+30min</button>
            <button onClick={changeTime} value={300} className='bg-purple-500 hover:bg-color-400 rounded px-2 mr-2 mt-2'>+5min</button>
            <button onClick={changeTime} value={60} className='bg-purple-500 hover:bg-color-400 rounded px-2 mr-2 mt-2'>+1min</button>
            <button onClick={changeTime} value={-1800} className='bg-purple-500 hover:bg-color-400 rounded px-2 mr-2 mt-2'>-30min</button>
            <button onClick={changeTime} value={-300} className='bg-purple-500 hover:bg-color-400 rounded px-2 mr-2 mt-2'>-5min</button>
            <button onClick={changeTime} value={-60} className='bg-purple-500 hover:bg-color-400 rounded px-2 mr-2 mt-2'>-1min</button>
        </div>: null}
        <div className='pl-5 flex flex-row'>
            {time > 0 ? <button className='bg-purple-500 hover:bg-color-400 rounded px-2 mr-2' onClick={toggleTimer}>{timerOn ? 'Pause' : 'Start'}</button> : null}
            <button className='bg-purple-500 hover:bg-color-400 rounded px-2' onClick={resetTimer}>Reset</button>
            <button className='bg-purple-500 hover:bg-color-400 rounded px-2 mx-2' onClick={toggleTimeOptions}>{timeOptionsOn ? 'Hide options' : 'Edit time'}</button>
            {soundOn ? <BsVolumeUpFill className='hover:cursor-pointer' onClick={toggleSound} size={25}/> : <BsVolumeMuteFill className='hover:cursor-pointer' onClick={toggleSound} size={25}/>}
            
        </div>
    </div>
  )
}
