import { api } from "./api";

export const getWeeklyAnalytics =
  async () => {

    const response =
      await api.get(
        "/v1/admin/analytics/weekly"
      );

    return response.data;
  };