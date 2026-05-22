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
  const usagePercent = Math.min(
    Math.round(
      ((userUsage?.monthlyUsage || 0) /
        Math.max(userUsage?.monthlyQuota || 1, 1)) * 100
    ),
    100
  );

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

                  <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">

                    <div>

                      <h1 className="text-4xl font-bold mb-2">

                        Welcome back

                      </h1>

                      <p className="text-gray-500 text-lg max-w-2xl">

                        Monitor your usage, API keys, and plan status from the same dashboard layout as admin users.

                      </p>

                    </div>

                    <button
                      onClick={handleCreateApiKey}
                      className="inline-flex items-center justify-center rounded-2xl bg-black px-5 py-3 font-medium text-white hover:bg-gray-800 transition"
                    >

                      Generate API Key

                    </button>

                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

                    <MetricCard
                      title="Plan"
                      value={(userUsage?.plan || "FREE").toUpperCase()}
                      change={isAdmin ? "+0%" : "Active"}
                    />

                    <MetricCard
                      title="Monthly Usage"
                      value={usageLoading ? "—" : (userUsage?.monthlyUsage || 0).toLocaleString()}
                      change={`${usagePercent}%`}
                    />

                    <MetricCard
                      title="Remaining"
                      value={usageLoading ? "—" : (userUsage?.remainingRequests || 0).toLocaleString()}
                      change="This month"
                    />

                    <MetricCard
                      title="API Keys"
                      value={apiKeysLoading ? "—" : userApiKeys.length}
                      change={userApiKeys.length === 1 ? "1 key" : `${userApiKeys.length} keys`}
                    />

                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                    <div className="xl:col-span-2">

                      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

                        <div className="px-6 py-5 border-b">

                          <h2 className="text-2xl font-bold">Usage Overview</h2>

                          <p className="text-gray-500 mt-1">Your plan usage for the current billing cycle</p>

                        </div>

                        <div className="p-6 space-y-6">

                          <div className="flex items-end justify-between">

                            <div>

                              <div className="text-sm text-gray-500">Quota used</div>

                              <div className="text-3xl font-bold mt-2">

                                {usageLoading ? "—" : `${userUsage?.monthlyUsage || 0} / ${userUsage?.monthlyQuota || 0}`}

                              </div>

                            </div>

                            <div className="text-right">

                              <div className="text-sm text-gray-500">Remaining</div>

                              <div className="text-3xl font-bold mt-2">

                                {usageLoading ? "—" : (userUsage?.remainingRequests || 0).toLocaleString()}

                              </div>

                            </div>

                          </div>

                          <div className="h-4 rounded-full bg-gray-100 overflow-hidden">

                            <div
                              className="h-full rounded-full bg-black transition-all"
                              style={{ width: `${usagePercent}%` }}
                            />

                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                            <div className="rounded-2xl border p-4">

                              <div className="text-sm text-gray-500">Plan</div>

                              <div className="text-xl font-semibold mt-1">{userUsage?.plan || "FREE"}</div>

                            </div>

                            <div className="rounded-2xl border p-4">

                              <div className="text-sm text-gray-500">API Keys</div>

                              <div className="text-xl font-semibold mt-1">{userApiKeys.length}</div>

                            </div>

                            <div className="rounded-2xl border p-4">

                              <div className="text-sm text-gray-500">Access</div>

                              <div className="text-xl font-semibold mt-1">Developer</div>

                            </div>

                          </div>

                        </div>

                      </div>

                    </div>

                    <div className="space-y-6">

                      <div className="bg-white rounded-2xl shadow-sm border p-6">

                        <h3 className="text-xl font-bold mb-3">Quick Start</h3>

                        <ol className="space-y-3 text-sm text-gray-600 list-decimal list-inside">

                          <li>Generate an API key from the action button.</li>

                          <li>Use API Playground to test endpoints.</li>

                          <li>Open API Docs for request headers and examples.</li>

                        </ol>

                      </div>

                      <div className="bg-black rounded-2xl shadow-lg overflow-hidden text-white">

                        <div className="px-6 py-5 border-b border-gray-800">

                          <h3 className="text-xl font-bold">Recent Keys</h3>

                        </div>

                        <div className="p-6 space-y-3">

                          {userApiKeys.length === 0 ? (

                            <p className="text-sm text-gray-300">No keys yet. Generate one to begin.</p>

                          ) : (

                            userApiKeys.slice(0, 3).map((apiKey: any) => (

                              <div key={apiKey.id} className="rounded-xl bg-white/10 p-4">

                                <div className="font-medium truncate">{apiKey.key}</div>

                                <div className="text-xs text-gray-300 mt-1">

                                  {apiKey.isActive ? "Active" : "Revoked"}

                                </div>

                              </div>

                            ))

                          )}

                        </div>

                      </div>

                    </div>

                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

                    <div className="px-6 py-5 border-b flex items-center justify-between">

                      <div>

                        <h2 className="text-2xl font-bold">Your API Keys</h2>

                        <p className="text-gray-500 mt-1">Create and revoke keys from one place</p>

                      </div>

                    </div>

                    <div className="p-6">

                      <div className="space-y-4">

                        {userApiKeys.length === 0 ? (

                          <div className="rounded-3xl border bg-gray-50 p-8 text-gray-500">

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