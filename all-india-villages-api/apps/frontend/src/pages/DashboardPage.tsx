import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import {
  getDashboardStats,
} from "../services/adminApi";

import StatsCard from "../components/StatsCard";

import RecentRequestsTable from "../components/RecentRequestsTable";

import ApiKeysPage from "./ApiKeysPage";

import SubscriptionPage from "./SubscriptionPage";

import UsageCard from "../components/UsageCard";
import DocsPage from "./DocsPage";
import PlaygroundPage from "./PlaygroundPage";
import AdminUsersPage
from "./AdminUsersPage";

import {
  useAuthStore,
} from "../store/authStore";

function DashboardPage() {

  const logout =
    useAuthStore(
      (state) => state.logout
    );

  const [tab, setTab] =
    useState("dashboard");

  const {
    data,
    isLoading,
  } = useQuery({

    queryKey: ["dashboard"],

    queryFn:
      getDashboardStats,

    enabled:
      tab === "dashboard",
  });

  return (

    <div className="min-h-screen bg-gray-100">

      <div className="bg-white shadow px-8 py-4 flex items-center justify-between">

        <h1 className="text-3xl font-bold">

          All India Villages

        </h1>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>

      </div>

      <div className="flex">

        <aside className="w-64 bg-white min-h-screen shadow">

          <div className="p-4 space-y-2">

            <button
              onClick={() =>
                setTab("dashboard")
              }
              className="w-full text-left px-4 py-3 rounded hover:bg-gray-100"
            >
              Dashboard
            </button>

            <button
              onClick={() =>
                setTab("apiKeys")
              }
              className="w-full text-left px-4 py-3 rounded hover:bg-gray-100"
            >
              API Keys
            </button>

              <button
  onClick={() =>
    setTab("subscription")
  }
  className="w-full text-left px-4 py-3 rounded hover:bg-gray-100"
>
  Subscription
</button>

            <button
  onClick={() =>
    setTab("docs")
  }
  className="w-full text-left px-4 py-3 rounded hover:bg-gray-100"
>
  API Docs
</button>

            <button
  onClick={() =>
    setTab("playground")
  }
  className="w-full text-left px-4 py-3 rounded hover:bg-gray-100"
>
  API Playground
</button>

<button
  onClick={() =>
    setTab("admin-users")
  }
  className="w-full text-left px-4 py-3 rounded hover:bg-gray-100"
>
  User Management
</button>

          </div>

        </aside>

        <main className="flex-1 p-8">

          {tab === "dashboard" && (

            isLoading ? (

              <div>
                Loading...
              </div>

            ) : (

              <>

  <UsageCard
    usage={120}
    quota={1000}
  />

  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <StatsCard
                    title="Users"
                    value={data.data.totalUsers}
                  />

                  <StatsCard
                    title="API Keys"
                    value={data.data.totalApiKeys}
                  />

                  <StatsCard
                    title="Requests"
                    value={data.data.totalRequests}
                  />

                  <StatsCard
                    title="Avg Response"
                    value={`${Math.round(
                      data.data.averageResponseTime
                    )} ms`}
                  />

                </div>

                <RecentRequestsTable
                  requests={
                    data.data.recentRequests
                  }
                />
              </>
            )
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
    
          {tab === "playground" && (

            <PlaygroundPage />

          )}

          {tab === "admin-users" && (

  <AdminUsersPage />

)}

        </main>

      </div>

    </div>
  );
}

export default DashboardPage;