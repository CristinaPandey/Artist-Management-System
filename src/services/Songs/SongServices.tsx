import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../config/axiosInstance";

export type SongData = {
  title: string;
  duration: number;
  album: string;
  release_date: string;
};

type UserResponse = {
  message: string;
  user: {
    id: number;
    username: string;
    email: string;
    role: string;
  };
  token: string;
};

// export const useAddArtistrMutation = (artistId: number, data: SongData) => {
//   const addArtistSongs = async (): Promise<UserResponse> => {
//     const response = await axiosInstance.post(
//       `/api/artists/${artistId}/songs`,
//       data
//     );
//     return response.data;
//   };
//   return useMutation({
//     mutationFn: () => addArtistSongs(),
//     mutationKey: ["addArtistSongs"],
//     retry: false,
//   });
// };
const addArtistSongs = async (data: SongData): Promise<UserResponse> => {
  const userId = localStorage.getItem("user_id");

  if (!userId) {
    throw new Error("User ID not found. Please log in.");
  }
  const response = await axiosInstance.post(
    `/api/artists/${userId}/songs`,
    data
  );

  return response.data;
};

export const useAddArtistSongMutation = () => {
  // ✅ Return the mutation hook
  return useMutation({
    mutationFn: addArtistSongs,
    mutationKey: ["addArtistSongs"],
    retry: false,
  });
};

const getAllArtistSongList = async () => {
  const userId = localStorage.getItem("user_id");
  const response = await axiosInstance.get(`/api/artists/${userId}/songs`);
  return response.data;
};
export const useGetAllArtistSongList = () => {
  return useQuery({
    queryKey: ["addArtistSongs"],
    queryFn: () => getAllArtistSongList(),
    // retry: false,
  });
};

export const useDeleteArtistSong = (id_no: number) => {
  const queryClient = useQueryClient();
  const ArtistSongDelete = async (id: number) => {
    const userId = localStorage.getItem("user_id");
    const response = await axiosInstance.delete(
      `/api/artists/${userId}/songs/${id}`
    );
    return response.data;
  };
  return useMutation({
    mutationFn: () => ArtistSongDelete(id_no),
    mutationKey: ["ArtistSongDelete", id_no],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addArtistSongs"] });
    },
  });
};
