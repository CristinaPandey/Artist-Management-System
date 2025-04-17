// src/types/artist.ts
export interface Artist {
  id: number;
  name: string;
  genre: string;
  createdAt: string;
  updatedAt: string;
}

export interface ArtistFormData {
  name: string;
  genre: string;
}
