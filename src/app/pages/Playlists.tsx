import { useState } from "react";
import { mockPlaylists } from "../data/mockData";
import { Plus, Music, Trash2, Edit } from "lucide-react";

export function Playlists() {
  const [selectedPlaylist, setSelectedPlaylist] = useState(mockPlaylists[0]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const getTotalDuration = () => {
    const total = selectedPlaylist.tracks.reduce(
      (sum, track) => sum + track.duration,
      0
    );
    const hours = Math.floor(total / 3600);
    const mins = Math.floor((total % 3600) / 60);
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold">Playlists</h1>
        <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Playlist
        </button>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Playlists List */}
        <div className="col-span-1 space-y-2">
          {mockPlaylists.map((playlist) => (
            <button
              key={playlist.id}
              onClick={() => setSelectedPlaylist(playlist)}
              className={`w-full text-left p-4 rounded-lg transition-colors ${
                selectedPlaylist.id === playlist.id
                  ? "bg-purple-600"
                  : "bg-zinc-900 hover:bg-zinc-800 border border-zinc-800"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-zinc-800 rounded flex items-center justify-center flex-shrink-0">
                  <Music className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{playlist.name}</div>
                  <div className="text-sm text-zinc-400">
                    {playlist.tracks.length} tracks
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Playlist Details */}
        <div className="col-span-3 bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">
                {selectedPlaylist.name}
              </h2>
              <div className="flex items-center gap-4 text-sm text-zinc-500">
                <span>{selectedPlaylist.tracks.length} tracks</span>
                <span>•</span>
                <span>{getTotalDuration()}</span>
                <span>•</span>
                <span>Updated {formatDate(selectedPlaylist.updatedAt)}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-zinc-800 rounded transition-colors">
                <Edit className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-zinc-800 rounded transition-colors text-red-500">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Tracks */}
          <div className="space-y-1">
            {selectedPlaylist.tracks.map((track, index) => (
              <div
                key={track.id}
                className="flex items-center gap-4 p-3 rounded hover:bg-zinc-800/50 transition-colors group"
              >
                <div className="w-8 text-sm text-zinc-500">{index + 1}</div>
                <div className="flex-1 min-w-0">
                  <div className="truncate">{track.title}</div>
                  <div className="text-sm text-zinc-500 truncate">
                    {track.artist} • {track.album}
                  </div>
                </div>
                <div className="text-sm text-zinc-500">
                  {formatDuration(track.duration)}
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-zinc-700 rounded">
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            ))}
          </div>

          {selectedPlaylist.tracks.length === 0 && (
            <div className="text-center py-12 text-zinc-500">
              <Music className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No tracks in this playlist</p>
              <button className="mt-4 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors">
                Add Tracks
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
