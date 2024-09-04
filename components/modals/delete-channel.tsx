
"use client";
import axios from 'axios';
import * as z from 'zod';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import FileUpload from '../file-upload';
import { NextResponse } from 'next/server';
import {  useRouter } from 'next/navigation';
import {useModal} from "../../hooks/use-modal-store"
import { Check, Copy, RefreshCcw } from 'lucide-react';
import { useOrigin } from '@/hooks/use-origin';
import qs from "query-string"
const formSchema=z.object({
    name: z.string().min(1, {
        message: "Server name is required"
    }), 
    imageUrl: z.string().min(1, {
        message: "Server image is required"
    })
})
const DeleteChannelModal = () => {
    const { isOpen, onClose, type,data} = useModal()
    const {server, channel} =data
    const [isLoading, setIsLoading]=useState(false)
    const isModalOpen= type=="deleteChannel" && isOpen
    const router= useRouter()
    

    const onDelete =async () => {

        try{
            setIsLoading(true)

            const url=qs.stringifyUrl({
                url: `/api/channels/${channel?.id}`,
                query:{
                    serverId: server?.id
                }
            })
            await axios.delete(url)
            onClose();
            router.refresh()
            router.push(`/servers/${server?.id}`)
            window.location.reload()
        }catch(e){
            console.log("Delete Server Error", e)

        }finally{
            setIsLoading(false)
        }
        
    }
    return ( 
            <Dialog open={isModalOpen} onOpenChange={onClose}>
                <DialogContent className="bg-white text-black p-0 overflow-hidden">
                    <DialogHeader className="pt-8 px-8">
                        <DialogTitle className="text-2xl text-center font-bold">
                            Delete Channel
                        </DialogTitle>
                       <DialogDescription className='text-center text-md font-bold text-rose-700'>
                            Are you sure you want to delete <span className='font-semibold text-indigo-500'>#{channel?.name}</span>?
                       </DialogDescription>

                      
                    </DialogHeader>
                    <DialogFooter className='bg-gray-100 px-6 py-4'>
                        <div className='flex items-center w-full justify-between'>
                            <Button disabled={isLoading} variant="ghost" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button disabled={isLoading} variant="primary" onClick={onDelete}>
                                Confirm
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            )
}
 
export default DeleteChannelModal;