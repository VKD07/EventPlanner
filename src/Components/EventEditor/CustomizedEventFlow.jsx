import React, { useRef, forwardRef } from "react";
import CustomizedAgenda from "./CustomizedAgenda";
import { useNavigate } from "react-router-dom";
import { useEventsContext } from "../../Context/EventDataContext";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  restrictToVerticalAxis,
  restrictToParentElement,
} from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import { useGetEventFlowByID } from "../../hooks/useEventFlow";

const SortableAgenda = React.memo(
  forwardRef(function SortableAgenda({ agenda, onDeletAgenda }, ref) {
    const id = String(agenda.id);
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
    const style = { transform: CSS.Transform.toString(transform), transition };

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        className={`flex items-start gap-2 portrait:w-131 will-change-transform ${isDragging ? "opacity-80" : ""}`}
      >
        <div className="flex-1">
          <CustomizedAgenda ref={ref} agenda={agenda} onDelete={onDeletAgenda} />
        </div>
        <button
          type="button"
          aria-label="Drag to reorder"
          {...listeners}
          className="ml-auto p-2 text-2xl mt-1 font-bold text-gray-600 rounded hover:text-black cursor-grab active:cursor-grabbing select-none touch-none"
          title="Drag to reorder"
        >
          ≡
        </button>
      </div>
    );
  })
);

const CustomizedEventFlow = ({ selectedEvent }) => {
  const navigate = useNavigate();
  const { updateEvent } = useEventsContext();
  const agendaRefs = useRef({});
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  const {data:eventsFlow} = useGetEventFlowByID(selectedEvent.id);

  const addAgenda = () => {
    const prevTime = selectedEvent.eventFlow?.at(-1)?.time ?? "00:00";
    const newAgenda = {
      id: crypto.randomUUID(),
      segment: "New Segment",
      leader: "Leader Name",
      time: prevTime,
    };
    const updatedEvent = { ...selectedEvent, eventFlow: [...selectedEvent.eventFlow, newAgenda] };
    updateEvent(updatedEvent);
  };

  

  const deleteAgenda = (deletedAgenda) => {
    const updatedEvent = {
      ...selectedEvent,
      eventFlow: selectedEvent.eventFlow?.filter((agenda) => agenda.id !== deletedAgenda.id),
    };
    updateEvent(updatedEvent);
  };

  const handleGoBackClick = () => {
    const updatedFlow = selectedEvent.eventFlow?.map((agenda) => {
      const ref = agendaRefs.current[agenda.id];
      return ref?.getValues ? ref.getValues() : agenda;
    });
    updateEvent({ ...selectedEvent, eventFlow: updatedFlow });
    navigate("/");
  };

  const handleDragStart = () => {
    if (document.activeElement && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const flow = selectedEvent.eventFlow;
    const from = flow.findIndex((i) => String(i.id) === String(active.id));
    const to = flow.findIndex((i) => String(i.id) === String(over.id));
    if (from < 0 || to < 0) return;
    const reordered = arrayMove(flow, from, to);
    updateEvent({ ...selectedEvent, eventFlow: reordered });
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
        {!eventsFlow ? (
          <p className="text-sm text-gray-600">No agenda items yet.</p>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis, restrictToParentElement]}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={eventsFlow?.map((a) => String(a.id))}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-col gap-2">
                {eventsFlow?.map((agenda) => (
                  <SortableAgenda
                    key={agenda.id}
                    ref={(el) => {
                      if (el) {
                        agendaRefs.current[agenda.id] = el;
                      } else {
                        delete agendaRefs.current[agenda.id];
                      }
                    }}
                    agenda={agenda}
                    onDeletAgenda={deleteAgenda}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
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
