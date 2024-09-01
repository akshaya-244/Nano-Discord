import { NEXT_AUTH } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
 
const f = createUploadthing();


async function  getUser() {
    const session=await getServerSession(NEXT_AUTH)
    return session
}

const handleAuth = async() => {
    const userId = await getUser()
    if(!userId) 
        throw new Error("Unauthorised")
    return {userId: userId.user.id}
}
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    serverImage: f({image: {maxFileSize: "4MB", maxFileCount: 1}
    }).middleware(() => handleAuth())
    .onUploadComplete(async( {metadata, file}) => {return {uploadedBy: metadata.userId}}),
    
    messageFile: f(["image","pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(()=>{})
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;