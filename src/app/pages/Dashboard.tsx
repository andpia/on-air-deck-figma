import { CurrentTrack } from "../components/CurrentTrack";
import { QueueList } from "../components/QueueList";
import { StreamStatus } from "../components/StreamStatus";
import { VolumeMeters } from "../components/VolumeMeters";
import { Mixer } from "../components/Mixer";
import { mockTracks, mockStreamStatus } from "../data/mockData";

export function Dashboard() {
  const currentTrack = mockTracks[0];
  const queueTracks = mockTracks.slice(1, 6);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold mb-8">Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">
        {/* Left Column - Current Track */}
        <div className="col-span-2 space-y-6">
          <CurrentTrack track={currentTrack} />
          <QueueList tracks={queueTracks} />
        </div>

        {/* Right Column - Status & Meters */}
        <div className="space-y-6">
          <StreamStatus status={mockStreamStatus} />
          <Mixer />
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <VolumeMeters />
          </div>
        </div>
      </div>
    </div>
  );
}