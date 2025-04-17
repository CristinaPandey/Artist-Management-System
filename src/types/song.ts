// src/types/song.ts
export interface Song {
  id: number;
  title: string;
  duration: string;
  releaseDate: string;
  artistId: number;
  createdAt: string;
  updatedAt: string;
}

export interface SongFormData {
  title: string;
  duration: string;
  releaseDate: string;
  artistId: number;
}
