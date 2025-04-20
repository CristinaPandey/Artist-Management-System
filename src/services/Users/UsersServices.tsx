import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../config/axiosInstance";

type UserData = {
  username: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
  gender: string;
  address: string;
  phone_number: string;
  date_of_birth: Date;
  role?: string;
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

const addUser = async (data: UserData): Promise<UserResponse> => {
  const response = await axiosInstance.post("/api/users", data);
  return response.data;
};

export const useAddUserMutation = () => {
  return useMutation({
    mutationFn: addUser,
    mutationKey: ["addUser"],
    retry: false,
  });
};

const getAllUserList = async () => {
  const response = await axiosInstance.get(`/api/users`);
  return response.data;
};
export const useGetAllUserList = () => {
  return useQuery({
    queryKey: ["addUser"],
    queryFn: () => getAllUserList(),
    // retry: false,
  });
};
