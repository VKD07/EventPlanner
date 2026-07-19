import ConsoleDebug from "../ConsoleDebug";
import Event from "./Event";
import { useEventsContext } from "../../Context/EventDataContext";
import { useEvent } from "../../hooks/useEvents";

const CreatedEvents = () => {

  const { setSelectedEvent, selectedEvent } = useEventsContext();
  const { data:events } = useEvent();

  return (
    <div className="w-full bg-pew rounded-2xl shadow-xl border border-brass/15 p-6 hover:shadow-2xl transition-shadow">
      <ConsoleDebug componentName="CreatedEvents" />
      <h2 className="font-display text-lg font-semibold text-parchment mb-4">
        Upcoming Events
      </h2>
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-pew-light scrollbar-track-transparent">
        {(events ?? []).length > 0 ? (
          (events ?? []).map((event) => (
            <Event
              key={event.id}
              event={event}
              clickedEvent={setSelectedEvent}
              selectedEvent={selectedEvent}
            />
          ))
        ) : (
          <p className="text-sm text-parchment/40 text-center py-8">No upcoming events</p>
        )}
      </div>
    </div>
  );
};
export default CreatedEvents;
