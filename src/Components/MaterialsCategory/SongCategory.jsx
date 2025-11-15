import { set } from "react-hook-form";
import SongDetailsDialog from "../Dialogs/songDetailsDialog";
import { use, useEffect, useState } from "react";
import UploadSongDialog from "../Dialogs/UploadSongDialog";
import { useGetSongsAndMaterialID } from "../../hooks/useSongs";

const SongCategory = ({ onMaterialSelection }) => {

  const { data: songsData, isLoading, error } = useGetSongsAndMaterialID();

  
  if (songsData) {
    
    return (
      <div className="flex flex-row gap-4 items-start">
        {/* filters */}
        <div className="bg-amber-300 rounded-md p-2 w-[20%]">
          <span>filters:</span>

          <UploadSongDialog
            buttonName={"Upload A Song"}
            buttonStyle={"rounded-md bg-amber-500 p-2 w-full"}
          />
        </div>
        <div className="bg-amber-300 flex flex-wrap font-bold mb-2 w-[80%] rounded-md max-h-[60vh] overflow-y-auto">
          {/* list of songs */}
          <h1 className="w-full pl-2 pt-2">Song List:</h1>
          <div className="flex flex-col gap-2 w-full p-2">
            {songsData.map((song, index) => (
              <div
                key={index}
                className="bg-amber-600 rounded-md w-full pl-2 py-2"
              >
                <div className="flex flex-row items-center justify-between">
                  {/* Left side: song and author info */}

                  <div className="flex flex-row items-center gap-15">
                    <div className="flex flex-row items-center gap-1">
                      <span className="font-semibold">Song:</span>
                      <span>{song.title}</span>
                    </div>

                    <div className="flex flex-row items-center gap-1">
                      <span className="font-semibold">Author:</span>
                      <span>{song.author}</span>
                    </div>
                  </div>

                  {/* Right side: buttons */}
                  <div className="flex flex-row items-center gap-2 mr-2">
                    <SongDetailsDialog
                      buttonName={"VIEW"}
                      buttonStyle={
                        "bg-amber-400 rounded-md p-1 text-xs hover:bg-amber-200"
                      }
                      songDetails={song}
                    />
                    <button onClick={() => onMaterialSelection({id: song.agenda_material_id, name: song.title})} className="bg-amber-400 rounded-md p-1 text-xs hover:bg-amber-200">
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

  return <div>No Songs available!</div>;
};

export default SongCategory;
