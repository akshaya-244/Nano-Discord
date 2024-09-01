import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "./auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function getUser(){
    const session=await getServerSession(NEXT_AUTH)
    return session;
}

export const currentProfile= async() =>{
    const user=await getUser()
    console.log(user)
    if(!user)
    {
       return null
    }
    const profile= await db.profile.findUnique({
        where: {
           userId: user.user.id
        }
    })
    return profile
}