import { NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { QueryCommand, UpdateCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";

export const POST = async (req) => {
    const { uid, workoutID } = await req.json();

    const params = {
        TableName: "workouts",
        Key: {
            uid: uid.toString(),
            workoutID: workoutID.toString(),
        },
    };

    try {
        await db.send(new DeleteCommand(params));
    } catch (error) {
        console.log(error);
        return NextResponse.error({ message: error.message }, { status: 400 });
    }

    // delete workoutID from workoutIDArray in liftappusers
    const params2 = {
        TableName: "liftappusers",
        KeyConditionExpression: "uid = :uidValue",
        ExpressionAttributeValues: {
            ":uidValue": uid.toString(),
        },
    };
    const response = await db.send(new QueryCommand(params2));
    const workoutIDArray = response.Items[0].workoutIDArray;
    const index = workoutIDArray.indexOf(workoutID.toString());
    if (index > -1) {
        workoutIDArray.splice(index, 1);
    }
    const params3 = {
        TableName: "liftappusers",
        Key: {
            uid: uid.toString(),
        },
        UpdateExpression: "SET workoutIDArray = :workoutIDArray",
        ExpressionAttributeValues: {
            ":workoutIDArray": workoutIDArray,
        },
    };
    await db.send(new UpdateCommand(params3));


    return NextResponse.json({ message: "Workout deleted" }, { status: 200 });
}
