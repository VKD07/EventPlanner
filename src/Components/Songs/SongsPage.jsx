import { useState, useMemo } from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import ConsoleDebug from "../ConsoleDebug";
import SongDetailsDialog from "../Dialogs/SongDetailsDialog";
import UploadSongDialog from "../Dialogs/UploadSongDialog";
import { useGetSongs } from "../../hooks/useSongs";

const SongsPage = () => {
  const { data: songs, isLoading } = useGetSongs();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSongs = useMemo(() => {
    if (!songs) return [];
    return songs.filter(
      (song) =>
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.author?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [songs, searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-ink via-ink to-pew">
      <ConsoleDebug componentName="SongsPage" />

      <div className="flex flex-col gap-6 px-4 pt-24 pb-8 lg:px-8 max-w-[1400px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-semibold text-parchment">Song Library</h1>
            <p className="text-sm text-parchment/50 mt-1">Browse, search, and add worship songs</p>
          </div>
          <UploadSongDialog
            buttonName={"Upload a Song"}
            buttonStyle={"bg-brass hover:bg-brass-light text-inkwell font-semibold text-sm px-4 py-2.5 rounded-md transition-colors whitespace-nowrap"}
          />
        </div>

        <div className="flex items-center gap-2 bg-pew rounded-lg border border-brass/15 focus-within:border-brass px-4 py-3 max-w-md">
          <MagnifyingGlassIcon className="text-parchment/40" />
          <input
            className="w-full bg-transparent text-parchment placeholder:text-parchment/40 focus:outline-none"
            placeholder="Search by title or author"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {isLoading ? (
          <p className="text-parchment/40 font-mono text-sm">Loading songs…</p>
        ) : filteredSongs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSongs.map((song) => (
              <div
                key={song.id}
                className="bg-pew border border-brass/15 rounded-xl p-5 hover:border-brass/40 transition-colors flex flex-col gap-3"
              >
                <div>
                  <h3 className="font-display font-semibold text-parchment text-base">{song.title}</h3>
                  {song.author && (
                    <p className="text-sm text-parchment/50">{song.author}</p>
                  )}
                </div>
                {song.lyrics && (
                  <p className="text-xs text-parchment/40 line-clamp-2">{song.lyrics}</p>
                )}
                <div className="mt-auto flex items-center gap-3">
                  <SongDetailsDialog
                    buttonName={"View Details"}
                    buttonStyle={"self-start text-sm font-medium text-brass-light hover:text-brass hover:underline"}
                    songDetails={song}
                  />
                  <UploadSongDialog
                    buttonName={"Edit"}
                    buttonStyle={"self-start text-sm font-medium text-parchment/50 hover:text-parchment hover:underline"}
                    song={song}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-pew rounded-2xl border border-brass/15 p-12 flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 rounded-full border-2 border-brass/40 flex items-center justify-center mb-4">
              <span className="font-display text-brass/60 text-xl">♪</span>
            </div>
            <h2 className="font-display text-lg font-medium text-parchment mb-2">
              {songs?.length ? "No songs match your search" : "No songs yet"}
            </h2>
            <p className="text-sm text-parchment/40">
              {songs?.length ? "Try a different title or author" : "Upload your first song to get started"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SongsPage;
