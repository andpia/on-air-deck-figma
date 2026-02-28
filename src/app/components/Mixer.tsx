import { useState } from "react";
import { Slider } from "./ui/slider";
import { Mic, Music, Volume2, VolumeX } from "lucide-react";

export function Mixer() {
  const [musicVolume, setMusicVolume] = useState([80]);
  const [voiceoverVolume, setVoiceoverVolume] = useState([65]);
  const [musicMuted, setMusicMuted] = useState(false);
  const [voiceoverMuted, setVoiceoverMuted] = useState(false);
  const [crossfade, setCrossfade] = useState([50]);

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
      <div className="text-xs text-zinc-500 mb-4">Audio Mixer</div>
      
      <div className="space-y-6">
        {/* Music Channel */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Music className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium">Music</span>
            </div>
            <button
              onClick={() => setMusicMuted(!musicMuted)}
              className={`p-1 rounded transition-colors ${
                musicMuted ? 'text-red-500' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {musicMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            <Slider
              value={musicVolume}
              onValueChange={setMusicVolume}
              max={100}
              step={1}
              className="flex-1"
              disabled={musicMuted}
            />
            <span className="text-sm text-zinc-400 w-12 text-right">
              {musicMuted ? '---' : `${musicVolume[0]}%`}
            </span>
          </div>

          {/* Visual Level Indicator */}
          <div className="h-2 bg-zinc-950 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-150 ${
                musicMuted ? 'bg-zinc-700' : 'bg-gradient-to-r from-purple-600 to-purple-400'
              }`}
              style={{ width: musicMuted ? '0%' : `${musicVolume[0]}%` }}
            />
          </div>
        </div>

        {/* VoiceOver Channel */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mic className="w-4 h-4 text-pink-500" />
              <span className="text-sm font-medium">VoiceOver</span>
            </div>
            <button
              onClick={() => setVoiceoverMuted(!voiceoverMuted)}
              className={`p-1 rounded transition-colors ${
                voiceoverMuted ? 'text-red-500' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {voiceoverMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            <Slider
              value={voiceoverVolume}
              onValueChange={setVoiceoverVolume}
              max={100}
              step={1}
              className="flex-1"
              disabled={voiceoverMuted}
            />
            <span className="text-sm text-zinc-400 w-12 text-right">
              {voiceoverMuted ? '---' : `${voiceoverVolume[0]}%`}
            </span>
          </div>

          {/* Visual Level Indicator */}
          <div className="h-2 bg-zinc-950 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-150 ${
                voiceoverMuted ? 'bg-zinc-700' : 'bg-gradient-to-r from-pink-600 to-pink-400'
              }`}
              style={{ width: voiceoverMuted ? '0%' : `${voiceoverVolume[0]}%` }}
            />
          </div>
        </div>

        {/* Crossfade */}
        <div className="pt-4 border-t border-zinc-800">
          <div className="text-xs text-zinc-500 mb-3">Crossfade</div>
          <div className="flex items-center gap-3">
            <Music className="w-4 h-4 text-zinc-600" />
            <Slider
              value={crossfade}
              onValueChange={setCrossfade}
              max={100}
              step={1}
              className="flex-1"
            />
            <Mic className="w-4 h-4 text-zinc-600" />
          </div>
          <div className="flex justify-between text-xs text-zinc-600 mt-1">
            <span>Music</span>
            <span>Balanced</span>
            <span>Voice</span>
          </div>
        </div>
      </div>
    </div>
  );
}
