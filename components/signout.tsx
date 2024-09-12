"use client";
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";
import { currentProfile } from "@/app/lib/current-profile";
import { db } from "@/lib/db";
import { User2 } from "lucide-react";

const Signout = async() => {
    const handleClick=() => {
        signOut()
        redirect('/')
    }
    const handleProfile=await currentProfile()
    
    
    return ( 
        <div>
            <Avatar>
                    <button onClick={handleClick}>
                    {/* <AvatarImage src="" alt="@shadcn" /> */}
                    <AvatarFallback ><User2 /></AvatarFallback>
               
                    </button>
                </Avatar>
        </div>
     );
}
 
export default Signout;