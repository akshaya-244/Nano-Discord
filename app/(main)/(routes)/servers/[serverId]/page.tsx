import { currentProfile } from "@/app/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface ServerPageProps{
    params: {
        serverId: string
    }
}

const ServerPage =async ({
    params
}: ServerPageProps) => {
    const profile=await currentProfile()
    if(!profile)
    {
        return redirect('/api/auth/signin')
    }

    const server=await db.server.findUnique({
        where:{
            id: params.serverId,
            members:{
                some:{
                    profileId: profile.id
                }
            }
        },
        include:{
            channels: {
                where:{
                    name: "general"
                },
                orderBy: {
                    createdAt: "asc"
                }
            }
            
        }
    })

    const initialChannel= server?.channels[0]

    if(initialChannel?.name !== "general")
    {
        return null
    }
    return redirect(`/servers/${server?.id}/channels/${initialChannel.id}`)
}
 
export default ServerPage;