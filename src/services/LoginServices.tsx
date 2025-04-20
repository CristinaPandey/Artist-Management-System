import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../config/axiosInstance";

type LoginData = {
  username: string;
  password: string;
};

type LoginResponse = {
  message: string;
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
    role: string;
  };
};

const loginUser = async (data: LoginData): Promise<LoginResponse> => {
  const response = await axiosInstance.post(`/api/auth/login`, data);
  return response.data;
};

export const useLoginMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user_id", data.user.id.toString());
      localStorage.setItem("username", data.user.username);
      localStorage.setItem("user_role", data.user.role);

      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 100);
    },
  });
};
