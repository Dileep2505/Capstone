import { api } from "./api";

export const getUsage =
  async () => {

    const response =
      await api.get(
        "/v1/admin/usage"
      );

    return response.data;
  };