import AgendaItem from "./AgendaItem";
import ConsoleDebug from "../ConsoleDebug";

const EventFlow = ({ eventFlow }) => {

  if (!eventFlow) {
    return (
      <div className="bg-amber-50 rounded-2xl">
        <h2 className="font-bold p-2">No event flow available</h2>
      </div>
    );
  }

  return (
    <div className="bg-amber-50 rounded-2xl">

      <ConsoleDebug componentName="EventFlow" />

      <h2 className="font-bold p-2">Event flow:</h2>
      <div className="flex-col">
        {eventFlow.map((agenda, index) => (
          <ul key={index}>
            <li>
              <AgendaItem
                time={agenda.time}
                segment={agenda.segment}
                leader={agenda.leader_name}
                elements={agenda.elements}
              />
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default EventFlow;
