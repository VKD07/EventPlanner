import AgendaItem from "./AgendaItem";
import ConsoleDebug from "../ConsoleDebug";

const EventFlow = ({ eventFlow }) => {

  if (!eventFlow || eventFlow.length <= 0) {
    return (
      <div className="text-center py-8">
        <div className="w-10 h-10 mx-auto rounded-full border-2 border-dashed border-brass/30 flex items-center justify-center mb-3">
          <span className="font-display text-brass/50">§</span>
        </div>
        <h3 className="text-sm font-medium text-parchment mb-1">No Agenda Set</h3>
        <p className="text-xs text-parchment/40">The order of service hasn't been built yet</p>
      </div>
    );
  }

  return (
    <div>
      <ConsoleDebug componentName="EventFlow" />

      <h2 className="font-display text-lg font-semibold text-parchment mb-4">Event Schedule</h2>
      <div className="space-y-3">
        {eventFlow.map((agenda, index) => (
          <AgendaItem
            key={index}
            time={agenda.time}
            segment={agenda.segment}
            leader={agenda.leader_name}
            material={{material_name: agenda.material_name, material_type: agenda.material_type, material_id: agenda.material_id}}
          />
        ))}
      </div>
    </div>
  );
};

export default EventFlow;
