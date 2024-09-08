import { currentProfile } from "@/app/lib/current-profile";
import { currentProfilePages } from "@/lib/current-profile-pages";
import { db } from "@/lib/db";
import { NextApiResponseServerIo } from "@/types";
import { constants } from "buffer";
import { NextApiRequest } from "next";
import { useSession } from "next-auth/react";

export default async function handler(req:NextApiRequest, res: NextApiResponseServerIo) {
    // console.log("Req from messages: ",req);
    if(req.method !== "POST")
    {
        return res.status(405).json({error: "Message not allowed"})
    }
    //serverId, channelId
    try{
         
        const profile =  await currentProfilePages(req,res )
        console.log("Profile: ",profile)
        const {content, fileUrl} =req.body;
        const {conversationId }=req.query;

        if(!profile)
        {
            return res.status(401).json({error: "Unauthorised"})
        }

        if(!conversationId)
            {
                return res.status(401).json({error: "Conversation id is missing"})
            }
        
        
        if(!content)
            {
                return res.status(401).json({error: "Content missing"})
                
            }
        const conversation = await db.conversations.findFirst({
            where: {
                id: conversationId as string,
                OR: [
                    {
                        memberOne:{
                            profileId: profile.id,
                        }
                    },{
                        memberTwo: {
                            profileId: profile.id
                        }
                    }
                ]
,
            },
            include:{
                memberOne:{
                    include:{
                        profile: true
                    }
                },
                memberTwo:{
                    include:{
                        profile: true
                    }
                }
            }
        })
        if(!conversationId){
            return res.status(404).json({message: "Conversation Id is missing"})
        }

        const member = conversation?.memberOne.profileId === profile.id ? conversation.memberOne : conversation?.memberTwo

        if(!member)
        {
            return res.status(404).json({message: "Member not found"})
        }
        const message=await db.directMessage.create({
            data: {
                content,
                fileUrl,
               conversationId: conversationId as string,
                memberId: member.id
            },
            include:{
                member:{
                    include:{
                        profile: true
                    }
                }
            }
        })

        const channelKey =`chat${conversationId}:messages`
        res.socket.server.io.emit(channelKey,message)
        res.status(200).json(message)

    }
    catch(e)
    {
        console.log("[DIRECT_MESSAGES_POST]", e)
        return res.status(500).json({message: "Internal Error"});

    }
}