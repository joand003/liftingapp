import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { QueryCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { db } from "../../../../lib/db";


export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        session: ({ session, token }) => ({
          ...session,
          user: {
            ...session.user,
            id: token.sub,
          },
        }),
        async signIn({ user, account, profile, email, credentials }) {
            const params = {
                TableName: "liftappusers",
                KeyConditionExpression: "uid = :uidValue",
                ExpressionAttributeValues: {
                    ":uidValue": user.id.toString(),
                },
            };
        
            try {
                const response = await db.send(new QueryCommand(params));
                if (response.Items.length === 0) {
                    const command = new PutCommand({
                        TableName: "liftappusers",
                        Item: {
                            uid: user.id.toString(),
                            name: user.name,
                            email: user.email,
                            workoutIDArray: [],
                        },
                    });
                    await db.send(command);
                    console.log("User added");
        
                }
                return true
            } catch (error) {
                console.log(error);
                return false
            } 
        },
    }
}
    

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST}