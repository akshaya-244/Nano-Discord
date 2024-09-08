import { currentProfile } from "@/app/lib/current-profile";
import ChatHeader from "@/components/chat/chat-header";
import ChatInput from "@/components/chat/chat-input";
import ChatMessages from "@/components/chat/chat-message";
import MediaRoom from "@/components/media-room";
import { getOrCreateConversation } from "@/lib/conversations";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface ConversationsIdProps {
  params: {
    serverId: string;
    memberId: string;
  },
  searchParams:{
    video?: boolean
  }
}

const Conversations = async ({ params, searchParams  }: ConversationsIdProps) => {
  console.log("Params: ", params);
  const profile = await currentProfile();
  if (!profile) {
    return redirect("/api/auth/signin");
  }

  const currentMember = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
    include: {
      profile: true,
    },
  });
  if (!currentMember) {
    return redirect("/");
  }
  const conversations = await getOrCreateConversation(
    currentMember.id,
    params.memberId
  );

  if (!conversations) {
    return redirect(`/servers/${params.serverId}`);
  }

  const { memberOne, memberTwo } = conversations;
  const otherMember =
    profile.id !== memberOne.profileId ? memberOne : memberTwo;

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        imageUrl={otherMember.profile.imageUrl}
        name={otherMember.profile.name}
        serverId={otherMember.serverId}
        type="conversation"
        profileId={otherMember.profileId}
      />

      {searchParams.video && (
        <MediaRoom chatId={conversations.id} audio={true} video={true} />
      )}
      {!searchParams.video && (
        <>
         <ChatMessages
        member={currentMember}
        name={otherMember.profile.name}
        chatId={conversations.id}
        type="conversation"
        apiUrl="/api/direct-messages"
        paramKey="conversationId"
        paramValue={conversations.id}
        socketUrl="/api/socket/direct-messages"
        socketQuery={{ conversationId: conversations.id }}
      />

      <ChatInput name={otherMember.profile.name} type="conversation" apiUrl="/api/socket/direct-messages" query={{conversationId: conversations.id}} />
        </>
      )}
     
    </div>
  );
};

export default Conversations;
