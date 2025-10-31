import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import SongCategory from "../MaterialsCategory/SongCategory";
import CategoryButton from "../MaterialsCategory/CategoryButton";
import ExtraCategory from "../MaterialsCategory/ExtraCategory";

const MaterialsDialog = ({ buttonName, onSelectMember, buttonStyle, icon }) => {
  const [selectedCategory, setSelectedCategory] = useState(<SongCategory />);

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

        <Dialog.Close asChild>
          <button
            className="absolute top-4 right-4 bg-red-500 text-white rounded-full px-3 py-1 hover:bg-red-600"
            aria-label="Close"
          >
            ✕
          </button>
        </Dialog.Close>

          <Dialog.Title className="text-xl mb-4">Categories:</Dialog.Title>

          {/* Category buttons */}
          <div className="flex flex-col gap-2">
            <div className="bg-amber-700 flex flex-row gap-3 p-3 w-full">
              <CategoryButton
                style={"bg-amber-200 rounded-md p-2 hover:bg-amber-500"}
                categoryComponent={<SongCategory />}
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
