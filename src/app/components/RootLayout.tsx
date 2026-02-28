import { Outlet, NavLink } from "react-router";
import { Radio, Library, ListMusic, Calendar, BarChart3 } from "lucide-react";

export function RootLayout() {
  return (
    <div className="flex h-screen bg-zinc-950 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col">
        <div className="p-6 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Radio className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-semibold">OnAirDeck</h1>
          </div>
        </div>
        
        <nav className="flex-1 p-4">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
                isActive
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
              }`
            }
          >
            <Radio className="w-5 h-5" />
            <span>Dashboard</span>
          </NavLink>
          
          <NavLink
            to="/library"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
                isActive
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
              }`
            }
          >
            <Library className="w-5 h-5" />
            <span>Library</span>
          </NavLink>
          
          <NavLink
            to="/playlists"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
                isActive
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
              }`
            }
          >
            <ListMusic className="w-5 h-5" />
            <span>Playlists</span>
          </NavLink>
          
          <NavLink
            to="/schedule"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
                isActive
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
              }`
            }
          >
            <Calendar className="w-5 h-5" />
            <span>Schedule</span>
          </NavLink>
          
          <NavLink
            to="/statistics"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
                isActive
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
              }`
            }
          >
            <BarChart3 className="w-5 h-5" />
            <span>Statistics</span>
          </NavLink>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
