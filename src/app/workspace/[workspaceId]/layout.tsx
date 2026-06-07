"use client"

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Sidebar } from "./sidebar";
import { Toolbar } from "./toolbar";
import { WorkspaceSidebar } from "./workspace-sidebar";

interface WorkspaceLayoutProps{
    children:React.ReactNode;
}

const WorkspaceLayout=({children}: WorkspaceLayoutProps)=>{
    return(
        <div className="h-ful">
            <Toolbar/>
            <div className="flex h-[calc(100vh-40px)]">
                <Sidebar/>
                <ResizablePanelGroup direction="horizontal" autoSaveId="jb-workspace-layput">
<ResizablePanel defaultSize={20} minSize={11} className="bg-[#5E2C5F]">
    <div>
        <WorkspaceSidebar/>
    </div>
</ResizablePanel >
<ResizableHandle withHandle/>
<ResizablePanel minSize={20}>
       {children}
</ResizablePanel>
         

                </ResizablePanelGroup>
            </div>
            </div>
    )
}

export default WorkspaceLayout;