import axios from "axios";

export const runApiRequest =
  async (
    endpoint: string,
    apiKey: string,
    apiSecret: string
  ) => {

    const response =
      await axios.get(
        `http://localhost:3000${endpoint}`,
        {
          headers: {

            "X-API-Key":
              apiKey,

            "X-API-Secret":
              apiSecret,
          },
        }
      );

    return response.data;
};