import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
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

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type PaginatedResponse<T> = ApiResponse<{
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}>;

export type ImportResponse = ApiResponse<{
  processed: number;
  created: number;
  updated: number;
  failed: number;
  errors?: string[];
}>;

const addArtist = async (data: ArtistData): Promise<UserResponse> => {
  const response = await axiosInstance.post("/api/artists", data);
  return response.data;
};

export const useAddArtistrMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addArtist,
    mutationKey: ["addArtist"],
    retry: false,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addArtist"] });
    },
  });
};

const getAllUserList = async (page = 1, limit = 10) => {
  const response = await axiosInstance.get(`/api/artists`, {
    params: { page, limit },
  });
  return response.data;
};
export const useGetAllArtistList = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["addArtist", page, limit],
    queryFn: () => getAllUserList(page, limit),
    placeholderData: keepPreviousData,
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
    mutationKey: ["ArtristList", id_no],
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
    mutationKey: ["updateArtrist", userId],
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

/**
 * Import artists from CSV file
 * @param file - CSV file containing artist data
 * @returns Import operation results
 */
export const importArtists = async (file: File): Promise<ImportResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axiosInstance.post("/api/artists/import", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    // Enhanced error handling to extract API error messages
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Failed to import artists");
  }
};

/**
 * React Query hook for importing artists from CSV
 */
export const useImportArtists = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: importArtists,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["artists"] });
    },
  });
};

/**
 * Export artists to CSV file
 * @returns Promise that resolves when download starts
 */
export const exportArtists = async (): Promise<boolean> => {
  try {
    const response = await axiosInstance.get("/api/artists/export", {
      responseType: "blob",
    });

    // Get filename from content-disposition header if available
    const contentDisposition = response.headers["content-disposition"];
    let filename = "artists_export.csv";

    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename="?([^"]*)"?/);
      if (filenameMatch && filenameMatch[1]) {
        filename = filenameMatch[1];
      }
    }

    // Create and trigger download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();

    // Cleanup
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    }, 100);

    return true;
  } catch (error: any) {
    if (error.response?.data) {
      // Try to parse error blob
      try {
        const errorBlob = error.response.data;
        const errorText = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsText(errorBlob);
        });

        const errorJson = JSON.parse(errorText);
        throw new Error(errorJson.message || "Failed to export artists");
      } catch (parseError) {
        throw new Error("Failed to export artists");
      }
    }
    throw new Error("Failed to export artists");
  }
};

/**
 * React Query hook for exporting artists to CSV
 */
export const useExportArtists = () => {
  return useMutation({
    mutationFn: exportArtists,
  });
};
