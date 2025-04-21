import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../config/axiosInstance";

export type ArtistData = {
  name: string;
  genre: string;
  country: string;
  biography: string;
  formed_year: string;
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

const addArtist = async (data: ArtistData): Promise<UserResponse> => {
  const response = await axiosInstance.post("/api/artists", data);
  return response.data;
};

export const useAddArtistrMutation = () => {
  return useMutation({
    mutationFn: addArtist,
    mutationKey: ["addArtist"],
    retry: false,
  });
};

const getAllUserList = async () => {
  const response = await axiosInstance.get(`/api/artists`);
  return response.data;
};
export const useGetAllArtistList = () => {
  return useQuery({
    queryKey: ["addArtist"],
    queryFn: () => getAllUserList(),
    // retry: false,
  });
};

export const usePutArtist = (id_no: number) => {
  const queryClient = useQueryClient();
  const ArtristPut = async (id: number) => {
    const response = await axiosInstance.put(`/api/artists/${id}`);
    return response.data;
  };
  return useMutation({
    mutationFn: () => ArtristPut(id_no),
    mutationKey: ["ArtistDeArtristPutlete", id_no],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addArtist"] });
    },
  });
};

const updateArtist = async (
  userId: number,
  data: Partial<ArtistData>
): Promise<UserResponse> => {
  const response = await axiosInstance.put(`/api/artists/${userId}`, data);
  return response.data;
};

export const useUpdateArtist = (userId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<ArtistData>) => updateArtist(userId, data),
    mutationKey: ["ArtistDeArtristPutlete", userId],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addArtist"] });
    },
    retry: false,
  });
};

export const useDeleteArtist = (id_no: number) => {
  const queryClient = useQueryClient();
  const ArtristDelete = async (id: number) => {
    const response = await axiosInstance.delete(`/api/artists/${id}`);
    return response.data;
  };
  return useMutation({
    mutationFn: () => ArtristDelete(id_no),
    mutationKey: ["ArtistDelete", id_no],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addArtist"] });
    },
  });
};
