import * as Dialog from "@radix-ui/react-dialog";

const SongDetailsDialog = ({ buttonName, buttonStyle, icon, songDetails }) => {
  if (songDetails) {
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
            <Dialog.Title className="text-xl mb-4">Song Details:</Dialog.Title>

            <div className="bg-amber-300 p-4 rounded-md flex flex-row gap-2">
              <div className="bg-amber-200 rounded-md w-[70%] flex flex-col gap-2 items-center">
                <span>Title: {songDetails.name}</span>
                <span>Author: {songDetails.author}</span>
                <span>
                  Lyrics:
                  <br />
                  {songDetails.lyrics}
                </span>
              </div>
              <div className="flex flex-col gap-4 w-[30%]">
                <div className="bg-amber-200 rounded-md">AUDIO</div>
                <div className="bg-amber-400 rounded-md">TAGS</div>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  }

  return <div>No Song Details</div>;
};

export default SongDetailsDialog;
