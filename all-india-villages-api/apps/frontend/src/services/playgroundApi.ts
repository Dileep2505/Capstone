import axios from "axios";

export const runApiRequest =
  async (
    endpoint: string,
    apiKey: string,
    apiSecret: string
  ) => {

    const playgroundApi = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    (typeof window !== "undefined"
      ? window.location.origin
      : ""),
});

    const response =
      await playgroundApi.get(
        endpoint,
        {
          headers: {
            "X-API-Key": apiKey,
            "X-API-Secret": apiSecret,
          },
        }
      );

    return response.data;
};