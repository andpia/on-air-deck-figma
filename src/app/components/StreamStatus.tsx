import { StreamStatus as StreamStatusType } from "../types";
import { Radio, Users, Activity } from "lucide-react";

interface StreamStatusProps {
  status: StreamStatusType;
}

export function StreamStatus({ status }: StreamStatusProps) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
      <div className="text-xs text-zinc-500 mb-4">Stream Status</div>

      <div className="space-y-4">
        {/* Live Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full ${
                status.isLive ? "bg-green-500 animate-pulse" : "bg-zinc-600"
              }`}
            />
            <span className="text-sm">
              {status.isLive ? "Live" : "Offline"}
            </span>
          </div>
          <Radio className="w-5 h-5 text-zinc-500" />
        </div>

        {/* Listeners */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-zinc-500" />
            <span className="text-sm text-zinc-400">Listeners</span>
          </div>
          <span className="text-lg font-semibold">{status.listeners}</span>
        </div>

        {/* Bitrate */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-zinc-500" />
            <span className="text-sm text-zinc-400">Bitrate</span>
          </div>
          <span className="text-sm">{status.bitrate}</span>
        </div>

        {/* Uptime */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-zinc-400">Uptime</span>
          <span className="text-sm font-mono">{status.uptime}</span>
        </div>
      </div>
    </div>
  );
}
