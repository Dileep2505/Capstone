import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import {
  getDashboardStats,
} from "../services/adminApi";

import {
  getUsage,
} from "../services/usageApi";

import {
  createApiKey,
  getApiKeys,
  revokeApiKey,
} from "../services/apiKeyApi";

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

import ApiKeyCard from "../components/ApiKeyCard";

function DashboardPage() {

  const [tab, setTab] =
    useState("dashboard");

  const role = useAuthStore(
    (state) => state.role
  );

  const isAdmin = role === "ADMIN";

  const {
    data: usageData,
    isLoading: usageLoading,
  } = useQuery({

    queryKey: ["usage", role],

    queryFn: getUsage,

    enabled: !isAdmin,

    refetchInterval: 10000,
  });

  const {
    data: apiKeysData,
    isLoading: apiKeysLoading,
    refetch: refetchApiKeys,
  } = useQuery({

    queryKey: ["apiKeys", role],

    queryFn: getApiKeys,

    enabled: !isAdmin,
  });

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

  const userUsage = usageData?.data;
  const userApiKeys = apiKeysData?.data || [];

  const handleCreateApiKey = async () => {
    const response = await createApiKey();
    alert(`API Secret (save now): ${response.data.secret}`);
    refetchApiKeys();
  };

  const handleRevokeApiKey = async (id: string) => {
    await revokeApiKey(id);
    refetchApiKeys();
  };

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

                <div className="space-y-8">

                  <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">

                    <div>

                      <h1 className="text-4xl font-bold mb-2">

                        Welcome back

                      </h1>

                      <p className="text-gray-600 text-lg max-w-2xl">

                        Track your usage, manage your API keys, and jump straight into the playground or docs.

                      </p>

                    </div>

                    <button
                      onClick={handleCreateApiKey}
                      className="inline-flex items-center justify-center rounded-2xl bg-black px-5 py-3 font-medium text-white hover:bg-gray-800 transition"
                    >

                      Generate API Key

                    </button>

                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                    <div className="rounded-3xl bg-white p-6 shadow-sm border">

                      <div className="text-sm text-gray-500">Plan</div>

                      <div className="mt-2 text-3xl font-bold uppercase">

                        {userUsage?.plan || "FREE"}

                      </div>

                    </div>

                    <div className="rounded-3xl bg-white p-6 shadow-sm border">

                      <div className="text-sm text-gray-500">This month</div>

                      <div className="mt-2 text-3xl font-bold">

                        {usageLoading ? "—" : (userUsage?.monthlyUsage || 0).toLocaleString()}

                      </div>

                    </div>

                    <div className="rounded-3xl bg-white p-6 shadow-sm border">

                      <div className="text-sm text-gray-500">Remaining</div>

                      <div className="mt-2 text-3xl font-bold">

                        {usageLoading ? "—" : (userUsage?.remainingRequests || 0).toLocaleString()}

                      </div>

                    </div>

                    <div className="rounded-3xl bg-white p-6 shadow-sm border">

                      <div className="text-sm text-gray-500">API Keys</div>

                      <div className="mt-2 text-3xl font-bold">

                        {apiKeysLoading ? "—" : userApiKeys.length}

                      </div>

                    </div>

                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                    <div className="xl:col-span-2 space-y-5">

                      <div className="flex items-center justify-between">

                        <div>

                          <h2 className="text-2xl font-bold">Your API Keys</h2>

                          <p className="text-gray-500">Create and revoke keys from one place.</p>

                        </div>

                      </div>

                      <div className="space-y-4">

                        {userApiKeys.length === 0 ? (

                          <div className="rounded-3xl border bg-white p-8 text-gray-500 shadow-sm">

                            No API keys yet. Generate one to start using the API.

                          </div>

                        ) : (

                          userApiKeys.map((apiKey: any) => (

                            <ApiKeyCard
                              key={apiKey.id}
                              apiKey={apiKey}
                              onRevoke={handleRevokeApiKey}
                            />

                          ))

                        )}

                      </div>

                    </div>

                    <div className="space-y-6">

                      <div className="rounded-3xl bg-white p-6 shadow-sm border">

                        <h3 className="text-xl font-bold mb-3">Quick Start</h3>

                        <ol className="space-y-3 text-sm text-gray-600 list-decimal list-inside">

                          <li>Generate an API key from the button above.</li>

                          <li>Open API Playground to test endpoints.</li>

                          <li>Read the docs for request headers and examples.</li>

                        </ol>

                      </div>

                      <div className="rounded-3xl bg-black p-6 text-white shadow-sm">

                        <div className="text-sm text-gray-300">Current quota</div>

                        <div className="mt-2 text-3xl font-bold">

                          {userUsage?.monthlyUsage || 0} / {userUsage?.monthlyQuota || 0}

                        </div>

                        <div className="mt-4 h-2 rounded-full bg-gray-700 overflow-hidden">

                          <div
                            className="h-full rounded-full bg-white"
                            style={{
                              width: `${Math.min(
                                Math.round(
                                  ((userUsage?.monthlyUsage || 0) /
                                    Math.max(userUsage?.monthlyQuota || 1, 1)) * 100
                                ),
                                100
                              )}%`,
                            }}
                          />

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              )}

              {tab === "logs" && isAdmin && (

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