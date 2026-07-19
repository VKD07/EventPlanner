import { Pencil1Icon } from "@radix-ui/react-icons";
import { useUpdateEventFlow } from "../../hooks/useEventFlow";
import MembersDialogs from "../Dialogs/MembersDialogs";
import MaterialsDialog from "../Dialogs/MaterialsDialog";
import { useGetSongByID } from "../../hooks/useSongs";
import SongDetailsDialog from "../Dialogs/songDetailsDialog";

const editIconButton =
  "bg-inkwell/10 hover:bg-brass hover:text-inkwell text-inkwell/60 rounded p-1.5 transition-colors";

export default function CustomizedAgenda({ agenda, onDelete }) {
  const updateEventFlowMutation = useUpdateEventFlow();

  const { data: songDetails } = useGetSongByID(agenda.material_id);

  const handleUpdate = (field, value) => {
    updateEventFlowMutation.mutate(
      {
        agendaID: agenda.id,
        time: field === "time" ? value : agenda.time,
        segment: field === "segment" ? value : agenda.segment,
        leaderID: field === "leader" ? value : agenda.leader_id,
        materialID: field === "material" ? value : agenda.material_pk,
      },
      {
        onSuccess: () => console.log("✅ Event flow updated successfully!"),
        onError: (err) => console.error("❌ Error updating event flow:", err),
      }
    );
  };

  return (
    <div className="flex flex-col sm:flex-row bg-white border border-inkwell/10 rounded-xl sm:rounded-r-xl overflow-hidden">
      <div className="border-b-2 sm:border-b-0 sm:border-r-2 border-dashed border-brass/40 px-3 py-2 sm:py-0 flex items-center">
        <input
          type="time"
          id="time"
          defaultValue={agenda.time?.slice(0, 5) || ""}
          onBlur={(e) => handleUpdate("time", e.target.value)}
          className="font-mono text-brass font-semibold bg-transparent w-[92px] focus:outline-none"
        />
      </div>

      <form className="flex-1 flex flex-wrap gap-3 sm:gap-4 items-start sm:items-center p-3">
        <div className="flex items-center gap-2 w-full sm:flex-1 sm:min-w-[140px]">
          <input
            id="segment"
            defaultValue={agenda.segment}
            onBlur={(e) => handleUpdate("segment", e.target.value)}
            className="font-display font-semibold text-inkwell w-full bg-transparent border-b border-transparent hover:border-inkwell/20 focus:border-brass focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 text-sm text-inkwell/70">
          <span>{agenda.leader_name || "No leader"}</span>
          <MembersDialogs
            onSelectMember={(member) => handleUpdate("leader", member.id)}
            buttonStyle={editIconButton}
            icon={<Pencil1Icon />}
          />
        </div>

        <div className="flex items-center gap-1.5 text-sm text-inkwell/70">
          {(songDetails && (
            <SongDetailsDialog
              buttonStyle={"underline decoration-brass hover:text-brass"}
              buttonName={songDetails.title}
              songDetails={songDetails}
            />
          )) ||
            agenda.material_name || <span className="text-inkwell/40 italic">No material</span>}

          <MaterialsDialog
            buttonStyle={editIconButton}
            onSelectedMaterial={(material) =>
              handleUpdate("material", material.id)
            }
            icon={<Pencil1Icon />}
          />
        </div>

        <div className="w-full md:w-auto md:ms-auto flex justify-end items-center gap-2 shrink-0">
          <button
            type="button"
            className="bg-ember hover:bg-ember-light text-white rounded-md px-3 py-1 text-sm transition-colors whitespace-nowrap"
            onClick={() => onDelete(agenda)}
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}
