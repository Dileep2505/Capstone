import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import {
  getDashboardStats,
} from "../services/adminApi";

import { useAuthStore } from "../store/authStore";

import ApiKeysPage from "./ApiKeysPage";

import SubscriptionPage from "./SubscriptionPage";

import DocsPage from "./DocsPage";

import PlaygroundPage from "./PlaygroundPage";

import AdminUsersPage from "./AdminUsersPage";

import Sidebar from "../components/Sidebar";

import Topbar from "../components/Topbar";

import MetricCard from "../components/MetricCard";

import LiveLogsTable from "../components/LiveLogsTable";

import AnalyticsChart from "../components/AnalyticsChart";

function DashboardPage() {

  const [tab, setTab] =
    useState("dashboard");

  const role = useAuthStore(
    (state) => state.role
  );

  const isAdmin = role === "ADMIN";

  const {
    data,
    isLoading,
    isError,
  } = useQuery({

    queryKey: ["dashboard", role],

    queryFn:
      getDashboardStats,

    enabled: isAdmin,

    refetchInterval: 5000,
  });

  const dashboardData = data?.data;

  return (

    <div className="min-h-screen bg-gray-100 flex">

      <Sidebar
        tab={tab}
        setTab={setTab}
      />

      <div className="flex-1 flex flex-col">

        <Topbar />

        <main className="p-8">

          {isAdmin && isLoading ? (

            <div className="text-xl font-semibold">

              Loading...

            </div>

          ) : isAdmin && isError ? (

            <div className="text-xl font-semibold text-red-600">

              Failed to load admin dashboard.

            </div>

          ) : (

            <>

              {tab === "dashboard" && isAdmin && (

                <>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

                    <MetricCard
                      title="Total Users"
                      value={
                        dashboardData?.totalUsers || 0
                      }
                      change="+12%"
                    />

                    <MetricCard
                      title="API Keys"
                      value={
                        dashboardData?.totalApiKeys || 0
                      }
                      change="+5%"
                    />

                    <MetricCard
                      title="Requests"
                      value={
                        dashboardData?.totalRequests || 0
                      }
                      change="+28%"
                    />

                    <MetricCard
                      title="Avg Response"
                      value={`${Math.round(
                        dashboardData
                          ?.averageResponseTime || 0
                      )} ms`}
                      change="-8%"
                    />

                  </div>

                  <div className="mb-8">

                    <AnalyticsChart />

                  </div>

                  <LiveLogsTable
                    logs={
                      dashboardData
                        ?.recentRequests || []
                    }
                  />

                </>

              )}

              {tab === "dashboard" && !isAdmin && (

                <div className="max-w-3xl">

                  <h1 className="text-3xl font-bold mb-3">

                    Welcome back

                  </h1>

                  <p className="text-gray-600 mb-6">

                    Your account is active. Use API Playground, API Keys, Plans, and API Docs from the sidebar.

                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div className="bg-white rounded-3xl p-6 shadow-sm border">

                      <div className="text-sm text-gray-500">Account type</div>

                      <div className="text-2xl font-bold mt-2">User</div>

                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow-sm border">

                      <div className="text-sm text-gray-500">Available tools</div>

                      <div className="text-2xl font-bold mt-2">API access</div>

                    </div>

                  </div>

                </div>

              )}

              {tab === "logs" && (

                <div>

                  <h1 className="text-4xl font-bold mb-6">

                    Live Logs

                  </h1>

                  <LiveLogsTable
                    logs={
                      dashboardData
                        ?.recentRequests || []
                    }
                  />

                </div>

              )}

              {tab === "playground" && (

                <PlaygroundPage />

              )}

              {tab === "apiKeys" && (

                <ApiKeysPage />

              )}

              {tab === "subscription" && (

                <SubscriptionPage />

              )}

              {tab === "docs" && (

                <DocsPage />

              )}

              {tab === "users" && role === "ADMIN" && (

                <AdminUsersPage />

              )}

            </>

          )}

        </main>

      </div>

    </div>
  );
}

export default DashboardPage;