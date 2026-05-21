import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import {
  getDashboardStats,
} from "../services/adminApi";

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

  const {
    data,
    isLoading,
  } = useQuery({

    queryKey: ["dashboard"],

    queryFn:
      getDashboardStats,

    enabled: true,

    refetchInterval: 5000,
  });

  return (

    <div className="min-h-screen bg-gray-100 flex">

      <Sidebar
        tab={tab}
        setTab={setTab}
      />

      <div className="flex-1 flex flex-col">

        <Topbar />

        <main className="p-8">

          {isLoading ? (

            <div className="text-lg font-medium">

              Loading dashboard...

            </div>

          ) : (

            <>

              {tab === "dashboard" && (

                <>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

                    <MetricCard
                      title="Total Users"
                      value={
                        data?.data.totalUsers || 0
                      }
                      icon="👥"
                      change="+12%"
                    />

                    <MetricCard
                      title="API Keys"
                      value={
                        data?.data.totalApiKeys || 0
                      }
                      icon="🔑"
                      change="+5%"
                    />

                    <MetricCard
                      title="Requests"
                      value={
                        data?.data.totalRequests || 0
                      }
                      icon="⚡"
                      change="+28%"
                    />

                    <MetricCard
                      title="Avg Response"
                      value={`${Math.round(
                        data?.data
                          .averageResponseTime || 0
                      )} ms`}
                      icon="🚀"
                      change="-8%"
                    />

                  </div>

                  <div className="mb-8">

                    <AnalyticsChart />

                  </div>

                  <LiveLogsTable
                    logs={
                      data?.data
                        .recentRequests || []
                    }
                  />

                </>

              )}

              {tab === "logs" && (

                <LiveLogsTable
                  logs={
                    data?.data
                      .recentRequests || []
                  }
                />

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

              {tab === "users" && (

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