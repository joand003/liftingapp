"use client"
import React from 'react'
import axios from 'axios'
import { useSession } from 'next-auth/react'

// THIS IS A TEST COMPONENT TO TEST API CALLS it has no use in the app

export default function TestComponent() {
    const { data: session } = useSession();

  return (
    <div>
        <button 
        className='bg-purple-500 hover:bg-purple-400 px-2 h-full border-black border-x'
        onClick={async ()=>{
            const res = await axios.post('/api/queryExerciseList', {uid: "112547800018789440842"})
            console.log(`res.data: ${JSON.stringify(res.data)}`)
            console.log(`res.data.data: ${JSON.stringify(res.data.data)}`)
            console.log(`res.data.data[0]: ${JSON.stringify(res.data.data[0])}`)
            console.log(`res.data.data[0].workoutArray: ${JSON.stringify(res.data.data[0].workoutArray)}`)
            console.log(`res.data.data[0].workoutID: ${JSON.stringify(res.data.data[0].workoutID)}`)
            console.log(`res.data.data[0].workoutName: ${JSON.stringify(res.data.data[0].workoutName)}`)
        }}>Test</button>
        <button className='bg-purple-500 hover:bg-purple-400 px-2 h-full border-black border-x' onClick={async ()=>{
            const res = await axios.post('/api/getWorkouts', {uid: session.user.id, name: session.user.name, email: session.user.email})
            console.log(`res.data: ${JSON.stringify(res.data)}`)
        }}>login </button>

        <button className='bg-purple-500 hover:bg-purple-400 px-2 h-full border-black border-x' onClick={async ()=>{
            const res = await axios.post('/api/deleteWorkout', {uid: "112547800018789440842", workoutID: "dbdf7670-f826-4856-b9da-e58f4253c272"})
            console.log(`res.data.message: ${JSON.stringify(res.data.message)}`)
        }
        }>delete</button>

        <button className='bg-purple-500 hover:bg-purple-400 px-2 h-full border-black border-x' onClick={async ()=>{
            const res = await axios.post('/api/deleteAllWorkouts', {uid: "112547800018789440842"})

            console.log(`res.data.message: ${JSON.stringify(res.data.message)}`)
        }}>delete all</button>

    </div>
  )
}
