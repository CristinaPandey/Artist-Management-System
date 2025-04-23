import {
  useMutation,
  useQuery,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addUser,
    mutationKey: ["addUser"],
    retry: false,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

// const getAllUserList = async () => {
//   const response = await axiosInstance.get(`/api/users`);
//   return response.data;
// };
// export const useGetAllUserList = () => {
//   return useQuery({
//     queryKey: ["addUser"],
//     queryFn: () => getAllUserList(),
//     // retry: false,
//   });
// };
const getAllUserList = async (page = 1, limit = 10) => {
  const response = await axiosInstance.get(`/api/users`, {
    params: { page, limit },
  });
  return response.data;
};

export const useGetAllUserList = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["users", page, limit],
    queryFn: () => getAllUserList(page, limit),
    placeholderData: keepPreviousData,
  });
};

const updateUser = async (
  userId: number,
  data: Partial<UserData>
): Promise<UserResponse> => {
  const response = await axiosInstance.put(`/api/users/${userId}`, data);
  return response.data;
};

export const useUpdateUser = (userId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<UserData>) => updateUser(userId, data),
    mutationKey: ["updateUser", userId],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    retry: false,
  });
};

export const useDeleteUser = (id_no: number) => {
  const queryClient = useQueryClient();
  const UserDelete = async (id: number) => {
    const response = await axiosInstance.delete(`/api/users/${id}`);
    return response.data;
  };
  return useMutation({
    mutationFn: () => UserDelete(id_no),
    mutationKey: ["UserDelete", id_no],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
