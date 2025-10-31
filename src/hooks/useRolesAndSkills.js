import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSkillsAndRoles } from "../api/skillsAndRoles";


export function useGetAllSkillsAndRoles(){
    return useQuery({
        queryKey: ['allSkillsAndRoles'],
        queryFn: getSkillsAndRoles,
    });
}