import { ServerWithMemebersWithProfile } from "@/types";
import {  Channel, ChannelType, Server } from "@prisma/client/edge";
import {create} from "zustand"
 
export type ModalType = "createServer" | "invite" | "editServer" | "manageMembers" |"createChannel" |"leaveServer" | "deleteServer" | "deleteChannel" | "editChannel" |"messageFile" |"deleteMessage"

interface ModalData{
    server?: ServerWithMemebersWithProfile | Server,
    channel?: Channel,
    channelType? : ChannelType,
    apiUrl?: string,
    query?: Record<string, any>
}


interface ModalStore{
    type: ModalType | null;
    data: ModalData
    isOpen: boolean;
    onOpen: (type: ModalType,data?: ModalData) => void;
    onClose: () => void

}
// set is used to update the state of the store. When you call set, you provide an object that represents the new state, and Zustand merges this new state with the existing state.
export const useModal = create<ModalStore>((set) => ({
    type: null,
    data:{},
    isOpen: false,
    onOpen: (type, data={}) => set({isOpen: true, type, data}),
    onClose: () => set({isOpen:false , type: null})

}))