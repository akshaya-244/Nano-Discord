"use client";
import { currentProfile } from "@/app/lib/current-profile";
import {LiveKitRoom, VideoConference} from "@livekit/components-react"
import "@livekit/components-styles";
import { Loader2 } from "lucide-react";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface MediaRoomProps {
  chatId: string;
  video: boolean;
  audio: boolean;
}
const MediaRoom = ({ chatId, video, audio }: MediaRoomProps) => {
  const { data } = useSession();
    const [token, setToken] = useState("")

    useEffect(() => {
        if(!data?.user?.name) 
            return;

        const name= data?.user.name;

        (async () => {
            try{
                const resp =await fetch(`/api/livekit?room=${chatId}&username=${name}`)
                const data = await resp.json()
                setToken(data.token)
            }catch(e){
                console.log(e)
            }
        })()
    },[data?.user?.name, chatId])
    if(token ==="")
    {
        return (
            <div className="flex flex-col flex-1 justify-center items-center" >
                <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
                <p>
                    Loading...
                </p>
            </div>
        )
    }
    return (
        <LiveKitRoom 
            data-lk-theme="default"
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
            token={token}
            connect={true}
            video={video}
            audio={audio}>
            <VideoConference />

        </LiveKitRoom>
    )
 
};

export default MediaRoom;
