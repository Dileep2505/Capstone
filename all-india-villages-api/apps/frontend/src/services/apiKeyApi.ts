import { api } from "./api";

const getAuthHeaders = () => {

  const token =
    localStorage.getItem("token");

  return {

    Authorization:
      `Bearer ${token}`,
  };
};

export const getApiKeys =
  async () => {

    const response =
      await api.get(
        "/v1/admin/api-keys",
        {
          headers:
            getAuthHeaders(),
        }
      );

    return response.data;
};

export const createApiKey =
  async () => {

    const response =
      await api.post(
        "/v1/admin/api-keys",
        {},
        {
          headers:
            getAuthHeaders(),
        }
      );

    return response.data;
};

export const revokeApiKey =
  async (id: string) => {

    try {
      const response =
        await api.delete(
          `/v1/admin/api-keys/${id}`,
          {
            headers:
              getAuthHeaders(),
          }
        );

      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 404) {
        const fallbackResponse =
          await api.delete(
            `/v1/api-keys/${id}`,
            {
              headers:
                getAuthHeaders(),
            }
          );

        return fallbackResponse.data;
      }

      throw error;
    }
};