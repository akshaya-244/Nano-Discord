"use client";

import { Icon, Video, VideoOff } from 'lucide-react';
import qs from 'query-string'
import ActionToolTip from '../action-tooltip';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';


const ChatVideoButton = () => {
    const pathname=usePathname()
    const router=useRouter()
    const searchParams = useSearchParams()
    const isVideo = searchParams?.get("video")
    const Icon = isVideo ? VideoOff : Video


    const onClick=() => {
        const url = qs.stringifyUrl({
            url: pathname || "",
            query: {
                video: isVideo ? undefined: true
            }
        },{skipNull: true})
        router.push(url)
    }
    const tooltipLabel = isVideo ? "End video call": "Start Video call"
    return ( 
        <ActionToolTip side="bottom" label={tooltipLabel}>
            <button onClick={onClick} className='hover:opacity-75 transition mr-4'>
                <Icon className='h-6 w-6 text-zinc-500 dark:text-zinc-400'/>
            </button>

        </ActionToolTip>
     );
}
 
export default ChatVideoButton;