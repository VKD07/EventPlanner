import * as Dialog from "@radix-ui/react-dialog";
import { useSongAudioUrl } from "../../hooks/useSongs";
import { useTagBySongID } from "../../hooks/useTags";
import ChordChart from "../Songs/ChordChart";
import VocalGuidesSection from "../Songs/VocalGuidesSection";
import { getYouTubeEmbedUrl } from "../../utils/video";

const SongDetailsDialog = ({ buttonName, buttonStyle, icon, songDetails }) => {

  const {data : audioUrl} = useSongAudioUrl(songDetails.audioUrl);
  const {data: tags} = useTagBySongID(songDetails.id);
  const embedUrl = getYouTubeEmbedUrl(songDetails.videoUrl);

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

            <Dialog.Title className="font-display text-xl font-semibold text-inkwell mb-1">
              {songDetails.title}
            </Dialog.Title>
            {songDetails.author && (
              <p className="text-inkwell/60 text-sm mb-4">{songDetails.author}</p>
            )}

            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-[65%] flex flex-col gap-3">
                {songDetails.chords ? (
                  <ChordChart chords={songDetails.chords} originalKey={songDetails.originalKey} />
                ) : (
                  <div className="bg-white border border-inkwell/10 rounded-lg p-4">
                    <span className="text-inkwell/80 text-sm leading-relaxed whitespace-pre-line">
                      {songDetails.lyrics}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-4 w-full md:w-[35%]">
                {songDetails.videoUrl && (
                  <div>
                    <h1 className="text-[11px] font-semibold uppercase tracking-wide text-inkwell/40 mb-1">Video</h1>
                    {embedUrl && (
                      <div className="aspect-video w-full rounded-lg overflow-hidden border border-inkwell/10 mb-1">
                        <iframe
                          className="w-full h-full"
                          src={embedUrl}
                          title={`${songDetails.title} video`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    )}
                    <a
                      href={songDetails.videoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-brass hover:text-brass-light underline text-sm font-medium"
                    >
                      {embedUrl ? "Having trouble? Watch on YouTube" : "Open video link"}
                    </a>
                  </div>
                )}

                {/* Audio Section */}
                <div>
                  <h1 className="text-[11px] font-semibold uppercase tracking-wide text-inkwell/40 mb-1">Audio</h1>
                  {audioUrl && (
                    <audio className="w-full" controls>
                      <source src={audioUrl} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  )}
                </div>

                {/* Tags section */}
                <div className="flex flex-col gap-1">
                  <h1 className="text-[11px] font-semibold uppercase tracking-wide text-inkwell/40">Tags</h1>
                  <div className="flex flex-wrap gap-2">
                    {tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-brass/15 text-inkwell rounded-md text-xs px-2 py-1"
                      >
                        {tag.tag_name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <VocalGuidesSection songId={songDetails.id} readOnly />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  }

  return <div>No Song Details</div>;
};

export default SongDetailsDialog;
