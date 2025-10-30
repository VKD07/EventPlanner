import ConsoleDebug from "../ConsoleDebug";
import Event from "./Event";
import { useEventsContext } from "../../Context/EventDataContext";
import { useEvent } from "../../hooks/useEvents";

const CreatedEvents = () => {

  const { setSelectedEvent, selectedEvent } = useEventsContext();
  const { data:events, isLoading, isError, error } = useEvent();

  return (
    <div>
      <ConsoleDebug componentName="CreatedEvents" />
      <h2 className="mt-2 font-bold text-2xl ml-4 lg:ml-10">
        UPCOMING EVENTS:
      </h2>
      <div
        className="bg-gray-200 w-full rounded-2xl mt-3 lg:w-auto
                 max-h-[340px] overflow-y-auto p-4"
      >
        {(events ?? []).map((event) => (
          <Event
            key={event.id}
            event={event}
            clickedEvent={setSelectedEvent}
            selectedEvent={selectedEvent}
          />
        ))}
      </div>
    </div>
  );
};
export default CreatedEvents;
