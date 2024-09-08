
"use client";
import axios from 'axios';
import * as z from 'zod';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import FileUpload from '../file-upload';
import { NextResponse } from 'next/server';
import { useParams, useRouter } from 'next/navigation';
import {useModal} from "../../hooks/use-modal-store"
import { ChannelType } from '@prisma/client/edge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import qs from 'query-string';
import { channel } from 'diagnostics_channel';

const formSchema=z.object({
    name: z.string().min(1, {
        message: "Channel name is required"
    }).refine(
        name => name !== "general",
        {
            message: "Channel name cannot be 'general'"
        }
    ), 
    type:z.nativeEnum(ChannelType) 
   
})
const EditChannelModal = () => {

    const { isOpen, onClose, type, data} = useModal()
    
    const {server, channel, channelType} = data
    const isModalOpen= type=="editChannel" && isOpen
    const form=useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            type: channelType 
           
        }
    })

   
    useEffect(() => {
        if(channel){
            console.log(channel.name)
            form.setValue("name",channel.name)
            form.setValue("type", channel.type)
        }
            
        
    },[form, channel])
    const router=  useRouter();
    const params=useParams()

    const isLoading= form.formState.isSubmitting;
    const onSubmit=async (values: z.infer<typeof formSchema>) => {
        try{
            const url=qs.stringifyUrl({
                url: "/api/channels",
                query: {
                   serverId: params?.serverId
                }
            })
            await axios.post(url, values)

            form.reset()
            router.refresh()
            onClose()
            // window.location.reload()

         }catch(e)
        {
            console.log("Submit Error: ",e)
        }
    }

   
    const handleClose = () => {
         form.reset()
         onClose()
    }
   
    return ( 
            <Dialog open={isModalOpen} onOpenChange={handleClose}>
                <DialogContent className="bg-white text-black p-0 overflow-hidden">
                    <DialogHeader className="pt-8 px-8">
                        <DialogTitle className="text-2xl text-center font-bold">
                            Edit Channel
                        </DialogTitle>
                        
                    </DialogHeader>
                    <Form {...form}>
                        {/* @ts-ignore */}
                        <form onSubmit={form.handleSubmit(onSubmit)} className='spave-y-8'>
                            <div className='space-y-8 px-8 '>
                                <div className='space-y-8 px-6'>
                                </div>
                                <FormField control={form.control} name="name" render={({field}) => (
                                    <FormItem>
                                    <FormLabel className="uppercase text-s font-bold text-zinc-600 dark:text-secondary/70">
                                    Channel name</FormLabel>

                                    <FormControl>
                                        <Input disabled={isLoading} 
                                        className='bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 '
                                         placeholder="Enter channel name"
                                         {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}>
                                    
                                </FormField>
                                <FormField control={form.control} name="type" render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Channel type</FormLabel>
                                        <Select disabled={isLoading} onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className='bg-zinc-300/50 border-0 focus:ring:0 text-black ring-offset-0 focus:ring-offset-0 capitalize'>
                                                    <SelectValue placeholder="Select a channel t ype" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {Object.values(ChannelType).map((type) =>(
                                                    <SelectItem key={type} value={type} className='capitalize'>
                                                        {type.toLocaleLowerCase()}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>)}
                                />
                            </div>
                            <DialogFooter className='bg-gray-100 px-6 py-4'>
                                <Button disabled={isLoading} variant="primary">Update</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
            )
}
 
export default EditChannelModal;