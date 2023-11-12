import { NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { UpdateCommand, PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";

export const POST = async (req) => {
    const { uid, workoutName, workoutArray, workoutID } = await req.json();
    let tempWorkoutID = workoutID;
    if (workoutID === "") {
        tempWorkoutID = uuidv4();
    }

    const command = new PutCommand({
        TableName: "workouts",
        Item: {
            uid: uid.toString(),
            workoutID: tempWorkoutID.toString(),
            workoutName,
            workoutArray,
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

        console.log(`response.Items from submitWorkout: ${JSON.stringify(response.Items[0].workoutIDArray)}`);

    } catch (error) {
        console.log(error);
        return NextResponse.error({ message: error.message }, { status: 400 });
    }

    console.log("Workout added");
    // Maybe add this to the users array of workouts??
    return NextResponse.json({ message: "Workout added" }, { status: 200 });
}
