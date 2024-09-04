
import { currentProfile, getUser } from "@/app/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import NavigationAction from "./navigation-action";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import NavigationItem from "./navigation-item";
import { ModeToggle } from "../mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import Signout from "../signout";

const NavigationSidebar = async () => {

    const profile = await currentProfile();
    if (!profile) {
        redirect(`/api/auth/signin`)
    }

    

    //find out all the servers this user is a part of 
    const server = await db.server.findMany({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    })
    return (
        <div className="space-y-4 flex flex-col items-center h-full text-primary  w-full dark:bg-[#1E1F22] bg-[#E3E5E8] py-3">
            <NavigationAction />
            {/* <Separator  className="h-[2px" bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto /> */}
            <ScrollArea className="flex-1 w-full">
                {
                    server.map((s) => (
                        <div key={s.id} className="mb-4">
                            <NavigationItem id={s.id} name={s.name} imageUrl={s.imageUrl} />
                        </div>
                    ))
                }
            </ScrollArea>

            <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
                <ModeToggle />
                <Signout />
            </div>

        </div>
    );
}

export default NavigationSidebar;