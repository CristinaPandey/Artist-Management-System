// src/types/artist.ts
export interface Artist {
  id: number;
  name: string;
  genre: string;
  formed_year: string;
  updatedAt: string;
  createdAt: string;
  biography: string;
}

export interface ArtistFormData {
  name: string;
  genre: string;
}
