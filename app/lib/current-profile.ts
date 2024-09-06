import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "./auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function getUser(){
    const session=await getServerSession(NEXT_AUTH)
    // console.log("Session: ",session)
    return session;
}

export const currentProfile= async() =>{
    const user=await getUser()
    // console.log("User:  ",user)
    if(!user)
    {
       return null
    }
    const profile= await db.profile.findUnique({
        where: {
           userId: user.user.id
        },
        select:{
            id:true
        }
    })
    // console.log(profile)
    return profile
}