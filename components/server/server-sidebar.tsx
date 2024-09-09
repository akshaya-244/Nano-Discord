import { currentProfile, getUser } from "@/app/lib/current-profile"
import { db } from "@/lib/db"
import { ChannelType, MemberRole } from "@prisma/client/edge"
import { redirect } from "next/navigation"
import ServerHeader from "./ServerHeader"
import { ScrollArea } from "../ui/scroll-area"
import ServerSearch from "./server-search"
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react"
import { useEffect } from "react"
import { Separator } from "../ui/separator"
import ServerSection from "./server-section"
import ServerChannel from "./server-channel"
import ServerMember from "./server-member"
import { useModal } from "@/hooks/use-modal-store"


const iconChannelMaps = {
    [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4" />,
    [ChannelType.AUDIO]: <Mic className="mr-2 h-4 w-4" />,
    [ChannelType.VIDEO]: <Video className="mr-2 h-4 w-4" />

}
const iconRoleMap = {
    [MemberRole.ADMIN]: <ShieldAlert className="mr-2 h-4 w-4 text-indigo-500" />,
    [MemberRole.MODERATOR]: <ShieldCheck className="mr-2 h-4 w-4 text-rose-500" />,
    [MemberRole.GUEST]: null

}
export const ServeSidebar = async ({
    serverId
}: {
    serverId: string
}) => {

    
    const profile = await currentProfile()

    if (!profile) {
        return redirect('/')
    }
    // console.log("Profile: ",profile)
    const server = await db.server.findUnique({
        where: {
            id: serverId,
        },
        include: {
            channels: {
                orderBy: {
                    createdAt: "asc"
                }
            },
            members: {
                include: {
                    profile: true
                },
                orderBy: {
                    role: "asc"
                }
            }
        }
    })
    // console.log("SErversss: ",server)
    const textChannels = server?.channels.filter((channel) => channel.type === ChannelType.TEXT)
    const audioChannels = server?.channels.filter((channel) => channel.type === ChannelType.AUDIO)
    const videoChannels = server?.channels.filter((channel) => channel.type === ChannelType.VIDEO)

    const members = server?.members.filter((member) => member.profileId !== profile.id)
    if (!server) {
        return redirect('/')
    }

    const role = server.members.find((member) => member.profileId === profile.id)?.role
    return <div className="flex flex-col h-full text-primary  w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
        <ServerHeader server={server} role={role} />
        <ScrollArea className="flex-1 px-3">
            <div className="mt-2">
                <ServerSearch data={[
                    {
                        label: "Text Channels",
                        type: "channel",
                        data: textChannels?.map((channel) => ({
                            id: channel.id,
                            name: channel.name,
                            icon: iconChannelMaps[channel.type]
                        }))
                    },
                    {
                        label: "Voice Channels",
                        type: "channel",
                        data: audioChannels?.map((channel) => ({
                            id: channel.id,
                            name: channel.name,
                            icon: iconChannelMaps[channel.type]
                        }))
                    },
                    {
                        label: "Video Channels",
                        type: "channel",
                        data: videoChannels?.map((channel) => ({
                            id: channel.id,
                            name: channel.name,
                            icon: iconChannelMaps[channel.type]
                        }))
                    },
                    {
                        label: "Members",
                        type: "member",
                        data: members?.map((member) => ({
                            id: member.id,
                            name: member.profile.name,
                            icon: iconRoleMap[member.role]
                        }))
                    },
                ]} />
            </div>

            <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />
            <div className="space-y-[2px]">


                {
                    //!!textChannels?.length  double exclamation convers the expression to a boolean vakue textChannels.length
                    // This expression simply accesses the length property of the textChannels object. If textChannels is null or undefined, this will throw a TypeError.
                    !!textChannels?.length && (
                        <div className="mb-2">
                            <ServerSection label="Text Channels" channelType={ChannelType.TEXT} sectionType="channel" role={role} />
                            {textChannels.map((channel) => (
                                <ServerChannel
                                    key={channel.id} channel={channel} role={role} server={server} />
                            ))}

                        </div>
                    )

                }
            </div>
            <div className="space-y-[2px]">
                {
                    //!!textChannels?.length  double exclamation convers the expression to a boolean vakue textChannels.length
                    // This expression simply accesses the length property of the textChannels object. If textChannels is null or undefined, this will throw a TypeError.
                    !!audioChannels?.length && (
                        <div className="mb-2">
                            <ServerSection label="Voice Channels" channelType={ChannelType.AUDIO} sectionType="channel" role={role} />
                            {audioChannels.map((channel) => (
                                <ServerChannel
                                    key={channel.id} channel={channel} role={role} server={server} />
                            ))}

                        </div>
                    )

                }
            </div>
            <div className="space-y-[2px]">
                {
                    //!!textChannels?.length  double exclamation convers the expression to a boolean vakue textChannels.length
                    // This expression simply accesses the length property of the textChannels object. If textChannels is null or undefined, this will throw a TypeError.
                    !!videoChannels?.length && (
                        <div className="mb-2">
                            <ServerSection label="Video Channels" channelType={ChannelType.VIDEO} sectionType="channel" role={role} />
                            {videoChannels.map((channel) => (
                                <ServerChannel
                                    key={channel.id} channel={channel} role={role} server={server} />
                            ))}

                        </div>
                    )

                }
            </div>
            <div className="space-y-[2px]">

                {
                    //!!textChannels?.length  double exclamation convers the expression to a boolean vakue textChannels.length
                    // This expression simply accesses the length property of the textChannels object. If textChannels is null or undefined, this will throw a TypeError.
                    !!members?.length && (
                        <div className="mb-2">
                            <ServerSection server={server} label="Members" sectionType="member" role={role} />
                            {members.map((member) => (
                                <ServerMember key={member.id} member={member} server={server}/>
                            ))}

                        </div>
                    )
                }
            </div>
        </ScrollArea>
    </div>
}