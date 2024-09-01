"use client";
import { cn } from "@/lib/utils";
import ActionToolTip from "../action-tooltip";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

interface NavigationItemProps{
    id:string,
    name:string,
    imageUrl:string
}
const NavigationItem = ({
    id,name,imageUrl
}:NavigationItemProps) => {
    const params=useParams()
    const router=useRouter()

    const handleClick = () => {
        router.push(`/servers/${id}`)
    }
    return ( 
        <ActionToolTip side="right" label={name} align="center">
            <button onClick={handleClick} className="group relative flex items-center">
                <div className={cn("absolute left-0 bg-primary rounded-r-full transiton-all w-[4px]",
                    params?.serverId !== id && "group-hover:h-[24px]",
                    params?.serverId  == id ? "h-[36px]" : "h-[8px]")} 
                />
                {/* bg-primary/10 10% opaque and 90% transparent. */}
                <div className={cn("relative group flex mx-3 h-[48px] w-[48px] ml-4 rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
                    params?.serverId === id && "bg-primary/10 text-primary rounded-[16px]"
                )}>
                    <Image fill src={imageUrl} alt="Channel" />

                </div>
                <div>

                </div>

            </button>
        </ActionToolTip>
     );
}
 
export default NavigationItem;