import { NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";

export const POST = async (req) => {
    const { uid } = await req.json();

    const params = {
        TableName: "workouts",
        KeyConditionExpression: "uid = :uidValue",
        ExpressionAttributeValues: {
            ":uidValue": uid.toString(),
        },
    };

    try {
        const response = await db.send(new QueryCommand(params));
        
        return NextResponse.json({ data: response.Items }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.error({ message: error.message }, { status: 400 });
    }
}