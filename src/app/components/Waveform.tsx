import { useMemo } from "react";

interface WaveformProps {
  progress: number; // 0-100
  duration: number;
  currentTime: number;
  introDuration?: number; // Duration of intro in seconds
}

export function Waveform({ progress, duration, currentTime, introDuration = 15 }: WaveformProps) {
  // Generate waveform data (peaks and valleys)
  const waveformData = useMemo(() => {
    const bars = 120;
    return Array.from({ length: bars }, (_, i) => {
      // Create a realistic waveform pattern with varying heights
      const baseHeight = Math.sin(i / 10) * 0.3 + 0.5;
      const randomVariation = Math.random() * 0.4;
      const beat = Math.sin(i / 3) * 0.2; // Simulate beats
      return Math.max(0.1, Math.min(1, baseHeight + randomVariation + beat));
    });
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const residualTime = duration - currentTime;
  const introProgress = (introDuration / duration) * 100;

  return (
    <div className="space-y-3">
      <div className="relative">
        {/* Waveform Container */}
        <div className="flex items-end gap-0.5 h-16 bg-zinc-950 rounded-lg p-2 relative">
          {waveformData.map((height, index) => {
            const barProgress = (index / waveformData.length) * 100;
            const isPassed = barProgress <= progress;
            const isInIntro = barProgress <= introProgress;
            
            return (
              <div
                key={index}
                className="flex-1 relative"
                style={{ 
                  height: `${height * 100}%`,
                  minWidth: '2px',
                }}
              >
                <div
                  className={`w-full h-full rounded-sm transition-colors ${
                    isPassed 
                      ? (isInIntro ? 'bg-gradient-to-t from-yellow-600 to-yellow-400' : 'bg-gradient-to-t from-purple-600 to-purple-400')
                      : (isInIntro ? 'bg-zinc-700' : 'bg-zinc-800')
                  }`}
                />
              </div>
            );
          })}
          
          {/* Intro End Marker */}
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-yellow-500/60"
            style={{ left: `${introProgress}%` }}
          >
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-yellow-500 rounded-full" />
          </div>
          
          {/* Current Position Marker */}
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-white/80"
            style={{ left: `${progress}%` }}
          >
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full" />
          </div>
        </div>
      </div>
      
      {/* Time Labels */}
      <div className="flex justify-between items-center text-xs px-1">
        <div className="flex flex-col">
          <span className="text-zinc-500 text-[10px]">ELAPSED</span>
          <span className="text-white font-mono font-semibold">{formatTime(currentTime)}</span>
        </div>
        
        <div className="flex flex-col items-center">
          <span className="text-yellow-500 text-[10px]">INTRO</span>
          <span className="text-yellow-400 font-mono font-semibold">{formatTime(introDuration)}</span>
        </div>
        
        <div className="flex flex-col items-end">
          <span className="text-zinc-500 text-[10px]">REMAINING</span>
          <span className="text-white font-mono font-semibold">-{formatTime(residualTime)}</span>
        </div>
      </div>
      
      {/* Total Duration */}
      <div className="text-center">
        <span className="text-[10px] text-zinc-600">TOTAL DURATION</span>
        <span className="ml-2 text-xs text-zinc-400 font-mono">{formatTime(duration)}</span>
      </div>
    </div>
  );
}