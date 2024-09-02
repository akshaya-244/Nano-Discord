import { currentProfile } from "@/app/lib/current-profile";
import { redirect } from "next/navigation";

interface inviteCodeProps{
    params: {
        inviteCode: string
    }
}

const InvideCodePage = async({
    params
}: inviteCodeProps) => {

    const profile=await currentProfile()

    if(!profile)
    {
        redirect('api/auth/signin')
    }

   
    return ( <div>
        
    </div> );
}
 
export default InvideCodePage;