"use client";
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { redirect, useRouter } from "next/navigation";
import ActionToolTip from "./action-tooltip";
import { useEffect, useState } from "react";

const Signout = () => {
    const router=useRouter()
    const handleClick=() => {
        signOut()
        router.push('/signin')
    }

    const chooseColor = () => {
        const randomNum = Math.floor(Math.random() * 5) + 1;
        switch (randomNum) {
            case 1:
                return "bg-red-300";
            case 2:
                return "bg-pink-300";
            case 3:
                return "bg-sky-500";
            case 4:
                return "bg-green-300";
            case 5:
                return "bg-purple-500";
            default:
                return "bg-gray-500"; // Fallback color
        }
    };

    // Store the random color in state and assign it when the component loads
    const [avatarColor, setAvatarColor] = useState('');

    useEffect(() => {
        setAvatarColor(chooseColor()); // Set the color once when the component mounts

    }, []);
    return ( 
        <div>
            <ActionToolTip label="Signout" side="right">
            <Avatar className="bg-pink-500">

                    <button onClick={handleClick}>
                    <AvatarImage className={avatarColor} src="https://img.icons8.com/?size=100&id=inn1OYcXlq45&format=png&color=000000" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
               
                    </button>
                </Avatar>
                </ActionToolTip>
        </div>
     );
}
 
export default Signout;