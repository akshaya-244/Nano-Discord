import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { NEXT_AUTH } from "./auth";

async function  getUser() {
    const session=await getServerSession(NEXT_AUTH)
    return session
}

export const initialProfile = async() => {
    const session=await getUser();
    if(!session)
    {
        redirect('/signin')

    }
    

    const profile=await db.profile.findUnique({
        where: {
            userId: session.user.id
        }
    });

    if(profile)
        return profile

    const newProfile =await db.profile.create({
        data:{
            userId: session.user.id,
            name: `${session.user.name}`,
            imageUrl: session.user.imageUrl,
            email: session.user.email
            

        }
    })
    return newProfile
}