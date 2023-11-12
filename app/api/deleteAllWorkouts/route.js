import { NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { QueryCommand, BatchWriteCommand } from "@aws-sdk/lib-dynamodb";

export const POST = async (req) => {
    const { uid } = await req.json();

    // const params = {
    //     TableName: "liftappusers",
    //     KeyConditionExpression: "uid = :uidValue",
    //     ExpressionAttributeValues: {
    //         ":uidValue": uid.toString(),
    //     },
    // };

    // const response = await db.send(new QueryCommand(params));
    // const workoutIDArray = response.Items[0].workoutIDArray;
    // console.log(`workoutIDArray: ${JSON.stringify(workoutIDArray)}`)
    let workoutIDArray = ['4b16a659-acc1-4f97-86f6-a0a4db320172', 'c99537cb-2ee4-4601-90f8-08fc7375e3b2', 'f4fcc332-1eb4-4198-b037-8616f6c3c3d1'];

    const deleteItemsInBatches = async (uid, workoutIDArray) => {
        for (let i = 0; i < workoutIDArray.length; i += 25) {
            const batch = workoutIDArray.slice(i, i + 25);
            console.log(`batch: ${JSON.stringify(batch)}`)
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
