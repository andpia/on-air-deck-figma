import { useState } from "react";
import { mockTracks } from "../data/mockData";
import { Search, Play, Plus } from "lucide-react";
import { Input } from "../components/ui/input";

export function Library() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTracks = mockTracks.filter(
    (track) =>
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.album.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold">Library</h1>
        <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Track
        </button>
      </div>

      {/* Search */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
        <Input
          type="text"
          placeholder="Search tracks, artists, albums..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500"
        />
      </div>

      {/* Tracks Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-zinc-800">
            <tr className="text-left text-sm text-zinc-500">
              <th className="py-3 px-4 w-12">#</th>
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Artist</th>
              <th className="py-3 px-4">Album</th>
              <th className="py-3 px-4">Genre</th>
              <th className="py-3 px-4">Year</th>
              <th className="py-3 px-4 text-right">Duration</th>
              <th className="py-3 px-4 text-right">Plays</th>
              <th className="py-3 px-4 w-24"></th>
            </tr>
          </thead>
          <tbody>
            {filteredTracks.map((track, index) => (
              <tr
                key={track.id}
                className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors group"
              >
                <td className="py-3 px-4 text-zinc-500 text-sm">{index + 1}</td>
                <td className="py-3 px-4">{track.title}</td>
                <td className="py-3 px-4 text-zinc-400">{track.artist}</td>
                <td className="py-3 px-4 text-zinc-400 text-sm">{track.album}</td>
                <td className="py-3 px-4 text-zinc-500 text-sm">{track.genre}</td>
                <td className="py-3 px-4 text-zinc-500 text-sm">{track.year}</td>
                <td className="py-3 px-4 text-zinc-400 text-sm text-right">
                  {formatDuration(track.duration)}
                </td>
                <td className="py-3 px-4 text-zinc-500 text-sm text-right">
                  {track.playCount.toLocaleString()}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-zinc-700 rounded transition-colors">
                      <Play className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-zinc-700 rounded transition-colors">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-zinc-500">
        Showing {filteredTracks.length} of {mockTracks.length} tracks
      </div>
    </div>
  );
}
