import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getEvents, addEvent} from "../api/events.js";

export function useEvent(){
    return useQuery({
       queryKey: ["events"],
       queryFn: getEvents,
       staleTime: 1000 * 60 * 5,
    });
}

export function useAddEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addEvent,
    onSuccess: () => {
      queryClient.invalidateQueries(["events"]);
    },
  });
}