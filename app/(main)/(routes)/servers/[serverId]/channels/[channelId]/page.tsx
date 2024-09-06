import { currentProfile } from "@/app/lib/current-profile";
import ChatHeader from "@/components/chat/chat-header";
import ChatInput from "@/components/chat/chat-input";
import ChatMessages from "@/components/chat/chat-message";
import { db } from "@/lib/db";
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
    const channel=await db.channel.findUnique({
        where:{
            id: params.channelId
        }
    })

    const member=await db.member.findFirst({
        where:{
            serverId: params.serverId,
            profileId:params.channelId
           
        }
    })
    if(!channel && !member)
    {
        return redirect('/')
    }

    return (  
        <div className="bg-white dark:bg-[#313338]  flex flex-col h-full ">
            <ChatHeader name={channel?.name} serverId={params.serverId} type="channel"  />
                <ChatMessages name={channel?.name} member={member} chatId={channel?.id} type="channel" apiUrl="/api/messages" socketUrl="/api/socket/messages" socketQuery={{
                    channelId: channel?.id || "",
                    serverId: channel?.serverId || ""
                }} paramKey="channelId" paramValue={channel?.serverId} />
                <ChatInput name={channel?.name} type="channel" apiUrl="/api/socket/messages" query={{channelId: channel?.id, serverId: channel?.serverId, }}/>
            

              
        </div>
    );
}
 
export default ChannelIdPage;