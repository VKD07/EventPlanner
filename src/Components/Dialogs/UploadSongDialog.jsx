import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Dialog from "@radix-ui/react-dialog";
import { useAddSong } from "../../hooks/useSongs";
import { useGetAllTags, useAddTagsToSong } from "../../hooks/useTags";

const UploadSongDialog = ({ buttonName, onSelectElement, buttonStyle, icon }) => {
  const { register, handleSubmit, reset } = useForm();
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [remainingTags, setRemainingTags] = useState([]);

  const { data: tags } = useGetAllTags();

  const uploadSongMutation = useAddSong();
  const addTagsToSongMutation = useAddTagsToSong();

  useEffect(() => {
    if (tags) {
      setRemainingTags(tags);
    }
  }, [tags]);

  const handleTagSelect = (e) => {
    const selectedTag = e.target.value;
    if (!selectedTag) return;
    if (selectedTags.includes(selectedTag)) return;
    setSelectedTags((prev) => [...prev, selectedTag]);
    setRemainingTags((prev) => prev.filter((tag) => tag.name !== selectedTag));
    e.target.value = "";
  };

  const handleRemoveTag = (tagToRemove) => {
    setSelectedTags((prev) => prev.filter((t) => t !== tagToRemove));
    const restoredTag = tags.find((t) => t.name === tagToRemove);
    setRemainingTags((prev) => [...prev, restoredTag]);
  };

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
          reset();
          setSelectedTags([]);
          setRemainingTags(tags);
        },
        onError: (err) => {
          setIsUploading(false);
          setIsSuccess(false);
          console.error("❌ Error uploading song:", err);
        },
      }
    );

    // TODO: After song upload, associate tags get the song ID and tag ids
   
  };

  const handleDialogChange = (open) => {
    if (!open) {
      setIsUploading(false);
      setIsSuccess(false);
      setSelectedTags([]);
      setRemainingTags(tags);
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

          <Dialog.Title className="text-xl font-bold mb-4">UPLOAD A SONG:</Dialog.Title>

          <form className="flex flex-col gap-4 p-2" onSubmit={handleSubmit(onSubmit)}>
            <input {...register("title")} placeholder="Song Title" className="bg-amber-400 rounded-md p-2 w-full" />
            <input {...register("author")} placeholder="Author" className="bg-amber-400 rounded-md p-2 w-full" />
            <textarea {...register("lyrics")} placeholder="Lyrics" className="bg-amber-400 rounded-md p-2 w-full" />

            <div>
              <p className="font-semibold">Selected Tags:</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedTags.length > 0 ? (
                  selectedTags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-amber-700 text-white rounded-md px-3 py-1 flex items-center gap-2"
                    >
                      {tag}
                      <button
                        type="button"
                        className="text-xs bg-red-500 rounded-full px-2 hover:bg-red-600"
                        onClick={() => handleRemoveTag(tag)}
                      >
                        ✕
                      </button>
                    </span>
                  ))
                ) : (
                  <span className="text-gray-700 italic">No tags selected</span>
                )}
              </div>
            </div>

            <select
              id="tag"
              onChange={handleTagSelect}
              className="bg-amber-400 rounded-md p-2 w-[30%]"
            >
              <option value="">-- Choose a tag --</option>
              {remainingTags?.map((tag, index) => (
                <option key={index} value={tag.name}>
                  {tag.name}
                </option>
              ))}
            </select>

            <input
              {...register("audioFile")}
              type="file"
              accept="audio/*"
              className="bg-amber-400 rounded-md p-2 w-[30%]"
            />

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
