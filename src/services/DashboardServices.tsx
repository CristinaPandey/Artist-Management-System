import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../config/axiosInstance";

const getDashboardInfo = async () => {
  const response = await axiosInstance.get(`/api/dashboard`);
  return response.data;
};
export const useGetDashboardInfo = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: () => getDashboardInfo(),
    // retry: false,
  });
};
