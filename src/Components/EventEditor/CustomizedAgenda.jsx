import { useState, useEffect } from "react";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { useUpdateEventFlow } from "../../hooks/useEventFlow";
import MembersDialogs from "../Dialogs/MembersDialogs";
import MaterialsDialog from "../Dialogs/MaterialsDialog";

export default function CustomizedAgenda({ agenda, onDelete }) {
  const [time, setTime] = useState(agenda.time);
  const [segment, setSegment] = useState(agenda.segment);
  const [selectedMember, setSelectedMember] = useState();

  const updateEventFlowMutation = useUpdateEventFlow();

  const agendaTime = agenda.time?.slice(0, 5) || "";

  useEffect(() => {
    setTime(agendaTime);
    setSegment(agenda.segment);
    setSelectedMember(undefined);
  }, [agenda]);

  const handleBlur = (field, value) => {
    updateEventFlowMutation.mutate(
      {
        agendaID: agenda.id,
        time: field === "time" ? value : time,
        segment: field === "segment" ? value : segment,
        leaderID: field === "leader" ? value : selectedMember?.id,
      },
      {
        onSuccess: () => console.log("✅ Event flow updated successfully!"),
        onError: (err) => console.error("❌ Error updating event flow:", err),
      }
    );
  };

  return (
    <div className="bg-amber-200 rounded-2xl p-4">
      <form className="flex gap-4 portrait:flex-col landscape:flex-row landscape:items-center">
        <div className="flex items-center gap-2">
          <label htmlFor="time" className="text-sm">
            Time:
          </label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            onBlur={(e) => handleBlur("time", e.target.value)}
            className="bg-white rounded-md w-[100px] p-1 text-sm portrait:w-full"
          />
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="segment" className="text-sm">
            Segment:
          </label>
          <input
            id="segment"
            value={segment}
            onChange={(e) => setSegment(e.target.value)}
            onBlur={(e) => handleBlur("segment", e.target.value)}
            className="bg-white rounded-md w-[120px] p-1 text-sm portrait:w-full"
          />
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="leader" className="text-sm">
            Leader:{" "}
            {!selectedMember
              ? agenda.leader_name || "Select Leader"
              : selectedMember.name}
          </label>

          <MembersDialogs
            onSelectMember={(member) => {
              setSelectedMember(member);
              handleBlur("leader", member.id);
            }}
            buttonStyle="bg-amber-600 rounded p-2 hover:bg-amber-900 text-white"
            icon={<Pencil1Icon />}
          />
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="Materials" className="text-sm">
            Materials: {" "} Select Material
          </label>

          <MaterialsDialog
            buttonStyle="bg-amber-600 rounded p-2 hover:bg-amber-900 text-white"
            icon={<Pencil1Icon />}
          >
            Add material
          </MaterialsDialog>
        </div>

        <div className="w-full md:w-auto md:ms-auto flex justify-end items-center gap-2 shrink-0">
          <button
            type="button"
            className="bg-amber-900 text-white rounded-md px-3 py-1 text-sm hover:bg-amber-500 whitespace-nowrap"
            onClick={() => onDelete(agenda)}
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}
