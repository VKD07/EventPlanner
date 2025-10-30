import { useQuery } from "@tanstack/react-query";
import { getMembersById, getAllMembers, getAllMembersWithSkillsAndRoles } from "../api/members.js";


export function useGetAllMembers(){
    return useQuery({
        queryKey: ['allMembers'],
        queryFn: getAllMembers,
    });
}

export function useGetMembersById(id){
    return useQuery({
        queryKey: ['Members', id],
        queryFn: () => getMembersById(id),
        enabled: !!id
    });
}

export function useGetAllMembersAndTheirAtrrib(){
    return useQuery({
        queryKey: ['allMembersWithAttrib'],
        queryFn: getAllMembersWithSkillsAndRoles
    });
}