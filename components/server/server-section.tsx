"use client";

import { ServerWithMemebersWithProfile } from "@/types";
import { ChannelType, MemberRole, Server } from "@prisma/client/edge";
import ActionToolTip from "../action-tooltip";
import { Plus, Settings } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

interface ServerSectionProps{
    label: string,
    role?: MemberRole,
    sectionType: "channel" | "member",
    channelType?: ChannelType,
    server?:Server
}
const ServerSection = ({
    label, role, sectionType, channelType, server
}:ServerSectionProps) => {
    
    const {onOpen} = useModal();
    return ( <div className="flex items-center justify-between py-2">
        <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400"> 
          {label}  
        </p>
        {role != MemberRole.GUEST && sectionType === "channel"  && (
            <ActionToolTip label="Create Channel" side="top">
                <button onClick={() => {onOpen("createChannel",{channelType})}} className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-100 dark:hover:text-zinc-400">
                    <Plus className="h-4 w-4"/>
                </button>
            </ActionToolTip>
        )}

{role == MemberRole.ADMIN && sectionType === "member"  && (
            <ActionToolTip label="Manage Members" side="top">
                {/* @ts-ignore */}
                <button onClick={() => {onOpen("manageMembers", {server})}} className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-100 dark:hover:text-zinc-400">
                    <Settings className="h-4 w-4"/>
                </button>
            </ActionToolTip>
        )}
    </div> );
}
 
export default ServerSection;