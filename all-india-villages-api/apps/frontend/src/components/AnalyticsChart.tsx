import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { useQuery } from "@tanstack/react-query";

import {
  getWeeklyAnalytics,
} from "../services/analyticsApi";

function AnalyticsChart() {

  const { data, isLoading } =
    useQuery({

      queryKey: ["weeklyAnalytics"],

      queryFn:
        getWeeklyAnalytics,
    });

  if (isLoading) {

    return (

      <div className="bg-white rounded-2xl shadow-sm border p-6">

        Loading analytics...

      </div>
    );
  }

  return (

    <div className="bg-white rounded-2xl shadow-sm border p-6">

      <div className="mb-6">

        <h2 className="text-2xl font-bold">

          API Traffic

        </h2>

        <p className="text-gray-500 text-sm">

          Weekly API requests

        </p>

      </div>

      <div className="h-[350px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <LineChart
            data={data?.data || []}
          >

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis dataKey="day" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="requests"
              stroke="#000000"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default AnalyticsChart;