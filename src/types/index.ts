export type UserRole = "super_admin" | "artist_manager" | "artist";

export interface User {
  id: number;
  username: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface Artist {
  id: number;
  name: string;
  bio?: string;
  genre?: string;
  createdAt: string;
  userId?: number;
}

export interface Song {
  id: number;
  title: string;
  duration: number;
  releaseDate: string;
  artistId: number;
  createdAt: string;
}
