"use client";
import axios from 'axios';
import * as z from 'zod';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import FileUpload from '../file-upload';
import { NextResponse } from 'next/server';
import { useRouter } from 'next/navigation';
import { useModal } from '@/hooks/use-modal-store';



const formSchema=z.object({
    name: z.string().min(1, {
        message: "Server name is required"
    }), 
    imageUrl: z.string().min(1, {
        message: "Server image is required"
    })
})
const ServerModal = () => {
    const {type,isOpen,onClose} =useModal();
    const isModalOpen=  type=="createServer" && isOpen
    const form=useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            imageUrl: ""
        }
    })
    const router=  useRouter();

    const [isMounted, setIsMounted]= useState(false)
    useEffect(() => {
        setIsMounted(true)
    },[])

    const isLoading= form.formState.isSubmitting;
    const onSubmit=async (values: z.infer<typeof formSchema>) => {
        try{
            await axios.post('api/servers', values)
            form.reset()
            router.refresh()
            
            handleClose()
            window.location.reload()
            // router.push('/')
        }catch(e)
        {
            console.log("Submit Error: ",e)
        }
    }

   const handleClose = () => {

    onClose()
   }

    if(!isMounted)
        return null;
    return ( 
            <Dialog open onOpenChange={handleClose}>
                <DialogContent className="bg-white text-black p-0 overflow-hidden">
                    <DialogHeader className="pt-8 px-8">
                        <DialogTitle className="text-2xl text-center font-bold">
                            Customise your server
                        </DialogTitle>
                        <DialogDescription className="text-center text-zinc-500">
                            Give your server a personality with a name and an image. You can always change it later.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='spave-y-8'>
                            <div className='space-y-8 px-8 '>
                                <div className='space-y-8 px-6'>
                                    <div className='flex items-center justify-center text-center'>
                                        <FormField control={form.control} name="imageUrl" render={({field}) => (
                                            <FormItem>
                                                <FormControl>
                                                   <FileUpload onChange={field.onChange } value={field.value} endpoint="serverImage"/>
                                                </FormControl>
                                            </FormItem>
                                        )}>

                                        </FormField>
                                    </div>
                                </div>
                                <FormField control={form.control} name="name" render={({field}) => (
                                    <FormItem>
                                    <FormLabel className="uppercase text-s font-bold text-zinc-600 dark:text-secondary/70">
                                    Server name</FormLabel>

                                    <FormControl>
                                        <Input disabled={isLoading} 
                                        className='bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 ' placeholder='Enter server name' {...field} />
                                    </FormControl>
                                    <FormMessage></FormMessage>
                                    </FormItem>
                                )}>
                                    
                                </FormField>
                            </div>
                            <DialogFooter className='bg-gray-100 px-6 py-4'>
                                <Button disabled={isLoading} variant="primary">Create</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
     );
}
 
export default ServerModal;