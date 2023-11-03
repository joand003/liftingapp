"use client"
import React from 'react'
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'


export default function Checkstatus() {
    const { data: session } = useSession();
    const userName = session?.user?.name;

    if (!userName) {
        const router = useRouter()
        router.push('/')
    }

  return (
    <></>
  )
}
