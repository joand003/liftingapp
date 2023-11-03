import { NextResponse } from "next/server";
import axios from 'axios';


export const POST = async (req) => {
    const { exerciseName } = await req.json()

    const response = await axios.get(`https://api.api-ninjas.com/v1/exercises?name=${exerciseName}`, {
        headers: {
            'X-Api-Key': process.env.X_API_KEY
        }
    })

    return NextResponse.json({info: response.data}, {status: 200})
}
