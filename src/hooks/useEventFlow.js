import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  getEventFlowByEventID,
  updateEventFlowByID,
  addAgendaItem,
  deleteAgendaItem,
} from "../api/eventFlow";

export function useGetEventFlowByID(eventId) {
  return useQuery({
    queryKey: ["event_flow", eventId],
    queryFn: () => getEventFlowByEventID(eventId),
    enabled: !!eventId,
  });
}

export function useUpdateEventFlow() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ agendaID, time, segment, leaderID }) =>
      updateEventFlowByID(agendaID, time, segment, leaderID),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["event_flow"],
      });
    },
  });
}

export function useAddNewAgendaItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ eventID, time, segment, leaderID }) =>
      addAgendaItem(eventID, time, segment, leaderID),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["event_flow"],
      });
    },
  });
}

export function useDeleteAgendaItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn:  async (agendaID) => deleteAgendaItem(agendaID),
    onSuccess: () => {
      queryClient.invalidateQueries({});
    },
  });
}
