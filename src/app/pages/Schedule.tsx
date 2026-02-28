import { mockSchedule, mockPlaylists } from "../data/mockData";
import { Plus, Clock, Calendar as CalendarIcon } from "lucide-react";
import { Switch } from "../components/ui/switch";

export function Schedule() {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const getPlaylistName = (playlistId: string) => {
    return mockPlaylists.find((p) => p.id === playlistId)?.name || "Unknown";
  };

  const groupedSchedule = mockSchedule.reduce(
    (acc, item) => {
      if (!acc[item.dayOfWeek]) {
        acc[item.dayOfWeek] = [];
      }
      acc[item.dayOfWeek].push(item);
      return acc;
    },
    {} as Record<number, typeof mockSchedule>
  );

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold">Schedule</h1>
        <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Schedule
        </button>
      </div>

      <div className="space-y-6">
        {daysOfWeek.map((day, dayIndex) => {
          const daySchedule = groupedSchedule[dayIndex] || [];
          
          return (
            <div key={day} className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <CalendarIcon className="w-5 h-5 text-purple-500" />
                <h2 className="text-xl font-semibold">{day}</h2>
                <span className="text-sm text-zinc-500">
                  {daySchedule.length} scheduled
                </span>
              </div>

              {daySchedule.length > 0 ? (
                <div className="space-y-2">
                  {daySchedule.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-4 bg-zinc-800/50 rounded-lg hover:bg-zinc-800 transition-colors"
                    >
                      <Clock className="w-5 h-5 text-zinc-500" />
                      <div className="flex-1">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-zinc-500">
                          {item.startTime} - {item.endTime}
                        </div>
                      </div>
                      <div className="text-sm text-zinc-400">
                        <span className="px-3 py-1 bg-zinc-700 rounded-full">
                          {getPlaylistName(item.playlistId)}
                        </span>
                      </div>
                      <Switch checked={item.isActive} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-zinc-500">
                  No scheduled shows for this day
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
