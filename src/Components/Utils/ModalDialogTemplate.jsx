import * as Dialog from "@radix-ui/react-dialog";

const ModalDialogTemplate = ({
  buttonName,
  onSelectElement,
  buttonStyle,
  icon,
}) => {
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
          <Dialog.Close>
            <button
              className="absolute top-4 right-4 bg-red-500 text-white rounded-full px-3 py-1 hover:bg-red-600"
              aria-label="Close"
            >
              ✕
            </button>
          </Dialog.Close>
          <Dialog.Title className="text-xl">TITLE HERE:</Dialog.Title>
          CONTENT HERE
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ModalDialogTemplate;
