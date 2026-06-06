"use client";
import { useCreateWorkspaceModal} from "../store/use-create-workspace-modals";
import { Dialog, DialogContent, DialogTitle,DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useCreateWorkspace } from "../api/use-create-workspace";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const CreateWorkspaceModal = () =>{
    const router = useRouter();
    const [open, setOpen]= useCreateWorkspaceModal();
    const [name,setName]= useState("");
    const {mutate, isPending, isError,data, isSettled }= useCreateWorkspace();


    const handleClose = ()=>{
        setOpen(false);
        setName("");
    }


    const handleSubmit=async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        mutate({name},{
            onSuccess(id){
                toast.success("workspace created");
                router.push(`/workspace/${id}`);
                handleClose();
            }
        })
      
    }


    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a workspace</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    disabled={isPending}
                    required
                    autoFocus
                    minLength={3}
                    placeholder="workspace name"/>
                    <div className="flex justify-end">
                        <Button disabled={isPending}>Create</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}