import { useMemo, useState } from "react";
import { Cross2Icon, PlusIcon } from "@radix-ui/react-icons";
import { useGetVocalGuidesBySongID, useVocalGuideAudioUrl, useDeleteVocalGuide, useAddVocalGuide } from "../../hooks/useVocalGuides";
import { VOCAL_CATEGORIES } from "../../api/vocalGuides";

const fieldClass =
  "bg-white border border-inkwell/15 rounded-md p-1.5 w-full text-xs text-inkwell placeholder:text-inkwell/40 focus:outline-none focus:ring-2 focus:ring-brass/50 focus:border-brass";

const VocalGuideItem = ({ guide, readOnly }) => {
  const { data: audioUrl } = useVocalGuideAudioUrl(guide.audioUrl);
  const deleteMutation = useDeleteVocalGuide();

  return (
    <div className="bg-parchment/50 border border-inkwell/10 rounded-md p-2 flex flex-col gap-1.5">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-inkwell/70 truncate">
          {guide.label || "Recording"}
        </span>
        {!readOnly && (
          <button
            type="button"
            onClick={() => deleteMutation.mutate(guide.id)}
            className="text-inkwell/30 hover:text-ember transition-colors shrink-0"
            aria-label="Delete recording"
          >
            <Cross2Icon />
          </button>
        )}
      </div>
      {audioUrl && (
        <audio className="w-full h-8" controls src={audioUrl} />
      )}
    </div>
  );
};

const AddGuideForm = ({ songId, category, onDone }) => {
  const [label, setLabel] = useState("");
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const addVocalGuideMutation = useAddVocalGuide();

  const handleAdd = () => {
    if (!file) {
      setError("Choose an audio file first.");
      return;
    }
    setError("");
    setIsUploading(true);
    addVocalGuideMutation.mutate(
      { songId, category, label: label.trim() || null, audioFile: file },
      {
        onSuccess: () => {
          setIsUploading(false);
          onDone();
        },
        onError: (err) => {
          setIsUploading(false);
          setError(err.message);
        },
      }
    );
  };

  return (
    <div className="bg-parchment/30 border border-dashed border-brass/40 rounded-md p-2 flex flex-col gap-1.5">
      <input
        type="text"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        placeholder="Label (optional)"
        className={fieldClass}
      />
      <input
        type="file"
        accept="audio/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className={fieldClass}
      />
      {error && <p className="text-ember text-xs">{error}</p>}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleAdd}
          disabled={isUploading}
          className="bg-brass hover:bg-brass-light text-inkwell text-xs font-semibold rounded px-2 py-1 transition-colors disabled:opacity-50"
        >
          {isUploading ? "Uploading..." : "Add"}
        </button>
        <button
          type="button"
          onClick={onDone}
          className="text-inkwell/40 hover:text-inkwell text-xs"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

const VocalGuidesSection = ({ songId, readOnly = false }) => {
  const { data: guides } = useGetVocalGuidesBySongID(songId);
  const [addingCategory, setAddingCategory] = useState(null);

  const grouped = useMemo(() => {
    const byCategory = Object.fromEntries(VOCAL_CATEGORIES.map((c) => [c, []]));
    guides?.forEach((guide) => {
      if (byCategory[guide.category]) byCategory[guide.category].push(guide);
    });
    return byCategory;
  }, [guides]);

  if (readOnly && guides?.length === 0) return null;

  return (
    <div className="mt-4">
      <h1 className="text-[11px] font-semibold uppercase tracking-wide text-inkwell/40 mb-2">Vocal Guides</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {VOCAL_CATEGORIES.map((category) => (
          <div key={category} className="bg-white border border-inkwell/10 rounded-lg p-3 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-display font-semibold text-inkwell text-sm">{category}</span>
              {!readOnly && (
                <button
                  type="button"
                  onClick={() => setAddingCategory(addingCategory === category ? null : category)}
                  className="text-inkwell/40 hover:text-brass transition-colors"
                  aria-label={`Add ${category} recording`}
                >
                  <PlusIcon />
                </button>
              )}
            </div>

            <div className="flex flex-col gap-2">
              {grouped[category].map((guide) => (
                <VocalGuideItem key={guide.id} guide={guide} readOnly={readOnly} />
              ))}

              {!readOnly && addingCategory === category && (
                <AddGuideForm
                  songId={songId}
                  category={category}
                  onDone={() => setAddingCategory(null)}
                />
              )}

              {grouped[category].length === 0 && addingCategory !== category && (
                <p className="text-inkwell/30 text-xs italic">No recordings yet</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VocalGuidesSection;
