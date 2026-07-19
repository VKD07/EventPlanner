import EventFlow from "./EventFlow";
import { useEventsContext } from "../../Context/EventDataContext";
import ConsoleDebug from "../ConsoleDebug";
import { useNavigate } from "react-router-dom";
import { useGetEventFlowByID } from "../../hooks/useEventFlow";

const EventDetails = () => {
  const { selectedEvent } = useEventsContext();
  const { data:eventFlow } = useGetEventFlowByID(selectedEvent?.id);

  const navigate = useNavigate();

  const handleEditClick = (id) => {
    navigate(`/edit/${id}`);
  };

  if (!selectedEvent) {
    return (
      <div className="w-full bg-pew rounded-2xl shadow-xl border border-brass/15 p-12 flex flex-col items-center justify-center min-h-[500px]">
        <div className="w-14 h-14 rounded-full border-2 border-brass/40 flex items-center justify-center mb-4">
          <span className="font-display text-brass/60 text-xl">§</span>
        </div>
        <h2 className="font-display text-lg font-medium text-parchment mb-2">No Event Selected</h2>
        <p className="text-sm text-parchment/40">Select an event to view its program</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-pew rounded-2xl shadow-xl border border-brass/15 overflow-hidden">
      <ConsoleDebug componentName="EventDetails" />

      {/* Header */}
      <div className="bg-ink px-6 py-6 text-parchment shadow-lg border-b-2 border-brass">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
          <div className="flex-1">
            <h1 className="font-display text-2xl font-semibold mb-2">{selectedEvent.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-parchment/60 font-mono">
              <span className="flex items-center gap-1">
                {new Date(selectedEvent.eventDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
              {selectedEvent.location && (
                <span className="flex items-center gap-1">
                  {selectedEvent.location}
                </span>
              )}
            </div>
          </div>
          <button
            className="bg-brass/15 hover:bg-brass/25 text-brass-light border border-brass/40 py-2 px-4 rounded-lg transition-colors text-sm font-medium whitespace-nowrap"
            onClick={() => handleEditClick(selectedEvent.id)}
          >
            Edit Event
          </button>
        </div>

        {selectedEvent.description && (
          <p className="text-parchment/70 text-sm leading-relaxed">
            {selectedEvent.description}
          </p>
        )}
      </div>

      {/* Event Flow */}
      <div className="p-6 bg-pew">
        <EventFlow eventFlow={eventFlow} />
      </div>
    </div>
  );
};

export default EventDetails;
