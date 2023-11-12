import { NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { DeleteCommand } from "@aws-sdk/lib-dynamodb";

export const POST = async (req) => {
    const { uid } = await req.json();

    const params = {
        TableName: "liftappusers",
        Key: {
            uid: uid.toString(),
        },
    };

    try {
        await db.send(new DeleteCommand(params));
        return NextResponse.json({ message: "User deleted" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.error({ message: error.message }, { status: 400 });
    }
}
