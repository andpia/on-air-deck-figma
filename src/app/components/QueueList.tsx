import { Track } from "../types";
import { GripVertical, X } from "lucide-react";

interface QueueListProps {
  tracks: Track[];
}

export function QueueList({ tracks }: QueueListProps) {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="text-xs text-zinc-500">Up Next</div>
        <div className="text-xs text-zinc-500">{tracks.length} tracks</div>
      </div>

      <div className="space-y-1 max-h-96 overflow-y-auto">
        {tracks.map((track, index) => (
          <div
            key={track.id}
            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-zinc-800/50 transition-colors group"
          >
            <GripVertical className="w-4 h-4 text-zinc-600 cursor-grab" />
            <div className="w-8 text-sm text-zinc-500">{index + 1}</div>
            <div className="flex-1 min-w-0">
              <div className="text-sm truncate">{track.title}</div>
              <div className="text-xs text-zinc-500 truncate">{track.artist}</div>
            </div>
            <div className="text-sm text-zinc-500">{formatDuration(track.duration)}</div>
            <button className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-500 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
