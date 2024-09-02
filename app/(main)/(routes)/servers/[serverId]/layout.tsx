import { currentProfile, getUser } from "@/app/lib/current-profile";
import { ServeSidebar } from "@/components/server/server-sidebar";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const ServerLayout =async ({
    children,
    params
}:{
    children: React.ReactNode,
    params: {serverId: string}
}) => {
    const profile=await currentProfile()
    if(!profile)
    {
        return redirect(`/api/auth/signin`)
    }

    const server=await db.server.findUnique({
        where: {
            id: params.serverId,
            members:{
                some: {
                    profileId:profile.id
                }
            }
            
        }
    })
    if(!server)
    {
        redirect('/')
    }
    return ( 
        <div className="h-full">
            <div className=" md:flex h-full w-60 z-20 fixed flex-col inset-y-0">
                <ServeSidebar serverId={server.id}/>
            </div>
            <main className="h-full md:pl-60">
            {children}

            </main>
        </div>
     );
}
 
export default ServerLayout;