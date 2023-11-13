import { NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { QueryCommand, BatchWriteCommand } from "@aws-sdk/lib-dynamodb";

export const POST = async (req) => {
    const { uid } = await req.json();

    const params = {
        TableName: "liftappusers",
        KeyConditionExpression: "uid = :uidValue",
        ExpressionAttributeValues: {
            ":uidValue": uid.toString(),
        },
    };

    const response = await db.send(new QueryCommand(params));
    const workoutIDArray = response.Items[0].workoutIDArray;

    const deleteItemsInBatches = async (uid, workoutIDArray) => {
        for (let i = 0; i < workoutIDArray.length; i += 25) {
            const batch = workoutIDArray.slice(i, i + 25);
            const deleteRequests = batch.map((workoutID) => {
                return {
                    DeleteRequest: {
                        Key: {
                            uid: uid.toString(),
                            workoutID: workoutID.toString(),
                        },
                    },
                };
            });

            const params = {
                RequestItems: {
                    workouts: deleteRequests,
                    }
            };
            try {
                await db.send(new BatchWriteCommand(params));
            } catch (error) {
                console.log(error);
                return NextResponse.error({ message: error.message }, { status: 400 });
            }
        }
    }
    await deleteItemsInBatches(uid, workoutIDArray);

    return NextResponse.json({ message: "All workouts deleted" }, { status: 200 });
}
