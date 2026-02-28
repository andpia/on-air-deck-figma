export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number; // in seconds
  genre: string;
  year: number;
  playCount: number;
}

export interface PlaylistTrack extends Track {
  addedAt: Date;
}

export interface Playlist {
  id: string;
  name: string;
  tracks: PlaylistTrack[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ScheduleItem {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  dayOfWeek: number; // 0 = Sunday, 6 = Saturday
  playlistId: string;
  isActive: boolean;
}

export interface StreamStatus {
  isLive: boolean;
  listeners: number;
  bitrate: string;
  uptime: string;
}
