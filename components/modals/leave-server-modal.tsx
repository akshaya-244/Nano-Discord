
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
import { useRouter } from 'next/navigation';
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
const LeaveServerModal = () => {
    const { isOpen, onClose, type,data} = useModal()
    const {server} =data
    const [isLoading, setIsLoading]=useState(false)
    const isModalOpen= type=="leaveServer" && isOpen
    const router= useRouter()
    


    const onLeave =async () => {

        try{
            setIsLoading(true)
            await axios.patch( `/api/servers/${server?.id}/leave`)
            onClose();
            router.refresh()
            router.push('/')
            window.location.reload()
        }catch(e){
            console.log("LeaveServer Error", e)

        }finally{
            setIsLoading(false)
        }
        
    }
    return ( 
            <Dialog open={isModalOpen} onOpenChange={onClose}>
                <DialogContent className="bg-white text-black p-0 overflow-hidden">
                    <DialogHeader className="pt-8 px-8">
                        <DialogTitle className="text-2xl text-center font-bold">
                            Leave Server
                        </DialogTitle>
                       <DialogDescription className='text-center text-md font-bold text-rose-700'>
                            Are you sure you want to leave <span className='font-semibold text-indigo-500'>{server?.name}</span>?
                       </DialogDescription>

                      
                    </DialogHeader>
                    <DialogFooter className='bg-gray-100 px-6 py-4'>
                        <div className='flex items-center w-full justify-between'>
                            <Button disabled={isLoading} variant="ghost" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button disabled={isLoading} variant="primary" onClick={onLeave}>
                                Confirm
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            )
}
 
export default LeaveServerModal;