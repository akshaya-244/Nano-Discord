import { db } from "@/lib/db";
import { initialProfile } from "../lib/inital-profile";
import { redirect } from "next/navigation";
import ServerModal from "@/components/modals/Server_modal";

const SetupPage = async() => {
   
    const profile= await initialProfile()
    const server = await db.server.findFirst({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    })
    if(server)
    {
        return redirect(`/servers/${server.id}`)
    }
    return (
        // <div className="">
        //     {/* <button onClick={handleClick}>This is the home page</button> */}
        // </div>
        <ServerModal />        
    );
}
 
export default SetupPage;