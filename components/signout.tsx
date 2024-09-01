"use client";
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";

const Signout = () => {
    const handleClick=() => {
        signOut()
        redirect('/')
    }
    return ( 
        <div>
            <Avatar>
                    <button onClick={handleClick}>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
               
                    </button>
                </Avatar>
        </div>
     );
}
 
export default Signout;