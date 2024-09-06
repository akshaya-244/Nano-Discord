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
import qs from 'query-string'
import queryString from 'query-string';


const formSchema=z.object({
 
    fileUrl: z.string().min(1, {
        message: "Attachment is required"
    })
})
const MessageFileModal = () => {

    const form=useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
        
            fileUrl: ""
        }
    })

    const {isOpen , onClose, type, data}=useModal()
    const {apiUrl, query}=data
    const router=  useRouter();
    const isModalOpen=isOpen && type == "messageFile"
   
    const handleClose = () => {
        form.reset()
        onClose()
    }
    const isLoading= form.formState.isSubmitting;
    const onSubmit=async (values: z.infer<typeof formSchema>) => {
        try{
            const url=qs.stringifyUrl({
                url: apiUrl || "",
                query
            })
            await axios.post(url, {...values,
                content: values.fileUrl}
            )
            form.reset()
            router.refresh()
            onClose()
        }catch(e)
        {
            console.log("Submit Error: ",e)
        }
    }

   


    return ( 
            <Dialog open={isModalOpen} onOpenChange={handleClose}>
                <DialogContent className="bg-white text-black p-0 overflow-hidden">
                    <DialogHeader className="pt-8 px-8">
                        <DialogTitle className="text-2xl text-center font-bold">
                            Add an attachment
                        </DialogTitle>
                        <DialogDescription className="text-center text-zinc-500">
                           Send file as a message
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='spave-y-8'>
                            <div className='space-y-8 px-8 '>
                                <div className='space-y-8 px-6'>
                                    <div className='flex items-center justify-center text-center'>
                                        <FormField control={form.control} name="fileUrl" render={({field}) => (
                                            <FormItem>
                                                <FormControl>
                                                   <FileUpload onChange={field.onChange } value={field.value} endpoint="messageFile"/>
                                                </FormControl>
                                            </FormItem>
                                        )}>

                                        </FormField>
                                    </div>
                                </div>
     
                            </div>
                            <DialogFooter className='bg-gray-100 px-6 py-4'>
                                <Button disabled={isLoading} variant="primary">Send</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
     );
}
 
export default MessageFileModal;