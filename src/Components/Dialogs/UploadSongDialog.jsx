import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Dialog from "@radix-ui/react-dialog";
import { useAddSong } from "../../hooks/useSongs";
import { useGetAllTags, useAddTagsToSongByTitleAndAuthor } from "../../hooks/useTags";

const UploadSongDialog = ({ buttonName, buttonStyle, icon }) => {
  const { register, handleSubmit, reset } = useForm();
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [remainingTags, setRemainingTags] = useState([]);
  const [errors, setErrors] = useState({});

  const { data: tags } = useGetAllTags();
  const uploadSongMutation = useAddSong();
  const addTagsToSongMutation = useAddTagsToSongByTitleAndAuthor();

  useEffect(() => {
    if (tags) setRemainingTags(tags);
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

  const validateForm = (data) => {
    const newErrors = {};
    if (!data.title?.trim()) newErrors.title = "Song title is required.";
    if (!data.lyrics?.trim()) newErrors.lyrics = "Lyrics are required.";
    if (selectedTags.length === 0) newErrors.tags = "Select at least one tag.";
    if (!data.audioFile?.[0]) newErrors.audioFile = "An audio file is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (data) => {
    if (!validateForm(data)) return;

    const file = data.audioFile[0];
    setIsUploading(true);
    setIsSuccess(false);

    uploadSongMutation.mutate(
      {
        title: data.title.trim(),
        author: data.author?.trim() || null,
        lyrics: data.lyrics.trim(),
        audioFile: file,
      },
      {
        onSuccess: () => {
          const tagIDs = selectedTags
            .map((tagName) => tags.find((t) => t.name === tagName)?.id)
            .filter(Boolean);
          addTagsToSongMutation.mutate({
            title: data.title.trim(),
            author: data.author?.trim() || null,
            tagIDs,
          });
          setIsUploading(false);
          setIsSuccess(true);
          reset();
          setSelectedTags([]);
          setRemainingTags(tags);
          setErrors({});
        },
        onError: (err) => {
          setIsUploading(false);
          setIsSuccess(false);
          console.error("❌ Error uploading song:", err);
        },
      }
    );
  };

  const handleDialogChange = (open) => {
    if (!open) {
      setIsUploading(false);
      setIsSuccess(false);
      setSelectedTags([]);
      setRemainingTags(tags);
      reset();
      setErrors({});
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
            <div>
              <input
                {...register("title")}
                placeholder="Song Title"
                className="bg-amber-400 rounded-md p-2 w-full"
              />
              {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
            </div>

            <div>
              <input
                {...register("author")}
                placeholder="Author"
                className="bg-amber-400 rounded-md p-2 w-full"
              />
            </div>

            <div>
              <textarea
                {...register("lyrics")}
                placeholder="Lyrics"
                className="bg-amber-400 rounded-md p-2 w-full"
              />
              {errors.lyrics && <p className="text-red-600 text-sm mt-1">{errors.lyrics}</p>}
            </div>

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
              {errors.tags && <p className="text-red-600 text-sm mt-1">{errors.tags}</p>}
            </div>

            <div>
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
            </div>

            <div>
              <input
                {...register("audioFile")}
                type="file"
                accept="audio/*"
                className="bg-amber-400 rounded-md p-2 w-[30%]"
              />
              {errors.audioFile && <p className="text-red-600 text-sm mt-1">{errors.audioFile}</p>}
            </div>

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
