import { useQuery }
from "@tanstack/react-query";

import {
  getUsage,
} from "../services/usageApi";

import {
  useAuthStore,
} from "../store/authStore";

interface SidebarProps {

  tab: string;

  setTab: (
    tab: string
  ) => void;
}

function Sidebar({
  tab,
  setTab,
}: SidebarProps) {

  const role = useAuthStore(
    (state) => state.role
  );

  const {
    data,
  } = useQuery({

    queryKey: ["usage"],

    queryFn: getUsage,
    refetchInterval: 10000,
    refetchOnWindowFocus: false,
  });

  const usage =
    data?.data?.monthlyUsage || 0;

  const quota =
    data?.data?.monthlyQuota || 1;

  const percentage =
    Math.min(
      Math.round(
        (usage / quota) * 100
      ),
      100
    );

  const plan =
    data?.data?.plan || "FREE";

  const itemClass = (
    active: boolean
  ) =>
    `w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition font-medium ${
      active
        ? "bg-black text-white shadow"
        : "hover:bg-gray-100 text-gray-700"
    }`;

  return (

    <aside className="w-72 bg-white border-r min-h-screen p-6 flex flex-col justify-between">

      <div>

        <div className="mb-10">

          <h1 className="text-3xl font-bold tracking-tight">

            VillageAPI

          </h1>

          <p className="text-sm text-gray-500 mt-2">

            Developer Platform

          </p>

        </div>

        <nav className="space-y-3">

          <button
            onClick={() =>
              setTab("dashboard")
            }
            className={itemClass(
              tab === "dashboard"
            )}
          >
             Dashboard
          </button>

          <button
            onClick={() =>
              setTab("playground")
            }
            className={itemClass(
              tab === "playground"
            )}
          >
             API Playground
          </button>

          <button
            onClick={() =>
              setTab("logs")
            }
            className={itemClass(
              tab === "logs"
            )}
          >
             Live Logs
          </button>

          <button
            onClick={() =>
              setTab("apiKeys")
            }
            className={itemClass(
              tab === "apiKeys"
            )}
          >
             API Keys
          </button>

          <button
            onClick={() =>
              setTab("subscription")
            }
            className={itemClass(
              tab === "subscription"
            )}
          >
             Plans
          </button>

          <button
            onClick={() =>
              setTab("docs")
            }
            className={itemClass(
              tab === "docs"
            )}
          >
             API Docs
          </button>

          {role === "ADMIN" && (
            <button
              onClick={() =>
                setTab("users")
              }
              className={itemClass(
                tab === "users"
              )}
            >
               Users
            </button>
          )}

        </nav>

      </div>

      <div className="mt-10 p-5 rounded-3xl bg-gradient-to-br from-black to-gray-800 text-white">

        <div className="flex items-center justify-between mb-3">

          <span className="font-semibold">

            {plan} Plan

          </span>

          <span className="text-sm opacity-80">

            {percentage}%

          </span>

        </div>

        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">

          <div
            style={{
              width: `${percentage}%`,
            }}
            className="h-full bg-white rounded-full"
          />

        </div>

        <p className="text-xs opacity-80 mt-3">
          Used <span className="font-semibold">{usage.toLocaleString()}</span>
          {" / "}
          <span className="font-semibold">{quota.toLocaleString()}</span>
          {" requests"}
        </p>
        <p className="text-xs opacity-70 mt-1">
          Remaining: {Math.max(quota - usage, 0).toLocaleString()} requests
        </p>

        <button
          onClick={() => setTab("subscription")}
          className="mt-5 w-full bg-white text-black py-2 rounded-xl font-medium hover:bg-gray-200 transition"
        >

          Upgrade Plan

        </button>

      </div>

    </aside>
  );
}

export default Sidebar;