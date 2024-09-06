import { currentProfile } from "@/app/lib/current-profile";
import ChatHeader from "@/components/chat/chat-header";
import { getOrCreateConversation } from "@/lib/conversations";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface ConversationsIdProps{
    params:{
        
        serverId: string,
        memberId: string
    }
}

const Conversations = async({
    params
}: ConversationsIdProps) => {
    console.log("Params: ",params)
    const profile= await currentProfile()
    if(!profile)
    {
        return redirect("/api/auth/signin")
    }

    const currentMember= await db.member.findFirst({
        where:{
            serverId: params.serverId,
            profileId: profile.id
        },
        include:{
            profile: true
        }
        
    })
    if(!currentMember)
    {
        return redirect('/')
    }
    const conversations=await getOrCreateConversation(currentMember.id, params.memberId)

    if(!conversations)
    {
        return redirect(`/servers/${params.serverId}`)
    }

    const {memberOne, memberTwo} = conversations
    const otherMember = profile.id !== memberOne.profileId ? memberOne : memberTwo
    

    return ( 
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            <ChatHeader imageUrl={otherMember.profile.imageUrl} name={otherMember.profile.name} serverId={otherMember.serverId} type="conversation"  profileId={otherMember.profileId}/>
        </div>
     );
}
 
export default Conversations;