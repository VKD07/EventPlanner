import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTeams,
  getTeamsAndMembers,
  getTeamsAndMembersByEventID,
  addMemberIntoTeam,
  removeMemberFromTeam,
  updateTeamName,
} from "../api/teams.js";

export function useTeams() {
  return useQuery({
    queryKey: ["teams"],
    queryFn: getTeams,
  });
}

export function useTeamsWithMembers() {
  return useQuery({
    queryKey: ["teams", "withMembers"],
    queryFn: getTeamsAndMembers,
  });
}

export function useGetTeamAndMembersByEventID(id) {
  return useQuery({
    queryKey: ["teams", "byEvent", id],
    queryFn: () => getTeamsAndMembersByEventID(id),
    enabled: !!id,
  });
}

export function useAddMemberIntoTeam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ team_id, member_id }) =>
      addMemberIntoTeam(team_id, member_id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["teams", "byEvent", variables.team_id],
      });

      queryClient.invalidateQueries({ queryKey: ["teams", "byEvent"] });
    },
  });
}

export function useRemoveMemberFromTeam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ team_id, member_id }) =>
      removeMemberFromTeam(team_id, member_id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["teams", "byEvent", variables.team_id],
      });
      queryClient.invalidateQueries({ queryKey: ["teams", "byEvent"] });
    },
  });
}

export function useUpdateTeamName() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ team_id, team_name }) => updateTeamName(team_id, team_name),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["teams", "byEvent", variables.team_id],
      });
      queryClient.invalidateQueries({ queryKey: ["teams", "byEvent"] });
    },
  });
}
