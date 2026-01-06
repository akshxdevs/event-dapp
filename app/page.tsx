"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  useEffect(()=>{
    if (status === "loading") return;
    if (session) {
      redirect("/home")
    }else{
      redirect("/login")
    }
  },[session,status])
  return null
}