"use client";

import { ServerWithMemebersWithProfile } from "@/types";
import { ChannelType, MemberRole } from "@prisma/client/edge";

interface ServerSectionProps{
    label: string,
    role?: MemberRole,
    sectionType: "channel" | "member",
    channelType?: ChannelType,
    server?:ServerWithMemebersWithProfile
}
const ServerSection = ({
    label, role, sectionType, channelType, server
}:ServerSectionProps) => {
    return ( <div>
        Server Sectiom
    </div> );
}
 
export default ServerSection;