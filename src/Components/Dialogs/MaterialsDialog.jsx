import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import SongCategory from "../MaterialsCategory/SongCategory";
import CategoryButton from "../MaterialsCategory/CategoryButton";
import ExtraCategory from "../MaterialsCategory/ExtraCategory";

const tabStyle = (active) =>
  `rounded-md px-4 py-2 text-sm font-medium transition-colors ${
    active
      ? "bg-brass text-inkwell"
      : "bg-white text-inkwell/60 hover:bg-brass/15"
  }`;

const MaterialsDialog = ({ buttonName, onSelectedMaterial, buttonStyle, icon }) => {
  const [selectedCategory, setSelectedCategory] = useState("songs");
  const [open, setOpen] = useState(false);

  const handleMaterialSelection = (selectedMaterial) => {
    onSelectedMaterial?.(selectedMaterial);
    setOpen(false);
  };

  const onCategoryClicked = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className={buttonStyle} onClick={() => setOpen(true)}>
        <div className="flex flex-row items-center gap-2">
          {buttonName}
          {icon}
        </div>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-ink/60 backdrop-blur-sm z-[60]" />
        <Dialog.Content
          className="fixed z-[60] bg-paper shadow-2xl border-t-4 border-brass rounded-2xl
          top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          p-4 md:p-8 mt-4 md:mt-10 max-h-[90vh] w-[95vw] md:w-auto md:min-w-[1000px] overflow-y-auto"
        >
          <Dialog.Close asChild>
            <button
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-ember text-white hover:bg-ember-light transition-colors"
              aria-label="Close"
            >
              ✕
            </button>
          </Dialog.Close>

          <Dialog.Title className="font-display text-xl font-semibold text-inkwell mb-4">
            Materials
          </Dialog.Title>

          <div className="flex flex-col gap-3">
            <div className="bg-ink flex flex-row gap-2 p-2 rounded-lg w-full">
              <CategoryButton
                style={tabStyle(selectedCategory === "songs")}
                categoryComponent="songs"
                onCategoryClicked={onCategoryClicked}
              >
                Songs
              </CategoryButton>

              <CategoryButton
                style={tabStyle(selectedCategory === "extras")}
                categoryComponent="extras"
                onCategoryClicked={onCategoryClicked}
              >
                Extras
              </CategoryButton>
            </div>

            {selectedCategory === "songs" && (
              <SongCategory onMaterialSelection={handleMaterialSelection} />
            )}

            {selectedCategory === "extras" && <ExtraCategory />}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default MaterialsDialog;
