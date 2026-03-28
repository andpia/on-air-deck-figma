import { createHashRouter } from "react-router";
import { Dashboard } from "./pages/Dashboard";
import { Library } from "./pages/Library";
import { Playlists } from "./pages/Playlists";
import { Schedule } from "./pages/Schedule";
import { Statistics } from "./pages/Statistics";
import { RootLayout } from "./components/RootLayout";

// Hash routing is robust across file:// and juce:// embedded origins where
// pathname may be /index.html instead of /.
export const router = createHashRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "library", Component: Library },
      { path: "playlists", Component: Playlists },
      { path: "schedule", Component: Schedule },
      { path: "statistics", Component: Statistics },
    ],
  },
]);
