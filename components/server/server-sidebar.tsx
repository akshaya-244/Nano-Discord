import { currentProfile, getUser } from "@/app/lib/current-profile"
import { db } from "@/lib/db"
import { ChannelType, MemberRole } from "@prisma/client/edge"
import { channel } from "diagnostics_channel"
import { redirect } from "next/navigation"
import ServerHeader from "./ServerHeader"

export const ServeSidebar = async({
    serverId
}:{
    serverId: string
}) => {
    const profile=await currentProfile()

    if(!profile)
    {
        return redirect('/')
    }
    // console.log("Profile: ",profile)
    const server=await db.server.findUnique({
        where:{
            id: serverId,
        },
        include:{
            channels:{
                orderBy:{
                    createdAt: "asc"
                }
            },
            members: {
                include: {
                    profile: true
                },
                orderBy:{
                    role: "asc"
                }
            }
        }
    })
    // console.log("SErversss: ",server)
    const textChannels= server?.channels.filter((channel) => channel.type===ChannelType.TEXT)
    const audioChannels=server?.channels.filter((channel) => channel.type === ChannelType.AUDIO)
    const videoChannels=server?.channels.filter((channel) => channel.type===ChannelType.VIDEO)
    
    const members=server?.members.filter((member)=> member.profileId !== profile.id)
    if(!server)
    {
        return redirect('/')
    }

    const role=server.members.find((member)=> member.profileId === profile.id)?.role
    return <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
        <ServerHeader server={server} role={role}/>
    </div>
}