"use client";
import { cn } from "@/lib/utils";
import { ServerWithMemebersWithProfile } from "@/types";
import { Channel, ChannelType, MemberRole } from "@prisma/client/edge";
import { Edit, Hash, Lock, Mic, Trash, Video } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import ActionToolTip from "../action-tooltip";
import { ModalType, useModal } from "@/hooks/use-modal-store";

interface ServerChannelProps{
   channel: Channel,
   server: ServerWithMemebersWithProfile
    role?: MemberRole
}
const IconMap= {
    [ChannelType.TEXT]: Hash,
    [ChannelType.AUDIO]: Mic,
    [ChannelType.VIDEO]: Video
}
const ServerChannel = ({
    channel, server,role
}: ServerChannelProps) => {

    const Icon=IconMap[channel.type]
    const {onOpen, onClose, data} = useModal()
    const router=useRouter()
    const params=useParams()

    const onClick =() =>{
        router.push(`/servers/${server.id}/channels/${channel.id}`)
    }

    const onAction=(e: React.MouseEvent, action:ModalType) => {
        e.stopPropagation()
        onOpen(action, {channel, server})
    }
    return ( <div>
       <button onClick={onClick} className="group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1 ">
        <Icon className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
        <p className={cn("line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
            params?.channelId === channel.id && "text-primary dark:group-hover:text-white"
        )}>
            {channel.name}

        </p>
        {channel.name != "general" && role !== MemberRole.GUEST && (
            <div className="ml-auto flex items-center gap-x-2">
                <ActionToolTip label="Edit" >
                    <Edit onClick={(e) => {onAction(e,"editChannel")}} className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 dark:text-zinc-400 " />
                </ActionToolTip>
                <ActionToolTip label="Delete" >
                    <Trash onClick={(e) => onAction(e,"deleteChannel" )} className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 dark:text-zinc-400 " />
                </ActionToolTip>

            </div>
        )}
        </button>
        </div>
     );
}
 
export default ServerChannel;