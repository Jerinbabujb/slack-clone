"use client";
import { useCreateWorkspaceModal} from "../store/use-create-workspace-modals";
import { Dialog, DialogContent, DialogDescription, DialogTitle,DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateWorkspace } from "../api/use-create-workspace";

export const CreateWorkspaceModal = () =>{
    const [open, setOpen]= useCreateWorkspaceModal();

    const {mutate}= useCreateWorkspace();
    const handleClose = ()=>{
        setOpen(false);
    }


    const handleSubmit=async ()=>{
        const data=await mutate({
            name:"workspace 1",
        },{
            onSuccess(data){
                router.push("/workspaces/${data}")
            },
            onError:(error)=>{

            },
            onSettled:()=>{

            }
        })
    }
    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a workspace</DialogTitle>
                </DialogHeader>
                <form className="space-y-4">
                    <Input
                    value=""
                    disabled={false}
                    required
                    autoFocus
                    minLength={3}
                    placeholder="workspace name"/>
                    <div className="flex justify-end">
                        <Button disabled={false}>Create</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}