import SongDetailsDialog from "../Dialogs/songDetailsDialog";
import { useState } from "react";

const SongCategory = () => {
  const [songsData, setSongsData] = useState([
    {
      id: 1,
      name: "Sunset Whispers",
      author: "Luna Hart",
      lyrics:
        "The sun fades low, the wind starts slow, memories drift where the rivers flow...",
      tags: ["chill", "acoustic", "evening"],
      audio: ["Intro melody", "Verse 1 vocals", "Chorus loop"],
    },
    {
      id: 2,
      name: "Neon Skyline",
      author: "Echo Fields",
      lyrics:
        "City lights dance beneath the rain, hearts collide in electric pain...",
      tags: ["synthwave", "retro", "night"],
      audio: ["Synth pad layer", "Lead guitar riff", "Bass groove"],
    },
    {
      id: 3,
      name: "Paper Hearts",
      author: "Milo Vance",
      lyrics:
        "Folded dreams and paper hearts, fragile love that falls apart...",
      tags: ["indie", "romantic", "soft"],
      audio: ["Acoustic strum", "Harmony vocals", "Outro ambience"],
    },
    {
      id: 4,
      name: "Golden Horizon",
      author: "Aria Bloom",
      lyrics:
        "Through the clouds the light will rise, hope reborn in morning skies...",
      tags: ["uplifting", "folk", "sunrise"],
      audio: ["Guitar intro", "Main chorus", "Bridge instrumental"],
    },
    {
      id: 5,
      name: "Echoes in the Rain",
      author: "Noah Reign",
      lyrics:
        "Whispered echoes in the rain, calling softly through the pain...",
      tags: ["emotional", "ballad", "rain"],
      audio: ["Piano intro", "Vocal track", "String section"],
    },
  ]);

  if (songsData) {
    return (
      <div className="flex flex-row gap-4 items-start">
        {/* filters */}
        <div className="bg-amber-300 rounded-md p-2 w-[20%]">filters</div>
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
                      <span>{song.name}</span>
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
                    <button className="bg-amber-400 rounded-md p-1 text-xs hover:bg-amber-200">
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
