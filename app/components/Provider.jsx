"use client"
import { SessionProvider } from "next-auth/react"

const Provider = ({ children }) => {
    return <SessionProvider session={session}>{children}</SessionProvider>
}

export default Provider