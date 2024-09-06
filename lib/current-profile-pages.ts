import { NEXT_AUTH } from "@/app/lib/auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession, useSession } from "next-auth/react";
import { getServerSession } from "next-auth";

export async function getUser(req: NextApiRequest, res: NextApiResponse){
    const session = await getServerSession( req, res,NEXT_AUTH);

    console.log("Session from profile pages: ",session)
    if (!session) {
        return null;
    }
    
    return session;
}
//serverId, channelId

export const currentProfilePages= async(req: NextApiRequest, res: NextApiResponse) =>{

    const user=await getUser(req,res)

    if(!user)
    {
       return null
    }
    const profile= await db.profile.findUnique({
        where: {
           userId: user?.user?.id
        },
        select:{
            id:true
        }
    })
    // console.log(profile)
    return profile
}