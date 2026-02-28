import { useEffect, useState } from "react";
import { Track } from "../types";
import { Play, Pause, SkipForward, Volume2 } from "lucide-react";
import { Slider } from "./ui/slider";
import { Waveform } from "./Waveform";

interface CurrentTrackProps {
  track: Track;
}

export function CurrentTrack({ track }: CurrentTrackProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(87); // seconds elapsed
  const [volume, setVolume] = useState([75]);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= track.duration) return 0;
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, track.duration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const residualTime = track.duration - currentTime;
  const progress = (currentTime / track.duration) * 100;

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
      <div className="text-xs text-zinc-500 mb-4">Now Playing</div>
      
      <div className="flex gap-6">
        {/* Album Art Placeholder */}
        <div className="w-32 h-32 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <div className="text-4xl">♪</div>
        </div>

        {/* Track Info */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-semibold mb-1">{track.title}</h2>
            <p className="text-zinc-400 mb-2">{track.artist}</p>
            <p className="text-sm text-zinc-500">{track.album}</p>
          </div>
        </div>
      </div>

      {/* Waveform */}
      <div className="mt-6">
        <Waveform 
          progress={progress} 
          duration={track.duration}
          currentTime={currentTime}
          introDuration={15}
        />
      </div>

      {/* Controls */}
      <div className="mt-6 flex items-center gap-4">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-12 h-12 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center justify-center transition-colors"
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
        </button>
        
        <button className="w-10 h-10 bg-zinc-800 hover:bg-zinc-700 rounded-full flex items-center justify-center transition-colors">
          <SkipForward className="w-5 h-5" />
        </button>

        <div className="flex-1" />

        <div className="flex items-center gap-3 w-48">
          <Volume2 className="w-5 h-5 text-zinc-400" />
          <Slider
            value={volume}
            onValueChange={setVolume}
            max={100}
            step={1}
            className="flex-1"
          />
          <span className="text-sm text-zinc-400 w-10">{volume[0]}%</span>
        </div>
      </div>
    </div>
  );
}