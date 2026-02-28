import { useEffect, useState } from "react";

export function VolumeMeters() {
  const [leftLevel, setLeftLevel] = useState(0);
  const [rightLevel, setRightLevel] = useState(0);

  useEffect(() => {
    // Simulate volume level fluctuations
    const interval = setInterval(() => {
      setLeftLevel(Math.random() * 100);
      setRightLevel(Math.random() * 100);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const getBarColor = (level: number) => {
    if (level > 85) return "bg-red-500";
    if (level > 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="space-y-2">
      <div className="text-xs text-zinc-500 mb-3">Volume Meters</div>
      
      {/* Left Channel */}
      <div className="flex items-center gap-2">
        <div className="text-xs text-zinc-400 w-4">L</div>
        <div className="flex-1 h-4 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-100 ${getBarColor(leftLevel)}`}
            style={{ width: `${leftLevel}%` }}
          />
        </div>
        <div className="text-xs text-zinc-400 w-10 text-right">
          {Math.round(leftLevel)}%
        </div>
      </div>

      {/* Right Channel */}
      <div className="flex items-center gap-2">
        <div className="text-xs text-zinc-400 w-4">R</div>
        <div className="flex-1 h-4 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-100 ${getBarColor(rightLevel)}`}
            style={{ width: `${rightLevel}%` }}
          />
        </div>
        <div className="text-xs text-zinc-400 w-10 text-right">
          {Math.round(rightLevel)}%
        </div>
      </div>
    </div>
  );
}
