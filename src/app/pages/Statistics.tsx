import { mockTracks } from "../data/mockData";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { TrendingUp, Users, Music, Radio } from "lucide-react";

export function Statistics() {
  const topTracks = [...mockTracks]
    .sort((a, b) => b.playCount - a.playCount)
    .slice(0, 5);

  const listenerData = [
    { time: "00:00", listeners: 145 },
    { time: "03:00", listeners: 89 },
    { time: "06:00", listeners: 167 },
    { time: "09:00", listeners: 234 },
    { time: "12:00", listeners: 312 },
    { time: "15:00", listeners: 289 },
    { time: "18:00", listeners: 356 },
    { time: "21:00", listeners: 298 },
  ];

  const genreData = mockTracks.reduce(
    (acc, track) => {
      if (!acc[track.genre]) {
        acc[track.genre] = 0;
      }
      acc[track.genre] += track.playCount;
      return acc;
    },
    {} as Record<string, number>
  );

  const genreChartData = Object.entries(genreData).map(([genre, plays]) => ({
    genre,
    plays,
  }));

  const totalPlays = mockTracks.reduce((sum, track) => sum + track.playCount, 0);
  const avgListeners = Math.round(
    listenerData.reduce((sum, item) => sum + item.listeners, 0) /
      listenerData.length
  );

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold mb-8">Statistics</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-zinc-500">Total Plays</div>
            <Music className="w-5 h-5 text-purple-500" />
          </div>
          <div className="text-3xl font-semibold">{totalPlays.toLocaleString()}</div>
          <div className="text-sm text-green-500 mt-2">+12% this week</div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-zinc-500">Avg Listeners</div>
            <Users className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-3xl font-semibold">{avgListeners}</div>
          <div className="text-sm text-green-500 mt-2">+8% this week</div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-zinc-500">Total Tracks</div>
            <Radio className="w-5 h-5 text-pink-500" />
          </div>
          <div className="text-3xl font-semibold">{mockTracks.length}</div>
          <div className="text-sm text-zinc-500 mt-2">In library</div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-zinc-500">Peak Listeners</div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-3xl font-semibold">356</div>
          <div className="text-sm text-zinc-500 mt-2">Today at 18:00</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Listeners Over Time */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Listeners Today</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={listenerData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis dataKey="time" stroke="#71717a" />
              <YAxis stroke="#71717a" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#18181b",
                  border: "1px solid #27272a",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="listeners"
                stroke="#a855f7"
                strokeWidth={2}
                dot={{ fill: "#a855f7" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Plays by Genre */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Plays by Genre</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={genreChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis dataKey="genre" stroke="#71717a" />
              <YAxis stroke="#71717a" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#18181b",
                  border: "1px solid #27272a",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="plays" fill="#a855f7" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Tracks */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Top Tracks</h2>
        <div className="space-y-2">
          {topTracks.map((track, index) => (
            <div
              key={track.id}
              className="flex items-center gap-4 p-3 rounded hover:bg-zinc-800/50 transition-colors"
            >
              <div className="w-8 text-center font-semibold text-purple-500">
                #{index + 1}
              </div>
              <div className="flex-1">
                <div className="font-medium">{track.title}</div>
                <div className="text-sm text-zinc-500">
                  {track.artist} • {track.album}
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold">{track.playCount.toLocaleString()}</div>
                <div className="text-sm text-zinc-500">plays</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
