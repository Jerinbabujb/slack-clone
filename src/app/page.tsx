"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AuthScreen } from "@/features/auth/components/auth-screen";
import { useAuthActions } from "@convex-dev/auth/react";
import { UserButton } from "@/features/auth/components/user-button";
import { useGetWorkSpaces } from "@/features/workspaces/api/use-get-workspaces";
import { useEffect, useMemo } from "react";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modals";
import { useRouter } from "next/navigation";

export default function Home() {
  const router =useRouter()
  const[open,setOpen]= useCreateWorkspaceModal();
  const {data, isLoading}= useGetWorkSpaces();
  const workspaceId = useMemo(()=> data?.[0]?._id, [data]);

  useEffect(()=>{
    if(isLoading) return ;
    
    if (workspaceId){
      router.replace(`/workspace/${workspaceId}`);
      console.log("Redirect to workspace");
    }
    else if(!open){
      setOpen(true);
    }

  },[workspaceId, isLoading, open, setOpen, router]);
  
  return (
   <div>
   <UserButton/>
   </div>
  );
}
