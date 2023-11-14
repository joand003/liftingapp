import { NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { UpdateCommand, PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from "uuid";

export const POST = async (req) => {
    const { uid, workoutName, workoutArray, workoutID } = await req.json();
    let tempWorkoutID = workoutID;
    if (workoutID === "") {
        tempWorkoutID = uuidv4();
    }

    let formattedWorkoutArray = [];
    formattedWorkoutArray = workoutArray.map((exercise) => {
        return {
            M: {
                activity: { S: exercise.activity },
                weight: { L: exercise.weight.map(w=> ({N: w.toString()})) },
                reps: { L: exercise.reps.map(r=> ({N: r.toString()})) },
                time: { L: exercise.time.map(t=> ({N: t.toString()})) },
                cooldown: { L: exercise.cooldown.map(c=> ({N: c.toString()})) },
                sets: { N: exercise.sets.toString() },
            },
        };
    });
        


    const command = new PutItemCommand({
        TableName: "workouts",
        Item: {
            uid: {S: uid.toString()},
            workoutID: {S: tempWorkoutID.toString()},
            workoutName: {S: workoutName.toString()},
            workoutArray: {L: formattedWorkoutArray},
        },
    });


    try {
        await db.send(command);
    } catch (error) {
        console.log(error);
        return NextResponse.error({ message: error.message }, { status: 400 });
    }

    try {
        const params = {
            TableName: "liftappusers",
            KeyConditionExpression: "uid = :uidValue",
            ExpressionAttributeValues: {
                ":uidValue": uid.toString(),
            },
        };
        const response = await db.send(new QueryCommand(params));

        if (response.Items[0].workoutIDArray === undefined) {
            const newCommand = new UpdateCommand({
                TableName: "liftappusers",
                Key: {
                    uid: uid.toString(),
                },
                UpdateExpression: "SET workoutIDArray = :workoutIDArray",
                ExpressionAttributeValues: {
                    ":workoutIDArray": [tempWorkoutID.toString()],
                },
            });
            await db.send(newCommand);
        } else if (response.Items[0].workoutIDArray.includes(tempWorkoutID.toString())) {
            return NextResponse.json({ message: "Workout added" }, { status: 200 });
        } else {
            const newCommand = new UpdateCommand({
                TableName: "liftappusers",
                Key: {
                    uid: uid.toString(),
                },
                UpdateExpression: "SET workoutIDArray = :workoutIDArray",
                ExpressionAttributeValues: {
                    ":workoutIDArray": [...response.Items[0].workoutIDArray, tempWorkoutID.toString()],
                },
            });
            await db.send(newCommand);
        }


    } catch (error) {
        console.log(error);
        return NextResponse.error({ message: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: "Workout added" }, { status: 200 });
}
