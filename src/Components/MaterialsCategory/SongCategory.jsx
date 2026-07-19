import SongDetailsDialog from "../Dialogs/songDetailsDialog";
import { useGetSongsAndMaterialID } from "../../hooks/useSongs";

const SongCategory = ({ onMaterialSelection }) => {

  const { data: songsData } = useGetSongsAndMaterialID();

  if (songsData) {

    return (
      <div className="flex flex-col gap-4 items-start">
        <div className="bg-white border border-inkwell/10 flex flex-wrap mb-2 w-full rounded-md max-h-[60vh] overflow-y-auto">
          {/* list of songs */}
          <h1 className="font-display w-full pl-3 pt-3 text-inkwell font-semibold">Song List</h1>
          <div className="flex flex-col gap-2 w-full p-3">
            {songsData.map((song, index) => (
              <div
                key={index}
                className="bg-parchment/60 border border-inkwell/5 rounded-md w-full pl-3 py-2"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  {/* Left side: song and author info */}

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 md:gap-4">
                    <div className="flex flex-row items-center gap-1">
                      <span className="font-semibold text-inkwell text-sm">{song.title}</span>
                    </div>

                    <div className="flex flex-row items-center gap-1">
                      <span className="text-inkwell/60 text-sm">{song.author}</span>
                    </div>
                  </div>

                  {/* Right side: buttons */}
                  <div className="flex flex-row items-center gap-2 md:mr-2">
                    <SongDetailsDialog
                      buttonName={"View"}
                      buttonStyle={
                        "bg-white border border-inkwell/15 rounded-md px-2 py-1 text-xs hover:border-brass transition-colors"
                      }
                      songDetails={song}
                    />
                    <button onClick={() => onMaterialSelection({id: song.agenda_material_id, name: song.title})} className="bg-brass hover:bg-brass-light text-inkwell rounded-md px-2 py-1 text-xs font-medium transition-colors">
                      Select
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return <div className="text-inkwell/40 italic">No songs available yet.</div>;
};

export default SongCategory;
