import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Dialog from "@radix-ui/react-dialog";
import { useAddSong } from "../../hooks/useSongs";

const UploadSongDialog = ({
  buttonName,
  onSelectElement,
  buttonStyle,
  icon,
}) => {
  const { register, handleSubmit, reset } = useForm();
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const uploadSongMutation = useAddSong();

  const onSubmit = (data) => {
    const file = data.audioFile?.[0];
    if (!file) {
      console.error("❌ No audio file selected");
      return;
    }

    setIsUploading(true);
    setIsSuccess(false);

    uploadSongMutation.mutate(
      {
        title: data.title,
        author: data.author,
        lyrics: data.lyrics,
        audioFile: file,
      },
      {
        onSuccess: () => {
          setIsUploading(false);
          setIsSuccess(true);
          console.log("✅ Song uploaded successfully!");
          reset();
        },
        onError: (err) => {
          setIsUploading(false);
          setIsSuccess(false);
          console.error("❌ Error uploading song:", err);
        },
      }
    );
  };

  // Reset states when dialog closes
  const handleDialogChange = (open) => {
    if (!open) {
      setIsUploading(false);
      setIsSuccess(false);
      reset();
    }
  };

  return (
    <Dialog.Root onOpenChange={handleDialogChange}>
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

          <Dialog.Title className="text-xl font-bold mb-4">
            UPLOAD A SONG:
          </Dialog.Title>

          <form
            className="flex flex-col gap-4 p-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              {...register("title")}
              placeholder="Song Title"
              className="bg-amber-400 rounded-md p-2 w-full"
            />
            <input
              {...register("author")}
              placeholder="Author"
              className="bg-amber-400 rounded-md p-2 w-full"
            />
            <textarea
              {...register("lyrics")}
              placeholder="Lyrics"
              className="bg-amber-400 rounded-md p-2 w-full"
            />
            <input
              {...register("audioFile")}
              type="file"
              accept="audio/*"
              className="bg-amber-400 rounded-md p-2 w-[30%]"
            />

            {/* ✅ Upload status message */}
            <div className="font-semibold h-6">
              {isUploading ? (
                <span className="text-blue-700">Uploading...</span>
              ) : isSuccess ? (
                <span className="text-green-700">✅ Successfully uploaded!</span>
              ) : null}
            </div>

            <input
              type="submit"
              value={isUploading ? "Uploading..." : "Upload"}
              disabled={isUploading}
              className="bg-amber-600 text-white rounded-md p-2 hover:bg-amber-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default UploadSongDialog;