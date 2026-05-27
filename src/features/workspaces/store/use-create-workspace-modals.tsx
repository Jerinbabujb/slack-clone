import {atom, useAtom} from 'jotai';

const modalStore = atom(false);
export const useCreateWorkspaceModal = () =>{
    return useAtom(modalStore);
}
