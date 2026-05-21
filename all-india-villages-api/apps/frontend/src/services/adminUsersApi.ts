import { api } from "./api";

const getHeaders = () => ({

  Authorization:
    `Bearer ${
      localStorage.getItem(
        "token"
      )
    }`,
});

export const getUsers =
  async () => {

    const response =
      await api.get(
        "/v1/admin/users"
      );

    return response.data;
  };
  
export const suspendUser =
  async (id: string) => {

    const response =
      await api.patch(
        `/v1/admin/users/${id}/suspend`,
        {},
        {
          headers:
            getHeaders(),
        }
      );

    return response.data;
};

export const activateUser =
  async (id: string) => {

    const response =
      await api.patch(
        `/v1/admin/users/${id}/activate`,
        {},
        {
          headers:
            getHeaders(),
        }
      );

    return response.data;
};