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
        const {serverId, channelId }=req.query;

        if(!profile)
        {
            return res.status(401).json({error: "Unauthorised"})
        }
        if(!serverId){
            return res.status(401).json({error: "Server Id missing"})
        }
        if(!channelId)
        {
            return res.status(401).json({error: "Channel Id missing"})
            
        }
        if(!content)
            {
                return res.status(401).json({error: "Content missing"})
                
            }
        const server=await db.server.findFirst({
            where:{
                id: serverId as string,
                members:{
                    some:{
                        profileId: profile.id
                    }
                }
            },
            include: {
                members: true
            }
        });
        if(!server)
        {
            return res.status(404).json({message: "Server not found"})
        }
        const channel=await db.channel.findFirst({
            where:{
                id: channelId as string,
                serverId: serverId as string
            }
        })

        if(!channel)
        {
            return res.status(404).json({message: "Channel not found"})
        }

        const member=server.members.find((member) => member.profileId === profile.id )
        if(!member)
        {
            return res.status(404).json({message: "Member not found"})
        }
        const message=await db.message.create({
            data: {
                content,
                fileUrl,
                channelId: channelId as string,
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

        const channelKey =`chat${channelId}:messages`
        res.socket.server.io.emit(channelKey,message)
        res.status(200).json(message)

    }
    catch(e)
    {
        console.log("[MESSAGES_POST]", e)
        return res.status(500).json({message: "Internal Error"});

    }
}