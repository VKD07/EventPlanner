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
      <div className="bg-gray-600 flex items-center justify-center mt-[81px]">
        <h2 className="text-gray-400 italic">Select an event to see details</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-gray-600 rounded h-auto mt-[81px] gap-5">
      <ConsoleDebug componentName="EventDetails" />
      <div className="flex justify-between p-5">
        <span>Title {selectedEvent.title}</span>
        <button
          className="bg-amber-200 py-1 px-2 rounded-2xl"
          onClick={() => handleEditClick(selectedEvent.id)}
        >
          EDIT
        </button>
      </div>
      <span>
        Date: {selectedEvent.eventDate}
      </span>
      <span>Location: {selectedEvent.location}</span>
      <span>Description {selectedEvent.description}</span>
      <EventFlow eventFlow={eventFlow} />
    </div>
  );
};

export default EventDetails;
