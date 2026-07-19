import React from "react";
import CustomizedAgenda from "./CustomizedAgenda";
import { useNavigate } from "react-router-dom";
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
    <div className="bg-paper rounded-2xl flex flex-col gap-2 border-t-4 border-brass shadow-xl">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between p-6 gap-4 border-b border-dashed border-inkwell/15">
        <div className="flex flex-col gap-1">
          <span className="font-display text-2xl font-semibold text-inkwell">{selectedEvent.title}</span>
          {selectedEvent.description && (
            <span className="text-inkwell/60 text-sm">{selectedEvent.description}</span>
          )}
          <span className="font-mono text-xs text-inkwell/50 mt-1">
            {selectedEvent.eventDate} · {selectedEvent.location}
          </span>
        </div>
        <button
          onClick={handleGoBackClick}
          className="text-sm font-medium text-inkwell/60 hover:text-inkwell border border-inkwell/15 hover:border-brass rounded-md px-3 py-1.5 transition-colors whitespace-nowrap"
        >
          ← Back to dashboard
        </button>
      </div>

      <div className="p-6 pt-4">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-inkwell/40">Order of Service</span>
        {!eventsFlow?.length ? (
          <p className="text-sm text-inkwell/40 italic mt-2">No agenda items yet.</p>
        ) : (
          <div className="flex flex-col gap-2 mt-3">
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
          className="mt-4 border-2 border-dashed border-brass/50 py-2 px-5 rounded-xl w-full hover:bg-brass/10 text-brass font-medium transition-colors"
        >
          + Add agenda item
        </button>
      </div>
    </div>
  );
};

export default CustomizedEventFlow;
