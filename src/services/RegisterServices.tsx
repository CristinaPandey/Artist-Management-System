import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../config/axiosInstance";

type RegisterData = {
  username: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
  gender: string;
  address: string;
  phone_number: string;
  date_of_birth: Date;
  role?: string; // Optional since it has a default value on the backend
};

type RegisterResponse = {
  message: string;
  user: {
    id: number;
    username: string;
    email: string;
    role: string;
  };
  token: string;
};

const registerUser = async (data: RegisterData): Promise<RegisterResponse> => {
  const response = await axiosInstance.post("/api/auth/register", data);
  return response.data;
};

export const useRegisterMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 100);
    },
    onError: (error: any) => {
      // Handle error scenarios
      console.error("Registration error:", error);
    },
  });
};
