import { useSocket } from "@/components/providers/socket-provider"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import qs from 'query-string'

interface ChatQueryProps {
    queryKey: string | undefined
    apiUrl: string | undefined
    paramKey: "channelId" | "conversationId"
    paramValue: string | undefined
}

export const useChatQuery = ({
    queryKey, apiUrl, paramKey, paramValue
} : ChatQueryProps) => {
    console.log("Use chat query ")
    console.log("ApiURL, : ",apiUrl )
    console.log("queryKey: ",queryKey)
    console.log("paramKey: ",paramKey)
    console.log("paramValue: ",paramValue)

    const {isConnected} = useSocket()
    const fetchMessages =async ({pageParam = undefined}) => {
        const url = qs.stringifyUrl({
            url: apiUrl || "",
            query: {
                cursor:pageParam,
                [paramKey]: paramValue
            }
        },{skipNull:true})
        const res=await fetch(url)
        return res.json()
    }
    const {data, fetchNextPage, hasNextPage, isFetchingNextPage, status} = useInfiniteQuery({
        queryKey:[queryKey],
        queryFn: fetchMessages,
        getNextPageParam: (lastPage) => lastPage?.nextCursor,
        initialPageParam: undefined, 
        refetchInterval:  isConnected ? 2000 : 2000
    })

    return {
        data, fetchNextPage, hasNextPage, isFetchingNextPage, status
    }
    
}
 
