import { useQuery } from "@tanstack/react-query";
import { getEventFlowByEventID } from "../api/eventFlow";

export function useGetEventFlowByID(eventId) {
  return useQuery({
    queryKey: ["event_flow", eventId],
    queryFn: () => getEventFlowByEventID(eventId),
    enabled: !!eventId, 
  });
}