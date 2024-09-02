import { currentProfile } from "@/app/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client/edge";
import { NextRequest, NextResponse } from "next/server";
import {v4 as uuidv4} from 'uuid'

export async function POST(req:NextRequest) {
    try{
        const {name, imageUrl} = await req.json()
        const profile=await currentProfile()
        // console.log("Profile: ",profile)
        if(!profile)
        {
            return new NextResponse("Unauthorised", {status: 401})
        }
        const server=await db.server.create({
            data:{
                profileId: profile.id,
                name,
                imageUrl,
                inviteCode: uuidv4(),
                channels: {create: [
                    {name: "general", profileId: profile.id}
                ]},
                members: {
                    create: [{
                        profileId: profile.id, role:MemberRole.ADMIN
                    }]
                }
            }
        })
        
        return NextResponse.json(server)
    }catch(e)
    {
        console.log("SERVERS POST: ",e)
        return new NextResponse("Internal Error: ", {status: 500})
    }
}