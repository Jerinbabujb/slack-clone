"use client";

import { useCurrentUser } from "@/features/auth/api/use-current-user";
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useAuthActions } from "@convex-dev/auth/react";
import { sign } from "crypto";
import { Loader, LogOut } from "lucide-react";

export const UserButton=()=>{
    const {signOut}= useAuthActions();
    const{data, isLoading}= useCurrentUser();

    if(isLoading){
        return <Loader className='size-4 animate-spin text-muted-foreground'/>
    }
    if(!data){
        return null;
    }
    const{name, image}= data;
    const avatarFallback=name?.charAt(0).toUpperCase()
    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="outline-none relative">
                <Avatar className="size-10 hover:opacity-75 transition">
                    <AvatarImage alt={name} src={image}/>
                    <AvatarFallback>
                        {avatarFallback}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" side="right" className="w-60">
                <DropdownMenuItem>
                    <LogOut onClick={()=>signOut()} className="size-4 mr-2"/>Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}