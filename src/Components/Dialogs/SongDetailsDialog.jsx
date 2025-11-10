import * as Dialog from "@radix-ui/react-dialog";
import { useSongAudioUrl } from "../../hooks/useSongs";
import { useTagBySongID } from "../../hooks/useTags";

const SongDetailsDialog = ({ buttonName, buttonStyle, icon, songDetails }) => {

  const {data : audioUrl} = useSongAudioUrl(songDetails.audioUrl);
  const {data: tags} = useTagBySongID(songDetails.id);

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
            <Dialog.Close asChild>
              <button
                className="absolute top-4 right-4 bg-red-500 text-white rounded-full px-3 py-1 hover:bg-red-600"
                aria-label="Close"
              >
                ✕
              </button>
            </Dialog.Close>

            <Dialog.Title className="text-xl mb-4">Song Details:</Dialog.Title>

            <div className="bg-amber-300 p-4 rounded-md flex flex-row gap-2">
              <div className="bg-amber-200 rounded-md w-[70%] flex flex-col gap-2 items-center">
                <span>Title: {songDetails.title}</span>
                <span>Author: {songDetails.author}</span>
                <span>
                  Lyrics:
                  <br />
                  {songDetails.lyrics}
                </span>
              </div>
              <div className="flex flex-col gap-4 w-[30%]">
                {/* Audio Section */}
                <div className="bg-amber-200 rounded-md">
                  <div className="flex flex-col gap-1">
                    <h1 className="font-bold">Audio:</h1>
                    <div className="flex flex-col gap-2">
                      {/* {songDetails.audio.map((audio, index) => (
                        <div
                          key={index}
                          className="bg-green-400 rounded-md text-sm text-center"
                        >
                          {audio}
                        </div>
                      ))} */}


                      {audioUrl && (
                        <audio className="w-full" controls>
                          <source src={audioUrl} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                      )}
                      
                    </div>
                  </div>
                </div>
                {/* Audio Section */}

                {/* Tags section */}
                <div className="flex flex-col gap-1">
                  <h1 className="font-bold">Tags:</h1>
                  <div className="grid grid-cols-3 gap-2">
                    {tags?.map((tag, index) => (
                      <div
                        key={index}
                        className="bg-blue-500 rounded-md text-sm text-center"
                      >
                        {tag.tag_name}
                      </div>
                    ))}
                  </div>
                </div>
                {/* Tags section */}
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
