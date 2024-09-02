
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

const formSchema=z.object({
    name: z.string().min(1, {
        message: "Server name is required"
    }), 
    imageUrl: z.string().min(1, {
        message: "Server image is required"
    })
})
const InviteModal = () => {
    const origin=useOrigin()
    const { isOpen, onClose, type,data} = useModal()
    const {server} =data
    const isModalOpen= type=="invite" && isOpen
    const inviteUrl = `${origin}/invite/${server?.inviteCode}`

    const [copy, setCopy]=useState(false)
    const [loading, setLoading]=useState(false)
    const onCopy= () => {
      navigator.clipboard.writeText(inviteUrl)  
      setCopy(true)

      setTimeout(() => {
        setCopy(false)
      },1000)
    }
    return ( 
            <Dialog open={isModalOpen} onOpenChange={onClose}>
                <DialogContent className="bg-white text-black p-0 overflow-hidden">
                    <DialogHeader className="pt-8 px-8">
                        <DialogTitle className="text-2xl text-center font-bold">
                            Invite your friends
                        </DialogTitle>
                        <div className='flex items-center mt-2 gap-x-2'>
                            <Input className='bg-zinc-300/50 border-0 focus-visible:ring text-black focus-visible:ring-offset-0' value={inviteUrl} />
                            <Button onClick={onCopy} size="icon" >
                                {copy ? <Check className='w-4 h-4'/> : <Copy className='w-4 h-4'/>}
                        </Button>
                        </div>

                        {/* <Button variant="link" size="sm" className='text-xs text-zinc-500 mt-4'> 
                            Generate a link
                            <RefreshCcw className='h-4 w-4 ml-2'/>
                        </Button> */}
                    </DialogHeader>
                    
                </DialogContent>
            </Dialog>
            )
}
 
export default InviteModal;