import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getMembersById,
  getAllMembers,
  getAllMembersWithSkillsAndRoles,
  createMember,
  updateMember,
  deleteMember,
  addSkillToMember,
  removeSkillFromMember,
  addRoleToMember,
  removeRoleFromMember,
} from "../api/members.js";

function invalidateMembers(queryClient) {
  queryClient.invalidateQueries({ queryKey: ["allMembers"] });
  queryClient.invalidateQueries({ queryKey: ["allMembersWithAttrib"] });
}

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

export function useCreateMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createMember,
    onSuccess: () => invalidateMembers(queryClient),
  });
}

export function useUpdateMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateMember,
    onSuccess: () => invalidateMembers(queryClient),
  });
}

export function useDeleteMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteMember(id),
    onSuccess: () => invalidateMembers(queryClient),
  });
}

export function useAddSkillToMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ memberId, skillId }) => addSkillToMember(memberId, skillId),
    onSuccess: () => invalidateMembers(queryClient),
  });
}

export function useRemoveSkillFromMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ memberId, skillId }) => removeSkillFromMember(memberId, skillId),
    onSuccess: () => invalidateMembers(queryClient),
  });
}

export function useAddRoleToMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ memberId, roleId }) => addRoleToMember(memberId, roleId),
    onSuccess: () => invalidateMembers(queryClient),
  });
}

export function useRemoveRoleFromMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ memberId, roleId }) => removeRoleFromMember(memberId, roleId),
    onSuccess: () => invalidateMembers(queryClient),
  });
}