"use client"
import React, {useEffect} from 'react'
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'


export default function Checkstatus() {
    const { data: session, status } = useSession();
    const router = useRouter()

    useEffect(() => {
        if (status === "loading") return; // Do nothing while loading
        if (status === "unauthenticated") return router.push("/"); // If not authenticated, force log in
    }, [status, router]);

    if (status === "loading") return <div>Loading...</div>;
    if (status === "unauthenticated") return <div>Redirecting...</div>;

  return session ? null : null;
}
