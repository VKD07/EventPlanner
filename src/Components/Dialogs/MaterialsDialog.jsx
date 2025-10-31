import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import SongCategory from "../MaterialsCategory/SongCategory";
import CategoryButton from "../MaterialsCategory/CategoryButton";
import ExtraCategory from "../MaterialsCategory/ExtraCategory";


const MaterialsDialog = ({ buttonName, onSelectMember, buttonStyle, icon }) => {
  const [data, setData] = useState([
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

  const [selectedCategory, setSelectedCategory] = useState(
    <SongCategory materialData={data} />
  );

  const onCategoryClicked = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger className={buttonStyle}>
        <div className="flex flex-row items-center gap-2">
          {buttonName}
          {icon}
        </div>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />

        <Dialog.Content
          className="fixed bg-amber-200 shadow rounded-2xl
          top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
          p-8 mt-10 max-h-[90vh] min-w-[1000px] overflow-y-auto"
        >
          <Dialog.Title className="text-xl mb-4">Categories:</Dialog.Title>

          {/* Category buttons */}
          <div className="flex flex-col gap-2">
            <div className="bg-amber-700 flex flex-row gap-3 p-3 w-full">

              <CategoryButton
                style={"bg-amber-200 rounded-md p-2 hover:bg-amber-500"}
                categoryComponent={<SongCategory materialData={data} />}
                onCategoryClicked={onCategoryClicked}
              >
                Songs
              </CategoryButton>

                <CategoryButton
                style={"bg-amber-200 rounded-md p-2 hover:bg-amber-500"}
                categoryComponent={<ExtraCategory />}
                onCategoryClicked={onCategoryClicked}
              >
                Sample
              </CategoryButton>
            </div>

            {selectedCategory}

          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default MaterialsDialog;
