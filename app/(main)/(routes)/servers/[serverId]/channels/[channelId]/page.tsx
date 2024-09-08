import { currentProfile } from "@/app/lib/current-profile";
import ChatHeader from "@/components/chat/chat-header";
import ChatInput from "@/components/chat/chat-input";
import ChatMessages from "@/components/chat/chat-message";
import MediaRoom from "@/components/media-room";
import { db } from "@/lib/db";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";

interface ChannelIdProps{
    params:{
        serverId: string,
        channelId: string
    }
    
}
const ChannelIdPage =async ({
    params
}:ChannelIdProps) => {

    const profile=await currentProfile()
    if(!profile)
    {
        return redirect(`/api/auth/signin`)
    }
    console.log("24 Channel Id page: ", params.channelId, " ",params.serverId )
    const channel=await db.channel.findUnique({
        where:{
            id: params.channelId
        }
    })
    console.log("24 Channel Id page: ", channel?.id, " ",channel?.serverId )

    console.log("30 Channel name: ",channel?.name)
    const member=await db.member.findFirst({
        where:{
            serverId: params.serverId,
            profileId:profile.id
           
        }
    })
    console.log("Member:",member)
    if(!channel && !member)
    {
        return redirect('/')
    }

    return (  
        <div className="bg-white dark:bg-[#313338]  flex flex-col h-full ">
            <ChatHeader name={channel?.name} serverId={params.serverId} type="channel"  />
                {channel?.type === ChannelType.TEXT && (
                    <>
                    <ChatMessages name={channel?.name} member={member} chatId={channel?.id} type="channel" apiUrl="/api/messages" socketUrl="/api/socket/messages" socketQuery={{
                    
                    serverId: channel?.serverId || "",
                    channelId: channel?.id || "",
                }} paramKey="channelId" paramValue={channel?.id} />
                    
                <ChatInput name={channel?.name} type="channel" apiUrl="/api/socket/messages" query={{channelId: channel?.id, serverId: channel?.serverId, }}/>
                    
                    </>
                )}

                {channel?.type === ChannelType.AUDIO && (
                    <MediaRoom chatId={channel.id} video={false} audio={true} />
                )}

{channel?.type === ChannelType.VIDEO && (
                    <MediaRoom chatId={channel.id} video={true} audio={true} />
                )}
                
                
            

              
        </div>
    );
}
 
export default ChannelIdPage;