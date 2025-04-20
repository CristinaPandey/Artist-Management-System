import { useMutation, useQuery } from "@tanstack/react-query";
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
