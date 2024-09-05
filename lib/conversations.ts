import { createCipheriv } from "crypto"
import { db } from "./db"
import { NextResponse } from "next/server"


export const getOrCreateConversation = async (memberOneId: string, memberTwoId:string) =>{
    let conversation =await findConversation(memberOneId, memberTwoId) || await findConversation(memberTwoId, memberOneId) 
    console.log(conversation)

    if(!conversation)
    {
        console.log("Entered")
        conversation=await createNewConversation(memberOneId, memberTwoId)
        console.log("Conmnv: ",conversation)
    }
    return conversation
}
const  findConversation = async (memberOneId: string, memberTwoId:string) => {
    try{
        return await db.conversations.findFirst({
        where:{
            AND:[
                {memberOneId: memberOneId},
                {memberTwoId:memberTwoId}
            ]
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
}
catch{
    return null
}
}

const createNewConversation = async(memberOneId: string, memberTwoId:string)=>
{
    try{
        console.log(memberOneId," ",memberTwoId)
        return await db.conversations.create({
           data:{
                memberOneId,
                memberTwoId   
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
    }catch{
        return null
    }

}