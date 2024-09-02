import { currentProfile } from "@/app/lib/current-profile"
import { db } from "@/lib/db"
import { MemberRole } from "@prisma/client/edge"
import { NextResponse } from "next/server"

export async function POST (req: Request) {
    try{
        const profile=await currentProfile()
        const {searchParams}=new URL(req.url)
        const serverId=searchParams.get("serverId")
        const {name, type}=await req.json()

        if(!serverId)
        {
            return new NextResponse("Server Id is missing", {status: 500})
        }
        
        if(!profile)
            {
                return new NextResponse("Unauthorised",{status: 401})
            }
        if(name==="general")
        {
            return new NextResponse("Channel cannot have this name", {status:404})
        }
        const channel=await db.server.update({
            where:{
                id: serverId,
                members:{
                    some:{
                        profileId:profile?.id,
                        role:{
                            in: [MemberRole.ADMIN, MemberRole.MODERATOR]
                        }
                    }
                }
            },
            data:{
                channels:{
                    create:{
                        profileId: profile?.id,
                        type,
                        name,
                    }
                }
            }
        })
        return NextResponse.json(channel)
        


    }catch(e)
    {
        console.log("Channel Creation Error",e)
        return new NextResponse("Internal Error", {status: 500})
    }
}