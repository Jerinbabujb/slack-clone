import { Button } from "@/components/ui/button"
import { useGetWorkSpace } from "@/features/workspaces/api/use-get-workspace";
import { useGetWorkSpaces } from "@/features/workspaces/api/use-get-workspaces";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modals";
import { useWorkspaceId } from "@/hooks/use-workspace-id"
// Ensure you import from the shadcn/ui components folder, not @radix-ui directly
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Loader, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export const WorkspaceSwitcher = () => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const [_open, setOpen] = useCreateWorkspaceModal();
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkSpace({ id: workspaceId });
  const { data: workspaces } = useGetWorkSpaces();

  const filterWorkspaces = workspaces?.filter((w) => w?._id !== workspaceId);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="size-9 relative overflow-hidden bg-[#ABABAD] hover:bg-[#ABABAD]/80 text-slate-800 font-semibold text-xl">
          {workspaceLoading ? (
            <Loader className="size-5 animate-spin shrink-0" />
          ) : (
            workspace?.name.charAt(0).toUpperCase()
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="start" className="w-64 p-2">
        {/* Active Workspace Item */}
        <DropdownMenuItem 
            onClick={() => router.push(`/workspace/${workspaceId}`)} 
            className="cursor-pointer flex flex-col justify-start items-start gap-0.5 p-2.5"
        >
          <p className="font-bold truncate">{workspace?.name}</p>
          <span className="text-xs text-muted-foreground">Active workspace</span>
        </DropdownMenuItem>

        {/* Other Workspaces */}
        {filterWorkspaces?.map((w) => (
          <DropdownMenuItem
            key={w._id}
            className="cursor-pointer gap-3 p-2.5 capitalize"
            onClick={() => router.push(`/workspace/${w._id}`)}
          >
            <div className="size-9 shrink-0 bg-blue-600 text-white font-semibold text-lg rounded-md flex items-center justify-center">
              {w.name.charAt(0).toUpperCase()}
            </div>
            <span className="truncate">{w.name}</span>
          </DropdownMenuItem>
        ))}

        {/* Create New Action */}
        <DropdownMenuItem className="cursor-pointer gap-3 p-2.5" onClick={() => setOpen(true)}>
          <div className="size-9 bg-[#F2F2F2] text-slate-800 font-semibold text-lg rounded-md flex items-center justify-center">
            <Plus />
          </div>
          <span className="text-muted-foreground">Create a new workspace</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}