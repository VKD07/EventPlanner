import React from "react";
import CustomizedAgenda from "./CustomizedAgenda";
import { useNavigate } from "react-router-dom";
import { useEventsContext } from "../../Context/EventDataContext";
import {
  useGetEventFlowByID,
  useAddNewAgendaItem,
  useDeleteAgendaItem,
} from "../../hooks/useEventFlow";

const CustomizedEventFlow = ({ selectedEvent }) => {
  const navigate = useNavigate();
  const { data: eventsFlowData } = useGetEventFlowByID(selectedEvent.id);
  const [eventsFlow, setEventsFlow] = React.useState([]);
  const addAgendaItemMutation = useAddNewAgendaItem();
  const deleteAgendaItemMutation = useDeleteAgendaItem();

  React.useEffect(() => {
    if (eventsFlowData)
      setEventsFlow(
        [...eventsFlowData].sort(
          (a, b) => a.time.localeCompare(b.time)
        )
      );
  }, [eventsFlowData]);

  const addAgenda = () => {
    const prevTime = eventsFlowData?.at(-1)?.time ?? "00:00";
    addAgendaItemMutation.mutate(
      {
        eventID: selectedEvent.id,
        time: prevTime,
        segment: "New Segment",
        leaderID: null,
      },
      {
        onSuccess: () => console.log("✅ Agenda item added successfully!"),
        onError: (err) => console.error("❌ Error adding agenda item:", err),
      }
    );
  };

  const deleteAgenda = (deletedAgenda) => {
    deleteAgendaItemMutation.mutate(deletedAgenda.id, {
      onSuccess: () => console.log("✅ Agenda item deleted successfully!"),
      onError: (err) => console.error("❌ Error deleting agenda item:", err),
    });
  };

  const handleGoBackClick = () => {
    navigate("/dashboard");
  };

  return (
    <div className="bg-amber-50 rounded-2xl flex flex-col gap-2">
      <div className="flex flex-col p-5 gap-2">
        <span>Title: {selectedEvent.title}</span>
        <span>Description: {selectedEvent.description}</span>
        <span>Date: {selectedEvent.eventDate}</span>
        <span>Location: {selectedEvent.location}</span>
        <button
          onClick={handleGoBackClick}
          className="bg-amber-900 rounded p-2 hover:bg-amber-500 w-24"
        >
          Go Back
        </button>
      </div>

      <div>
        <span className="font-bold">Event Flow:</span>
        {!eventsFlow?.length ? (
          <p className="text-sm text-gray-600">No agenda items yet.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {eventsFlow.map((agenda) => (
              <CustomizedAgenda
                key={agenda.id}
                agenda={agenda}
                onDelete={deleteAgenda}
              />
            ))}
          </div>
        )}
        <button
          onClick={addAgenda}
          className="mt-5 border-2 border-dashed border-amber-500 py-1 px-5 rounded-2xl w-full h-10 hover:bg-amber-200 text-amber-500"
        >
          ADD
        </button>
      </div>
    </div>
  );
};

export default CustomizedEventFlow;
