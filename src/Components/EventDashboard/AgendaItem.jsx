import SongDetailsDialog from "../Dialogs/SongDetailsDialog";
import { useGetSongByID } from "../../hooks/useSongs";

const AgendaItem = ({ time, segment, leader, material }) => {
  const { data: songDetails } = useGetSongByID(material.material_id);

  const formattedTime = new Date(`1970-01-01T${time}`).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const [hourMin, meridiem] = formattedTime.split(" ");

  return (
    <div className="flex bg-pew-light/40 border border-brass/10 rounded-r-xl hover:border-brass/30 hover:bg-pew-light transition-colors overflow-hidden">
      {/* Perforated stub edge */}
      <div className="flex flex-col items-center justify-center gap-0.5 px-4 py-4 border-r-2 border-dashed border-brass/40 min-w-[92px]">
        <span className="font-mono text-lg font-semibold text-brass-light leading-none">
          {hourMin}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-parchment/40">
          {meridiem}
        </span>
      </div>

      <div className="flex-1 space-y-2 p-4">
        <h4 className="font-display font-semibold text-parchment text-base">{segment}</h4>

        <div className="flex flex-wrap gap-3 text-xs text-parchment/60">
          {leader && (
            <span className="flex items-center gap-1">
              Leading: <span className="font-medium text-parchment/80">{leader}</span>
            </span>
          )}

          {(songDetails || material.material_name) && (
            <span className="flex items-center gap-1">
              {songDetails ? (
                <SongDetailsDialog
                  buttonStyle="font-medium text-brass-light hover:text-brass hover:underline"
                  buttonName={songDetails.title}
                  songDetails={songDetails}
                />
              ) : (
                <span className="font-medium text-parchment/80">{material.material_name}</span>
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgendaItem;
