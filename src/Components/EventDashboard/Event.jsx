import ConsoleDebug from "../ConsoleDebug";
import { useEventsContext } from "../../Context/EventDataContext";

const Event = ({ event, clickedEvent, selectedEvent }) => {

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => {
        clickedEvent(event);
      }}
      className={
        "w-full text-left border border-gray-300 rounded-2xl px-3 py-4 mb-2 bg-blue-400 hover:bg-blue-500 transition" +
        (selectedEvent?.id === event.id ? " ring-2 ring-blue-800" : "")
      }
    >
      <ConsoleDebug componentName="Event" />

      <h2 className="text-2xl lg:text-[15px] font-bold">{event.title}</h2>

      <div className="flex justify-between">
        <p className="text-gray-600 mb-1 text-[13px]">
          {event.eventDate}
        </p>

        <h3 className="text-2xl lg:text-[12px] italic text-gray-800">
          {event.location}
        </h3>
      </div>

      <div className="border-b-1" />

      <p className="text-gray-800 pt-2 text-[11px]">{event.description}</p>
    </div>
  );
};

export default Event;