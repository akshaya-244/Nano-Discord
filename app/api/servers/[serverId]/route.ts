import { currentProfile } from "@/app/lib/current-profile"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import { NextResponse } from "next/server"

export async function PATCH (req:Request, {params}:{params: {serverId: string}}) {
    try{
        const profile=await currentProfile()
        const {name, imageUrl}= await req.json()
        if(!profile)
        {
            return new NextResponse("Unauthorised", {status: 401})
        }
        const server=await db.server.update({
            where:{
                id: params.serverId,
                profileId: profile.id
            },
            data:{
                name,
                imageUrl
            }
        })
        return NextResponse.json(server)
    }catch(e){
        console.log("SERVER_PATCH_ERROR: ",e)
        return new NextResponse("Internal Error: ",{status: 500})
    }
}