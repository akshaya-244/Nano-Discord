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


export async function DELETE (req: Request, {params}:{params: {serverId: string}}){
    try{
        const profile=await currentProfile()

        if(!profile)
        {
            return new NextResponse("Unauthorised",{status:401})
        }
        const serverId=params.serverId
        if(!serverId)
        {
            return new NextResponse("Server Id Missing", {status: 500})
        }

        const isAdmin = await db.server.findFirst({
            where:{
                profileId: profile.id
            }
        })
        if(!isAdmin)
        {
            return new NextResponse("Only admin can delete a server", {status:401})
        }
        const server =await db.server.delete({
            where:{
                id: serverId,
                profileId: profile.id
            }

        })
        return  NextResponse.json(server)
    }catch(e){
        console.log("Delete Server Error: ",e)
        return new NextResponse("Internal Error: ",{status: 500})
    }
}