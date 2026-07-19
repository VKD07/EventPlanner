import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSkillsAndRoles, createSkill, createRole } from "../api/skillsAndRoles";


export function useGetAllSkillsAndRoles(){
    return useQuery({
        queryKey: ['allSkillsAndRoles'],
        queryFn: getSkillsAndRoles,
    });
}

export function useCreateSkill() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (name) => createSkill(name),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["allSkillsAndRoles"] }),
  });
}

export function useCreateRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (name) => createRole(name),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["allSkillsAndRoles"] }),
  });
}