import { currentProfile } from "@/app/lib/current-profile"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"


export async function  DELETE(req:Request, {params}:{params: {memberId: string}}) {
    try{
        const profile=await currentProfile()
        const {searchParams}=new URL(req.url)
        const serverId=searchParams.get("serverId")
        if(!profile)
        {
        return new NextResponse("Unauthorised",{status:401 })

        }
        if(!serverId)
        {
            return new NextResponse("Server Id missing",{status:500 })
        }
        if(!params.memberId)
        {
            return new NextResponse("Member Id missing",{status:500 })
        }
        console.log("ServerId: ",serverId," PRofile: ",profile.id)
        
        const server=await db.server.update({
            where: {
                id: serverId,
                profileId:profile.id
            },
            data:{
                members:{
                    deleteMany:{
                            id: params.memberId,
                            profileId:{
                                not: profile.id
                            }
                    }
                }
            },
            include:{
                members:{
                    include:{
                        profile:true
                    },
                    orderBy:{
                        role: "asc"
                    }
                }
            }
        })
        console.log("Server: ",server)
        return  NextResponse.json(server)
    }catch(e)
    {
        console.log("MEMBERS ERROR",e)
        return new NextResponse("Internal Error: ",{status:304 })
    }
}


export async function  PATCH(req:Request, {params}:{params: {memberId: string}}) {
    try{
        const profile=await currentProfile()
        const {searchParams}=new URL(req.url)
        const {role} =await req.json()
        const serverId=searchParams.get("serverId")
        if(!profile)
        {
        return new NextResponse("Unauthorised",{status:401 })

        }
        if(!serverId)
        {
            return new NextResponse("Server Id missing",{status:500 })
        }
        if(!params.memberId)
        {
            return new NextResponse("Member Id missing",{status:500 })
        }

        const server=await db.server.update({
            where: {
                id: serverId,
                profileId:profile.id
            },
            data:{
                members:{
                    update:{
                        where:{
                            id: params.memberId,
                            profileId:{
                                not: profile.id
                            }
                        },
                        data:{
                            role
                        }
                    }
                }
            },
            include:{
                members:{
                    include:{
                        profile:true
                    },
                    orderBy:{
                        role: "asc"
                    }
                }
            }
        })
        
    }catch(e)
    {
        console.log("MEMBERS ERROR",e)
        return new NextResponse("Internal Error: ",{status:304 })
    }
}