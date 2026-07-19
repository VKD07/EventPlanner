import ConsoleDebug from "../ConsoleDebug";

const Event = ({ event, clickedEvent, selectedEvent }) => {

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => {
        clickedEvent(event);
      }}
      className={`
        w-full text-left rounded-xl px-4 py-3 cursor-pointer
        transition-all duration-200
        ${selectedEvent?.id === event.id
          ? "bg-brass/15 border-2 border-brass shadow-lg shadow-brass/10"
          : "bg-pew-light/40 border border-brass/10 hover:border-brass/30 hover:bg-pew-light"
        }
      `}
    >
      <ConsoleDebug componentName="Event" />

      <h3 className="text-sm font-semibold text-parchment mb-1 line-clamp-1">
        {event.title}
      </h3>

      <div className="flex items-center justify-between text-xs text-parchment/50 font-mono mb-2">
        <span className="flex items-center gap-1">
          {new Date(event.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </span>
        {event.location && (
          <span className="flex items-center gap-1 line-clamp-1">
            {event.location}
          </span>
        )}
      </div>

      {event.description && (
        <p className="text-xs text-parchment/60 line-clamp-2">{event.description}</p>
      )}
    </div>
  );
};

export default Event;
