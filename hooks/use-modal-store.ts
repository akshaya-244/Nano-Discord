import {create} from "zustand"
export type ModalType = "createServer"

interface ModalStore{
    type: ModalType | null;
    isOpen: boolean;
    onOpen: (type: ModalType) => void;
    onClose: () => void

}
// set is used to update the state of the store. When you call set, you provide an object that represents the new state, and Zustand merges this new state with the existing state.
export const useModal = create<ModalStore>((set) => ({
    type: null,
    isOpen: false,
    onOpen: (type) => set({isOpen: true, type}),
    onClose: () => set({isOpen:false , type: null})
}))