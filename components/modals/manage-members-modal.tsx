
"use client";
import axios from 'axios';
import * as z from 'zod';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import FileUpload from '../file-upload';
import { NextResponse } from 'next/server';
import { useRouter } from 'next/navigation';
import {useModal} from "../../hooks/use-modal-store"
import { Check, Gavel, Loader2, MoreVertical, Shield, ShieldAlert, ShieldCheck, ShieldQuestion } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import UserAvatar from '../user-avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { MemberRole } from '@prisma/client/edge';
import qs from "query-string"
const formSchema=z.object({
    name: z.string().min(1, {
        message: "Server name is required"
    }), 
    imageUrl: z.string().min(1, {
        message: "Server image is required"
    })
})

const roleMap = {
    "GUEST": null,
    "MODERATOR":<ShieldCheck className='h-4 w-4 ml-2 text-indigo-500' />,
    "ADMIN":<ShieldAlert className='h-4 w-4 text-rose-500'  />
}
const ManageMembersModal = () => {
    const { isOpen,onOpen, onClose, type,data} = useModal()
    const {server} =data
    const isModalOpen= type=="manageMembers" && isOpen
    const router=useRouter()
    const [loadingId, setLoadingId] =useState("")
    const onKick =  async (memberId: string)=>{
        try{
            setLoadingId(memberId)
            const url=qs.stringifyUrl({
                url: `/api/members/${memberId}`,
                query:{
                    serverId: server?.id
                }
            })
            const response=await axios.delete(url)
            console.log("response: ",response.data)
            router.refresh()
            onOpen("manageMembers",{server: response.data})
        }catch(e)
        {
            console.log("On kick Error: ", e)
            
        }finally{
            setLoadingId("")
        }
    }
    const onRoleChange =async (memberId : string, role: MemberRole) => {
        try{
            setLoadingId(memberId)

            const url=qs.stringifyUrl({
                url:`/api/members/${memberId}`,
                query:{
                    serverId:server?.id,
                }
            })
            const response=await axios.patch(url,{role})
            onOpen("manageMembers", {server: response.data})
            router.refresh()

        }
        catch(e)
        {
            console.log("One Role Change Error",e)
        }finally{
            setLoadingId("")
        }
    }
    return ( 
            <Dialog open={isModalOpen} onOpenChange={onClose}>
                <DialogContent className="bg-white text-black  overflow-hidden">
                    <DialogHeader className="pt-8 px-8">
                        <DialogTitle className="text-2xl text-center font-bold">
                            Manage Members
                        </DialogTitle>
                        <DialogDescription className='text-center text-zinc-500'>
                            {server?.members?.length} Members
                    </DialogDescription>
                    <ScrollArea className='mt-8 max-h-[420px] pr-6 '>
                        {server?.members?.map((member) => (
                            <div key={member.id} className='flex items-center gap-x-2 mb-6'>
                                <UserAvatar src={member.profile.imageUrl ? member.profile.imageUrl : "https://github.com/shadcn.png"}  />
                                <div className='flex flex-col gap-y-1'>
                                    <div className='text-xs font-semibold flex items-center gap-x-1'>
                                        {member.profile.name}
                                        {roleMap[member.role]}

                                    </div>
                                <p className='text-xs text-zinc-500'>
                                    {member.profile.email}
                                </p>
                                </div>
                                {server.profileId !== member.profileId && loadingId !== member.id &&(
                                    <div className='ml-auto'>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <MoreVertical className='h-4 w-4 text-zinc-500' />    
                                            </DropdownMenuTrigger>    
                                            <DropdownMenuContent side='left'>
                                                <DropdownMenuSub>
                                                    <DropdownMenuSubTrigger className='flex items-center'>
                                                        <ShieldQuestion className="w-4 h-4 mr-2"/>
                                                        <span>Role</span>
                                                    </DropdownMenuSubTrigger>
                                                    <DropdownMenuSubContent>
                                                        <DropdownMenuItem onClick={() => onRoleChange(member.id,"GUEST")}>
                                                            <Shield className="w-4 h-4 mr-2"/>
                                                            Guest
                                                            {member.role === "GUEST" && (
                                                                <Check />
                                                            )}
                                                        </DropdownMenuItem>

                                                        <DropdownMenuItem onClick={() => onRoleChange(member.id,"MODERATOR")}>
                                                            <Shield className="w-4 h-4 mr-2"/>
                                                            Moderator
                                                            {member.role === "MODERATOR" && (
                                                                <Check />
                                                            )}
                                                        </DropdownMenuItem>
                                                    </DropdownMenuSubContent>
                                                </DropdownMenuSub>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onClick={() => onKick(member.id)}>
                                                    <Gavel className='h-4 w-4 mr-2' />
                                                    Kick
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                )}
                                {loadingId===member.id && (
                                    <Loader2 className='animate-spin text-zinc-500 ml-auto w-4 h-4 '/>
                                )}
                            </div>
                        ))}
                    </ScrollArea>
                    </DialogHeader> 
                    
                    
                </DialogContent>
            </Dialog>
            )
}
 
export default ManageMembersModal;