import { createCipheriv } from "crypto"
import { db } from "./db"


export const getOrCreateConversation = async (memberOneId: string, memberTwoId:string) =>{
    let conversation =await findConversation(memberOneId, memberTwoId) || await findConversation(memberTwoId, memberOneId) 

    if(!conversation)
    {
        conversation=await createNewConversation(memberOneId, memberTwoId)
    }
    return conversation
}
const  findConversation = async (memberOneId: string, memberTwoId:string) => {
    const conv=await db.conversations.findFirst({
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
    return conv
}

const createNewConversation = async(memberOneId: string, memberTwoId:string)=>
{
    try{
        const conv=await db.conversations.create({
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
        return conv
    }catch{
        return null
    }

}