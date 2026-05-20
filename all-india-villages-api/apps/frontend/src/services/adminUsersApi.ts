import { api }
from "./api";

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
        "/admin/users",
        {
          headers:
            getHeaders(),
        }
      );

    return response.data;
};

export const suspendUser =
  async (id: string) => {

    const response =
      await api.patch(
        `/admin/users/${id}/suspend`,
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
        `/admin/users/${id}/activate`,
        {},
        {
          headers:
            getHeaders(),
        }
      );

    return response.data;
};