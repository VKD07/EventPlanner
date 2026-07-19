import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Dialog from "@radix-ui/react-dialog";
import { useAddSong, useUpdateSong } from "../../hooks/useSongs";
import { useGetAllTags, useTagBySongID, useUpdateSongTags } from "../../hooks/useTags";
import { KEYS } from "../../utils/chords";
import VocalGuidesSection from "../Songs/VocalGuidesSection";

const fieldClass =
  "bg-white border border-inkwell/15 rounded-md p-2 w-full text-inkwell placeholder:text-inkwell/40 focus:outline-none focus:ring-2 focus:ring-brass/50 focus:border-brass";

const UploadSongDialog = ({ buttonName, buttonStyle, icon, song }) => {
  const isEdit = !!song;
  const { register, handleSubmit, reset } = useForm();
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [remainingTags, setRemainingTags] = useState([]);
  const [originalTagNames, setOriginalTagNames] = useState([]);
  const [errors, setErrors] = useState({});

  const { data: tags } = useGetAllTags();
  const { data: existingTags } = useTagBySongID(song?.id);
  const uploadSongMutation = useAddSong();
  const updateSongMutation = useUpdateSong();
  const updateSongTagsMutation = useUpdateSongTags();

  const formDefaults = (s) => ({
    title: s?.title || "",
    author: s?.author || "",
    lyrics: s?.lyrics || "",
    chords: s?.chords || "",
    originalKey: s?.originalKey || "C",
    videoUrl: s?.videoUrl || "",
  });

  const resetTagSelection = () => {
    if (!tags) return;
    const names = isEdit && existingTags ? existingTags.map((t) => t.tag_name) : [];
    setOriginalTagNames(names);
    setSelectedTags(names);
    setRemainingTags(tags.filter((t) => !names.includes(t.name)));
  };

  useEffect(resetTagSelection, [tags, existingTags, isEdit]);

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
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const applyTagChanges = (songId) => {
    const addTagIds = selectedTags
      .filter((name) => !originalTagNames.includes(name))
      .map((name) => tags.find((t) => t.name === name)?.id)
      .filter(Boolean);
    const removeTagIds = originalTagNames
      .filter((name) => !selectedTags.includes(name))
      .map((name) => tags.find((t) => t.name === name)?.id)
      .filter(Boolean);

    if (addTagIds.length > 0 || removeTagIds.length > 0) {
      updateSongTagsMutation.mutate({ songId, addTagIds, removeTagIds });
    }
  };

  const onSubmit = (data) => {
    if (!validateForm(data)) return;

    const file = data.audioFile?.[0] || null;
    setIsSaving(true);
    setIsSuccess(false);

    const payload = {
      title: data.title.trim(),
      author: data.author?.trim() || null,
      lyrics: data.lyrics.trim(),
      chords: data.chords?.trim() || null,
      originalKey: data.chords?.trim() ? data.originalKey : null,
      videoUrl: data.videoUrl?.trim() || null,
      audioFile: file,
    };

    const options = {
      onSuccess: (result) => {
        applyTagChanges(result.songId);
        setIsSaving(false);
        setIsSuccess(true);
        if (!isEdit) {
          reset(formDefaults());
          setSelectedTags([]);
          setRemainingTags(tags);
          setOriginalTagNames([]);
        }
        setErrors({});
      },
      onError: (err) => {
        setIsSaving(false);
        setIsSuccess(false);
        console.error(`❌ Error ${isEdit ? "updating" : "uploading"} song:`, err);
      },
    };

    if (isEdit) {
      updateSongMutation.mutate({ id: song.id, ...payload }, options);
    } else {
      uploadSongMutation.mutate(payload, options);
    }
  };

  const handleDialogChange = (open) => {
    if (open) {
      reset(formDefaults(song));
      resetTagSelection();
    } else {
      setIsSaving(false);
      setIsSuccess(false);
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
        <Dialog.Overlay className="fixed inset-0 bg-ink/60 backdrop-blur-sm z-[60]" />
        <Dialog.Content
          className="fixed z-[60] bg-paper shadow-2xl border-t-4 border-brass rounded-2xl
          top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          p-4 md:p-8 mt-4 md:mt-10 max-h-[90vh] w-[95vw] md:w-auto md:min-w-[600px] overflow-y-auto"
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
            {isEdit ? "Edit Song" : "Upload a Song"}
          </Dialog.Title>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input
                {...register("title")}
                placeholder="Song Title"
                className={fieldClass}
              />
              {errors.title && <p className="text-ember text-sm mt-1">{errors.title}</p>}
            </div>

            <div>
              <input
                {...register("author")}
                placeholder="Author"
                className={fieldClass}
              />
            </div>

            <div>
              <textarea
                {...register("lyrics")}
                placeholder="Lyrics"
                className={fieldClass}
              />
              {errors.lyrics && <p className="text-ember text-sm mt-1">{errors.lyrics}</p>}
            </div>

            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wide text-inkwell/40 mb-1 block">
                Chords (optional)
              </label>
              <textarea
                {...register("chords")}
                placeholder={"[Verse 1]\nD                  A\n  When the music fades all is"}
                rows={6}
                className={`${fieldClass} font-mono text-sm`}
              />
              <p className="text-inkwell/40 text-xs mt-1">
                Put the chord line directly above its lyric line, spaced to line up. Wrap section names in brackets, e.g. [Chorus].
              </p>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-[11px] font-semibold uppercase tracking-wide text-inkwell/40">
                Original key
              </label>
              <select {...register("originalKey")} className={`${fieldClass} w-20`}>
                {KEYS.map((key) => (
                  <option key={key} value={key}>{key}</option>
                ))}
              </select>
            </div>

            <div>
              <input
                {...register("videoUrl")}
                placeholder="Video URL (optional)"
                className={fieldClass}
              />
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-inkwell/40 mb-1">Tags (optional)</p>
              <div className="flex flex-wrap gap-2">
                {selectedTags.length > 0 ? (
                  selectedTags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-brass text-inkwell rounded-md px-3 py-1 flex items-center gap-2 text-sm font-medium"
                    >
                      {tag}
                      <button
                        type="button"
                        className="text-xs bg-ember text-white rounded-full w-4 h-4 flex items-center justify-center hover:bg-ember-light"
                        onClick={() => handleRemoveTag(tag)}
                      >
                        ✕
                      </button>
                    </span>
                  ))
                ) : (
                  <span className="text-inkwell/40 italic text-sm">No tags selected</span>
                )}
              </div>
            </div>

            <div>
              <select
                id="tag"
                onChange={handleTagSelect}
                className={`${fieldClass} md:w-[50%]`}
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
              <label className="text-[11px] font-semibold uppercase tracking-wide text-inkwell/40 mb-1 block">
                {isEdit ? "Replace audio file (optional)" : "Audio file (optional)"}
              </label>
              <input
                {...register("audioFile")}
                type="file"
                accept="audio/*"
                className={`${fieldClass} md:w-[50%]`}
              />
              {isEdit && song?.audioUrl && (
                <p className="text-inkwell/40 text-xs mt-1">Leave empty to keep the current audio file.</p>
              )}
            </div>

            {isEdit && <VocalGuidesSection songId={song.id} />}

            <div className="font-medium h-6 text-sm">
              {isSaving ? (
                <span className="text-sage">Saving...</span>
              ) : isSuccess ? (
                <span className="text-sage">{isEdit ? "Song updated!" : "Successfully uploaded!"}</span>
              ) : null}
            </div>

            <input
              type="submit"
              value={isSaving ? "Saving..." : isEdit ? "Save Changes" : "Upload"}
              disabled={isSaving}
              className="bg-brass hover:bg-brass-light text-inkwell font-semibold rounded-md p-2 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default UploadSongDialog;
