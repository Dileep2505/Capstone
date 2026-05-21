import { api } from "./api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    Authorization: `Bearer ${token}`,
  };
};

export const getUsage =
  async () => {

    const response =
      await api.get(
        "/v1/admin/usage",
        {
          headers: getAuthHeaders(),
        }
      );

    return response.data;
  };